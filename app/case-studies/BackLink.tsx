"use client";

import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BackLink() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	// One level under /case-studies (e.g. /case-studies/tato) goes home; any
	// deeper nesting (e.g. /case-studies/tato/q2-reset) goes up one level
	// instead of skipping past the parent case study.
	const href = segments.length > 2 ? `/${segments.slice(0, -1).join("/")}` : "/";

	return (
		<Link
			href={href}
			className="inline-flex items-center gap-1.5 text-sm font-[500] text-gray-500 hover:text-gray-900 transition-colors w-fit"
		>
			<ArrowLeftIcon className="w-3.5 h-3.5" />
			Back
		</Link>
	);
}
