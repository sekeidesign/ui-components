"use client";

import { m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, PointerEventHandler, ReactNode } from "react";
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
import {
	Book3D,
	BOOK_HEIGHT,
	BOOK_OPEN_SHIFT,
	BOOK_WIDTH,
	type Book,
} from "../book-shelf";
import { TooltipTrigger } from "../Tooltip";
import { ICON_PRESS } from "../press";
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

/** The nested-bezel surface from Problems: a gray-100 ringed frame holding a white ringed card. */
const SURFACE_OUTER =
	"ring ring-gray-500/10 bg-gray-100 shadow-skew overflow-hidden p-1";
const SURFACE_INNER =
	"ring ring-gray-500/10 bg-white shadow-skew overflow-hidden";

/** A company or app mark in the same nested frame as the media surface. */
function FramedIcon({
	src,
	alt,
	size,
}: {
	src: string;
	alt: string;
	size: number;
}) {
	return (
		// Tighter and white, rather than the media surface's p-1 gray-100 frame: a
		// logo is small enough that a wide tinted bezel swallows it.
		<div className="shrink-0 rounded-lg p-0.5 bg-white ring ring-gray-500/10 shadow-skew overflow-hidden">
			<div className={cn("flex rounded-md", SURFACE_INNER)}>
				<Image src={src} alt={alt} width={size} height={size} />
			</div>
		</div>
	);
}

/** The screen-md column minus the card's md:p-8, for full-width image sizing. */
const COLUMN_INNER = 768 - 64;

/**
 * Phone geometry from the design. Taller than the square on purpose: the device
 * runs off the bottom and a gradient dissolves it into the surface.
 */
const PHONE = { width: 120, height: 257, top: 1, fade: 79 };

/**
 * A book has no frame or background. Keeps MEDIA_SIZE's width so every card's
 * media lines up in the same column, but a shorter height.
 */
const BOOK_BOX_WIDTH = MEDIA_SIZE;
const BOOK_BOX_HEIGHT = 130;

/**
 * Projected width of Book3D's open cover at scale 1, in px.
 *
 * Not simply its 132px width: the cover rotates -16° about its own left edge,
 * foreshortening it to 132·cos(16°) ≈ 127, and the parent's 900px perspective
 * then magnifies the near edge by ~1.04.
 */
const BOOK_PROJECTED_WIDTH = 130.5;

/** How far Book3D shifts its open cover left of its own layout box. */
const BOOK_OPEN_DEPTH = BOOK_WIDTH - BOOK_OPEN_SHIFT;

/**
 * Center of the open cover's footprint, in Book3D's local coordinates. Used as
 * the wrapper's transform-origin, so scaling and rotating around the cover's
 * own center keeps it centered in the box at any scale or angle.
 */
const BOOK_PIVOT_X = -BOOK_OPEN_DEPTH + BOOK_PROJECTED_WIDTH / 2;
const BOOK_PIVOT_Y = BOOK_HEIGHT / 2;

/** Margin the cover leaves inside BOOK_BOX_HEIGHT. Well past what fitting requires — a book is meant to look small. */
const BOOK_MARGIN = 24;

/** Derived, so BOOK_MARGIN is the only number to tune. */
const BOOK_SCALE = (BOOK_BOX_HEIGHT - BOOK_MARGIN) / BOOK_HEIGHT;

/** A few degrees off vertical, like a book set down rather than shelved. */
const BOOK_TILT = 7;

/**
 * drop-shadow, not box-shadow: a box-shadow follows the untransformed element's
 * rectangle and would sit skewed under a tilted cover. Values are in this
 * wrapper's pre-scale space, so they end up BOOK_SCALE× smaller in the card.
 */
const BOOK_SHADOW =
	"drop-shadow(0 26px 24px rgba(15,23,42,0.22)) drop-shadow(0 10px 10px rgba(15,23,42,0.16))";

/**
 * How a card arranges its copy and its artwork.
 *
 * `aside` — artwork beside the copy at every width, for a book cover or phone.
 * `column` — one column at every width; a screenshot runs full width inside
 *   it, in the slot a live demo occupies on an experiment.
 */
export type PostLayout = "aside" | "column";

