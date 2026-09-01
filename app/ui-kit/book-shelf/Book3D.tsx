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

// 90 = spine squared to the viewer (shelved). Negative so the open pose isn't
// perfectly flat and the fore-edge catches a sliver of light.
const SPINE_ANGLE = 90;
const COVER_ANGLE = -16;
/**
 * Extra swing for the cover alone when `openMore` is set. Nested on the cover
 * face rather than the assembly, which would turn spine and page-edge too.
 */
const COVER_EXTRA_ANGLE = -10;

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
	/** Swings the cover further open. The spine and page-edge stay put, so it
	 * reads as the cover lifting rather than the book turning. */
	openMore?: boolean;
	/** How far to slide over (px) to clear room for another book's popped
	 * cover — animated with the same spring as the cover/spine rotation so
	 * both moves read as one motion. */
	shiftX?: number;
	onClick?: () => void;
	className?: string;
	style?: CSSProperties;
}

// Three faces hinged together in 3D (`preserve-3d`) rather than a 2D skew.
// Each book reserves only its spine's thickness in layout; the parent shifts
// trailing siblings by BOOK_OPEN_SHIFT to clear the open cover.
export function Book3D({
	book,
	open,
	openMore = false,
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
			initial={false}
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
				initial={false}
				animate={{
					rotateY: open ? COVER_ANGLE : SPINE_ANGLE,
					x: open ? -DEPTH : 0,
					y: open ? 0 : 12,
				}}
				transition={SPRING}
			>
				{/* cover — hinged at the spine edge on its own, so it can lift
				    without the spine and page-edge coming along */}
				<motion.div
					className="absolute inset-0"
					style={{
						transformOrigin: "0% 50%",
						transformStyle: "preserve-3d",
					}}
					initial={false}
					animate={{ rotateY: openMore ? COVER_EXTRA_ANGLE : 0 }}
					transition={SPRING}
				>
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
				</motion.div>

				{/* spine */}
				<div
					className="absolute inset-y-0 left-0 flex flex-col rounded-[2px] items-center justify-between overflow-hidden py-3 gap-2"
					style={{
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

// How far an open cover overshoots its spine-width slot — the amount trailing
// siblings shift right by.
const OPEN_SHIFT = WIDTH - DEPTH;

export {
	WIDTH as BOOK_WIDTH,
	HEIGHT as BOOK_HEIGHT,
	OPEN_SHIFT as BOOK_OPEN_SHIFT,
};
