"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "../cn";
import type { Book } from "./types";

const WIDTH = 132;
const HEIGHT = 188;
const DEPTH = 26;
const GUTTER = 6;

// 90 = spine squared to the viewer (shelved). Past 0 into negative territory
// so the open pose isn't perfectly flat — the fore-edge (pages) catches a
// sliver of light, matching how a pulled book actually sits.
const SPINE_ANGLE = 90;
const COVER_ANGLE = -16;

const SPRING = {
	type: "spring",
	duration: 0.5,
	bounce: 0.2,
} as const;

interface Book3DProps {
	book: Book;
	/** Whether this is the single active book (cover-out). Only one book in
	 * a shelf should be open at a time, selected by click, not hover. */
	open: boolean;
	/** How far to slide over (px) to clear room for another book's popped
	 * cover — animated with the same spring as the cover/spine rotation so
	 * both moves read as one motion. */
	shiftX?: number;
	onClick?: () => void;
	className?: string;
	style?: CSSProperties;
}

// A real box, not a flattened card: cover, spine, and page-edge are three
// separate faces hinged together in 3D space (`preserve-3d`), so rotating
// the whole assembly around the spine's edge swings the cover into view
// the way an actual book would — rather than faking depth with a 2D skew.
//
// Every book only reserves its spine's thickness in layout — the parent
// shifts the trailing siblings over (BOOK_OPEN_SHIFT) to clear room for the
// active book's popped cover instead of letting it overlap them.
export function Book3D({
	book,
	open,
	shiftX = 0,
	onClick,
	className,
	style,
}: Book3DProps) {
	return (
		<motion.button
			type="button"
			aria-pressed={open}
			aria-label={`${book.title} by ${book.author}`}
			onClick={onClick}
			className={cn(
				"relative shrink-0 appearance-none border-0 bg-transparent p-0 text-left",
				className,
			)}
			style={{
				width: DEPTH + GUTTER,
				height: HEIGHT,
				perspective: 900,
				zIndex: open ? 20 : 1,
				...style,
			}}
			animate={{ x: shiftX }}
			transition={SPRING}
		>
			<motion.div
				className="absolute top-0 left-0 cursor-pointer"
				style={{
					width: WIDTH,
					height: HEIGHT,
					transformStyle: "preserve-3d",
					transformOrigin: "0% 50%",
				}}
				whileHover={{
					y: 0,
				}}
				animate={{
					rotateY: open ? COVER_ANGLE : SPINE_ANGLE,
					x: open ? -DEPTH : 0,
					y: open ? 0 : 12,
				}}
				transition={SPRING}
			>
				{/* cover */}
				<div
					className="absolute inset-0 overflow-hidden rounded-[2px]"
					style={{
						boxShadow:
							"1px 2px 6px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.35)",
					}}
				>
					<Image
						src={book.cover}
						alt={book.coverAlt ?? book.title}
						fill
						sizes="110px"
						className="object-cover"
					/>
					<span className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/15" />
				</div>

				{/* spine */}
				<div
					className="absolute inset-y-0 left-0 flex flex-col rounded-[2px] items-center justify-between overflow-hidden py-3 gap-2"
					style={{
						// left: WIDTH,
						width: DEPTH,
						transformOrigin: "0% 50%",
						transform: "rotateY(90deg)",
						backgroundColor: book.spineColor,
						boxShadow:
							"inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(0,0,0,0.3)",
					}}
				>
					<span
						className="text-[9px] font-[550] tracking-wide text-white/90 whitespace-nowrap"
						style={{ writingMode: "vertical-rl", transform: "rotateY(180deg)" }}
					>
						{book.title}
					</span>
				</div>

				{/* pages (fore-edge) */}
				<div
					className="absolute inset-y-0"
					style={{
						left: WIDTH,
						width: DEPTH,
						transformOrigin: "0% 50%",
						transform: "rotateY(90deg)",
						background: "linear-gradient(to bottom, #fff, #f1efe8 50%, #fff)",
						boxShadow: "inset -1px 0 1px rgba(0,0,0,0.1)",
					}}
				/>
			</motion.div>
		</motion.button>
	);
}

// How far a shelved book's cover overshoots its reserved (spine-width) slot
// when open — the amount trailing siblings need to shift right by so the
// popped cover doesn't overlap them.
const OPEN_SHIFT = WIDTH - DEPTH;

export {
	WIDTH as BOOK_WIDTH,
	HEIGHT as BOOK_HEIGHT,
	OPEN_SHIFT as BOOK_OPEN_SHIFT,
};
