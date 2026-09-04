import { getTimeline, type TimelineEntry } from "@/lib/timeline";

/**
 * Whether a post gets the generated book share card. The page's metadata has
 * to leave `openGraph.images` unset for these — a config-set image wins over
 * the opengraph-image file and would suppress the generated card.
 */
export function bookCardEntry(slug: string): TimelineEntry | undefined {
	const entry = getTimeline().find((item) => item.slug === slug);
	if (!entry?.hasPage) return undefined;
	return entry.kind === "book" && entry.cover ? entry : undefined;
}
