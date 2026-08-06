interface CaseStudyHeaderProps {
	eyebrow: string;
	title: string;
	description?: string;
}

export function CaseStudyHeader({
	eyebrow,
	title,
	description,
}: CaseStudyHeaderProps) {
	return (
		<header className="mb-8">
			<p className="text-sm font-[500] text-gray-400 mb-3">{eyebrow}</p>
			<h1 className="text-2xl md:text-3xl font-[550] text-gray-900 leading-tight mb-0">
				{title}
			</h1>
			{description && (
				<p className="mt-3 text-gray-500 text-[15px] font-[420] leading-relaxed">
					{description}
				</p>
			)}
			<hr className="border-gray-200 mt-8" />
		</header>
	);
}
