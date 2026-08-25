import { Footer } from "./Footer";
import { ProfileCard } from "./ui-kit/ProfileCard";
import { TimelineTabs } from "./ui-kit/TimelineTabs";
import { getTimeline, type EntryKind } from "@/lib/timeline";
import { FILTER_KINDS, FILTER_ORDER } from "@/lib/timeline-filters";

/**
 * Identity plus the timeline filters. The old section nav is gone: every kind
 * of post lives in the one timeline, and these tabs do that filtering.
 */
export const Sidebar = () => {
	const timeline = getTimeline();

	const counts: Partial<Record<EntryKind, number>> = {};
	for (const entry of timeline) {
		counts[entry.kind] = (counts[entry.kind] ?? 0) + 1;
	}

	// A tab that matches nothing is a dead end, so only offer kinds present.
	const available = FILTER_ORDER.filter(
		(slug) => (counts[FILTER_KINDS[slug]] ?? 0) > 0,
	);

	return (
		<div className="w-full md:max-w-2xs xl:max-w-xs md:sticky md:top-px md:h-[calc(100vh-2px)] md:shrink-0 flex flex-col gap-px">
			<ProfileCard />

			{/* The block that used to be empty filler — it already stretches to the
			    bottom of the sidebar, so the tabs live in it rather than in a panel
			    of their own. Dropping `hidden` keeps them reachable on mobile, where
			    there's no height to fill anyway. */}
			<div className="panel p-4 md:flex-1">
				<TimelineTabs available={available} counts={counts} />
			</div>

			<Footer className="md:grid hidden" />
		</div>
	);
};
