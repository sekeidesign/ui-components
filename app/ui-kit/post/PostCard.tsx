"use client";

import type { ReactNode } from "react";
import { LivePreview } from "../LivePreview";
import { SocialBar } from "../social/SocialBar";
import { Post } from "./Post";
import { PostHeader } from "./PostHeader";
import type { TimelineEntry } from "@/lib/timeline";

interface PostCardProps {
	entry: TimelineEntry;
	/** First item is above the fold; skip the scroll gate to avoid a blank box. */
	eager?: boolean;
	/**
	 * Links the card to its post. Off on the post's own page, where the same
	 * card is the header — linking to where you already are is noise.
	 */
	linked?: boolean;
	/** Rendered MDX body, for entries that show in full in the feed. */
	children?: ReactNode;
}

export function PostCard({
	entry,
	eager,
	linked = true,
	children,
}: PostCardProps) {
	const href = linked && entry.hasPage ? `/p/${entry.slug}` : undefined;
	const isBook = entry.kind === "book";
	const isExperiment = entry.kind === "experiment";
	const hasDemo = entry.preview === "live";

	// A book's cover is portrait and overflows its box; every other kind uses
	// the square media column. Experiments trade it for a full-width demo, and
	// work posts carry their mark beside the title instead.
	const media = isBook ? (
		entry.cover && (
			<Post.BookCover
				book={{
					id: entry.slug,
					title: entry.title,
					author: entry.author ?? "",
					cover: entry.cover,
					spineColor: entry.spineColor ?? "#4a5568",
					rating: entry.rating ?? 0,
				}}
			/>
		)
	) : entry.kind === "launch" && entry.cover ? (
		<Post.PhoneMedia src={entry.cover} alt={entry.title} priority={eager} />
	) : !isExperiment && entry.kind !== "note" && (entry.cover || entry.icon) ? (
		<Post.Media
			src={entry.cover}
			alt={entry.title}
			badge={entry.icon}
			badgeAlt={entry.subtitle ?? entry.title}
			priority={eager}
		/>
	) : null;

	return (
		<Post id={entry.slug} href={href}>
			<Post.Body>
				{/* Entries without a page of their own show their whole body in place
				    of the excerpt, already styled by mdx-components. */}
				{children ? (
					<>
						<Post.Meta kind={entry.kind} date={entry.date} />
						<Post.Title
							subtitle={entry.subtitle}
							icon={entry.kind === "note" ? entry.icon : undefined}
							iconAlt={entry.subtitle ?? entry.title}
						>
							{entry.title}
						</Post.Title>
						{children}
					</>
				) : (
					<PostHeader entry={entry} href={href} />
				)}

				{hasDemo && (
					<LivePreview
						slug={entry.slug}
						previewCost={entry.previewCost}
						previewHeight={entry.previewHeight}
						className={entry.previewClassName}
						eager={eager}
					/>
				)}

				<Post.Footer>
					<SocialBar
						slug={entry.slug}
						// Notes have no page of their own, so their link points at the feed.
						sharePath={href ?? `/timeline#${entry.slug}`}
					/>
					{isExperiment && entry.sourceUrl && (
						<Post.CodeLink href={entry.sourceUrl} />
					)}
				</Post.Footer>
			</Post.Body>

			{media}
		</Post>
	);
}
