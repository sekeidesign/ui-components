"use client";

import { cn } from "./cn";
import { useFilters } from "./filters/FilterContext";
import { KIND_META } from "./post/Post";
import type { EntryKind } from "@/lib/timeline";
import {
	FILTER_KINDS,
	FILTER_LABELS,
	type FilterSlug,
} from "@/lib/timeline-filters";

// Both states share size, radius and padding; only fill, border and text
// colour change. Icons stay gray-400 in both, per the design.
const TAB_BASE =
	"flex items-center gap-1 h-[26px] rounded-full text-[14px] leading-[1.43] font-[500] whitespace-nowrap cursor-pointer";
const TAB_ON = "bg-white ring-1 ring-gray-500/10 shadow-skew text-gray-900/75";
const TAB_OFF =
	"bg-gray-500/5 outline outline-1 outline-gray-500/10 text-gray-500/75 hover:bg-gray-500/15 hover:text-gray-700";

/** Trails the label, so every tab reads label-then-tally. */
function Count({ value }: { value: number }) {
	return <span className="text-gray-400 tabular-nums">{value}</span>;
}

export function TimelineTabs({
	available,
	counts,
}: {
	available: FilterSlug[];
	counts: Partial<Record<EntryKind, number>>;
}) {
	const { selected, toggle, clear } = useFilters();
	const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
	const showingAll = selected.size === 0;

	return (
		// Wraps rather than scrolls: the sidebar is narrower than the feed was.
		<div className="flex flex-wrap items-center gap-1.5">
			<button
				type="button"
				aria-pressed={showingAll}
				onClick={clear}
				className={cn(TAB_BASE, "px-2", showingAll ? TAB_ON : TAB_OFF)}
			>
				All posts
				<Count value={total} />
			</button>

			{available.map((slug) => {
				const isOn = selected.has(slug);
				const { Icon } = KIND_META[FILTER_KINDS[slug]];

				return (
					<button
						key={slug}
						type="button"
						aria-pressed={isOn}
						onClick={() => toggle(slug)}
						className={cn(TAB_BASE, "pl-1.5 pr-2", isOn ? TAB_ON : TAB_OFF)}
					>
						<Icon filled={isOn} className="text-gray-400" />
						{FILTER_LABELS[slug]}
						<Count value={counts[FILTER_KINDS[slug]] ?? 0} />
					</button>
				);
			})}
		</div>
	);
}
