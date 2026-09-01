"use client";

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../cn";
import { usePrefersReducedMotion } from "../use-prefers-reduced-motion";
import type { LifelinePhoto } from "./types";

// Read at module scope: `document` is unavailable while React renders on the
// server, and this component is only ever mounted from a press.
const portalTarget = typeof document === "undefined" ? null : document.body;

const OPEN_MS = 520;
/** Gentle start, soft landing — quint front-loaded the travel and read as a jump. */
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Fraction of the viewport the expanded media may occupy. */
const FIT = 0.85;

interface Target {
	left: number;
	top: number;
	width: number;
	height: number;
}

/**
 * The card's geometry at handoff: center from the bounding box (rotation about
 * center preserves it), size untransformed — a tilted card's axis-aligned hull
 * is larger than the card and lands the clone off.
 */
export interface LifelineLightboxStart {
	cx: number;
	cy: number;
	w: number;
	h: number;
	/** Playback position of the card's video, for a seamless swap. */
	mediaTime?: number;
}

/**
 * The clone's media. Videos mount paused, pre-seeked to the card's position,
 * and only play once the open transition settles.
 */
function LightboxMedia({
	photo,
	playing,
	mediaTime,
}: {
	photo: LifelinePhoto;
	playing: boolean;
	mediaTime?: number;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const seeded = useRef(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (playing) {
			// Seek only now, stationary — a seek during the transition
			// decodes a new frame mid-flight and visibly swaps the image.
			if (!seeded.current) {
				seeded.current = true;
				if (mediaTime !== undefined) video.currentTime = mediaTime;
			}
			video.play().catch(() => {
				// Autoplay rejection just leaves the poster frame showing.
			});
		} else {
			video.pause();
		}
	}, [playing, mediaTime]);

	if (!photo.video) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img // react-doctor-disable-line nextjs-no-img-element -- arbitrary media, with no intrinsic size for next/image to work from
				src={photo.src}
				alt={photo.alt}
				className="block h-full w-full object-cover"
			/>
		);
	}

	return (
		<video
			ref={videoRef}
			src={photo.video}
			poster={photo.src}
			muted
			loop
			playsInline
			preload="auto"
			aria-label={photo.alt}
			className="block h-full w-full object-cover"
		/>
	);
}

function computeTarget(start: LifelineLightboxStart): Target {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const aspect = start.h / start.w;
	const width = Math.min(vw * FIT, (vh * FIT) / aspect);
	const height = width * aspect;
	return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
}

/**
 * Expands a card's media to the center of the screen and back — a FLIP
 * animation on a fixed clone portaled to <body>, since the track is transformed
 * and fixed positioning inside it would break. The original stays hidden in
 * layout and is re-measured on dismiss.
 */
