import { BookLink } from "./ui-kit/BookLink";
import { Highlightable } from "./ui-kit/Highlightable";
import { TextLink } from "./ui-kit/TextLink";

export function AboutPanel() {
	return (
		<div className="space-y-2 flex-1 panel p-4 md:p-6">
			<p className="text-sm text-gray-500 font-[450] leading-normal cursor-default">
				<Highlightable id="intro" className="pb-1 block">
					Design engineer from Forli, Italy, based in Montréal, QC.
				</Highlightable>
				<Highlightable id="experience" className="py-1 block">
					Currently I'm the Head of Product at{" "}
					<TextLink href="https://www.tato.co" hasFavicon>
						Tato
					</TextLink>
					, where I talk to customers, design experiences, and ship code to
					build an AI native tool for the world's largest digital transformation
					programs.
				</Highlightable>
				<Highlightable id="projects" className="py-1 block">
					In my spare time I'm building{" "}
					<TextLink href="https://www.tomokanji.app" hasFavicon>
						Tomokanji
					</TextLink>
					, a native iOS app to learn Japanese Kanji.
				</Highlightable>
				<Highlightable id="reading" className="pt-1 block">
					In the mornings I'm usually drinking an espresso and currently reading{" "}
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
				</Highlightable>
			</p>
		</div>
	);
}
