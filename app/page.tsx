import Link from "next/link";

import { BookLink } from "./ui-kit/BookLink";
import { Experiment } from "./ui-kit/Experiment";
import { TextLink } from "./ui-kit/TextLink";

export default function Home() {
	return (
		<Experiment className="p-0 md:p-0">
			<div className="flex gap-px bg-slate-200">
				<div className="space-y-2 flex-1 panel p-4 md:p-6">
					<p className="text-sm text-gray-500 font-[450] leading-relaxed">
						I'm PG, a design engineer based in Montréal, QC. Currently I'm the
						Head of Product at{" "}
						<TextLink href="https://www.tato.co" hasFavicon>
							Tato
						</TextLink>
						, where I talk to customers, design experiences, and ship code to
						build an AI native tool for the world's largest digital
						transformation programs.
						<span className="mt-2 block" />
						In my spare time I'm building{" "}
						<TextLink href="https://www.tomokanji.app" hasFavicon>
							Tomokanji
						</TextLink>
						, a native iOS app to learn Japanese Kanji.
						<span className="mt-2 block" />
						In the mornings I'm usually drinking an espresso and currently
						reading{" "}
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
					</p>
				</div>
				<div className="flex-1 panel p-4 md:p-6">yo</div>
			</div>
		</Experiment>
	);
}
