"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { BookMeta } from "@ui-kit/BookMeta";
import { Cover } from "@ui-kit/Cover";
import { Experiment } from "@ui-kit/Experiment";
import { LivePreview } from "@ui-kit/LivePreview";
import { OutboundLink } from "@ui-kit/OutboundLink";
import { SocialBar } from "@ui-kit/social/SocialBar";
import { TagRow } from "@ui-kit/TagRow";
import type { EntryKind, TimelineEntry } from "@/lib/timeline";

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

// Only kinds that benefit from a marker in a mixed feed. Experiments announce
// themselves with a live demo, and writing with a cover and excerpt.
const KIND_MARKER: Partial<Record<EntryKind, string>> = {
	note: "Update",
	launch: "Launch",
	book: "Read",
};

interface TimelineItemProps {
	entry: TimelineEntry;
	/** First item is above the fold; skip the scroll gate to avoid a blank box. */
	eager?: boolean;
	/** Rendered MDX body. Server-supplied for notes, which show in full inline. */
	children?: ReactNode;
}

export function TimelineItem({ entry, eager, children }: TimelineItemProps) {
	const marker = KIND_MARKER[entry.kind];
	const href = `/p/${entry.slug}`;

	return (
		<Experiment>
			<div id={entry.slug} className="flex items-baseline justify-between gap-4 scroll-mt-20">
				{entry.hasPage ? (
					<Link href={href} className="group flex items-center gap-1">
						<h2 className="text-xl text-gray-800 group-hover:text-gray-900 font-[500] leading-none">
							{entry.title}
						</h2>
					</Link>
				) : (
					<h2 className="text-xl text-gray-800 font-[500] leading-none">
						{entry.title}
					</h2>
				)}
				<div className="flex items-baseline gap-2 shrink-0">
					{marker && (
						<span className="text-xs font-[450] font-mono text-gray-400">
							{marker}
						</span>
					)}
					<time
						dateTime={entry.date}
						className="text-xs font-[450] font-mono text-gray-400"
					>
						{DATE_FORMAT.format(new Date(`${entry.date}T00:00:00Z`))}
					</time>
				</div>
			</div>

			<TagRow tags={entry.tags} />

			{entry.preview === "live" && (
				<LivePreview
					slug={entry.slug}
					previewCost={entry.previewCost}
					previewHeight={entry.previewHeight}
					sourceUrl={entry.sourceUrl}
					className={entry.previewClassName}
					eager={eager}
				/>
			)}

			{entry.kind === "book" ? (
				<BookMeta
					slug={entry.slug}
					title={entry.title}
					author={entry.author}
					rating={entry.rating}
					cover={entry.cover}
					spineColor={entry.spineColor}
				/>
			) : (
				entry.cover && (
					<Cover
						src={entry.cover}
						alt={entry.title}
						aspect={entry.coverAspect}
						priority={eager}
					/>
				)
			)}

			{/* A note's body is the post, so it renders in full rather than as an
			    excerpt with a link to somewhere else. */}
			{children ? (
				<div className="text-sm">{children}</div>
			) : (
				entry.excerpt && (
					<Experiment.Description>
						{entry.excerpt}
						{entry.hasPage && (
							<>
								{" "}
								<Link
									href={href}
									className="text-gray-600 font-[500] hover:text-gray-900 whitespace-nowrap"
								>
									Read more
								</Link>
							</>
						)}
					</Experiment.Description>
				)
			)}

			{entry.link && (
				<OutboundLink href={entry.link} label={entry.linkLabel} />
			)}

			<SocialBar
				slug={entry.slug}
				// Notes have no page of their own, so their link points at the feed.
				sharePath={entry.hasPage ? href : `/timeline#${entry.slug}`}
				className="mt-1"
			/>
		</Experiment>
	);
}
