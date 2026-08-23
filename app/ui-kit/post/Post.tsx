"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { cn } from "../cn";
import { CameraIcon } from "../icons/CameraIcon";
import {
	AppLaunchKindIcon,
	BookKindIcon,
	CodeIcon,
	ExperimentKindIcon,
	type KindIconProps,
	WorkKindIcon,
	WritingKindIcon,
} from "../icons/KindIcons";
import { Book3D, type Book } from "../book-shelf";
import { TooltipTrigger } from "../Tooltip";
import { PostRow } from "./PostRow";
import type { EntryKind } from "@/lib/timeline";

/** Eyebrow label and icon per kind, matching the filter tabs. */
export const KIND_META: Record<
	EntryKind,
	{ label: string; Icon: ComponentType<KindIconProps> }
> = {
	writing: { label: "Writing", Icon: WritingKindIcon },
	book: { label: "Book", Icon: BookKindIcon },
	note: { label: "Work", Icon: WorkKindIcon },
	launch: { label: "App launch", Icon: AppLaunchKindIcon },
	experiment: { label: "Experiment", Icon: ExperimentKindIcon },
	photo: { label: "Photography", Icon: CameraIcon },
};

// The design's white-chip treatment: a 1px #6A72821A ring plus the theme's own
// shadow-skew. Shared by the media badge, the work icon and the code link.
const CHIP = "bg-white ring-1 ring-gray-500/10 shadow-skew";

const MEDIA_SIZE = 179;

/** Even breathing room on the left, top and right of a book cover. */
const BOOK_INSET = 20;

/**
 * Projected width of Book3D's open cover at scale 1, in px.
 *
 * Not simply its 132px width: the cover rotates -16° about its own left edge,
 * which foreshortens it to 132·cos(16°) ≈ 127, and then the parent's 900px
 * perspective magnifies the near (right) edge by ~1.04 because the rotation
 * pushes it 36px toward the viewer. That magnification is why an inset derived
 * from cos alone left less room on the right than on the left.
 */
const BOOK_PROJECTED_WIDTH = 130.5;

/** Derived, so BOOK_INSET is the only number to tune. */
const BOOK_SCALE = (MEDIA_SIZE - BOOK_INSET * 2) / BOOK_PROJECTED_WIDTH;

function Root({
	children,
	className,
	id,
	/** Post page, if it has one. Makes the whole card a click target. */
	href,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
	href?: string;
}) {
	return (
		<PostRow
			id={id}
			href={href}
			className={cn("flex items-center gap-8 md:p-8 p-4", className)}
		>
			{children}
		</PostRow>
	);
}

/** The text column. min-w-0 so long words can't push the media off the card. */
function Body({ children }: { children: ReactNode }) {
	return (
		<div className="flex-1 min-w-0 flex flex-col items-start gap-2.5">
			{children}
		</div>
	);
}

function Meta({ kind, date }: { kind: EntryKind; date: string }) {
	const { label, Icon } = KIND_META[kind];

	return (
		<div className="flex items-center gap-1 self-stretch text-gray-400">
			<Icon filled />
			<span className="flex-1 text-[14px] leading-[1.43] font-[500]">
				{label}
			</span>
			<time
				dateTime={date}
				className="shrink-0 text-[12px] leading-[1.33] font-mono font-[450]"
			>
				{DATE_FORMAT.format(new Date(`${date}T00:00:00Z`))}
			</time>
		</div>
	);
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "numeric",
	year: "numeric",
	timeZone: "UTC",
});

interface TitleProps {
	children: ReactNode;
	href?: string;
	/** h2 on a card in the feed, h1 when the post is the page. */
	as?: "h1" | "h2";
	/** "lg" for a page's leading title. */
	size?: "md" | "lg";
	/** Sits inline after the title, e.g. a book's "by Patrick McGee". */
	byline?: ReactNode;
	/** Sits under the title, e.g. the company on a work post. */
	subtitle?: ReactNode;
	/** Square artwork to the right of the title, e.g. a company mark. */
	icon?: string;
	iconAlt?: string;
}