function Root({
	children,
	className,
	id,
	/** Post page, if it has one. Makes the whole card a click target. */
	href,
	layout = "column",
	onPointerEnter,
	onPointerLeave,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
	href?: string;
	layout?: PostLayout;
	onPointerEnter?: PointerEventHandler<HTMLDivElement>;
	onPointerLeave?: PointerEventHandler<HTMLDivElement>;
}) {
	return (
		<PostRow
			id={id}
			href={href}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			className={cn(
				"p-2 md:p-8",
				layout === "aside" && "flex flex-row items-center gap-6 md:gap-8",
				// No items-start: the body has to fill the card's width, or a live demo
				// or cover inside it shrink-wraps to its own copy.
				layout === "column" && "flex flex-col gap-2.5",
				className,
			)}
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

function Meta({
	kind,
	date,
	draft,
}: {
	kind: EntryKind;
	date: string;
	draft?: boolean;
}) {
	const { label, Icon } = KIND_META[kind];

	return (
		<div className="flex items-center gap-1 self-stretch text-gray-400">
			<Icon filled />
			<span className="text-[13px] leading-[1.43] font-[500]">{label}</span>
			<span className="px-1 text-[13px] leading-[1.43] font-[500]">•</span>
			<time
				dateTime={date}
				className="shrink-0 text-[13px] leading-[1.43] font-[500]"
			>
				{DATE_FORMAT.format(new Date(`${date}T00:00:00Z`))}
			</time>
			{/* Dev only, since drafts never reach production — but without it there's no
			    way to tell a draft from a published post while working. */}
			{draft && (
				<span className="ml-auto shrink-0 text-[12px] leading-[1.33] font-mono font-[450] text-[#FF5500]">
					Draft
				</span>
			)}
		</div>
	);
}

/**
 * Short month name rather than dateStyle: "short" — all-numeric dates are hard
 * to tell apart in a list. UTC, since a post's date is a plain yyyy-mm-dd and
 * parsing it locally would shift it a day west of Greenwich.
 */
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
	month: "short",
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
					{icon && <FramedIcon src={icon} alt={iconAlt ?? ""} size={40} />}
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

/** A cover or screenshot at its own ratio, full width — the slot an experiment fills with its live demo. */
function Media({
	src,
	alt,
	badge,
	badgeAlt,
	priority,
	/** The image's own ratio as CSS aspect-ratio, e.g. "2000 / 1374". */
	aspect,
}: {
	src?: string;
	alt: string;
	badge?: string;
	badgeAlt?: string;
	priority?: boolean;
	aspect?: string;
}) {
	return (
		<div className={cn("self-stretch w-full rounded-xl", SURFACE_OUTER)}>
			<div
				style={{ aspectRatio: aspect }}
				className={cn("relative w-full rounded-lg", SURFACE_INNER)}
			>
				{src && (
					<Image
						src={src}
						alt={alt}
						fill
						// The column caps at screen-md and the card spends 64px of it on
						// padding, so a cover never needs more than what is left.
						sizes={`(min-width: 768px) ${COLUMN_INNER}px, 100vw`}
						priority={priority}
						className="object-cover"
					/>
				)}
				{badge && (
					<div className="absolute top-[5px] right-[5px]">
						<FramedIcon src={badge} alt={badgeAlt ?? ""} size={24} />
					</div>
				)}
			</div>
		</div>
	);
}

/** A screenshot in a phone: a rounded rect with a hairline outline and a layered shadow, no bezel artwork. */
function PhoneMedia({
	src,
	alt,
	priority,
}: {
	src: string;
	alt: string;
	priority?: boolean;
}) {
	return (
		// No surface behind a phone: the device carries its own outline and
		// shadow, and the card's own background reads as the space around it.
		<div
			style={{ width: MEDIA_SIZE, height: MEDIA_SIZE }}
			className="relative shrink-0 overflow-clip rounded-xl"
		>
			<div className="absolute inset-0">
				<div
					style={{
						width: PHONE.width,
						height: PHONE.height,
						top: PHONE.top,
						boxShadow:
							"0 8px 24px #99a1af1a, 0 4px 12px #99a1af1a, 0 2px 3px #99a1af1a",
					}}
					className="absolute left-1/2 -translate-x-1/2 overflow-clip rounded-xl outline outline-1 outline-gray-400/15 bg-white"
				>
					<Image
						src={src}
						alt={alt}
						fill
						sizes={`${PHONE.width}px`}
						priority={priority}
						className="object-cover"
					/>
				</div>

				{/* A layer over the top, not a mask on the device: a mask applies to the
				    element's whole rendering, box-shadow included. The cost is being
				    colour-coupled to the card behind, hence gray-100. */}
				<div
					style={{
						height: PHONE.fade,
						bottom: 0,
						// --post-bg is set by the card and follows its hover state; the
						// fallback covers a card that never hovers, like a post page.
						backgroundImage:
							"linear-gradient(to bottom, transparent, var(--post-bg, var(--color-gray-100)))",
					}}
					className="absolute inset-x-0"
				/>

			</div>
		</div>
	);
}

/**
 * An app's own icon, as Title's trailingIcon on a launch post: PhoneMedia's
 * mockup is too wide for a narrow column, so mobile drops it for the icon
 * inline with the title.
 */
function AppIcon({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="relative shrink-0 size-12 overflow-hidden rounded-[14px] shadow-xl shadow-blue-600/25 ring ring-slate-500/15">
			<Image src={src} alt={alt} fill sizes="48px" className="object-cover" />
		</div>
	);
}

/**
 * The shelf's 3D book, pulled open and shrunk into a plain box with no surface,
 * ring or background. No hover openMore — the page-edge face is a flat,
 * untextured strip.
 */
function BookCover({ book }: { book: Book }) {
	return (
		<div
			style={{ width: BOOK_BOX_WIDTH, height: BOOK_BOX_HEIGHT }}
			className="relative shrink-0"
		>
			{/* Positioned so BOOK_PIVOT sits at the box's center, then scaled and tilted
			    around that point. The travel lives on the inner m.div so Motion's
			    transform doesn't fight the static one. pointer-events-none because Book3D
			    is a <button> and would otherwise swallow the card's hover and click. */}
			<div
				className="absolute pointer-events-none"
				style={{
					left: BOOK_BOX_WIDTH / 2 - BOOK_PIVOT_X,
					top: BOOK_BOX_HEIGHT / 2 - BOOK_PIVOT_Y,
					transformOrigin: `${BOOK_PIVOT_X}px ${BOOK_PIVOT_Y}px`,
					transform: `scale(${BOOK_SCALE}) rotate(${BOOK_TILT}deg)`,
					filter: BOOK_SHADOW,
				}}
			>
				<m.div
					initial={{ y: 40, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ type: "spring", duration: 0.6, bounce: 0.25 }}
				>
					<Book3D book={book} open />
				</m.div>
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
						"group flex items-center justify-center size-[26px] rounded-full shrink-0 text-gray-500 hover:bg-gray-50",
						CHIP,
					)}
				>
					<CodeIcon filled className={ICON_PRESS} />
				</TooltipTrigger>

	);
}

export const Post = Object.assign(Root, {
	Body,
	Meta,
	Title,
	Description,
	Media,
	PhoneMedia,
	AppIcon,
	BookCover,
	Footer,
	CodeLink,
});
