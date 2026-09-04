"use client";

import type { HighlightOptions } from "@highlighters/react";
import { useHighlight } from "@highlighters/react";
import { type ReactNode, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../use-prefers-reduced-motion";

const QUOTATION = /["“][^"“”]+["”]/g;

const PEN: HighlightOptions = {
	color: { palette: "mild", swatch: "green" },
	opacity: 0.8,
	tip: {type: "chisel", angle: 1, angleJitter: 6},
	edge: {waviness: 1, frequency: 32},
	ink: {streakiness: 1, startEndBuildup: 1, flow: 1},
	animation: { trigger: "in-view", threshold: 0.35 },
};

const PEN_STILL: HighlightOptions = { ...PEN, animation: { draw: false } };

export function QuotedProse({ children }: { children: ReactNode }) {
	// State, not a ref: the hook reads the target in a layout effect, and a ref
	// set during render is still null by then.
	const [root, setRoot] = useState<HTMLElement | null>(null);
	const reducedMotion = usePrefersReducedMotion();

	// The hook keys its effect on target identity, so a fresh object each render
	// would tear the marks down and redraw them.
	const target = useMemo(() => (root ? { text: QUOTATION, root } : null), [root]);

	useHighlight(target, reducedMotion ? PEN_STILL : PEN);

	return <div ref={setRoot}>{children}</div>;
}
