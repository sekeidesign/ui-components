import Image from "next/image";
import { cn } from "../cn";
import { SURFACE_INNER } from "./surface";

/** A company or app mark in the same nested frame as the media surface. */
export function FramedIcon({
	src,
	alt,
	size,
}: {
	src: string;
	alt: string;
	size: number;
}) {
	return (
		// Tighter and white, rather than the media surface's p-1 gray-100 frame: a
		// logo is small enough that a wide tinted bezel swallows it.
		<div className="shrink-0 rounded-lg p-0.5 bg-white ring ring-gray-500/10 shadow-skew overflow-hidden">
			<div className={cn("flex rounded-md", SURFACE_INNER)}>
				<Image src={src} alt={alt} width={size} height={size} />
			</div>
		</div>
	);
}
