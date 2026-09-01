"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "./cn";
import { PhotoLightbox, type LightboxRect } from "./PhotoLightbox";

interface FigureProps {
	src: string;
	alt: string;
	caption?: string;
}

export function Figure({ src, alt, caption }: FigureProps) {
	const imgRef = useRef<HTMLImageElement>(null);
	// Case-study screenshots have no known dimensions, so the lightbox ratio is
	// read off the loaded <img> at click time.
	const [open, setOpen] = useState<{
		start: LightboxRect;
		width: number;
		height: number;
	} | null>(null);

	const getHome = useCallback((): LightboxRect | null => {
		const el = imgRef.current;
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height,
		};
	}, []);

	const openLightbox = () => {
		const el = imgRef.current;
		const home = getHome();
		if (!el || !home || !el.naturalWidth) return;
		setOpen({ start: home, width: el.naturalWidth, height: el.naturalHeight });
	};

	return (
		<figure className="my-6 p-1 rounded-xl bg-gray-50 shadow-skew ring ring-gray-500/10">
			<button
				type="button"
				onClick={openLightbox}
				className="block w-full cursor-zoom-in"
				aria-label={`Expand image: ${alt}`}
			>
				{/* eslint-disable-next-line @next/next/no-img-element -- arbitrary
				case-study screenshots without known dimensions. */}
				<img // react-doctor-disable-line nextjs-no-img-element -- arbitrary media, with no intrinsic size for next/image to work from
					ref={imgRef}
					src={src}
					alt={alt}
					className={cn(
						"w-full h-auto rounded-lg border border-gray-200 shadow-skew bg-white",
						open && "invisible",
					)}
				/>
			</button>
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
