import type { LifelineEvent, LifelineEventImage } from "./types";
import { getEventContent } from "./lifeline-event-utils";

export function LifelineEventText({
	event,
	className,
}: {
	event: LifelineEvent;
	className?: string;
}) {
	const content = getEventContent(event);

	if (typeof content === "string") {
		return <span className={className}>{content}</span>;
	}

	// Keyed by where each segment starts in the source string, which is stable
	// even when two segments carry the same text.
	let cursor = 0;
	const segments = content.map((segment) => {
		const key = `${segment.type}-${cursor}`;
		cursor += segment.value.length;
		return { ...segment, key };
	});

	return (
		<span className={className}>
			{segments.map((segment) =>
				segment.type === "link" ? (
					<a
						key={segment.key}
						href={segment.href}
						target="_blank"
						rel="noopener noreferrer"
						className="underline decoration-gray-400 underline-offset-2 transition-colors duration-300 group-hover:text-black group-hover:decoration-gray-600"
					>
						{segment.value}
					</a>
				) : (
					<span key={segment.key}>{segment.value}</span>
				),
			)}
		</span>
	);
}

/** Always-visible media embedded in the timeline (image.inline). */
export function LifelineEventMedia({
	media,
	className,
}: {
	media: LifelineEventImage;
	className?: string;
}) {
	if (media.video) {
		return (
			<video
				src={media.video}
				poster={media.src}
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				aria-label={media.alt}
				className={className}
			/>
		);
	}

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img // react-doctor-disable-line nextjs-no-img-element -- arbitrary media, with no intrinsic size for next/image to work from
			src={media.src}
			alt={media.alt}
			loading="lazy"
			className={className}
		/>
	);
}
