import { hexToRgb } from "./wipe-shader";

/**
 * Paints the loading surface — colour and grain — into a 2D canvas.
 *
 * The same bitmap is shown before a device exists and sampled as the shader's
 * base texture once one does. A shader-side and a CSS-side grain are the same
 * grain statistically but not the same pixels, so regenerating it would make
 * the whole plane change texture at the handover.
 */

export interface LoaderSurfaceOptions {
	surface: string;
	grainSize: number;
	grainAmount: number;
}

/** The shader's lowbias32, in JS. `Math.imul` for a wrapping 32-bit multiply. */
function hashU32(value: number): number {
	let h = value >>> 0;
	h = (h ^ (h >>> 16)) >>> 0;
	h = Math.imul(h, 0x7feb352d) >>> 0;
	h = (h ^ (h >>> 15)) >>> 0;
	h = Math.imul(h, 0x846ca68b) >>> 0;
	h = (h ^ (h >>> 16)) >>> 0;
	return h;
}

/**
 * Fills `canvas` at its current device size. Grain is written per device
 * pixel, so its cells line up with the shader's, which are sized the same way.
 */
export function drawLoaderSurface(
	canvas: HTMLCanvasElement,
	options: LoaderSurfaceOptions,
): void {
	const ctx = canvas.getContext("2d");
	if (!ctx || canvas.width === 0 || canvas.height === 0) return;

	const [r, g, b] = hexToRgb(options.surface);
	const image = ctx.createImageData(canvas.width, canvas.height);
	const cell = Math.max(options.grainSize, 1);
	const grained = options.grainAmount > 0;

	for (let y = 0; y < canvas.height; y++) {
		for (let x = 0; x < canvas.width; x++) {
			let scale = 1;
			if (grained) {
				const cx = Math.floor(x / cell);
				const cy = Math.floor(y / cell);
				const mixed = hashU32((cx ^ hashU32(Math.imul(cy, 0x9e3779b9))) >>> 0);
				scale = 1 + (mixed / 4294967295 - 0.5) * options.grainAmount * 0.5;
			}
			const i = (y * canvas.width + x) * 4;
			image.data[i] = Math.min(Math.max(r * scale, 0), 1) * 255;
			image.data[i + 1] = Math.min(Math.max(g * scale, 0), 1) * 255;
			image.data[i + 2] = Math.min(Math.max(b * scale, 0), 1) * 255;
			image.data[i + 3] = 255;
		}
	}
	ctx.putImageData(image, 0, 0);
}
