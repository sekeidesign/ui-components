/**
 * A loading surface that leaves by being swept off, rather than by fading.
 *
 * One fullscreen fragment shader: a turbulent edge trailed by a gradient
 * ribbon, writing premultiplied alpha into a transparent canvas so whatever
 * sits behind it shows through where the edge has passed.
 *
 * Raw WebGPU: owning `configure`/`destroy` outright avoids the context being
 * pulled out from under a second device in React's double-invoked effects.
 */

export interface WipeParams {
	/**
	 * Sweep direction in degrees, in top-origin uv space: 0 = left to right,
	 * 90 = top to bottom, 270 = bottom to top, 45 = the top-left diagonal.
	 * Normalised over the unit square, so the sweep runs corner to corner at
	 * any aspect ratio.
	 */
	angleDeg: number;
	/** How long the sweep takes, end to end. */
	durationMs: number;
	/** Width of the gradient ribbon trailing the edge, in sweep units. */
	band: number;
	/** Fraction of the ribbon over which it bleeds back into the surface. */
	bleed: number;
	/** How far past the edge alpha fades to nothing. */
	feather: number;
	/** How far noise bends the edge out of a straight line. */
	turbulence: number;
	/** Frequency of that bend. Higher is a tighter wobble. */
	noiseScale: number;
	/** How hard a second noise field smears the ribbon's colours together. */
	swirl: number;
	/** Size of one grain cell, in device pixels. */
	grainSize: number;
	/** Strength of the grain. 0 turns it off. */
	grainAmount: number;
	/** The loading page's background colour. Painted into the page bitmap the
	 * shader samples, not sent to the shader directly. */
	surface: string;
	/** Ribbon stops as `#rrggbb`, from the revealed edge back into the surface. */
	colors: readonly [string, string, string, string];
}

export const DEFAULT_WIPE_PARAMS: WipeParams = {
	angleDeg: 270,
	durationMs: 1200,
	band: 0.65,
	bleed: 0.73,
	feather: 0.17,
	turbulence: 0.16,
	noiseScale: 3,
	swirl: 0.22,
	grainSize: 1.5,
	grainAmount: 0.12,
	surface: "#fafafa",
	colors: ["#6366f1", "#38bdf8", "#67e8f9", "#e0f2fe"],
};

/** Slider ranges, shared by the controls and by the clamp below. */
export const WIPE_BOUNDS = {
	angleDeg: { min: 0, max: 359, step: 1 },
	durationMs: { min: 300, max: 4000, step: 50 },
	band: { min: 0.02, max: 1.5, step: 0.01 },
	bleed: { min: 0, max: 0.95, step: 0.01 },
	feather: { min: 0.005, max: 0.6, step: 0.005 },
	turbulence: { min: 0, max: 0.6, step: 0.005 },
	noiseScale: { min: 0.5, max: 14, step: 0.1 },
	swirl: { min: 0, max: 1.5, step: 0.01 },
	grainSize: { min: 1, max: 12, step: 0.5 },
	grainAmount: { min: 0, max: 2, step: 0.02 },
} as const satisfies Record<string, { min: number; max: number; step: number }>;

export type WipeNumericKey = keyof typeof WIPE_BOUNDS;

export const WIPE_DIRECTIONS = [
	{ name: "Left to right", angleDeg: 0 },
	{ name: "Top-left to bottom-right", angleDeg: 45 },
	{ name: "Top to bottom", angleDeg: 90 },
	{ name: "Top-right to bottom-left", angleDeg: 135 },
	{ name: "Right to left", angleDeg: 180 },
	{ name: "Bottom-right to top-left", angleDeg: 225 },
	{ name: "Bottom to top", angleDeg: 270 },
	{ name: "Bottom-left to top-right", angleDeg: 315 },
] as const;

