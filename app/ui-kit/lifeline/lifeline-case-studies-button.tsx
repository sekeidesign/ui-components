"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { cn } from "../cn";
import type { LifelinePhoto } from "./types";

/** How long each photo holds before crossfading to the next, while hovered. */
const CYCLE_MS = 400;

/**
 * A pill with a thumbnail and an "X case studies" label; hovering cycles the
 * rest with a crossfade. Renders three ways:
 * - `as="link"` — its own anchor.
 * - `as="static"` — a plain chip, when an ancestor is already the link
 *   (nesting anchors is invalid HTML).
 * - no `href` — disabled, "Coming soon".
 */
export function LifelineCaseStudiesButton({
	photos,
	href,
	as = "link",
	className,
}: {
	photos: LifelinePhoto[];
	href?: string;
	as?: "link" | "static";
	className?: string;
}) {
	const [hovered, setHovered] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!hovered) {
			setIndex(0);
			return;
		}
		if (photos.length < 2) return;
		const id = window.setInterval(() => {
			setIndex((current) => (current + 1) % photos.length);
		}, CYCLE_MS);
		return () => window.clearInterval(id);
	}, [hovered, photos.length]);

	const count = photos.length;
	const active = photos[index] ?? photos[0];
	const label = href
		? `${count} case ${count === 1 ? "study" : "studies"}`
		: "Coming soon...";

	const chipClassName = cn(
		"inline-flex items-center gap-2 h-8 group rounded-full ring ring-gray-400/10 py-1 pl-1 pr-3 text-xs font-medium transition-shadow duration-150",
		href
			? "bg-white text-zinc-600 shadow-sm hover:shadow-md"
			: "cursor-not-allowed bg-gray-500/10",
		className,
	);

	const content = (
		<>
			<span
				className="relative group-hover:scale-120 transition-transform duration-200 h-7 w-11"
				aria-hidden="true"
			>
				<AnimatePresence>
					<m.img
						key={`${active.src}-${index}`}
						src={active.src}
						alt=""
						initial={{ opacity: 0, scale: 0.95, y: 8, filter: "blur(3px)" }}
						animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.95, y: -8, filter: "blur(3px)" }}
						transition={{ duration: 0.25, type: "spring", bounce: 0.2 }}
						className="absolute inset-0 object-cover block h-7 w-11 shrink-0 -rotate-5 overflow-hidden rounded-sm ring ring-gray-400/10 shadow-md"
					/>
				</AnimatePresence>
			</span>
			<span>{label}</span>
		</>
	);

	const hoverHandlers = {
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
	};

	if (href && as === "link") {
		return (
			<Link href={href} className={chipClassName} {...hoverHandlers}>
				{content}
			</Link>
		);
	}

	return (
		<span className={chipClassName} aria-disabled={!href} {...hoverHandlers}>
			{content}
		</span>
	);
}
