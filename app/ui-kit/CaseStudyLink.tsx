import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface CaseStudyLinkProps {
	href: string;
	title: string;
	description: string;
}

export function CaseStudyLink({
	href,
	title,
	description,
}: CaseStudyLinkProps) {
	return (
		<Link
			href={href}
			className="group flex items-center justify-start gap-3 my-6"
		>
			<div className="w-11 h-13 bg-gray-100 rounded-md ring ring-gray-500/10 shadow-skew flex flex-col p-0.5 gap-1">
				<div className="w-full h-full bg-white rounded-sm ring ring-gray-500/10 shadow-skew">
					<div className="w-full h-full  flex flex-col p-1 gap-1 mask-b-from-2">
						<div className="w-4 h-[3px] bg-gray-500/20 rounded-full mb-1 shrink-0"></div>
						<div className="w-8 h-[3px] bg-gray-500/20 rounded-full shrink-0"></div>
						<div className="w-6 h-[3px] bg-gray-500/20 rounded-full shrink-0"></div>
						<div className="w-7 h-[3px] bg-gray-500/20 rounded-full shrink-0 mb-1"></div>
						<div className="w-6 h-[3px] bg-gray-500/20 rounded-full shrink-0"></div>
						<div className="w-8 h-[3px] bg-gray-500/20 rounded-full shrink-0"></div>
					</div>
				</div>
			</div>
			<div className="min-w-0 flex-1">
				<p className="font-[550] text-gray-900">{title}</p>
				<p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
					{description}
				</p>
			</div>
			<ArrowUpRightIcon className="w-4 h-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gray-500" />
		</Link>
	);
}
