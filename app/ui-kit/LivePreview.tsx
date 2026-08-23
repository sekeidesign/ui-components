"use client";

import { CommandLineIcon } from "@heroicons/react/16/solid";
import { useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "./cn";
import { previews } from "@/content/previews.generated";
import { PreviewActiveProvider } from "@/lib/preview-active";
import type { PreviewCost } from "@/lib/timeline";

interface LivePreviewProps {
	slug: string;
	previewCost: PreviewCost;
	/** Reserved px, so mount/unmount never shifts the feed below it. */
	previewHeight: number;
	sourceUrl?: string;
	/** Mount immediately instead of waiting for scroll. For above-the-fold. */
	eager?: boolean;
	className?: string;
}

export function LivePreview({
	slug,
	previewCost,
	previewHeight,
	sourceUrl,
	eager = false,
	className,
}: LivePreviewProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Two thresholds, deliberately asymmetric: mount early off a generous
	// margin, run animation only once genuinely on screen. Stops the
	// mount/unmount thrash you get from a single boundary.
	const nearby = useInView(ref, { margin: "400px" });
	const visible = useInView(ref, { amount: 0.3 });

	const [everNearby, setEverNearby] = useState(false);
	useEffect(() => {
		if (nearby) setEverNearby(true);
	}, [nearby]);

	// Module-scope lazy component. Creating one during render blanks the route
	// when it suspends mid-hydration — see scripts/generate-previews.mjs.
	const Preview = previews[slug];

	// `heavy` follows the nearby band in both directions; `light` mounts once
	// and stays, so interaction state survives scrolling away and back.
	const mounted =
		eager || (previewCost === "heavy" ? nearby : nearby || everNearby);

	return (
		<div
			ref={ref}
			style={{ minHeight: previewHeight }}
			className={cn(
				"relative shadow-skew flex items-center justify-center rounded-xl ring-1 ring-gray-200 w-full p-10 h-fit bg-white overflow-hidden",
				className,
			)}
		>
			{sourceUrl && (
				<Link
					href={sourceUrl}
					target="_blank"
					title="View source code"
					className="absolute top-2 right-2 z-10 bg-gray-200/60 hover:bg-gray-200 hover:text-gray-700 size-7 flex items-center justify-center rounded-md text-gray-500"
				>
					<CommandLineIcon className="w-4 h-4" />
				</Link>
			)}
			{mounted && Preview && (
				<PreviewActiveProvider value={eager || visible}>
					<Preview />
				</PreviewActiveProvider>
			)}
		</div>
	);
}
