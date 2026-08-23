import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { ExperimentDivider } from "@ui-kit/Experiment";
import {
	FILTER_KINDS,
	FILTER_LABELS,
	FILTER_ORDER,
	type FilterSlug,
	isFilterSlug,
} from "@/lib/timeline-filters";
import { getTimeline } from "@/lib/timeline";
import { PostCard } from "@ui-kit/post/PostCard";

type Params = { kind?: string[] };

/** One static page per filter, plus the unfiltered feed. */
export function generateStaticParams(): Params[] {
	const kinds = new Set(getTimeline().map((entry) => entry.kind));
	return [
		{ kind: [] },
		...FILTER_ORDER.filter((slug) => kinds.has(FILTER_KINDS[slug])).map(
			(slug) => ({ kind: [slug] }),
		),
	];
}

/** Rejects /timeline/nonsense and /timeline/a/b rather than showing an empty feed. */
function resolveFilter(kind?: string[]): FilterSlug | undefined {
	if (!kind || kind.length === 0) return undefined;
	if (kind.length > 1) notFound();
	const [segment] = kind;
	if (!isFilterSlug(segment)) notFound();
	return segment;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const filter = resolveFilter((await params).kind);
	const title = filter
		? `${FILTER_LABELS[filter]} | PG Gonni`
		: "Timeline | PG Gonni";

	return {
		title,
		description: filter
			? `${FILTER_LABELS[filter]}, newest first.`
			: "Writing, UI experiments, books and updates, newest first.",
	};
}

export default async function TimelinePage({
	params,
}: {
	params: Promise<Params>;
}) {
	const filter = resolveFilter((await params).kind);
	const kind = filter ? FILTER_KINDS[filter] : undefined;
	const entries = getTimeline().filter(
		(entry) => !kind || entry.kind === kind,
	);

	// Entries without a page of their own show in full in the feed, so their
	// bodies compile here on the server — the prose travels in the RSC payload
	// instead of shipping MDX to the client.
	const bodies: Record<string, ReactNode> = {};
	await Promise.all(
		entries
			.filter((entry) => !entry.hasPage)
			.map(async (entry) => {
				const { default: Body } = await import(
					`../../content/${entry.slug}/index.mdx`
				);
				bodies[entry.slug] = <Body />;
			}),
	);

	return (
		<>
			{entries.map((entry, index) => (
				<Fragment key={entry.slug}>
					<PostCard entry={entry} eager={index === 0}>
						{bodies[entry.slug]}
					</PostCard>
					{/* Dividers sit between posts, so the feed doesn't end on one. */}
					{index < entries.length - 1 && <ExperimentDivider inline />}
				</Fragment>
			))}
		</>
	);
}
