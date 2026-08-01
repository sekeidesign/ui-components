"use client";

import type { LifelineMarker } from "./ui-kit/lifeline";
import { Lifeline } from "./ui-kit/lifeline";
import { useHoverGroup } from "./ui-kit/HoverContext";

const BIRTH_YEAR = 1994;

// Placeholder photos (Lorem Picsum) so the floating-card feature has
// something to show — swap for real photos later, one marker at a time.
function placeholderPhotos(seed: string) {
	return [
		{
			src: `https://picsum.photos/seed/${seed}-1/400/520`,
			alt: "Placeholder photo 1",
		},
		{
			src: `https://picsum.photos/seed/${seed}-2/400/520`,
			alt: "Placeholder photo 2",
			x: 0.6,
		},
	];
}

// `year` doubles as sort/spacing position on the axis — it doesn't have to
// be a whole calendar year, so each role gets its own marker (fractional,
// by start month) instead of multiple roles piling into one year's slot.
// `label` overrides the displayed value with the real month/year, and
// `age` is set explicitly since the default (year - birthYear) would
// otherwise inherit the fractional year and show e.g. "23.75". The "Years"
// row already carries the date, so event text is the role description,
// not a repeated date range.
const MARKERS: LifelineMarker[] = [
	{
		id: "golden-hour-media",
		year: 2017 + 9 / 12,
		label: "Oct 2017",
		age: 2017 - BIRTH_YEAR,
		events: [
			{
				title: "Web Developer & UX Designer",
				text: "Freelance — front-end development, custom CMS builds, and on-page SEO/content strategy for client marketing sites.",
			},
		],
		companies: [{ id: "golden-hour-media", name: "Golden Hour Media" }],
		photos: placeholderPhotos("golden-hour-media"),
	},
	{
		id: "samuel-associates",
		year: 2020,
		label: "Jan 2020",
		age: 2020 - BIRTH_YEAR,
		events: [
			{
				title: "Digital Designer",
				text: "Owned clients' digital touchpoints — UX/UI design, web development, and branding — while managing the Integrated Digital Marketing team.",
			},
		],
		companies: [{ id: "samuel-associates", name: "Samuel Associates" }],
		photos: placeholderPhotos("samuel-associates"),
	},
	{
		id: "field-effect",
		year: 2021,
		label: "Jan 2021",
		age: 2021 - BIRTH_YEAR,
		events: [
			{
				title: "Product Designer",
				text: "Placeholder description — swap in real details later.",
			},
		],
		companies: [{ id: "field-effect", name: "Field Effect" }],
		photos: placeholderPhotos("field-effect"),
	},
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
		photos: placeholderPhotos("metalab"),
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
		photos: placeholderPhotos("metafy"),
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
		photos: placeholderPhotos("planned"),
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
		companies: [{ id: "tato", name: "Tato" }],
		photos: placeholderPhotos("tato"),
	},
];

export function WorkExperiencePanel() {
	const experience = useHoverGroup("experience");

	return (
		<div
			className="panel w-full h-[560px] p-0 md:p-2 pb-4 md:pb-6 overflow-hidden"
			onMouseEnter={experience.onMouseEnter}
			onMouseLeave={experience.onMouseLeave}
		>
			<Lifeline
				markers={MARKERS}
				birthYear={BIRTH_YEAR}
				title="Work experience"
				mode="embed"
				className="h-full"
			/>
		</div>
	);
}
