"use client";

import { LifelineVertical } from "../ui-kit/lifeline/lifeline-vertical";
import { useHoverGroup } from "../ui-kit/HoverContext";
import { BIRTH_YEAR, MARKERS_NEWEST_FIRST } from "../WorkExperiencePanel";

// Forces the always-vertical (LinkedIn-style) stacked layout regardless of
// viewport width, instead of the responsive Lifeline that swaps to a
// horizontal scroll on desktop. The vertical module renders at natural
// height and relies on the page's own scroller, so — unlike the desktop
// panel — this isn't height-capped or overflow-hidden.
export function WorkExperiencePanelVertical() {
	const experience = useHoverGroup("experience");

	return (
		<div
			className="panel w-full p-0"
			onMouseEnter={experience.onMouseEnter}
			onMouseLeave={experience.onMouseLeave}
		>
			<LifelineVertical
				markers={MARKERS_NEWEST_FIRST}
				birthYear={BIRTH_YEAR}
				title="Work experience"
				mode="embed"
				staticMedia
			/>
		</div>
	);
}
