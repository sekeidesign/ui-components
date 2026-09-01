"use client";

import {
	type CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import {
	ControlPanel,
	ControlRow,
	ControlSection,
} from "@ui-kit/controls/ControlPanel";
import { ArrowIcon } from "@ui-kit/icons/ArrowIcon";
import { PlayIcon } from "@ui-kit/icons/PlayIcon";
import { ResetIcon } from "@ui-kit/icons/ResetIcon";
import { Slider } from "@ui-kit/controls/Slider";
import { drawLoaderSurface } from "@ui-kit/loading-wipe/loader-surface";
import {
	ShaderWipe,
	type ShaderWipeHandle,
} from "@ui-kit/loading-wipe/ShaderWipe";
import { Skeleton } from "@ui-kit/loading-wipe/Skeleton";
import {
	DEFAULT_WIPE_PARAMS,
	easeInOutCubic,
	WIPE_BOUNDS,
	WIPE_DIRECTIONS,
	wipeClipPath,
	wipeEdgeAt,
	type WipeParams,
} from "@ui-kit/loading-wipe/wipe-shader";

const COLOR_LABELS = ["Edge", "Mid 1", "Mid 2", "Tail"] as const;

/** Fraction of the sweep over which the loader's text clears. */
const TEXT_EXIT = 0.55;
/** How far it travels while doing so, in px. */
const TEXT_TRAVEL = 16;

type Stops = readonly [string, string, string, string];

/** Whole-ribbon presets, so landing on a combination that reads isn't four pickers of dialling. */
const PRESETS: readonly { name: string; colors: Stops }[] = [
	{ name: "Sky", colors: ["#6366f1", "#38bdf8", "#67e8f9", "#e0f2fe"] },
	{ name: "Ember", colors: ["#7c2d12", "#f54a00", "#fbbf24", "#fef3c7"] },
	{ name: "Dusk", colors: ["#312e81", "#7c3aed", "#c084fc", "#f3e8ff"] },
	{ name: "Moss", colors: ["#14532d", "#16a34a", "#86efac", "#ecfdf5"] },
	{ name: "Mono", colors: ["#111827", "#4b5563", "#9ca3af", "#e5e7eb"] },
];

/**
 * The sweep, the skeleton it uncovers, and the knobs behind both.
 *
 * The surface starts as plain DOM and the WebGPU device is created on the first
 * play or scrub — a device costs while it exists, and this sits in a feed.
 */
export function LoadingWipePlayground() {
	const [params, setParams] = useState<WipeParams>(DEFAULT_WIPE_PARAMS);
	const [scrub, setScrub] = useState(0);
	const [playing, setPlaying] = useState(false);
	// null until the first interaction resolves. false means no WebGPU, and the
	// clip-path fallback drives the surface instead of a canvas.
	const [ready, setReady] = useState<boolean | null>(null);

	const wipeRef = useRef<ShaderWipeHandle>(null);
	// The loading page as pixels: shown directly while idle, and uploaded as the
	// shader's texture once a device exists. One bitmap for both.
	const pageRef = useRef<HTMLCanvasElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const scrubInputRef = useRef<HTMLInputElement>(null);
	const rafRef = useRef(0);
	// Read every frame, so they must not be state.
	const paramsRef = useRef(params);
	paramsRef.current = params;
	const readyRef = useRef<boolean | null>(null);
	const progressRef = useRef(0);
	const preparingRef = useRef<Promise<boolean> | null>(null);

	useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

	/** Draws one progress value into whichever path is live. */
	const render = useCallback((progress: number) => {
		const current = paramsRef.current;
		progressRef.current = progress;

		// The text leaves under its own power — fading and rising — and clears well
		// before the surface does, rather than being carried by the sweep.
		if (textRef.current) {
			const out = Math.min(progress / TEXT_EXIT, 1);
			// Along the sweep, not simply upward. A unit vector rather than sweepAxis's,
			// which is normalised by |dx| + |dy| and so would drift less on the diagonals.
			const rad = (current.angleDeg * Math.PI) / 180;
			const dx = Math.cos(rad) * TEXT_TRAVEL * out;
			const dy = Math.sin(rad) * TEXT_TRAVEL * out;
			textRef.current.style.opacity = String(1 - out);
			textRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
		}

		if (readyRef.current) {
			wipeRef.current?.draw(current, progress);
			return;
		}
		// No shader: clip the page bitmap along the same axis. A hard edge —
		// clip-path has no feather, turbulence or grain — but the same geometry.
		if (pageRef.current) {
			pageRef.current.style.clipPath = wipeClipPath(
				wipeEdgeAt(progress, current),
				current.angleDeg,
			);
		}
	}, []);

	/** Stands the device up on first use, and gets a covering frame on screen
	 * before the DOM surface behind it stops covering. */
	const ensureReady = useCallback(async () => {
		if (readyRef.current !== null) return readyRef.current;
		preparingRef.current ??= (async () => {
			const ok = (await wipeRef.current?.prepare()) ?? false;
			if (ok) {
				// The device is new, so it has no page texture yet.
				if (pageRef.current) wipeRef.current?.setPage(pageRef.current);
				wipeRef.current?.draw(paramsRef.current, progressRef.current);
				// Two frames, not one: a submitted frame is not a presented one,
				// and the gap between them shows the skeleton straight through.
				await new Promise((resolve) => {
					requestAnimationFrame(() =>
						requestAnimationFrame(() => resolve(null)),
					);
				});
			}
			readyRef.current = ok;
			setReady(ok);
			return ok;
		})();
		return preparingRef.current;
	}, []);

	const play = useCallback(async () => {
		if (playing) return;
		cancelAnimationFrame(rafRef.current);
		setPlaying(true);
		await ensureReady();

		const duration = paramsRef.current.durationMs;
		const startedAt = performance.now();
		const tick = (now: number) => {
			const t = Math.min((now - startedAt) / duration, 1);
			const progress = easeInOutCubic(t);
			render(progress);
			// Straight to the DOM: a controlled input here would re-render every
			// slider row on every frame of the sweep.
			if (scrubInputRef.current) {
				scrubInputRef.current.value = String(progress);
				scrubInputRef.current.style.setProperty("--fill", `${progress * 100}%`);
			}
			if (t < 1) {
				rafRef.current = requestAnimationFrame(tick);
			} else {
				setScrub(1);
				setPlaying(false);
			}
		};
		rafRef.current = requestAnimationFrame(tick);
	}, [playing, ensureReady, render]);

	const reset = useCallback(() => {
		cancelAnimationFrame(rafRef.current);
		setPlaying(false);
		setScrub(0);
		if (pageRef.current) pageRef.current.style.clipPath = "";
		render(0);
	}, [render]);

	const onScrub = useCallback(
		(value: number) => {
			cancelAnimationFrame(rafRef.current);
			setPlaying(false);
			setScrub(value);
			// Draw immediately for the clip-path path, and again once a device
			// exists — the first scrub is what stands it up.
			render(value);
			void ensureReady().then(() => render(value));
		},
		[ensureReady, render],
	);

	const setNumber = useCallback(
		(key: keyof typeof WIPE_BOUNDS, value: number) => {
			setParams((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const setColor = useCallback((index: number, hex: string) => {
		setParams((prev) => {
			const colors = [...prev.colors] as [string, string, string, string];
			colors[index] = hex;
			return { ...prev, colors };
		});
	}, []);

	// A knob moved: redraw the held frame. `params` has to be in the deps —
	// `render` is stable, so depending on it alone runs this once on mount and
	// every knob silently stops working.
	useEffect(() => {
		if (readyRef.current !== null) render(progressRef.current);
	}, [render, params]);

	// Repaint the page bitmap and hand it to the shader. On mount, resize, and
	// bitmap-affecting knobs — never per frame.
	const paintPage = useCallback(() => {
		const page = pageRef.current;
		const stage = stageRef.current;
		if (!page || !stage) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const width = stage.clientWidth;
		const height = stage.clientHeight;
		if (width === 0 || height === 0) return;

		// Rounded the same way ShaderWipe rounds its own backing store: a single pixel
		// of disagreement takes the texture off a 1:1 mapping and the page samples soft.
		page.width = Math.round(width * dpr);
		page.height = Math.round(height * dpr);
		drawLoaderSurface(page, {
			surface: paramsRef.current.surface,
			grainSize: paramsRef.current.grainSize,
			grainAmount: paramsRef.current.grainAmount,
		});
		wipeRef.current?.setPage(page);
		if (readyRef.current) wipeRef.current?.draw(paramsRef.current, progressRef.current);
	}, []);

	// Painted after mount, not during render: the bitmap comes out of a 2D
	// canvas the server does not have.
	useEffect(() => {
		paintPage();
	}, [paintPage, params.surface, params.grainSize, params.grainAmount]);

	useEffect(() => {
		const stage = stageRef.current;
		if (!stage) return;
		const observer = new ResizeObserver(() => paintPage());
		observer.observe(stage);
		return () => observer.disconnect();
	}, [paintPage]);

	// Only from a standing start does the button offer Play; anywhere else,
	// including part-way through a scrub, the useful action is to go back.
	const atRest = scrub <= 0 && !playing;

	return (
		<div className="flex w-full flex-col items-stretch self-stretch md:h-[420px] md:flex-row">
			<div ref={stageRef} className="relative flex-1 overflow-hidden">
				<Skeleton />

				{/* Visible until a device exists; after that the canvas below paints the same
				    bitmap, so this steps aside. */}
				<canvas
					ref={pageRef}
					aria-hidden
					className="absolute inset-0 block size-full"
					style={{ display: ready === true ? "none" : undefined }}
				/>

				{/* Mounted from the start: an undrawn canvas is transparent and costs nothing,
				    and one inside a display:none wrapper would measure 0x0 on its first draw. */}
				<div className="absolute inset-0">
					<ShaderWipe ref={wipeRef} />
				</div>

				<div
					ref={textRef}
					className="pointer-events-none absolute inset-0 flex items-center justify-center"
				>
					<span className="text-[15px] leading-[1.625] font-[420] text-gray-500">
						Loader content
					</span>
				</div>

				<button
					type="button"
					onClick={atRest ? play : reset}
					disabled={playing}
					className="absolute right-3 bottom-3 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-[450] text-gray-600 shadow-skew ring-1 ring-gray-500/10 hover:bg-gray-50 disabled:cursor-default disabled:opacity-60"
				>
					<span className="shrink-0">
						{atRest ? <PlayIcon size={14} /> : <ResetIcon size={14} />}
					</span>
					<SlotText
						text={playing ? "Sweeping…" : atRest ? "Play wipe" : "Reset"}
						options={{
							direction: "down",
							bounce: 0.1,
							duration: 300,
							stagger: 14,
							skipUnchanged: true,
						}}
					/>
				</button>
			</div>

			<ControlPanel className="max-h-[320px] w-full shrink-0 overflow-y-auto rounded-none border-t border-gray-200 shadow-none ring-0 md:max-h-none md:w-2/5 md:border-t-0 md:border-l">
				<ControlSection label="Colour" />
				<div className="flex flex-wrap gap-1.5 px-3 py-2">
					{PRESETS.map((preset) => {
						const active =
							preset.colors.length === params.colors.length &&
							preset.colors.every((c, i) => c === params.colors[i]);
						return (
							<button
								key={preset.name}
								type="button"
								aria-pressed={active}
								onClick={() =>
									setParams((prev) => ({ ...prev, colors: preset.colors }))
								}
								className={
									active
										? "flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-900 py-1 pr-2.5 pl-1 text-[12px] font-[450] text-white shadow-skew"
										: "flex cursor-pointer items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1 text-[12px] font-[450] text-gray-500 shadow-skew ring-1 ring-gray-500/10 hover:bg-gray-50"
								}
							>
								<span
									className="h-4 w-6 shrink-0 rounded-full ring-1 ring-gray-900/10"
									style={{
										background: `linear-gradient(90deg, ${preset.colors.join(", ")})`,
									}}
								/>
								{preset.name}
							</button>
						);
					})}
				</div>
				<ControlRow label="Ribbon">
					<div className="grid w-full grid-cols-4 gap-1.5">
						{params.colors.map((hex, i) => (
							<input
								key={COLOR_LABELS[i]}
								type="color"
								value={hex}
								aria-label={COLOR_LABELS[i]}
								title={COLOR_LABELS[i]}
								onChange={(event) => setColor(i, event.target.value)}
								className="control-swatch"
							/>
						))}
					</div>
				</ControlRow>
				<ControlSection label="Sweep" />
				<div className="px-3 py-2">
					<div className="grid grid-cols-8 gap-1">
						{WIPE_DIRECTIONS.map((direction) => {
							const active =
								Math.round(params.angleDeg) === direction.angleDeg;
							return (
								<button
									key={direction.angleDeg}
									type="button"
									title={direction.name}
									aria-label={direction.name}
									aria-pressed={active}
									onClick={() => setNumber("angleDeg", direction.angleDeg)}
									className={
										active
											? "flex h-6 cursor-pointer items-center justify-center rounded-md bg-gray-900 text-white shadow-skew"
											: "flex h-6 cursor-pointer items-center justify-center rounded-md bg-white text-gray-500 shadow-skew ring-1 ring-gray-500/10 hover:bg-gray-50"
									}
								>
									{/* One glyph, turned: the icon is drawn pointing up, and the sweep angle is
									    measured from left-to-right. */}
									<ArrowIcon size={14} rotate={direction.angleDeg + 90} />
								</button>
							);
						})}
					</div>
				</div>
				<Slider
					label="Angle"
					value={params.angleDeg}
					{...WIPE_BOUNDS.angleDeg}
					unit="°"
					onChange={(v) => setNumber("angleDeg", v)}
				/>
				<Slider
					label="Duration"
					value={params.durationMs}
					{...WIPE_BOUNDS.durationMs}
					unit="ms"
					onChange={(v) => setNumber("durationMs", v)}
				/>
				<ControlRow label="Scrub" value={scrub.toFixed(2)}>
					<input
						ref={scrubInputRef}
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={scrub}
						aria-label="Scrub"
						onChange={(event) => onScrub(Number(event.target.value))}
						style={{ "--fill": `${scrub * 100}%` } as CSSProperties}
						className="control-slider w-full"
					/>
				</ControlRow>

				<ControlSection label="Ribbon" />
				<Slider
					label="Spread"
					value={params.band}
					{...WIPE_BOUNDS.band}
					onChange={(v) => setNumber("band", v)}
				/>
				<Slider
					label="Bleed"
					value={params.bleed}
					{...WIPE_BOUNDS.bleed}
					onChange={(v) => setNumber("bleed", v)}
				/>
				<Slider
					label="Feather"
					value={params.feather}
					{...WIPE_BOUNDS.feather}
					onChange={(v) => setNumber("feather", v)}
				/>
				<Slider
					label="Swirl"
					value={params.swirl}
					{...WIPE_BOUNDS.swirl}
					onChange={(v) => setNumber("swirl", v)}
				/>

				<ControlSection label="Edge noise" />
				<Slider
					label="Turbulence"
					value={params.turbulence}
					{...WIPE_BOUNDS.turbulence}
					onChange={(v) => setNumber("turbulence", v)}
				/>
				<Slider
					label="Scale"
					value={params.noiseScale}
					{...WIPE_BOUNDS.noiseScale}
					onChange={(v) => setNumber("noiseScale", v)}
				/>

				<ControlSection label="Grain" />
				<Slider
					label="Size"
					value={params.grainSize}
					{...WIPE_BOUNDS.grainSize}
					unit="px"
					onChange={(v) => setNumber("grainSize", v)}
				/>
				<Slider
					label="Intensity"
					value={params.grainAmount}
					{...WIPE_BOUNDS.grainAmount}
					onChange={(v) => setNumber("grainAmount", v)}
				/>

			</ControlPanel>
		</div>
	);
}
