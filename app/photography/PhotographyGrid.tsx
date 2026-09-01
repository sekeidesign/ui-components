"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
	type LightboxRect,
	PhotoLightbox,
} from "../ui-kit/PhotoLightbox";

interface Photo {
	src: string;
	width: number;
	height: number;
	alt: string;
	span?: "full";
}

const photos: Photo[] = [
	{
		src: "/photography/stage-silhouette-phones.jpg",
		width: 2800,
		height: 1867,
		alt: "Artist silhouetted on stage under warm light, phones raised in the crowd below",
		span: "full",
	},
	{
		src: "/photography/dj-booth-lasers.jpg",
		width: 2800,
		height: 1867,
		alt: "DJ booth lit by blue laser trails in a packed club",
		span: "full",
	},
	{
		src: "/photography/duo-artist-pink-stage.jpg",
		width: 2800,
		height: 1867,
		alt: "Two artists performing together under pink stage light",
		span: "full",
	},
	{
		src: "/photography/artist-silhouette-crowd.jpg",
		width: 2800,
		height: 1867,
		alt: "Artist silhouetted against a glowing neon sign, crowd cheering",
		span: "full",
	},
	{
		src: "/photography/dj-green-cap-crowd.jpg",
		width: 2800,
		height: 1867,
		alt: "DJ in a green cap pointing to an outdoor crowd at dusk",
		span: "full",
	},
	{
		src: "/photography/shoulders-crowd-cheer.jpg",
		width: 2800,
		height: 1867,
		alt: "A woman cheering on someone's shoulders in a festival crowd at golden hour",
		span: "full",
	},
	{
		src: "/photography/three-girls-shoulders.jpg",
		width: 2800,
		height: 1867,
		alt: "Three women on shoulders, arms raised, in a festival crowd",
		span: "full",
	},
	{
		src: "/photography/bubbles-golden-hour.jpg",
		width: 1333,
		height: 2000,
		alt: "A woman blowing bubbles at golden hour in a festival crowd",
	},
	{
		src: "/photography/kirby-crowd.jpg",
		width: 1333,
		height: 2000,
		alt: "A festival-goer holding up a Kirby plush, mirrored sunglasses reflecting the crowd",
	},
	{
		src: "/photography/archive-01.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-02.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-03.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-04.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-05.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-06.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-07.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-08.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-09.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-10.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-11.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-12.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-13.webp",
		width: 2000,
		height: 3000,
		alt: "Concert & festival photography",
	},
	{
		src: "/photography/archive-14.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-15.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-16.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-17.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-18.webp",
		width: 3000,
		height: 2000,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-19.webp",
		width: 3000,
		height: 1990,
		alt: "Concert & festival photography",
		span: "full",
	},
	{
		src: "/photography/archive-20.webp",
		width: 3000,
		height: 1990,
		alt: "Concert & festival photography",
		span: "full",
	},
];

export function PhotographyGrid() {
	const refs = useRef<(HTMLButtonElement | null)[]>([]);
	const [active, setActive] = useState<{
		index: number;
		start: LightboxRect;
	} | null>(null);

	const open = useCallback((index: number) => {
		const el = refs.current[index];
		if (!el) return;
		const rect = el.getBoundingClientRect();
		setActive({
			index,
			start: {
				left: rect.left,
				top: rect.top,
				width: rect.width,
				height: rect.height,
			},
		});
	}, []);

	const getHome = useCallback((index: number): LightboxRect | null => {
		const el = refs.current[index];
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height,
		};
	}, []);

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-px grid-flow-row-dense">
				{photos.map((photo, index) => (
					<button
						type="button"
						key={photo.src}
						ref={(el) => {
							refs.current[index] = el;
						}}
						className={`panel block w-full overflow-hidden cursor-zoom-in ${
							photo.span === "full" ? "col-span-1 md:col-span-2" : ""
						} ${active?.index === index ? "invisible" : ""}`}
						onClick={() => open(index)}
					>
						<Image
							src={photo.src}
							width={photo.width}
							height={photo.height}
							alt={photo.alt}
							className="w-full h-auto"
							sizes="(min-width: 768px) 50vw, 100vw"
						/>
					</button>
				))}
			</div>

			{active &&
				(() => {
					const photo = photos[active.index];
					return (
						<PhotoLightbox
							photo={photo}
							start={active.start}
							getHome={() => getHome(active.index)}
							onClosed={() => setActive(null)}
						/>
					);
				})()}
		</>
	);
}
