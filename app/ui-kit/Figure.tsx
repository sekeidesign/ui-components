interface FigureProps {
	src: string;
	alt: string;
	caption?: string;
}

// Drop screenshots into case studies with this instead of raw markdown
// images — edit src/alt/caption directly, no need to touch mdx-components.tsx.
export function Figure({ src, alt, caption }: FigureProps) {
	return (
		<figure className="my-6">
			{/* eslint-disable-next-line @next/next/no-img-element -- arbitrary
			case-study screenshots without known dimensions. */}
			<img
				src={src}
				alt={alt}
				className="w-full h-auto rounded-md border border-gray-200 shadow-skew bg-white"
			/>
			{caption && (
				<figcaption className="mt-2 text-sm text-gray-400">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
