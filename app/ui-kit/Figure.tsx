"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "./cn";
import { PhotoLightbox, type LightboxRect } from "./PhotoLightbox";

interface FigureProps {
	src: string;
	alt: string;
	caption?: string;
}

// Drop screenshots into case studies with this instead of raw markdown
// images — edit src/alt/caption directly, no need to touch mdx-components.tsx.
export function Figure({ src, alt, caption }: FigureProps) {
	const imgRef = useRef<HTMLImageElement>(null);
	// Case-study screenshots have no known dimensions up front (unlike the
	// photography grid's data array), so the lightbox's aspect ratio is
	// read off the loaded <img>'s natural size at click time instead.
	const [open, setOpen] = useState<{
		start: LightboxRect;
		width: number;
		height: number;
	} | null>(null);

	const getHome = useCallback((): LightboxRect | null => {
		const el = imgRef.current;
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
	}, []);

	const openLightbox = () => {
		const el = imgRef.current;
		const home = getHome();
		if (!el || !home || !el.naturalWidth) return;
		setOpen({ start: home, width: el.naturalWidth, height: el.naturalHeight });
	};

	return (
		<figure className="my-6 p-1 rounded-xl bg-gray-50 shadow-skew ring ring-gray-500/10">
			{/* eslint-disable-next-line @next/next/no-img-element -- arbitrary
			case-study screenshots without known dimensions. */}
			<img
				ref={imgRef}
				src={src}
				alt={alt}
				className={cn(
					"w-full h-auto rounded-lg border border-gray-200 shadow-skew bg-white cursor-zoom-in",
					open && "invisible",
				)}
				onClick={openLightbox}
			/>
			{caption && (
				<figcaption className="p-1 pt-2 text-sm text-gray-400">
					{caption}
				</figcaption>
			)}
			{open && (
				<PhotoLightbox
					photo={{ src, alt, width: open.width, height: open.height }}
					start={open.start}
					getHome={getHome}
					onClosed={() => setOpen(null)}
				/>
			)}
		</figure>
	);
}
