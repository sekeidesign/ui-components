import type { ReactNode } from "react";
import { getTimeline } from "@/lib/timeline";
import { TimelineFeed } from "./TimelineFeed";

export const metadata = {
	title: "Timeline | PG Gonni",
	description: "Writing, UI experiments, books and updates, newest first.",
};

export default async function TimelinePage() {
	const timeline = getTimeline();

	// Entries without a page of their own show in full in the feed, so their
	// bodies compile here on the server — the prose travels in the RSC payload
	// instead of shipping MDX to the client.
	const bodies: Record<string, ReactNode> = {};
	await Promise.all(
		timeline
			.filter((entry) => !entry.hasPage)
			.map(async (entry) => {
				const { default: Body } = await import(
					`../../content/${entry.slug}/index.mdx`
				);
				bodies[entry.slug] = <Body />;
			}),
	);

	return <TimelineFeed entries={timeline} bodies={bodies} />;
}