export function easeInOutCubic(t: number): number {
	return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * The sweep axis in uv space: `dot(uv, dir) + bias` runs 0 to 1 as uv crosses
 * the unit square along `angleDeg`. Dividing by `|dx| + |dy|` is what keeps the
 * sweep corner-to-corner at every angle instead of finishing early diagonally.
 */
export function sweepAxis(angleDeg: number): {
	dir: readonly [number, number];
	bias: number;
} {
	const rad = (angleDeg * Math.PI) / 180;
	const dx = Math.cos(rad);
	const dy = Math.sin(rad);
	const span = Math.abs(dx) + Math.abs(dy);
	const min = Math.min(0, dx) + Math.min(0, dy);
	return { dir: [dx / span, dy / span], bias: -min / span };
}

/**
 * Where the shader's edge sits, in sweep units, at a given eased progress — the
 * JS mirror of `edge` in `wipeDistance`. Not the same number as progress: the
 * edge starts a full ribbon-width off-screen. Anything in the DOM travelling
 * with the sweep must clip against this.
 */
export function wipeEdgeAt(progress: number, params: WipeParams): number {
	const from = -(params.band + params.turbulence);
	const to = 1 + params.turbulence + params.feather;
	return from + (to - from) * progress;
}

/**
 * The un-swept region as a `clip-path` polygon: the unit square clipped by the
 * sweep's half-plane (Sutherland–Hodgman), so it honours any angle. Used for
 * the DOM label, and for the whole surface when WebGPU is unavailable.
 */
export function wipeClipPath(edge: number, angleDeg: number): string {
	const { dir, bias } = sweepAxis(angleDeg);
	const depth = (p: readonly [number, number]) =>
		p[0] * dir[0] + p[1] * dir[1] + bias - edge;

	const square = [
		[0, 0],
		[1, 0],
		[1, 1],
		[0, 1],
	] as const;
	const kept: [number, number][] = [];
	for (let i = 0; i < square.length; i++) {
		const a = square[i];
		const b = square[(i + 1) % square.length];
		const da = depth(a);
		const db = depth(b);
		if (da >= 0) kept.push([a[0], a[1]]);
		if (da >= 0 !== db >= 0) {
			const t = da / (da - db);
			kept.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
		}
	}
	if (kept.length < 3) return "polygon(0% 0%, 0% 0%, 0% 0%)";

	const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;
	return `polygon(${kept.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ")})`;
}

const HEX = /^#[0-9a-f]{6}$/i;

/** `#rrggbb` to normalised sRGB. Black for anything unparseable. */
export function hexToRgb(hex: string): [number, number, number] {
	if (!HEX.test(hex)) return [0, 0, 0];
	const n = Number.parseInt(hex.slice(1), 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** `wipeDistance` is the swappable core: replace it for a radial or dissolve variant. */
export const WIPE_WGSL = /* wgsl */ `
struct Params {
  dir: vec2f,
  bias: f32,
  progress: f32,
  band: f32,
  bleed: f32,
  feather: f32,
  turbulence: f32,
  noiseScale: f32,
  swirl: f32,
  grainSize: f32,
  grainAmount: f32,
  // Device pixels, so grain is the same gauge at any size.
  resolution: vec2f,
  _pad: vec2f,
  stops: array<vec4f, 4>,
}

@group(0) @binding(0) var<uniform> params: Params;
// The loading page as pixels. Sampling it here rather than layering DOM over
// the canvas is what lets one alpha field carry the whole plane off.
@group(0) @binding(1) var pageSampler: sampler;
@group(0) @binding(2) var pageTexture: texture_2d<f32>;

struct VSOut {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

// One oversized triangle rather than two triangles: no seam down the
// diagonal, and three vertices instead of six.
@vertex fn vs_main(@builtin(vertex_index) index: u32) -> VSOut {
  var corners = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  let p = corners[index];
  var out: VSOut;
  out.position = vec4f(p, 0.0, 1.0);
  // Top-origin uv, to match how the sweep angles are described.
  out.uv = vec2f((p.x + 1.0) * 0.5, (1.0 - p.y) * 0.5);
  return out;
}

fn hash21(p: vec2f) -> f32 {
  var q = fract(p * vec2f(123.34, 345.45));
  q += dot(q, q + 34.345);
  return fract(q.x * q.y);
}

fn valueNoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(i);
  let b = hash21(i + vec2f(1.0, 0.0));
  let c = hash21(i + vec2f(0.0, 1.0));
  let d = hash21(i + vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// Three octaves, normalised to roughly [0, 1].
fn fbm(p: vec2f) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var q = p;
  for (var i = 0; i < 3; i++) {
    value += amplitude * valueNoise(q);
    q = q * 2.13 + vec2f(17.3, 9.1);
    amplitude *= 0.5;
  }
  return value / 0.875;
}

// lowbias32. hash21 above is a fract-multiply hash: fine for fbm, but at the
// large integer coordinates a per-pixel grain needs its fractional parts cycle
// with a short period and f32 precision collapses into diagonal lattices.
fn hashU32(value: u32) -> u32 {
  var h = value;
  h ^= h >> 16u;
  h *= 0x7feb352du;
  h ^= h >> 15u;
  h *= 0x846ca68bu;
  h ^= h >> 16u;
  return h;
}

fn grainAt(uv: vec2f) -> f32 {
  let cell = vec2u(max(
    floor(uv * params.resolution / max(params.grainSize, 1.0)),
    vec2f(0.0)
  ));
  let mixed = hashU32(cell.x ^ hashU32(cell.y * 0x9e3779b9u));
  return f32(mixed) / 4294967295.0 - 0.5;
}

// Signed distance from the (turbulent) edge, in sweep units: negative is
// swept away, [0, band] is inside the ribbon, beyond that is untouched
// surface.
fn wipeDistance(uv: vec2f, progress: f32) -> f32 {
  let d = dot(uv, params.dir) + params.bias;
  let bend = fbm(uv * params.noiseScale + vec2f(progress * 0.6, -progress * 0.4)) * 2.0 - 1.0;
  let edge = mix(
    -(params.band + params.turbulence),
    1.0 + params.turbulence + params.feather,
    progress
  );
  return d - edge + bend * params.turbulence;
}

// Four-stop ramp across the ribbon, smoothstepped between stops.
fn rampColor(t: f32) -> vec3f {
  let x = clamp(t, 0.0, 1.0) * 3.0;
  let i = min(u32(x), 2u);
  let f = smoothstep(0.0, 1.0, x - f32(i));
  return mix(params.stops[i].rgb, params.stops[i + 1u].rgb, f);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let grain = grainAt(uv) * params.grainAmount;
  let s = wipeDistance(uv, params.progress);
  // Grain the edge distance, not the finished alpha: offsetting alpha would
  // punch holes through the untouched page too.
  let alpha = smoothstep(0.0, params.feather, s + grain * params.feather * 2.0);
  // Swirl the ramp coordinate with an independent noise field, so the
  // colours smear into each other instead of striping.
  let swirl = (fbm(uv * 2.0 + vec2f(4.7, 8.1)) - 0.5) * params.swirl;
  let bandT = clamp(s / params.band + swirl, 0.0, 1.0);
  let bandWeight = 1.0 - smoothstep(params.band * params.bleed, params.band, s);
  let page = textureSample(pageTexture, pageSampler, uv).rgb;
  // Grain rides on the ribbon only — the page bitmap already carries its own,
  // painted with the same hash.
  let ribbon = clamp(rampColor(bandT) * (1.0 + grain * 0.5), vec3f(0.0), vec3f(1.0));
  let rgb = mix(page, ribbon, bandWeight);
  // Premultiplied: the canvas is transparent where the sweep has passed.
  return vec4f(rgb * alpha, alpha);
}
`;

/** f32 count of the uniform struct. Keep in step with `packParams`. */
export const UNIFORM_FLOATS = 32;

/**
 * Packs the params into the uniform struct. Offsets are hand-maintained against
 * the WGSL above: `dir` at byte 0, `resolution` at 48, `stops` at 64, so there
 * is no implicit padding to reason about.
 */
export function packParams(
	// Pinned to ArrayBuffer, not ArrayBufferLike: `writeBuffer` will not accept
	// a view that might be backed by a SharedArrayBuffer.
	out: Float32Array<ArrayBuffer>,
	params: WipeParams,
	progress: number,
	width: number,
	height: number,
): Float32Array<ArrayBuffer> {
	const { dir, bias } = sweepAxis(params.angleDeg);

	out[0] = dir[0];
	out[1] = dir[1];
	out[2] = bias;
	out[3] = progress;
	out[4] = params.band;
	out[5] = params.bleed;
	out[6] = params.feather;
	out[7] = params.turbulence;
	out[8] = params.noiseScale;
	out[9] = params.swirl;
	out[10] = params.grainSize;
	out[11] = params.grainAmount;
	out[12] = Math.max(width, 1);
	out[13] = Math.max(height, 1);
	// 14, 15 are padding, so `stops` starts on a 16-byte boundary.
	for (let i = 0; i < 4; i++) {
		const [r, g, b] = hexToRgb(params.colors[i]);
		out[16 + i * 4] = r;
		out[17 + i * 4] = g;
		out[18 + i * 4] = b;
		out[19 + i * 4] = 1;
	}
	return out;
}
