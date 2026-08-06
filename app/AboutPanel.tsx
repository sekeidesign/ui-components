import Image from "next/image";
import { BookLink } from "./ui-kit/BookLink";
import { TextLink } from "./ui-kit/TextLink";

export function AboutPanel() {
	return (
		<div className="space-y-4 flex-1 panel p-4 md:p-6">
			<div className="size-fit bg-white rounded-full ring ring-gray-500/10 shadow-skew p-0.5">
				<Image
					src="/avatar.jpg"
					alt="PG Gonni"
					width={64}
					height={64}
					className="size-16 rounded-full object-cover ring ring-gray-500/10 shadow-skew"
				/>
			</div>
			<p className="text-gray-500 text-base font-[450] leading-normal cursor-default">
				<span className="pb-1 block">
					Head of Product at{" "}
					<TextLink href="https://www.tato.co" hasFavicon>
						Tato
					</TextLink>
					, shaping, designing, and shipping code for an AI native ERP tool,
					based in Montréal, QC.
				</span>
				<span className="pt-1 block">
					Building{" "}
					<TextLink
						href="https://www.tomokanji.app"
						hasFavicon
						favicon="/tomokanji-icon-light.jpg"
					>
						Tomokanji
					</TextLink>{" "}
					in my free time, and currently reading{" "}
					<BookLink
						href="https://www.amazon.ca/Apple-China-Capture-Greatest-Company/dp/1668053373"
						cover="https://covers.openlibrary.org/b/id/15151586-L.jpg"
						coverAlt="Apple in China cover"
						author="Patrick McGee"
						description="A deeply reported account of how Apple spent decades training and investing in China's factories and workers, turning the country into the world's manufacturing superpower, and tying its own fate to it in the process."
					>
						Apple in China
					</BookLink>
					.
				</span>
			</p>
		</div>
	);
}
