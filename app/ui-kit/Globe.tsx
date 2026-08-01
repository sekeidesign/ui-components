"use client";

import createGlobe from "cobe";
import { animate } from "motion";
import { useEffect, useRef, useState } from "react";

interface GlobeProps {
	location?: [number, number];
	className?: string;
}

const MONTREAL: [number, number] = [45.5019, -73.5674];

// Apple Maps-style light blue, as an RGB 0-1 triple for cobe's markerColor.
const MARKER_COLOR: [number, number, number] = [0.31, 0.616, 1];

// Aim the camera southeast of the target instead of dead-on, so it sits
// off-pole with real curvature/foreshortening around it (like an actual
// globe) rather than flat at the front-facing point.
const CAMERA_OFFSET = { lat: -22, long: 25 };

function locationToAngles(lat: number, long: number): [number, number] {
	return [
		Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
		(lat * Math.PI) / 180,
	];
}

// Shortest angular path between two phi values, so animating between two
// locations doesn't spin the long way round when they straddle the ±180°
// meridian.
function shortestDelta(from: number, to: number) {
	const raw = (to - from) % (Math.PI * 2);
	return ((raw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

function anglesFor(location: [number, number]) {
	return locationToAngles(
		location[0] + CAMERA_OFFSET.lat,
		location[1] + CAMERA_OFFSET.long,
	);
}

export const Globe = ({ location = MONTREAL, className }: GlobeProps) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
	const angleRef = useRef({ phi: 0, theta: 0 });
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setContainerSize({ width, height });
		});
		observer.observe(wrapper);

		return () => observer.disconnect();
	}, []);

	// Canvas is 2x the panel's own width/height, independently, so its center
	// (and therefore the sphere's center) lands exactly on the panel's
	// bottom-right corner regardless of the panel's aspect ratio. Using a
	// single square size here (e.g. off the larger dimension) breaks that
	// anchoring for any panel that isn't square.
	const width = containerSize.width * 2;
	const height = containerSize.height * 2;

	// Create the WebGL globe once per size change. Location changes animate
	// the existing instance instead of recreating it (see below) —
	// recreating on every change would just snap instead of rotate.
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || !width || !height) return;

		const [phi, theta] = anglesFor(location);
		angleRef.current = { phi, theta };

		// Sphere radius is 0.4 * height * scale. This reproduces the exact
		// radius the previous square-canvas (1.5x, scale 1) version had,
		// now that width/height are independent for correct corner-anchoring.
		const scale = (0.6 * Math.max(width, height)) / (0.8 * height);

		const globe = createGlobe(canvas, {
			devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
			width,
			height,
			phi,
			theta,
			dark: 0,
			diffuse: 1.2,
			mapSamples: 32000,
			mapBrightness: 6,
			baseColor: [1, 1, 1],
			markerColor: MARKER_COLOR,
			glowColor: [1, 1, 1],
			// Controls the sphere's apparent size independently of canvas
			// size/position — tune this instead of the canvas dimensions.
			scale,
			markers: [{ location, size: 0.045 }],
		});
		globeRef.current = globe;

		// cobe renders once, synchronously, before the base map texture
		// (loaded async via an internal Image) has finished decoding, and
		// never redraws on its own afterward. Force a few follow-up frames
		// so the map actually appears, then let it sit fully static.
		let frame = 0;
		let raf = requestAnimationFrame(function settle() {
			globe.update({});
			frame += 1;
			if (frame < 30) raf = requestAnimationFrame(settle);
		});

		return () => {
			cancelAnimationFrame(raf);
			globe.destroy();
			globeRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width, height]);

	// Rotate to the new location whenever it changes, instead of snapping.
	useEffect(() => {
		const globe = globeRef.current;
		if (!globe || !width || !height) return;

		const [targetPhi, targetTheta] = anglesFor(location);
		const { phi: fromPhi, theta: fromTheta } = angleRef.current;
		const deltaPhi = shortestDelta(fromPhi, targetPhi);
		const deltaTheta = targetTheta - fromTheta;

		const controls = animate(0, 1, {
			type: "spring",
			bounce: 0.15,
			duration: 0.9,
			onUpdate: (t) => {
				const phi = fromPhi + deltaPhi * t;
				const theta = fromTheta + deltaTheta * t;
				angleRef.current = { phi, theta };
				globe.update({ phi, theta, markers: [{ location, size: 0.045 }] });
			},
		});

		return () => controls.stop();
	}, [location, width, height]);

	return (
		<div ref={wrapperRef} className={className}>
			<canvas
				ref={canvasRef}
				className="absolute -top-10 -left-16"
				style={{ width, height }}
			/>
		</div>
	);
};

export type { GlobeProps };
