"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./cn";
import { KIND_META } from "./post/Post";
import type { EntryKind } from "@/lib/timeline";
import {
	FILTER_KINDS,
	FILTER_LABELS,
	type FilterSlug,
	filterHref,
} from "@/lib/timeline-filters";

// Both states share size, radius and padding; only fill, border and text
// colour change. Icons stay gray-400 in both, per the design.
const TAB_BASE =
	"flex items-center gap-1 h-[26px] rounded-full text-[14px] leading-[1.43] font-[500] whitespace-nowrap";
const TAB_ON = "bg-white ring-1 ring-gray-500/10 shadow-skew text-gray-900/75";
const TAB_OFF =
	"bg-gray-500/5 outline outline-1 outline-gray-500/10 text-gray-500/75 hover:bg-gray-500/15 hover:text-gray-700";

/** Trails the label, so every tab reads label-then-tally. */
function Count({ value }: { value: number }) {
	return <span className="text-gray-400 tabular-nums">{value}</span>;
}

/**
 * The active tab is a span, not a link: it points at the page you're on, so
 * there's nothing to navigate to and no hover state to imply otherwise.
 */
function Tab({
	href,
	active,
	padding,
	children,
}: {
	href: string;
	active: boolean;
	padding: string;
	children: React.ReactNode;
}) {
	if (active) {
		return (
			<span aria-current="page" className={cn(TAB_BASE, padding, TAB_ON)}>
				{children}
			</span>
		);
	}

	return (
		<Link href={href} className={cn(TAB_BASE, padding, TAB_OFF)}>
			{children}
		</Link>
	);
}

export function TimelineTabs({
	available,
	counts,
}: {
	available: FilterSlug[];
	counts: Partial<Record<EntryKind, number>>;
}) {
	const pathname = usePathname();
	const segment = pathname.split("/").filter(Boolean)[0];
	const active = segment && segment in FILTER_KINDS ? segment : undefined;
	// Only the home page is "All posts". On a post or the lab, no tab is current.
	const allActive = pathname === "/";
	const total = Object.values(counts).reduce((sum, n) => sum + n, 0);

	return (
		// Wraps rather than scrolls: the sidebar is narrower than the feed was.
		<div className="flex flex-wrap items-center gap-1.5">
			<Tab href={filterHref()} active={allActive} padding="px-2">
				All posts
				<Count value={total} />
			</Tab>

			{available.map((slug) => {
				const isActive = active === slug;
				const { Icon } = KIND_META[FILTER_KINDS[slug]];

				return (
					<Tab
						key={slug}
						href={filterHref(slug)}
						active={isActive}
						padding="pl-1.5 pr-2"
					>
						<Icon filled={isActive} className="text-gray-400" />
						{FILTER_LABELS[slug]}
						<Count value={counts[FILTER_KINDS[slug]] ?? 0} />
					</Tab>
				);
			})}
		</div>
	);
}
