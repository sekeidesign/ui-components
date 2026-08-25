import Image from "next/image";
import { cn } from "./cn";

interface CoverProps {
	src: string;
	alt: string;
	/** CSS aspect-ratio string, e.g. "16 / 9". */
	aspect?: string;
	className?: string;
	/** Above-the-fold covers skip lazy loading. */
	priority?: boolean;
}

export function Cover({
	src,
	alt,
	aspect = "16 / 9",
	className,
	priority,
}: CoverProps) {
	return (
		<div
			style={{ aspectRatio: aspect }}
			className={cn(
				"relative w-full overflow-hidden rounded-xl ring-1 ring-gray-200 bg-white shadow-skew",
				className,
			)}
		>
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				// Feed column caps at screen-md, so never fetch more than that.
				sizes="(max-width: 768px) 100vw, 768px"
				className="object-cover"
			/>
		</div>
	);
}
