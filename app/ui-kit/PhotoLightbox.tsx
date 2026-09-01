"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";

const OPEN_MS = 420;
const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
/** Fraction of the viewport the expanded photo may occupy. */
const FIT = 0.9;

export interface LightboxRect {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface LightboxPhoto {
	src: string;
	alt: string;
	width: number;
	height: number;
}

function computeTarget(aspect: number): LightboxRect {
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const width = Math.min(vw * FIT, (vh * FIT) / aspect);
	const height = width * aspect;
	return { left: (vw - width) / 2, top: (vh - height) / 2, width, height };
}

export function PhotoLightbox({
	photo,
	start,
	getHome,
	onClosed,
}: {
	photo: LightboxPhoto;
	/** The thumbnail's geometry at click time. */
	start: LightboxRect;
	/** Re-measures the thumbnail at dismiss time. */
	getHome: () => LightboxRect | null;
	onClosed: () => void;
}) {
	const aspect = photo.height / photo.width;
	const target = useRef<LightboxRect | null>(null);
	if (target.current === null) target.current = computeTarget(aspect);
	const { left, top, width, height } = target.current;

	const reduceMotion = useRef(
		typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	).current;

	const toTransform = useCallback(
		(home: LightboxRect) =>
			`translate(${home.left - left}px, ${home.top - top}px) scale(${home.width / width}, ${home.height / height})`,
		[left, top, width, height],
	);

	const [entered, setEntered] = useState(reduceMotion);
	const [transform, setTransform] = useState(() =>
		reduceMotion ? "none" : toTransform(start),
	);
	const closing = useRef(false);

	// FLIP: first paint sits over the thumbnail, next frame eases to center.
	useLayoutEffect(() => {
		if (reduceMotion) return;
		let inner = 0;
		const outer = requestAnimationFrame(() => {
			inner = requestAnimationFrame(() => {
				setEntered(true);
				setTransform("translate(0px, 0px) scale(1, 1)");
			});
		});
		return () => {
			cancelAnimationFrame(outer);
			cancelAnimationFrame(inner);
		};
	}, [reduceMotion]);

	const dismiss = useCallback(() => {
		if (closing.current) return;
		closing.current = true;
		if (reduceMotion) {
			onClosed();
			return;
		}
		setEntered(false);
		setTransform(toTransform(getHome() ?? start));
		// transitionend is the primary signal; this is the safety net.
		window.setTimeout(onClosed, OPEN_MS + 80);
	}, [reduceMotion, onClosed, toTransform, getHome, start]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") dismiss();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [dismiss]);

	return createPortal(
		<div
			className="fixed inset-0 z-[999]"
			role="dialog"
			aria-modal="true"
			aria-label={photo.alt}
		>
			<div
				className={cn(
					"absolute inset-0 cursor-zoom-out bg-black/70 transition-opacity",
					entered ? "opacity-100" : "opacity-0",
				)}
				style={{ transitionDuration: `${OPEN_MS}ms` }}
				onClick={dismiss}
			/>
			<figure
				className="absolute cursor-zoom-out overflow-hidden rounded-sm shadow-2xl"
				style={{
					left,
					top,
					width,
					height,
					transform,
					transformOrigin: "top left",
					transition: reduceMotion
						? undefined
						: `transform ${OPEN_MS}ms ${EASE}`,
					willChange: "transform",
				}}
				onClick={dismiss}
				onTransitionEnd={(event) => {
					if (event.propertyName !== "transform") return;
					if (closing.current) onClosed();
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={photo.src}
					alt={photo.alt}
					className="block h-full w-full object-cover"
				/>
			</figure>
		</div>,
		document.body,
	);
}
