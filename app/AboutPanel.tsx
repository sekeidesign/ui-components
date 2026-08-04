import { BookLink } from "./ui-kit/BookLink";
import { Highlightable } from "./ui-kit/Highlightable";
import { TextLink } from "./ui-kit/TextLink";

export function AboutPanel() {
	return (
		<div className="space-y-2 flex-1 panel p-4 md:p-6">
			<p className="text-gray-500 text-lg font-[450] leading-normal cursor-default">
				<Highlightable id="intro" className="pb-1 block">
					Design engineer from Forli, Italy, currently based in Montréal, QC.
				</Highlightable>
				<Highlightable id="experience" className="py-1 block">
					Head of Product at{" "}
					<TextLink href="https://www.tato.co" hasFavicon>
						Tato
					</TextLink>
					, shaping, designing, and shipping code for an AI native ERP tool.
				</Highlightable>
				<Highlightable id="projects" className="py-1 block">
					Building{" "}
					<TextLink
						href="https://www.tomokanji.app"
						hasFavicon
						favicon="/tomokanji-icon-light.jpg"
					>
						Tomokanji
					</TextLink>
					, in my free time.
				</Highlightable>
				<Highlightable id="reading" className="pt-1 block">
					Currently reading{" "}
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
