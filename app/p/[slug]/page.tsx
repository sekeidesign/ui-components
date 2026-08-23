import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperimentDivider } from "@ui-kit/Experiment";
import { PanelRow } from "@ui-kit/PanelRow";
import { PostCard } from "@ui-kit/post/PostCard";
import { SocialProvider } from "@ui-kit/social/SocialProvider";
import { TagRow } from "@ui-kit/TagRow";
import { getTimeline } from "@/lib/timeline";

export function generateStaticParams() {
	return getTimeline()
		.filter((entry) => entry.hasPage)
		.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const entry = getTimeline().find((item) => item.slug === slug);
	if (!entry || !entry.hasPage) return {};

	const title = `${entry.title} | PG Gonni`;
	return {
		title,
		description: entry.excerpt,
		openGraph: {
			title,
			description: entry.excerpt,
			images: entry.cover ?? "/og-image.jpg",
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = getTimeline().find((item) => item.slug === slug);
	// A note has no page of its own — the feed shows it in full.
	if (!entry || !entry.hasPage) notFound();

	// Only the body compiles here — the feed never reaches this import.
	const { default: Body } = await import(
		`../../../content/${slug}/index.mdx`
	);

	return (
		<>
			{/* The identical card from the feed, unlinked because this is where it
			    would link to. Everything below is the post's own content. */}
			<SocialProvider slugs={[entry.slug]}>
				<PostCard entry={entry} eager linked={false} />
			</SocialProvider>

			<ExperimentDivider inline />

			<PanelRow className="flex flex-col gap-6 md:p-8 p-4">
				<article>
					<Body />
				</article>
				{entry.tags.length > 0 && <TagRow tags={entry.tags} />}
			</PanelRow>
		</>
	);
}
