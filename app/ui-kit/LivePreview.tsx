"use client";

import { useInView } from "motion/react";
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
	/** Mount immediately instead of waiting for scroll. For above-the-fold. */
	eager?: boolean;
	className?: string;
}

export function LivePreview({
	slug,
	previewCost,
	previewHeight,
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
			// The card is a link, but this surface is interactive in its own right —
			// this marks it as excluded from the card's hover fill and click.
			data-no-card-link
			style={{ minHeight: previewHeight }}
			className={cn(
				"relative flex items-center justify-center self-stretch w-full min-h-60 p-10 rounded-xl overflow-clip bg-white ring-1 ring-gray-200 shadow-skew cursor-default",
				className,
			)}
		>
			{mounted && Preview && (
				<PreviewActiveProvider value={eager || visible}>
					<Preview />
				</PreviewActiveProvider>
			)}
		</div>
	);
}
