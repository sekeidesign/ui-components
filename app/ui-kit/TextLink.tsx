"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

interface TextLinkProps {
	href: string;
	children: ReactNode;
	target?: string;
	hasFavicon?: boolean;
}

export const TextLink = ({
	href,
	children,
	target = "_blank",
	hasFavicon = false,
}: TextLinkProps) => {
	const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!hasFavicon) return;

		const fetchFavicon = async () => {
			setIsLoading(true);
			try {
				const url = new URL(href);
				const faviconUrl = `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
				setFaviconUrl(faviconUrl);
			} catch (error) {
				console.warn("Failed to parse URL for favicon:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFavicon();
	}, [href, hasFavicon]);

	return (
		<Link
			href={href}
			className={`text-gray-900 group font-[500] relative no-underline inline-flex items-center px-0.5 ${isLoading ? "opacity-50 animate-pulse" : ""} ${hasFavicon ? "gap-1 pl-4 ml-px" : ""}`}
			target={target}
		>
			<span className="group-hover:opacity-50 group-hover:scale-100 absolute w-[calc(100%+4px)] h-full -left-0.5 top-0 bg-gray-200 rounded-md -z-10 opacity-0 scale-50 transition-all duration-200" />
			{hasFavicon && faviconUrl && (
				<Image
					src={faviconUrl}
					alt=""
					className="w-3 h-3 rounded-sm absolute left-0"
					onError={() => setFaviconUrl(null)}
					width={12}
					height={12}
				/>
			)}
			{children}
		</Link>
	);
};

export type { TextLinkProps };