export function LifelineLightbox({
	photo,
	rotate,
	start,
	getHome,
	onClosed,
}: {
	photo: LifelinePhoto;
	/** The card's resting tilt — animated away as the media centers. */
	rotate: number;
	/** The card's geometry at click time. */
	start: LifelineLightboxStart;
	/** Re-measures the card at dismiss time. */
	getHome: () => LifelineLightboxStart | null;
	onClosed: () => void;
}) {
	// Measured once, at mount: the FLIP's destination must not move under it.
	const [{ left, top, width, height }] = useState(() => computeTarget(start));

	const figureRef = useRef<HTMLElement>(null);

	const reduceMotion = usePrefersReducedMotion();

	// Center-anchored FLIP: rotation and scale about the center match how the card
	// is transformed, so the first frame lands on it exactly.
	const toTransform = useCallback(
		(home: LifelineLightboxStart) =>
			`translate(${home.cx - (left + width / 2)}px, ${
				home.cy - (top + height / 2)
			}px) scale(${home.w / width}) rotate(${rotate}deg)`,
		[left, top, width, height, rotate],
	);

	const [entered, setEntered] = useState(reduceMotion);
	const [transform, setTransform] = useState(() =>
		reduceMotion ? "none" : toTransform(start),
	);
	const closing = useRef(false);
	// Playback waits for the open transition: a playing video decodes frames while
	// the transform animates and drops frames on mobile.
	const [settled, setSettled] = useState(reduceMotion);

	// Safety net if transitionend never fires for the open.
	useEffect(() => {
		if (reduceMotion) return;
		const timeout = window.setTimeout(() => {
			if (!closing.current) setSettled(true);
		}, OPEN_MS + 80);
		return () => window.clearTimeout(timeout);
	}, [reduceMotion]);

	// FLIP: first paint sits over the card, next frame eases to center.
	useLayoutEffect(() => {
		if (reduceMotion) return;
		let inner = 0;
		const outer = requestAnimationFrame(() => {
			inner = requestAnimationFrame(() => {
				setEntered(true);
				setTransform("translate(0px, 0px) scale(1) rotate(0deg)");
			});
		});
		return () => {
			cancelAnimationFrame(outer);
			cancelAnimationFrame(inner);
		};
	}, [reduceMotion]);

	// No gesture may pan while the lightbox is up — iOS rubber-bands the body
	// behind a fixed overlay and can leave the page stuck offset. React's root
	// touch listeners are passive, so this needs a native non-passive one.
	const rootRef = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;
		const block = (event: TouchEvent) => event.preventDefault();
		root.addEventListener("touchmove", block, { passive: false });
		return () => root.removeEventListener("touchmove", block);
	}, []);

	// The press that opens the card dispatches one more click right after
	// pointerup, which would dismiss the clone. Swallow exactly that one.
	useEffect(() => {
		const swallow = (event: MouseEvent) => {
			event.stopPropagation();
			event.preventDefault();
		};
		window.addEventListener("click", swallow, { capture: true, once: true });
		const timeout = window.setTimeout(() => {
			window.removeEventListener("click", swallow, { capture: true });
		}, 500);
		return () => {
			window.clearTimeout(timeout);
			window.removeEventListener("click", swallow, { capture: true });
		};
	}, []);

	const dismiss = useCallback(() => {
		if (closing.current) return;
		closing.current = true;
		if (reduceMotion) {
			onClosed();
			return;
		}
		setSettled(false); // freeze the video so the return flight is cheap
		setEntered(false);
		setTransform(toTransform(getHome() ?? start));
		// transitionend is the primary signal; this is the safety net.
		window.setTimeout(onClosed, OPEN_MS + 120);
	}, [reduceMotion, onClosed, toTransform, getHome, start]);

	// A native modal dialog, for the focus trap and Escape a role="dialog" div
	// doesn't get. Opened in a layout effect so the FLIP's first frame paints
	// with it already in the top layer.
	useLayoutEffect(() => {
		rootRef.current?.showModal();
	}, []);

	if (!portalTarget) return null;

	return createPortal(
		<dialog
			ref={rootRef}
			className="fixed inset-0 z-[999] h-auto w-auto max-h-none max-w-none touch-none overflow-hidden overscroll-contain bg-transparent backdrop:bg-transparent"
			aria-label={photo.alt}
			// React events bubble the component tree even from a portal — without this a
			// backdrop press would reach the card's drag handlers and the track's scrubber.
			onPointerDown={(event) => event.stopPropagation()}
			onPointerMove={(event) => event.stopPropagation()}
			onPointerUp={(event) => event.stopPropagation()}
			onClick={(event) => event.stopPropagation()}
			// Escape runs the dismiss flight rather than closing outright.
			onCancel={(event) => {
				event.preventDefault();
				dismiss();
			}}
		>
			<button
				type="button"
				aria-label="Close"
				className={cn(
					"absolute inset-0 cursor-zoom-out bg-black/70 transition-opacity outline-hidden",
					entered ? "opacity-100" : "opacity-0",
				)}
				// Synced to the media's travel — a faster fade left the clone
				// flying over an undimmed page at the end of the dismiss.
				style={{ transitionDuration: `${OPEN_MS}ms` }}
				onClick={dismiss}
			/>
			<figure
				ref={figureRef}
				className="absolute overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10"
				style={{
					left,
					top,
					width,
					height,
					transform,
					transformOrigin: "center",
					transition: reduceMotion
						? undefined
						: `transform ${OPEN_MS}ms ${EASE}`,
					// Promoted for the flight only — mobile otherwise re-rasterizes the
					// shadowed, corner-clipped media mid-scale — and released once it
					// settles, so an open lightbox isn't holding a layer for nothing.
					willChange: settled ? undefined : "transform",
				}}
				onTransitionEnd={(event) => {
					if (event.propertyName !== "transform") return;
					if (closing.current) onClosed();
					else setSettled(true);
				}}
			>
				<button
					type="button"
					aria-label="Close"
					onClick={dismiss}
					className="block h-full w-full cursor-zoom-out"
				>
					<LightboxMedia
						photo={photo}
						playing={settled}
						mediaTime={start.mediaTime}
					/>
				</button>
			</figure>
		</dialog>,
		portalTarget,
	);
}
