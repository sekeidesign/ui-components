"use client";

import { cn } from "@ui-kit/cn";
import type { EntryKind } from "@/lib/timeline";

export type Filter = EntryKind | "all";

export const FILTER_LABELS: Record<Filter, string> = {
	all: "Everything",
	writing: "Articles",
	experiment: "UI",
	book: "Books",
	launch: "Launches",
	note: "Updates",
	photo: "Photos",
};

// Display order, independent of how many entries each kind has.
const FILTER_ORDER: Filter[] = [
	"all",
	"writing",
	"experiment",
	"book",
	"launch",
	"note",
	"photo",
];

interface TimelineFilterBarProps {
	counts: Partial<Record<EntryKind, number>>;
	selected: Filter;
	onSelect: (filter: Filter) => void;
}

export function TimelineFilterBar({
	counts,
	selected,
	onSelect,
}: TimelineFilterBarProps) {
	// A filter that matches nothing is a dead end, so only offer kinds present.
	const available = FILTER_ORDER.filter(
		(f) => f === "all" || (counts[f as EntryKind] ?? 0) > 0,
	);

	return (
		// Sticky against the layout's own scroller (the overflow-y-auto wrapper),
		// not the window. The panel background must stay opaque so cards scroll
		// underneath it rather than showing through.
		<div className="sticky top-0 z-30 flex gap-px w-full">
			<div className="panel flex-1 shrink xl:block hidden stripes" />
			<div className="flex gap-2 w-full flex-4 grow-20 xl:max-w-screen-md shrink-0 panel md:px-6 px-4 py-3 overflow-x-auto items-center border-b border-gray-200">
				{available.map((filter) => {
					const isSelected = filter === selected;
					const count =
						filter === "all"
							? Object.values(counts).reduce((a, b) => a + b, 0)
							: counts[filter as EntryKind];

					return (
						<button
							key={filter}
							type="button"
							aria-pressed={isSelected}
							onClick={() => onSelect(filter)}
							className={cn(
								"flex items-center gap-1.5 text-xs font-[450] font-mono whitespace-nowrap p-1 px-2 w-fit rounded-lg transition-colors",
								isSelected
									? "bg-gray-900 text-gray-50"
									: "text-gray-500 bg-gray-200/60 hover:bg-gray-200 hover:text-gray-700",
							)}
						>
							{FILTER_LABELS[filter]}
							<span
								className={cn(
									"tabular-nums",
									isSelected ? "text-gray-400" : "text-gray-400",
								)}
							>
								{count}
							</span>
						</button>
					);
				})}
			</div>
			<div className="panel flex-1 shrink xl:block hidden stripes" />
		</div>
	);
}
