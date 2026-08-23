"use client";

import { BackIcon } from "@/app/ui-kit/icons/BackIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BackLink() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	// One level under /case-studies (e.g. /case-studies/tato) goes home; any
	// deeper nesting (e.g. /case-studies/tato/q2-reset) goes up one level
	// instead of skipping past the parent case study.
	const href =
		segments.length > 2 ? `/${segments.slice(0, -1).join("/")}` : "/";

	return (
		<Link
			href={href}
			className="inline-flex items-center bg-gray-400/10 hover:bg-gray-400/20 rounded-full py-1 px-2 gap-1.5 text-sm font-[500] text-gray-500 hover:text-gray-900 w-fit"
		>
			<BackIcon size={16} />
			Back
		</Link>
	);
}
