import { StarRating } from "../StarRating";
import { Post } from "./Post";
import type { TimelineEntry } from "@/lib/timeline";

/**
 * The identity block for a post: kind, date, title and copy. Shared so a card
 * in the feed and the top of its own page can't drift apart — a page only
 * differs in leading with an h1, running the copy unclamped, and dropping the
 * card's "read more" affordance.
 */
export function PostHeader({
	entry,
	variant = "card",
	href,
}: {
	entry: TimelineEntry;
	variant?: "card" | "page";
	/** Makes the title a link. Omit on the page — it's already there. */
	href?: string;
}) {
	const isPage = variant === "page";
	const isBook = entry.kind === "book";

	return (
		<>
			<Post.Meta kind={entry.kind} date={entry.date} />

			<Post.Title
				href={href}
				as={isPage ? "h1" : "h2"}
				size={isPage ? "lg" : "md"}
				byline={isBook && entry.author ? `by ${entry.author}` : undefined}
				subtitle={entry.subtitle}
				// Work posts show their mark inline; other kinds badge it on the media.
				icon={entry.kind === "note" ? entry.icon : undefined}
				iconAlt={entry.subtitle ?? entry.title}
			>
				{entry.title}
			</Post.Title>

			{isBook && entry.rating !== undefined && (
				<StarRating rating={entry.rating} />
			)}

			{entry.excerpt && (
				<Post.Description
					clamp={isPage ? null : isBook || entry.kind === "launch" ? 2 : 3}
				>
					{entry.excerpt}
				</Post.Description>
			)}
		</>
	);
}
