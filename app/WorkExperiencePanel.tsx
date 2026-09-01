"use client";

import { Lifeline } from "./ui-kit/lifeline/lifeline";
import { BIRTH_YEAR, MARKERS_NEWEST_FIRST } from "./work-experience-markers";
import { useHoverGroup } from "./ui-kit/HoverContext";

export function WorkExperiencePanel() {
	const experience = useHoverGroup("experience");

	return (
		<div
			className="panel w-full h-auto md:h-[560px] p-0 md:p-2 pb-4 md:pb-6 overflow-hidden"
			onMouseEnter={experience.onMouseEnter}
			onMouseLeave={experience.onMouseLeave}
		>
			<Lifeline
				markers={MARKERS_NEWEST_FIRST}
				birthYear={BIRTH_YEAR}
				title="Work experience"
				mode="embed"
				className="h-full"
			/>
		</div>
	);
}
