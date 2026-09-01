"use client";

import { forwardRef, type CSSProperties } from "react";
import { Film, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../cn";
import { LifelineEventText } from "./lifeline-event";
import {
	getLifelineEventEffect,
	getLifelineEventImage,
	getLifelineEventKey,
	getLifelineEventTitle,
} from "./lifeline-event-utils";
import { useLifelineFireworks } from "./lifeline-fireworks";
import { useLifelineHoverImage } from "./lifeline-hover-image";
import { LifelineCaseStudiesButton } from "./lifeline-case-studies-button";
import { LifelinePeople } from "./lifeline-people";
import { aggregateLifelinePeople } from "./lifeline-people-utils";
import type { LifelineMarker } from "./types";

interface LifelineMarkerColumnProps {
	marker: LifelineMarker;
	minWidth: number;
	animateIntro?: boolean;
	introDelay?: number;
	introDuration?: number;
}

// Renders the whole marker body as one link when a company has an href —
// anchors can't nest, so this replaces the per-company link.
function LinkOrDiv({
	href,
	className,
	children,
}: {
	href?: string;
	className?: string;
	children: React.ReactNode;
}) {
	if (href) {
		return (
			<Link href={href} className={className}>
				{children}
			</Link>
		);
	}
	return <div className={className}>{children}</div>;
}

export const LifelineMarkerColumn = forwardRef<
	HTMLDivElement,
	LifelineMarkerColumnProps
>(function LifelineMarkerColumn(
	{
		marker,
		minWidth,
		animateIntro = false,
		introDelay = 0,
		introDuration = 420,
	},
	ref,
) {
	const firstTitle =
		marker.events.length > 0
			? getLifelineEventTitle(marker.events[0])
			: undefined;
	const people = aggregateLifelinePeople(marker);
	const photos = marker.photos ?? [];
	const primaryHref = marker.companies?.find((company) => company.href)?.href;
	const hoverImage = useLifelineHoverImage();
	const fireworks = useLifelineFireworks();

	return (
		<div
			ref={ref}
			className="group relative shrink-0 pr-8 transition-opacity duration-300 ease-out"
			style={{ width: minWidth }}
			aria-label={marker.label ?? `${marker.year}`}
		>
			<div
				className={cn("relative", animateIntro && "lifeline-marker-intro")}
				style={{
					animationDelay: animateIntro ? `${introDelay}ms` : undefined,
					...(animateIntro
						? ({
								"--lifeline-marker-fade-ms": `${introDuration}ms`,
							} as CSSProperties)
						: {}),
				}}
			>
				<span
					className="absolute left-0 top-[var(--lifeline-rail)] z-10 h-[10px] w-px -translate-y-1/2 bg-zinc-400 transition-colors duration-300 group-hover:bg-zinc-600"
					aria-hidden="true"
				/>

				<div className="flex w-full flex-col items-start text-left">
					<p className="mb-6 h-4 whitespace-nowrap text-[11px] font-medium leading-4 tabular-nums text-zinc-500 transition-colors duration-300 group-hover:text-black">
						{marker.label ?? marker.year}
					</p>

					<div className="relative w-full pb-10 text-zinc-500 transition-colors duration-300 group-hover:text-black">
						{/* A column carrying people reserves the band's height as a floor, so
                portraits line up across columns; pb-6 is the gap in the overflow case. */}
						<LinkOrDiv
							href={primaryHref}
							className={cn(
								"flex w-full flex-col items-start pt-6",
								people.length > 0 && "min-h-[var(--lifeline-people-top)] pb-6",
							)}
						>
							{marker.badges && marker.badges.length > 0 && (
								<div className="mb-3 flex items-center justify-start gap-2">
									{marker.badges.map((badge) => (
										// eslint-disable-next-line @next/next/no-img-element
										<img // react-doctor-disable-line nextjs-no-img-element -- arbitrary media, with no intrinsic size for next/image to work from
											key={badge.src}
											src={badge.src}
											alt={badge.alt}
											className="h-6 w-6 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
										/>
									))}
								</div>
							)}

							{firstTitle && (
								<p className="mb-1 max-w-[18rem] text-[15px] font-semibold leading-snug text-zinc-800 transition-colors duration-300">
									{firstTitle}
								</p>
							)}

							{marker.companies && marker.companies.length > 0 && (
								<p className="mb-2 max-w-[18rem] text-[13px] font-medium text-zinc-500 transition-colors duration-300 group-hover:text-zinc-700">
									{marker.companies.map((company, index) => (
										<span key={company.id}>
											{index > 0 && ", "}
											{company.name}
										</span>
									))}
								</p>
							)}

							<div className="min-h-[3.25rem] space-y-4">
								{marker.events.map((event, index) => {
									const image = getLifelineEventImage(event);
									const effect = getLifelineEventEffect(event);

									return (
										// Pointer-only flourishes: the hover image is decorative and
										// the click is an easter egg. The column is already
										// primaryHref's anchor, so a role/tabIndex here would nest
										// interactive elements.
										// react-doctor-disable-next-line click-events-have-key-events no-noninteractive-element-interactions
										<p
											key={getLifelineEventKey(event, index)}
											className={cn(
												"max-w-[18rem] text-left text-xs leading-[1.55] tracking-[-0.01em]",
												effect && "cursor-pointer",
											)}
											data-lifeline-interactive={effect ? "" : undefined}
											onMouseEnter={
												image && hoverImage
													? () => hoverImage.show(image)
													: undefined
											}
											onMouseLeave={
												image && hoverImage ? hoverImage.hide : undefined
											}
											onClick={
												effect && fireworks
													? () => fireworks.launch(effect)
													: undefined
											}
										>
											<LifelineEventText event={event} />
											{image && (
												// Glued to the last word with a no-break space so
												// the icon can never wrap onto a line of its own.
												<span className="whitespace-nowrap">
													{" "}
													{image.video ? (
														<Film
															className="ml-0.5 inline-block h-3 w-3 -translate-y-px text-zinc-400 transition-colors duration-300"
															strokeWidth={1.75}
															aria-hidden="true"
														/>
													) : (
														<ImageIcon
															className="ml-0.5 inline-block h-3 w-3 -translate-y-px text-zinc-400 transition-colors duration-300"
															strokeWidth={1.75}
															aria-hidden="true"
														/>
													)}
												</span>
											)}
										</p>
									);
								})}
							</div>

							{photos.length > 0 && (
								<div className="mt-6">
									{/* The column above is already primaryHref's anchor, so this is always a
                      plain chip — a nested anchor would be invalid HTML. */}
									<LifelineCaseStudiesButton
										photos={photos}
										href={primaryHref}
										as="static"
									/>
								</div>
							)}
						</LinkOrDiv>

						{people.length > 0 && (
							<div className="w-full">
								<LifelinePeople people={people} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
