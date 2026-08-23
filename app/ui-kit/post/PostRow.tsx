"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent, PointerEventHandler, ReactNode } from "react";
import { cn } from "../cn";
import { PanelRow } from "../PanelRow";

/**
 * Makes the whole card a click target for its post.
 *
 * Deliberately NOT an <a> wrapping the card: the card contains the reaction
 * buttons, the copy-link button and the source link, and nesting interactive
 * elements inside an anchor is invalid and breaks them. Instead the title stays
 * a real link — that's the keyboard and screen-reader path — and this adds a
 * redundant click area around it, bowing out whenever the click belongs to a
 * control or to a text selection.
 */
export function PostRow({
	href,
	id,
	className,
	children,
	onPointerEnter,
	onPointerLeave,
}: {
	href?: string;
	id?: string;
	className?: string;
	children: ReactNode;
	onPointerEnter?: PointerEventHandler<HTMLDivElement>;
	onPointerLeave?: PointerEventHandler<HTMLDivElement>;
}) {
	const router = useRouter();

	if (!href) {
		return (
			<PanelRow
				id={id}
				className={className}
				onPointerEnter={onPointerEnter}
				onPointerLeave={onPointerLeave}
			>
				{children}
			</PanelRow>
		);
	}

	const onClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.defaultPrevented) return;

		// Any real control wins: the reaction and copy-link buttons, the title
		// link, the source link, the book cover.
		if (
			(event.target as HTMLElement).closest(
				"a, button, input, textarea, select, [role='button'], [data-no-card-link]",
			)
		) {
			return;
		}

		// Don't navigate out from under someone selecting the excerpt.
		if (window.getSelection()?.toString()) return;

		// Match what a real link does with a modifier held.
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
			window.open(href, "_blank");
			return;
		}

		router.push(href);
	};

	return (
		<PanelRow
			id={id}
			onClick={onClick}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			// The row sits on the column's gray-100, so a touch of gray-200 over it
			// reads as ~5 values darker. No important modifier needed now that the
			// row itself doesn't carry the unlayered `.panel` class.
			// The hover fill is suppressed while the pointer is inside an opted-out
			// surface (a live demo), so poking at a component doesn't look like
			// you're about to navigate. :has() does this in CSS — no pointer state
			// to track and no re-render.
			className={cn("post-card cursor-pointer rounded-2xl", className)}
		>
			{children}
		</PanelRow>
	);
}
