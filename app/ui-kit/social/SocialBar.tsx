"use client";

import { Tooltip } from "@base-ui-components/react/tooltip";
import { useEffect, useRef, useState } from "react";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import { cn } from "../cn";
import { ChainLinkIcon } from "../icons/ChainLinkIcon";
import { FireIcon } from "../icons/FireIcon";
import { useSocial } from "./SocialProvider";

// Stable object: SlotText stashes options in a ref on every change, so a fresh
// literal each render is pointless churn. Rolls upward because the count only
// ever goes up, and skipUnchanged keeps 132 -> 133 to just the last digit.
const COUNT_ROLL = {
	direction: "up",
	duration: 220,
	stagger: 15,
	bounce: 0.4,
	skipUnchanged: true,
} as const;

// SlotText fills itself in a mount effect, so the span is empty during SSR.
// A 1ch floor keeps the pill from resizing when the digits land.
const COUNT_CLASS =
	"inline-block min-w-[1ch] text-[14px] font-[500] text-gray-500/75 tabular-nums";

// #6A72821A ring + the theme's own shadow-skew, straight from the design.
const SEGMENT =
	"flex items-center justify-center gap-1 h-6.5 w-fit bg-white ring-1 ring-gray-500/10 shadow-skew text-gray-500 hover:text-gray-700 transition-colors cursor-pointer";

function TooltipLabel({ children }: { children: React.ReactNode }) {
	return (
		<Tooltip.Portal>
			{/* z-50 clears Book3D's open cover (z-20) and the sticky filter bar
			    (z-30). A positive z-index paints above z-index:auto regardless of
			    DOM order, so being portaled to the body isn't enough on its own. */}
			<Tooltip.Positioner side="top" sideOffset={6} className="z-50">
				<Tooltip.Popup className="bg-gray-900 text-gray-50 font-[450] p-2 py-1 text-xs rounded-md">
					{children}
				</Tooltip.Popup>
			</Tooltip.Positioner>
		</Tooltip.Portal>
	);
}

export function SocialBar({
	slug,
	/** Path to the post, resolved against the current origin when copied. */
	sharePath,
	className,
}: {
	slug: string;
	sharePath: string;
	className?: string;
}) {
	const { counts, mine, bump } = useSocial(slug);
	const [copied, setCopied] = useState(false);
	const copiedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);

	useEffect(() => () => clearTimeout(copiedTimer.current), []);

	const reacted = mine.fire > 0;

	const onLink = async () => {
		bump("link");
		try {
			await navigator.clipboard.writeText(
				new URL(sharePath, window.location.origin).toString(),
			);
			setCopied(true);
			clearTimeout(copiedTimer.current);
			copiedTimer.current = setTimeout(() => setCopied(false), 1600);
		} catch {
			// Clipboard can be blocked; the count still went up.
		}
	};

	return (
		<Tooltip.Provider delay={200}>
			<div className={cn("flex items-start gap-px", className)}>
				<Tooltip.Root>
					<Tooltip.Trigger
						type="button"
						onClick={() => bump("fire")}
						aria-label={`Add a reaction. ${counts.fire} so far`}
						className={cn(SEGMENT, "rounded-l-full px-1.5")}
					>
						<FireIcon
							filled={reacted}
							className={cn(reacted && "text-[#FF5500]")}
						/>
						<SlotText
							text={String(counts.fire)}
							options={COUNT_ROLL}
							className={COUNT_CLASS}
						/>
					</Tooltip.Trigger>
					<TooltipLabel>
						{reacted ? "Add another reaction" : "Add a reaction"}
					</TooltipLabel>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger
						type="button"
						onClick={onLink}
						aria-label={`Copy link to this post. Copied ${counts.link} times`}
						className={cn(SEGMENT, "rounded-r-full pl-1.5 pr-2")}
					>
						<ChainLinkIcon />
						<SlotText
							text={String(counts.link)}
							options={COUNT_ROLL}
							className={COUNT_CLASS}
						/>
					</Tooltip.Trigger>
					<TooltipLabel>{copied ? "Copied" : "Copy link"}</TooltipLabel>
				</Tooltip.Root>
			</div>
		</Tooltip.Provider>
	);
}
