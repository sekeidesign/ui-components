"use client";

import type { HighlightOptions } from "@highlighters/react";
import { useHighlight } from "@highlighters/react";
import { type ReactNode, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../use-prefers-reduced-motion";

/**
 * Runs a highlighter pen over every quotation in a write-up's body.
 *
 * A book review quotes its book constantly, and the quotes are the part worth
 * finding again on a second read. Marking them in the MDX would mean editing
 * every review and remembering to do it in the next one, so this matches them
 * in the rendered prose instead: @highlighters walks the text under this
 * element, finds the runs the pattern describes and draws over them. It paints
 * on top rather than wrapping anything, so selection, search and the reading
 * order are all untouched.
 */

/**
 * A quoted run, straight or curly. `[^"“”]` rather than a lazy `.` so a match
 * can't run from one quotation's close into the next one's open — the library
 * matches against the body's text with element boundaries flattened away, and
 * a greedy pattern would swallow whole paragraphs between two quotes.
 */
const QUOTATION = /["“][^"“”]+["”]/g;

/** Soft sage from the pen's `mild` set, well under half strength. */
const PEN: HighlightOptions = {
	color: { palette: "mild", swatch: "green" },
	opacity: 0.4,
	// Off-screen quotes draw as they're scrolled to, rather than all of them
	// against a page the reader hasn't reached yet.
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
