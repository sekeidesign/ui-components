// components/OpenGraphPreview.tsx
"use client";

import { HoverCard } from "@ark-ui/react/hover-card";
import { Portal } from "@ark-ui/react/portal";
import Image from "next/image";
import { useEffect, useState } from "react";

type OGData = {
	title?: string;
	image?: string;
	description?: string;
};

// Helper function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = text;
	return textarea.value;
};

const OpenGraphPreview = ({
	url,
	children,
}: {
	url: string;
	children: React.ReactNode;
}) => {
	const [og, setOg] = useState<OGData | null>(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchOG = async () => {
			try {
				const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
				const data = await res.json();
				if (res.ok) setOg(data);
				else setError(data.error || "Failed to fetch");
			} catch (e) {
				setError(`Something went wrong: ${e}`);
			}
		};

		fetchOG();
	}, [url]);

	if (error) return <p>Error: {error}</p>;
	if (!og?.title && !og?.description && !og?.image) return children;

	return (
		<HoverCard.Root
			lazyMount
			openDelay={250}
			closeDelay={0}
			positioning={{ placement: "top" }}
		>
			<HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
			<Portal>
				<HoverCard.Positioner>
					<HoverCard.Content className="z-[1000] relative">
						<div
							className="border p-3 bg-white border-gray-200 shadow-xl rounded-xl max-w-xs space-y-1 hover-card-animate"
							style={{ fontFamily: "var(--font-geist-sans)" }}
						>
							{og.image && (
								<Image
									src={og.image}
									alt={`${og.title} og image`}
									className="w-full h-auto mb-2 rounded-sm"
									width={600}
									height={400}
								/>
							)}
							{og.title && (
								<h2 className="text-base font-[500] text-gray-700 line-clamp-1">
									{decodeHtmlEntities(og.title)}
								</h2>
							)}
							{og.description && (
								<p className="text-xs text-gray-500 line-clamp-2">
									{decodeHtmlEntities(og.description)}
								</p>
							)}
						</div>
					</HoverCard.Content>
				</HoverCard.Positioner>
			</Portal>
		</HoverCard.Root>
	);
};

export { OpenGraphPreview };
