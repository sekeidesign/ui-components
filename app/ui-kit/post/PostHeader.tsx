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
	const isLaunch = entry.kind === "launch";

	const meta = <Post.Meta kind={entry.kind} date={entry.date} draft={entry.draft} />;

	const title = (
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
	);

	return (
		<>
			{isLaunch && entry.icon ? (
				// Grouped with meta so the icon sits against their combined
				// height — against the title's own single line alone, the row
				// stretched to fit the icon and padded the title top and bottom.
				// PhoneMedia takes over this role at md and up, where it has room.
				<div className="flex items-center gap-3 self-stretch">
					<div className="flex-1 min-w-0 flex flex-col gap-2.5">
						{meta}
						{title}
					</div>
					<div className="md:hidden">
						<Post.AppIcon src={entry.icon} alt={entry.title} />
					</div>
				</div>
			) : (
				<>
					{meta}
					{title}
				</>
			)}

			{isBook && entry.rating !== undefined && (
				<StarRating rating={entry.rating} />
			)}

			{/* Books skip the excerpt entirely — they're meant to read as a
			    lighter-weight entry than the rest of the feed. */}
			{entry.excerpt && !isBook && (
				<Post.Description clamp={isPage ? null : entry.kind === "launch" ? 2 : 3}>
					{entry.excerpt}
				</Post.Description>
			)}
		</>
	);
}
