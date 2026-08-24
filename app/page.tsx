import type { ReactNode } from "react";
import { getTimeline } from "@/lib/timeline";
import { TimelineFeed } from "./TimelineFeed";

export const metadata = {
	title: "PG Gonni",
	description: "Writing, UI experiments, books and updates, newest first.",
};

export default async function HomePage() {
	const timeline = getTimeline();

	// Entries that show in full in the feed compile their bodies here on the
	// server — the prose travels in the RSC payload instead of shipping MDX to
	// the client. Keyed off `inline`, not `!hasPage`: a post whose page is
	// switched off while it's half-written must not spill into the feed instead.
	const bodies: Record<string, ReactNode> = {};
	await Promise.all(
		timeline
			.filter((entry) => entry.inline)
			.map(async (entry) => {
				const { default: Body } = await import(
					`../content/${entry.slug}/index.mdx`
				);
				bodies[entry.slug] = <Body />;
			}),
	);

	return <TimelineFeed entries={timeline} bodies={bodies} />;
}
