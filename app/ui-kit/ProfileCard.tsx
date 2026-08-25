"use client";

import {
	motion,
	type MotionValue,
	useMotionTemplate,
	useSpring,
	useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "./cn";

/**
 * The sidebar's identity card, carrying the tilt-and-sheen interaction from the
 * Tato site's team cards: the card leans away from the pointer while a band of
 * white sweeps across it in the opposite direction, so the light reads as
 * coming from a fixed source the card is turning under.
 */

/** Degrees of lean at the card's edge. */
const MAX_TILT = 10;

/**
 * How far the light travels across the card, in px. Every gradient layer is
 * grown by twice this so it still covers its box at full offset — otherwise
 * the sweep drags an empty edge in behind it.
 */
const OFFSET_FACTOR = 100;

const SPRING = { stiffness: 350, damping: 20 };

/**
 * How far the card drops on hover, in px. It sits at the very top of a sticky
 * sidebar, so leaning it toward the viewer pushes its top edge past the top of
 * the screen — this gives the lift somewhere to happen.
 */
const HOVER_SHIFT = 6;

/**
 * The seal, as a mask over a moving gradient rather than a filled shape — the
 * artwork is only ever a silhouette here, and the light behind it is what makes
 * it read as a glossy sticker instead of a flat grey stamp. Lives in public/ so
 * its ~22KB of path data stays out of the client bundle.
 */
const SEAL_MASK = 'url("/ai-seal.svg")';
const SEAL_SIZE = 97;

/** Counter-clockwise, so it sits like something pressed on slightly askew. */
const SEAL_ROTATION = -12;

/**
 * Bright and dimmed white in bands: a single soft gradient reads as fog, where
 * a run of highlights and falloffs reads as a curved plastic surface catching
 * light in more than one place. Twice the seal's size, so there's gradient left
 * to travel into as the highlight tracks the pointer.
 */
const SEAL_SHEEN =
	"linear-gradient(135deg, rgba(255,255,255,0.3) 0%, #fff 25%, rgba(255,255,255,0.35) 50%, #fff 75%, rgba(255,255,255,0.3) 100%)";

/** The whole card is the link, so the tilt has to live on the anchor itself. */
const MotionLink = motion.create(Link);

export function ProfileCard({ className }: { className?: string }) {
	const cardRef = useRef<HTMLAnchorElement>(null);
	// z rather than scale: the card is already in perspective, so lifting it
	// toward the viewer grows it and deepens the tilt in one move.
	const z = useSpring(0);
	const rotateX = useSpring(0, SPRING);
	const rotateY = useSpring(0, SPRING);
	const offsetX = useSpring(0, SPRING);
	const offsetY = useSpring(0, SPRING);
	const sheen = useSpring(0, SPRING);
	const shift = useSpring(0, SPRING);
	// Its own pair rather than the sweep's: those rest at 0, which is also one
	// end of their travel, and the seal's highlight is visible at rest so it has
	// to settle back to the middle instead.
	const sealX = useSpring(50, SPRING);
	const sealY = useSpring(50, SPRING);
	const sealHighlight = useMotionTemplate`${sealX}% ${sealY}%`;
	// Rides the sheen spring rather than keeping its own: the seal brightening
	// and the light crossing the card are one event, so they share one curve.
	const sealOpacity = useTransform(sheen, [0, 1], [0.5, 1]);

	const settle = () => {
		rotateX.set(0);
		rotateY.set(0);
		offsetX.set(0);
		offsetY.set(0);
		z.set(0);
		sheen.set(0);
		shift.set(0);
		sealX.set(50);
		sealY.set(50);
	};

	return (
		<MotionLink
			ref={cardRef}
			href="/timeline"
			style={{ transformPerspective: 500, z, rotateX, rotateY, y: shift }}
			onPointerMove={(event) => {
				// A finger has no hover, and a tap would otherwise leave the card
				// parked at whatever angle it was released at.
				if (event.pointerType !== "mouse" || !cardRef.current) return;

				const rect = cardRef.current.getBoundingClientRect();
				const xPercent = (event.clientX - rect.left) / rect.width;
				const yPercent = (event.clientY - rect.top) / rect.height;

				// Lean away from the pointer, and push the light the other way.
				rotateX.set(MAX_TILT * (0.5 - yPercent));
				rotateY.set(MAX_TILT * (xPercent - 0.5));
				offsetX.set((1 - xPercent) * OFFSET_FACTOR);
				offsetY.set((1 - yPercent) * OFFSET_FACTOR);

				// With the pointer, not against it: the seal is lit from where you
				// are, while the card's own sheen is a reflection thrown the other way.
				sealX.set(xPercent * 100);
				sealY.set(yPercent * 100);
			}}
			onPointerEnter={(event) => {
				if (event.pointerType !== "mouse") return;
				z.set(10);
				sheen.set(1);
				shift.set(HOVER_SHIFT);
			}}
			onPointerLeave={settle}
			onPointerCancel={settle}
			// Presses the card back under the cursor, then releases it.
			onPointerDown={(event) => {
				if (event.pointerType === "mouse") z.set(-10);
			}}
			onPointerUp={(event) => {
				if (event.pointerType === "mouse") z.set(10);
			}}
			className={cn(
				// bg-gray-100 spelled out rather than the `panel` class: that one is
				// unlayered CSS, so it outranks every Tailwind utility and the hover
				// radius below would never win against its rounded-sm.
				"bg-gray-100 p-4 flex flex-col gap-4 relative overflow-hidden will-change-transform",
				// Flat against the sidebar at rest — no shadow, no ring — and on hover
				// it rounds off and picks up the ring-plus-shadow every other raised
				// surface here wears. v4 gates hover: behind (hover: hover) already,
				// so this stays put on touch like the tilt does.
				//
				// The transparent ring at rest is what makes both fade rather than
				// snap: it declares the box-shadow composite, whose shadow slot then
				// sits at its 0 0 #0000 default with somewhere to interpolate to.
				// Don't pair it with a `shadow-transparent` — tailwind-merge reads
				// that as the same utility group as shadow-skew and drops one.
				"ring ring-transparent",
				"rounded-sm hover:rounded-xl hover:ring-gray-500/6 hover:shadow-skew",
				"transition-[border-radius,box-shadow] duration-300 ease-out",
				className,
			)}
		>
			{/* Over the copy, not under it — the band lightens the text as it passes,
			    which is what makes it read as a reflection on the card's surface
			    rather than something printed on it. pointer-events-none so it can't
			    take the click meant for the link underneath. */}
			<Sweep
				offsetX={offsetX}
				offsetY={offsetY}
				style={{ opacity: sheen }}
				className="z-20 from-white/0 via-white/75 to-white/0 from-20% via-35% to-50%"
			/>

			{/* Run off the corner rather than tucked inside it: a seal that clears
			    the edge on all sides reads as a sticker placed on the card, where one
			    the card crops reads as printed into it. The card's overflow-hidden
			    does the cropping, so the radius change on hover recrops it live. */}
			<motion.div
				aria-hidden
				style={{
					width: SEAL_SIZE,
					height: SEAL_SIZE,
					rotate: SEAL_ROTATION,
					maskImage: SEAL_MASK,
					WebkitMaskImage: SEAL_MASK,
					maskSize: "contain",
					WebkitMaskSize: "contain",
					maskRepeat: "no-repeat",
					WebkitMaskRepeat: "no-repeat",
					backgroundImage: SEAL_SHEEN,
					backgroundSize: "200% 200%",
					backgroundPosition: sealHighlight,
					opacity: sealOpacity,
				}}
				className="absolute -right-3 -bottom-3 z-0 pointer-events-none"
			/>

			<div className="relative z-10 flex items-start justify-between gap-4">
				<Portrait offsetX={offsetX} offsetY={offsetY} />
				<Coordinates />
			</div>

			<div className="relative z-10">
				<h1 className="font-[550] text-gray-800 w-full">PG Gonni</h1>
				<h2 className="font-[450] text-gray-500 w-full">Design Engineer</h2>
			</div>
		</MotionLink>
	);
}

/**
 * The two addresses, as coordinates: Forlì above Montréal. Rounded to four
 * decimals — roughly 11m, so it lands on the building without pointing at the
 * door — and set in mono so the two lines column up digit for digit.
 */
const PLACES = [
	{ place: "Forlì", lat: "44.2093° N", lon: "12.0673° E" },
	{ place: "Montréal", lat: "45.4905° N", lon: "73.5587° W" },
];

function Coordinates() {
	return (
		<div className="flex flex-col items-end gap-0.5 shrink-0 font-mono text-[9px] leading-[1.5] font-[350] text-gray-300">
			{PLACES.map(({ place, lat, lon }) => (
				// The place name is the label a screen reader reads; on screen the
				// numbers stand on their own, which is the whole point of them.
				<span key={place}>
					<span className="sr-only">{`${place}: `}</span>
					{lat}, {lon}
				</span>
			))}
		</div>
	);
}

/**
 * A band of light that slides with the pointer. Sized past its container on
 * both axes and centred, so it has somewhere to travel from and to.
 */
function Sweep({
	offsetX,
	offsetY,
	className,
	style,
	/** Multiplier on the box it fills, for layers that need more travel. */
	scale = 1,
}: {
	offsetX: MotionValue<number>;
	offsetY: MotionValue<number>;
	className?: string;
	style?: Record<string, unknown>;
	scale?: number | { x: number; y: number };
}) {
	const { x, y } = typeof scale === "number" ? { x: scale, y: scale } : scale;

	return (
		<motion.div
			style={{
				translateX: offsetX,
				translateY: offsetY,
				width: `calc(${x * 100}% + ${OFFSET_FACTOR * 2}px)`,
				height: `calc(${y * 100}% + ${OFFSET_FACTOR * 2}px)`,
				...style,
			}}
			transition={{ type: "spring", ...SPRING }}
			className={cn(
				"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-linear-to-br",
				className,
			)}
		/>
	);
}

/**
 * The portrait, sunk into the card rather than sitting on it: an inset ring and
 * inset shadow cut the opening, and the same light that sweeps the card sweeps
 * the recess behind the image — so the two move together and the photo reads as
 * something set into the surface.
 */
function Portrait({
	offsetX,
	offsetY,
}: {
	offsetX: MotionValue<number>;
	offsetY: MotionValue<number>;
}) {
	return (
		<div className="relative z-10 w-16 h-19 shrink-0 rounded-sm overflow-hidden ring ring-gray-500/10 ring-inset inset-shadow-xs">
			{/* Tighter and brighter than the card's own sweep: a 64px opening needs a
			    narrower band or the highlight never resolves into an edge. */}
			<Sweep
				offsetX={offsetX}
				offsetY={offsetY}
				scale={1.25}
				className="z-20 from-white/0 via-white/90 to-white/0 from-30% via-35% to-40%"
			/>
			{/* The colour in the recess, thrown from the top edge. Held at 25% so it
			    tints the shadow the photo sits in rather than competing with it. */}
			<motion.div
				style={{
					translateX: offsetX,
					translateY: offsetY,
					width: `calc(150% + ${OFFSET_FACTOR * 2}px)`,
					height: `calc(125% + ${OFFSET_FACTOR * 2}px)`,
				}}
				transition={{ type: "spring", ...SPRING }}
				className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-radial-[at_50%_0%] from-violet-500 via-yellow-500 to-sky-500 to-80% opacity-25 brightness-135"
			/>
			{/* A cutout, so the recess and its light show around the figure rather
			    than behind a photo's own background. Left unfiltered for the same
			    reason: knocking it back would let the gradient wash through the
			    face, and the contrast is already carried by the ground behind. */}
			<Image
				src="/avatar-cutout.webp"
				alt="PG Gonni"
				width={332}
				height={365}
				className="relative z-30 size-full object-cover"
			/>
		</div>
	);
}
