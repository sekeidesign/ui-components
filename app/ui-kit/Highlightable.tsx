"use client";

import type { ReactNode } from "react";
import { cn } from "./cn";
import { useHoverGroup } from "./HoverContext";

interface HighlightableProps {
	id: string;
	children: ReactNode;
	className?: string;
	activeClassName?: string;
	siblingClassName?: string;
}

export function Highlightable({
	id,
	children,
	className,
	activeClassName = "text-gray-800",
	siblingClassName = "opacity-15",
}: HighlightableProps) {
	const { isActive, isSiblingActive, onMouseEnter, onMouseLeave } =
		useHoverGroup(id);

	return (
		<span
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={cn(
				"transition-[color,opacity] duration-150",
				className,
				isActive && activeClassName,
				isSiblingActive && siblingClassName,
			)}
		>
			{children}
		</span>
	);
}
