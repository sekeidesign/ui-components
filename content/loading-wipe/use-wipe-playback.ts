"use client";

import { drawLoaderSurface } from "@ui-kit/loading-wipe/loader-surface";
import type { ShaderWipeHandle } from "@ui-kit/loading-wipe/ShaderWipe";
import {
	easeInOutCubic,
	type WipeParams,
	wipeClipPath,
	wipeEdgeAt,
} from "@ui-kit/loading-wipe/wipe-shader";
import { useCallback, useEffect, useRef, useState } from "react";

/** Fraction of the sweep over which the loader's text clears. */
const TEXT_EXIT = 0.55;
/** How far it travels while doing so, in px. */
const TEXT_TRAVEL = 16;

/**
 * Drives the sweep: the WebGPU device's lifecycle, the animation frames, and
 * the clip-path fallback when there is no device.
 *
 * Everything the sweep touches per frame is a ref, not state — a controlled
 * value here would re-render the whole panel sixty times a second. The stage
 * and the controls only ever see the handles this returns.
 */
export function useWipePlayback(params: WipeParams) {
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
	useEffect(() => {
		paramsRef.current = params;
	}, [params]);
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
		if (readyRef.current)
			wipeRef.current?.draw(paramsRef.current, progressRef.current);
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

	return {
		stageRef,
		pageRef,
		textRef,
		wipeRef,
		scrubInputRef,
		ready,
		playing,
		scrub,
		play,
		reset,
		onScrub,
	};
}
