import Image from "next/image";
import { cn } from "./cn";

/**
 * The portrait treatment from the old home panel: a white bezel and a hairline
 * ring, so it reads as a physical object rather than a cropped circle.
 */
export function Avatar({
	size = 64,
	className,
}: {
	size?: number;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"size-fit bg-white rounded-full ring ring-gray-500/10 shadow-md p-0.5",
				className,
			)}
		>
			<div className="size-full relative">
				<Image
					src="/avatar.jpg"
					alt="PG Gonni"
					width={size}
					height={size}
					style={{ width: size, height: size }}
					className="rounded-full object-cover ring ring-gray-500/10 shadow-sm relative z-10"
				/>
			</div>
		</div>
	);
}
