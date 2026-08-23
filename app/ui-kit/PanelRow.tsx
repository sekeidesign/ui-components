"use client";

import { motion } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "./cn";

/**
 * One row inside the feed's continuous column. The column itself (in the root
 * layout) owns the panel background and the striped gutters, so a row is just
 * padding — that's what lets consecutive posts read as one surface separated by
 * dividers rather than as separate blocks.
 */
export function PanelRow({
	children,
	className,
	id,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	/** Anchor target, so a post can be linked with /timeline#slug. */
	id?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}) {
	return (
		<motion.div
			id={id}
			onClick={onClick}
			className={cn("w-full scroll-mt-20", className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
}
