"use client";

import type { LifelineMarker } from "./ui-kit/lifeline";
import { Lifeline } from "./ui-kit/lifeline";
import { useHoverGroup } from "./ui-kit/HoverContext";

export const BIRTH_YEAR = 1994;

// `year` is fractional (by start month) so each role gets its own marker instead
// of piling into one year's slot. `label` shows the real month/year, and `age`
// is explicit so it doesn't inherit the fractional year.
export const MARKERS: LifelineMarker[] = [
	{
		id: "metalab",
		year: 2021 + 9 / 12,
		label: "Oct 2021",
		age: 2021 - BIRTH_YEAR,
		events: [
			{
				title: "Product Designer",
				text: "Worked directly with clients across industries and company sizes — designing experiences, running workshops, and building scalable cross-functional design systems.",
			},
		],
		companies: [{ id: "metalab", name: "Metalab" }],
		photos: [
			// Mobile-shaped screenshots are much taller than the landscape ones, so they
			// get a narrower width than the 140/160 default.
			{
				src: "/casestudies/metalab-sorare-1.webp",
				alt: "Sorare mobile app screen",
				width: 88,
			},
			{
				src: "/casestudies/metalab-sorare-2.webp",
				alt: "Sorare mobile app screen",
				width: 88,
			},
			{
				src: "/casestudies/metalab-koble-1.webp",
				alt: "Koble mobile app screen",
				width: 88,
			},
		],
	},
	{
		id: "metafy",
		year: 2023 + 1 / 12,
		label: "Feb 2023",
		age: 2023 - BIRTH_YEAR,
		events: [
			{
				title: "Design Engineer",
				text: "Bridged design and engineering — designing and shipping product experiences and delightful interactions myself, while also building and maintaining the design system across Figma and SvelteKit.",
			},
		],
		companies: [{ id: "metafy", name: "Metafy" }],
		photos: [
			{
				src: "/casestudies/metafy-windows-app.webp",
				alt: "Metafy Windows app screen",
			},
			{
				src: "/casestudies/metafy-crowns.webp",
				alt: "Metafy crowns feature screen",
				x: 0.45,
			},
			{
				src: "/casestudies/metafy-navigation.webp",
				alt: "Metafy navigation screen",
				x: 0.9,
			},
		],
	},
	{
		id: "planned",
		year: 2024 + 2 / 12,
		label: "Mar 2024",
		age: 2024 - BIRTH_YEAR,
		events: [
			{
				title: "Head of Product Design",
				text: "Joined an AI native product and revamped its design language end to end — elevating UX and UI, and building and maintaining a design system in Figma and React. Managed a team of two designers, taking the company from Series A to B.",
			},
		],
		companies: [{ id: "planned", name: "Planned" }],
	},
	{
		id: "tato",
		year: 2025 + 8 / 12,
		label: "Sep 2025",
		age: 2025 - BIRTH_YEAR,
		events: [
			{
				title: "Head of Product",
				text: "Joined as Head of Product Design, promoted to Head of Product in 2026. Own the product roadmap — defining priorities and strategy while staying hands-on in design and engineering, bringing product, design, and engineering together as one function.",
			},
		],
		companies: [{ id: "tato", name: "Tato", href: "/case-studies/tato" }],
		photos: [
			{
				src: "/casestudies/tato-automations-home.webp",
				alt: "Tato automations home screen",
			},
			{
				src: "/casestudies/tato-meeting-overview.webp",
				alt: "Tato meeting overview screen",
				x: 0.45,
			},
			{
				src: "/casestudies/tato-raid-dashboard.webp",
				alt: "Tato RAID dashboard screen",
				x: 0.9,
			},
		],
	},
];

// The timeline reads newest-first; MARKERS stays chronological above so the
// data is natural to edit.
export const MARKERS_NEWEST_FIRST = [...MARKERS].reverse();

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
