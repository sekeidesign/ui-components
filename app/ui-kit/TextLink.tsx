"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { OpenGraphPreview } from "./OpenGraphPreview";

interface TextLinkProps {
	href: string;
	children: ReactNode;
	target?: string;
	hasFavicon?: boolean;
	/** Skip origin/favicon.ico auto-detection (and its Google-favicon
	 * fallback) and use this local asset instead — for sites whose real
	 * favicon doesn't resolve cleanly. */
	favicon?: string;
}

export const TextLink = ({
	href,
	children,
	target = "_blank",
	hasFavicon = false,
	favicon,
}: TextLinkProps) => {
	const [faviconUrl, setFaviconUrl] = useState<string | null>(favicon ?? null);
	const [usedFallback, setUsedFallback] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!hasFavicon || favicon) return;

		setIsLoading(true);
		try {
			const url = new URL(href);
			setFaviconUrl(`${url.origin}/favicon.ico`);
			setUsedFallback(false);
		} catch (error) {
			console.warn("Failed to parse URL for favicon:", error);
		} finally {
			setIsLoading(false);
		}
	}, [href, hasFavicon, favicon]);

	const handleFaviconError = () => {
		if (favicon || usedFallback) {
			setFaviconUrl(null);
			return;
		}

		try {
			const url = new URL(href);
			setFaviconUrl(`https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`);
			setUsedFallback(true);
		} catch {
			setFaviconUrl(null);
		}
	};

	return (
		<OpenGraphPreview url={href}>
			<Link
				href={href}
				className={`text-gray-900 group font-[500] relative no-underline inline-flex items-center px-0.5 ${isLoading ? "opacity-50 animate-pulse" : ""} ${hasFavicon ? "gap-1 pl-4.5 ml-px" : ""}`}
				target={target}
			>
				<span className="group-hover:opacity-50 group-hover:scale-100 absolute w-[calc(100%+4px)] h-full -left-0.5 top-0 bg-gray-200 rounded-md -z-10 opacity-0 scale-50 transition-all duration-200" />
				{hasFavicon && faviconUrl && (
					<Image
						src={faviconUrl}
						alt=""
						className="w-3 h-3 rounded-sm absolute left-0.5"
						onError={handleFaviconError}
						width={12}
						height={12}
					/>
				)}
				{children}
			</Link>
		</OpenGraphPreview>
	);
};

export type { TextLinkProps };
