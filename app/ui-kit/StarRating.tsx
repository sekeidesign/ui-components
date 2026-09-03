import { StarIcon } from "./icons/StarIcon";
import { cn } from "./cn";

export function StarRating({
	rating,
	size = 14,
	className,
}: {
	rating: number;
	size?: number;
	className?: string;
}) {
	return (
		<div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5`}>
			{Array.from({ length: 5 }, (_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length star row
				<StarIcon
					key={i}
					size={size}
					className={cn(i < rating ? "text-gray-800" : "text-gray-300")}
				/>
			))}
		</div>
	);
}
