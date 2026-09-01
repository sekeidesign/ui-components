"use client";

import { type ReactNode, useState } from "react";
import { LivePreview } from "../LivePreview";
import { OutboundLink } from "../OutboundLink";
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
	// Only books react to card hover, so no other kind re-renders on pointer move.
	const [hovered, setHovered] = useState(false);
	const isBook = entry.kind === "book";
	const isExperiment = entry.kind === "experiment";
	const hasDemo = entry.preview === "live";

	// A book's cover is portrait and overflows its box, and a launch gets a
	// phone; a case study gets its screenshot full width. Experiments trade
	// artwork for a live demo, and work posts carry their mark beside the title.
	const media = isBook ? (
		entry.cover && (
			<Post.BookCover
				hovered={hovered}
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
		// Too wide for a narrow column — PostHeader's Title shows the app's own
		// icon there instead, so this only needs room at md and up.
		<div className="hidden md:block">
			<Post.PhoneMedia src={entry.cover} alt={entry.title} priority={eager} />
		</div>
	) : !isExperiment && entry.kind !== "note" && (entry.cover || entry.icon) ? (
		<Post.Media
			src={entry.cover}
			alt={entry.title}
			badge={entry.icon}
			badgeAlt={entry.subtitle ?? entry.title}
			priority={eager}
			aspect={entry.coverAspect}
		/>
	) : null;

	// A book cover and a phone are objects beside the copy. A case study's
	// screenshot instead runs full width in the body, above the social bar —
	// the same slot and the same weight as an experiment's live demo, which is
	// what makes those the big cards in the feed.
	const aside = isBook || entry.kind === "launch";
	const layout = media && aside ? "aside" : "column";

	return (
		<Post
			id={entry.slug}
			href={href}
			layout={layout}
			onPointerEnter={isBook ? () => setHovered(true) : undefined}
			onPointerLeave={isBook ? () => setHovered(false) : undefined}
		>
			<Post.Body>
				{/* Entries without a page of their own show their whole body in place
				    of the excerpt, already styled by mdx-components. */}
				{children ? (
					<>
						<Post.Meta kind={entry.kind} date={entry.date} draft={entry.draft} />
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

				{layout === "column" && media}

				<Post.Footer>
					{/* One cluster on the left so the launch button reads as part of the
					    same row of controls as the social chips. */}
					<div className="flex items-center gap-2">
						<SocialBar
							slug={entry.slug}
							// Notes have no page of their own, so their link points at the feed.
							sharePath={href ?? `/timeline#${entry.slug}`}
						/>
						{entry.kind === "launch" && entry.link && (
							<OutboundLink href={entry.link} label={entry.linkLabel} />
						)}
					</div>
					{isExperiment && entry.sourceUrl && (
						<Post.CodeLink href={entry.sourceUrl} />
					)}
				</Post.Footer>
			</Post.Body>

			{layout === "aside" && media}
		</Post>
	);
}
