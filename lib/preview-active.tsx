"use client";

import { createContext, useContext } from "react";

/**
 * True while a preview is actually visible. `light` previews stay mounted when
 * scrolled past, so anything with an ambient loop (rAF, autoplay, ticker)
 * should read this and idle when it goes false instead of burning main thread
 * offscreen. Defaults to true so previews work outside the timeline.
 */
const PreviewActiveContext = createContext(true);

export const PreviewActiveProvider = PreviewActiveContext.Provider;

export function usePreviewActive() {
	return useContext(PreviewActiveContext);
}
