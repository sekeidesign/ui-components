"use client";

import { Fragment, type ReactNode, useMemo, useState } from "react";
import { ExperimentDivider } from "@ui-kit/Experiment";
import { SocialProvider } from "@ui-kit/social/SocialProvider";
import type { EntryKind, TimelineEntry } from "@/lib/timeline";
import { type Filter, TimelineFilterBar } from "./TimelineFilterBar";
import { TimelineItem } from "./TimelineItem";

interface TimelineFeedProps {
	entries: TimelineEntry[];
	/** Server-rendered MDX bodies for entries that show inline (notes). */
	bodies: Record<string, ReactNode>;
}

export function TimelineFeed({ entries, bodies }: TimelineFeedProps) {
	const [filter, setFilter] = useState<Filter>("all");

	const counts = useMemo(() => {
		const acc: Partial<Record<EntryKind, number>> = {};
		for (const entry of entries) {
			acc[entry.kind] = (acc[entry.kind] ?? 0) + 1;
		}
		return acc;
	}, [entries]);

	const visible =
		filter === "all" ? entries : entries.filter((e) => e.kind === filter);

	const slugs = useMemo(() => entries.map((e) => e.slug), [entries]);

	return (
		<SocialProvider slugs={slugs}>
			<TimelineFilterBar
				counts={counts}
				selected={filter}
				onSelect={setFilter}
			/>
			{visible.map((entry, index) => (
				<Fragment key={entry.slug}>
					{/* Eager applies to whatever is first in the current view, so the
					    top card never shows an empty preview box. */}
					<TimelineItem entry={entry} eager={index === 0}>
						{bodies[entry.slug]}
					</TimelineItem>
					<ExperimentDivider />
				</Fragment>
			))}
		</SocialProvider>
	);
}
