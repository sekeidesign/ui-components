"use client";

import { m } from "motion/react";
import type {
	MouseEventHandler,
	PointerEventHandler,
	ReactNode,
} from "react";
import { cn } from "./cn";

export function PanelRow({
	children,
	className,
	id,
	onClick,
	onPointerEnter,
	onPointerLeave,
}: {
	children: ReactNode;
	className?: string;
	/** Anchor target, so a post can be linked with /timeline#slug. */
	id?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	onPointerEnter?: PointerEventHandler<HTMLDivElement>;
	onPointerLeave?: PointerEventHandler<HTMLDivElement>;
}) {
	return (
		// The click is a redundant target for the title link inside the card,
		// which is the keyboard and screen-reader path — so this box carries no
		// semantics of its own and needs no key handler of its own.
		// react-doctor-disable-next-line click-events-have-key-events
		<m.div
			id={id}
			role={onClick ? "presentation" : undefined}
			onClick={onClick}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			className={cn("w-full scroll-mt-20", className)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
		>
			{children}
		</m.div>
	);
}
