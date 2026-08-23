import { Book3D, BOOK_HEIGHT, BOOK_WIDTH } from "./book-shelf";
import { StarRating } from "./StarRating";

interface BookMetaProps {
	slug: string;
	title: string;
	author?: string;
	rating?: number;
	cover?: string;
	spineColor?: string;
}

// Book3D reserves only its spine's thickness in layout and lets the opened
// cover overhang — that's what lets a shelf pack books tightly. A single book
// has no shelf to overhang into, so the wrapper reserves the cover's full
// width and pads left by the amount the open pose shifts back.
const OPEN_OFFSET = 28;

export function BookMeta({
	slug,
	title,
	author,
	rating,
	cover,
	spineColor,
}: BookMetaProps) {
	return (
		<div className="flex items-center gap-6">
			{cover && (
				<div
					className="shrink-0"
					style={{ width: BOOK_WIDTH, height: BOOK_HEIGHT, paddingLeft: OPEN_OFFSET }}
				>
					<Book3D
						book={{
							id: slug,
							title,
							author: author ?? "",
							cover,
							spineColor: spineColor ?? "#4a5568",
							rating: rating ?? 0,
						}}
						open
					/>
				</div>
			)}
			<div className="flex flex-col gap-1.5">
				{author && (
					<span className="text-sm font-[420] text-gray-500">{author}</span>
				)}
				{rating !== undefined && <StarRating rating={rating} />}
			</div>
		</div>
	);
}
