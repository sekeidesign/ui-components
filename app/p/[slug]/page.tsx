import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookMeta } from "@ui-kit/BookMeta";
import { Cover } from "@ui-kit/Cover";
import { LivePreview } from "@ui-kit/LivePreview";
import { OutboundLink } from "@ui-kit/OutboundLink";
import { SocialBar } from "@ui-kit/social/SocialBar";
import { SocialProvider } from "@ui-kit/social/SocialProvider";
import { SparkleDivider } from "@ui-kit/SparkleDivider";
import { TagRow } from "@ui-kit/TagRow";
import { type EntryKind, getTimeline } from "@/lib/timeline";

const KIND_LABEL: Record<EntryKind, string> = {
	experiment: "UI experiment",
	writing: "Writing",
	note: "Update",
	launch: "Launch",
	book: "Reading",
	photo: "Photography",
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

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
			images: "/og-image.jpg",
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
	// Only the body compiles here — the feed never reaches this import.
	const { default: Body } = await import(
		`../../../content/${slug}/index.mdx`
	);

	return (
		<>
			<header className="mb-8">
				<div className="flex items-baseline justify-between gap-4 mb-3">
					<p className="text-sm font-[500] text-gray-400">
						{KIND_LABEL[entry.kind]}
					</p>
					<time
						dateTime={entry.date}
						className="text-xs font-[450] font-mono text-gray-400 shrink-0"
					>
						{DATE_FORMAT.format(new Date(`${entry.date}T00:00:00Z`))}
					</time>
				</div>
				<h1 className="text-2xl md:text-3xl font-[550] text-gray-900 leading-tight mb-0">
					{entry.title}
				</h1>
				{entry.excerpt && (
					<p className="mt-3 text-gray-500 text-[15px] font-[420] leading-relaxed">
						{entry.excerpt}
					</p>
				)}
				{entry.tags.length > 0 && (
					<div className="mt-4">
						<TagRow tags={entry.tags} />
					</div>
				)}
				<SparkleDivider className="mt-8" />
			</header>

			{entry.kind === "book" ? (
				<div className="mb-8">
					<BookMeta
						slug={entry.slug}
						title={entry.title}
						author={entry.author}
						rating={entry.rating}
						cover={entry.cover}
						spineColor={entry.spineColor}
					/>
				</div>
			) : (
				entry.cover && (
				<div className="mb-8">
					<Cover
						src={entry.cover}
						alt={entry.title}
						aspect={entry.coverAspect}
						priority
					/>
				</div>
				)
			)}

			{entry.link && (
				<div className="mb-8">
					<OutboundLink href={entry.link} label={entry.linkLabel} />
				</div>
			)}

			{entry.preview === "live" && (
				<div className="mb-8">
					<LivePreview
						slug={entry.slug}
						previewCost={entry.previewCost}
						previewHeight={entry.previewHeight}
						sourceUrl={entry.sourceUrl}
						className={entry.previewClassName}
						eager
					/>
				</div>
			)}

			<Body />

			<SocialProvider slugs={[entry.slug]}>
				<SocialBar
					slug={entry.slug}
					sharePath={`/p/${entry.slug}`}
					className="mt-10"
				/>
			</SocialProvider>
		</>
	);
}
