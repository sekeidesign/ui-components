"use client";

import { LifelineVertical } from "./ui-kit/lifeline/lifeline-vertical";
import { useHoverGroup } from "./ui-kit/HoverContext";
import { BIRTH_YEAR, MARKERS_NEWEST_FIRST } from "./WorkExperiencePanel";

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
