"use client";

import type { HighlightOptions } from "@highlighters/react";
import { useHighlight } from "@highlighters/react";
import { type ReactNode, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../use-prefers-reduced-motion";

const QUOTATION = /["“][^"“”]+["”]/g;

/** Soft sage from the pen's `mild` set, well under half strength. */
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
	// Callback ref into state, not useRef: the hook reads the target during its
	// layout effect, and a ref object set during render is still null then.
	const [root, setRoot] = useState<HTMLElement | null>(null);
	const reducedMotion = usePrefersReducedMotion();

	// The hook keys its effect on target identity, so a fresh object each render
	// would tear the marks down and redraw them every time.
	const target = useMemo(() => (root ? { text: QUOTATION, root } : null), [root]);

	useHighlight(target, reducedMotion ? PEN_STILL : PEN);

	return <div ref={setRoot}>{children}</div>;
}
