import { Footer } from "./Footer";
import { ProfileCard } from "./ui-kit/ProfileCard";
import {
	ClaudeMark,
	FigmaMark,
	MotionMark,
	PaperMark,
	SwiftMark,
	TailwindMark,
} from "./ui-kit/icons/ToolMarks";
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
			{/* The tools, and the card's headroom in one. The card leans and lifts
			    on hover, and at the very top of a sticky sidebar its top edge had
			    nowhere to go — this bar gives it the room, so the card doesn't have
			    to shove itself down to find it.

			    space-around rather than a gap: the marks are all different widths, so
			    an even gap leaves the row visibly heavier at one end. No px either —
			    space-around lays in its own half-measure at each end, and padding on
			    top of that would make the outer two sit further in than the rest. */}
			<div className="panel h-8 flex items-center justify-around text-gray-300 [&>svg]:shrink-0 [&>svg]:opacity-75">
				<span className="sr-only">
					Tools I use: Figma, Claude, Paper, Motion, Tailwind CSS, Swift
				</span>
				<FigmaMark />
				<ClaudeMark />
				<PaperMark />
				<MotionMark />
				<TailwindMark />
				<SwiftMark />
			</div>

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
