import { StarIcon } from "./icons/StarIcon";
import { cn } from "./cn";

export function StarRating({
	rating,
	size = 14,
}: {
	rating: number;
	size?: number;
}) {
	return (
		<div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
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
