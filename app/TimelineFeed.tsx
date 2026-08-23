"use client";

import { Fragment, type ReactNode } from "react";
import { ExperimentDivider } from "@ui-kit/Experiment";
import { useFilters } from "@ui-kit/filters/FilterContext";
import { PostCard } from "@ui-kit/post/PostCard";
import type { TimelineEntry } from "@/lib/timeline";
import { KIND_FILTER } from "@/lib/timeline-filters";

/**
 * Filtering happens here rather than on the server: the selection lives in a
 * query param, and narrowing a list the client already has is instant and keeps
 * the page static.
 */
export function TimelineFeed({
	entries,
	bodies,
}: {
	entries: TimelineEntry[];
	/** Server-rendered MDX for entries that show inline (notes). */
	bodies: Record<string, ReactNode>;
}) {
	const { selected } = useFilters();

	const visible =
		selected.size === 0
			? entries
			: entries.filter((entry) => selected.has(KIND_FILTER[entry.kind]));

	return (
		<>
			{visible.map((entry, index) => (
				<Fragment key={entry.slug}>
					<PostCard entry={entry} eager={index === 0}>
						{bodies[entry.slug]}
					</PostCard>
					{/* Dividers sit between posts, so the feed doesn't end on one. */}
					{index < visible.length - 1 && <ExperimentDivider inline />}
				</Fragment>
			))}
		</>
	);
}
