import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { ICON_PRESS } from "./press";

/**
 * The call to action on a launch post, borrowing the primary-button treatment
 * from the course site's header: a gray-900 base with a top-down sheen from
 * gray-800, a darker ring, and a faint inner highlight. On hover the sheen
 * darkens and both shadows pull back, so it reads as pressing in rather than
 * lighting up.
 *
 * Sized to the social chips beside it — 26px tall, 14px label — so the footer
 * reads as one row of controls.
 */
export function OutboundLink({
	href,
	label = "Download",
}: {
	href: string;
	label?: string;
}) {
	return (
		<Link
			href={href}
			target="_blank"
			className="group inline-flex items-center justify-center gap-1 h-6.5 w-fit shrink-0 rounded-full pl-2.5 pr-2 text-[14px] leading-[1.43] font-[550] text-white bg-gray-900 bg-linear-to-b from-gray-800 hover:from-gray-950 ring ring-gray-950 inset-shadow-xs inset-shadow-gray-100/20 hover:inset-shadow-none shadow-md hover:shadow-sm transition-shadow duration-100"
		>
			{label}
			<ArrowUpRightIcon className={`size-3.5 ${ICON_PRESS}`} />
		</Link>
	);
}