function Title({
	children,
	href,
	as: Heading = "h2",
	size = "md",
	byline,
	subtitle,
	icon,
	iconAlt,
}: TitleProps) {
	const heading = (
		<Heading
			className={cn(
				"font-[550] text-gray-900",
				size === "lg"
					? "text-[28px] leading-[1.25]"
					: "text-[20px] leading-[1.375]",
			)}
		>
			{children}
		</Heading>
	);

	return (
		<div className="flex items-center gap-3 self-stretch">
			<div className="flex-1 min-w-0 flex flex-col items-start justify-center">
				<div className="flex items-baseline gap-1.5 flex-wrap">
					{href ? (
						<Link href={href} className="hover:text-gray-700">
							{heading}
						</Link>
					) : (
						heading
					)}
					{byline && (
						<span className="text-[13px] leading-[1.43] font-[420] text-gray-500">
							{byline}
						</span>
					)}
				</div>
				{subtitle && (
					<span className="text-[13px] leading-[1.43] font-[420] text-gray-500">
						{subtitle}
					</span>
				)}
			</div>
			{icon && (
				<div
					className={cn(
						"flex items-center justify-center overflow-clip rounded-lg shrink-0",
						CHIP,
					)}
				>
					<Image src={icon} alt={iconAlt ?? ""} width={40} height={40} />
				</div>
			)}
		</div>
	);
}

function Description({
	children,
	clamp = 3,
}: {
	children: ReactNode;
	/** Lines before truncating. null leaves it unclamped. */
	clamp?: 2 | 3 | null;
}) {
	return (
		<p
			className={cn(
				"self-stretch text-[15px] leading-[1.625] font-[420] text-gray-500",
				clamp === 2 && "line-clamp-2",
				clamp === 3 && "line-clamp-3",
			)}
		>
			{children}
		</p>
	);
}

/** Square artwork column: a cover or screenshot, with an optional corner mark. */
function Media({
	src,
	alt,
	badge,
	badgeAlt,
	priority,
}: {
	src?: string;
	alt: string;
	badge?: string;
	badgeAlt?: string;
	priority?: boolean;
}) {
	return (
		<div
			style={{ width: MEDIA_SIZE, height: MEDIA_SIZE }}
			className="relative shrink-0 overflow-clip rounded-xl bg-gray-400/10 border border-gray-400/10"
		>
			{src && (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={`${MEDIA_SIZE}px`}
					priority={priority}
					className="object-cover"
				/>
			)}
			{badge && (
				<div
					className={cn(
						"absolute top-[5px] right-[5px] flex items-center justify-center overflow-clip rounded-md",
						CHIP,
					)}
				>
					<Image src={badge} alt={badgeAlt ?? ""} width={24} height={24} />
				</div>
			)}
		</div>
	);
}

/**
 * The shelf's 3D book, pulled open inside the square. Book3D reserves only its
 * spine's thickness and lets the open cover overhang — fine on a shelf, but a
 * lone book needs the offset and scale applied here to sit in the box the way
 * the design's cover did. The cover is taller than the square, so it clips at
 * the bottom, which is also what the design shows.
 */
function BookCover({ book }: { book: Book }) {
	return (
		<div
			style={{ width: MEDIA_SIZE, height: MEDIA_SIZE }}
			className="relative shrink-0 overflow-clip rounded-xl bg-gray-400/10 border border-gray-400/10"
		>
			{/* pointer-events-none: Book3D is a <button>, so without this it would
			    take the cursor and swallow the card's hover and click. */}
			{/* Rises into the square from below, clipped by the box on the way up.
			    The scale lives on this wrapper and the travel on the inner one, so
			    Motion's transform doesn't overwrite the scale. */}
			<div
				className="absolute origin-top-left pointer-events-none"
				// Book3D shifts its open cover left by its own 26px depth, and this
				// paddingLeft cancels that exactly — so the cover's left edge lands on
				// the wrapper origin at any scale, and BOOK_INSET reads the same on
				// the left as on the right. Height still overruns the square, so it
				// clips at the bottom by design.
				style={{
					top: BOOK_INSET,
					left: BOOK_INSET,
					paddingLeft: 26,
					transform: `scale(${BOOK_SCALE})`,
				}}
			>
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}
				>
					<Book3D book={book} open />
				</motion.div>
			</div>
		</div>
	);
}

function Footer({ children }: { children: ReactNode }) {
	return (
		<div className="flex items-center justify-between self-stretch">
			{children}
		</div>
	);
}

function CodeLink({ href }: { href: string }) {
	return (
			<TooltipTrigger
					payload="View code"
					// render, so the trigger IS the anchor rather than a button
					// wrapping one — nested interactive elements would break both.
					render={(props) => (
						<Link
							{...props}
							href={href}
							target="_blank"
							aria-label="View code"
						/>
					)}
					className={cn(
						"flex items-center justify-center size-[26px] rounded-full shrink-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700",
						CHIP,
					)}
				>
					<CodeIcon filled />
				</TooltipTrigger>

	);
}

export const Post = Object.assign(Root, {
	Body,
	Meta,
	Title,
	Description,
	Media,
	BookCover,
	Footer,
	CodeLink,
});
