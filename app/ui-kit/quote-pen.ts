import type { HighlightOptions } from "@highlighters/react";

export const QUOTATION = /["“][^"“”]+["”]/g;

export const PEN: HighlightOptions = {
	color: { palette: "mild", swatch: "green" },
	opacity: 0.8,
	tip: { type: "chisel", angle: 1, angleJitter: 6 },
	edge: { waviness: 1, frequency: 32 },
	ink: { streakiness: 1, startEndBuildup: 1, flow: 1 },
	animation: { trigger: "in-view", threshold: 0.35 },
};

export const PEN_STILL: HighlightOptions = {
	...PEN,
	animation: { draw: false },
};
