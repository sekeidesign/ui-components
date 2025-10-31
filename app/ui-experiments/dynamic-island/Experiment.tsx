"use client";

import { Experiment } from "@ui-kit/Experiment";
import { TextLink } from "@ui-kit/TextLink";
import DynamicIsland from "./DynamicIsland";

export function DynamicIslandExperiment() {
	return (
		<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/DynamicIsland.tsx">
			<Experiment.Title pageUrl="/ui-experiments/dynamic-island">
				Dynamic island
			</Experiment.Title>
			<Experiment.Tags>
				<Experiment.Tag>motion</Experiment.Tag>
				<Experiment.Tag>Motion+ Ticker</Experiment.Tag>
				<Experiment.Tag>useMeasure</Experiment.Tag>
				<Experiment.Tag>tailwind</Experiment.Tag>
				<Experiment.Tag>react</Experiment.Tag>
			</Experiment.Tags>
			<Experiment.Example className="p-0 items-start">
				<DynamicIsland
					title="Can the iPhone 17 Pro Beat a Leica Camera - Episode 24"
					subtitle="WVFRM Podcast"
				/>
			</Experiment.Example>
			<Experiment.Description>
				<span className="font-[500] text-gray-600">
					Click the island or swipe down with two fingers to smoothly expand it.
					You can interact with the media controls within there. Leave the
					island to smoothly collapse it.
					<br />
					<i className="font-[450] text-gray-500">
						Note: This behaves awkwardly on the home page because the two finger
						gesture is also a scroll.
					</i>
				</span>
				<br />
				<br />A media player interface inspired by{" "}
				<TextLink href="https://tryalcove.com/" target="_blank" hasFavicon>
					Alcove
				</TextLink>
				, a clean and beautiful little app to add Dynamic Island like
				funcitonality to your Mac&apos;s notch. It also uses Motion+ Ticker to
				animate the podcast title with a smoothly masked marquee.
			</Experiment.Description>
		</Experiment>
	);
}
