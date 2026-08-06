import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function CaseStudiesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex gap-px w-full">
			<div className="panel flex-1 shrink xl:block hidden stripes" />
			<div className="flex flex-col gap-6 w-full flex-4 grow-20 xl:max-w-screen-md shrink-0 panel md:p-8 p-4">
				<Link
					href="/"
					className="inline-flex items-center gap-1.5 text-sm font-[500] text-gray-500 hover:text-gray-900 transition-colors w-fit"
				>
					<ArrowLeftIcon className="w-3.5 h-3.5" />
					Back
				</Link>
				<article>{children}</article>
			</div>
			<div className="panel flex-1 shrink xl:block hidden stripes" />
		</div>
	);
}
