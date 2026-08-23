import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface OutboundLinkProps {
	href: string;
	/** Defaults to the bare hostname, so a launch post needs only `link`. */
	label?: string;
}

export function OutboundLink({ href, label }: OutboundLinkProps) {
	let fallback = href;
	try {
		fallback = new URL(href).hostname.replace(/^www\./, "");
	} catch {
		// Registry validates the URL shape, so this only trips on odd edge cases.
	}

	return (
		<Link
			href={href}
			target="_blank"
			className="inline-flex items-center gap-1.5 w-fit rounded-full bg-gray-900 hover:bg-gray-700 text-gray-50 text-sm font-[500] py-1.5 px-3"
		>
			{label ?? fallback}
			<ArrowUpRightIcon className="size-3.5" />
		</Link>
	);
}
