"use client";

import { LastUpdated } from "@ui-kit/LastUpdated";
import { Tabs } from "@ui-kit/Tabs";
import { TextLink } from "@ui-kit/TextLink";
import { IntroHeader } from "./IntroHeader";
import { CollapsableMenuExperiment } from "./ui-experiments/collapsable-menu/page";
import { DynamicIslandExperiment } from "./ui-experiments/dynamic-island/page";
import { ProfileMenuExperiment } from "./ui-experiments/profile-menu/page";
import { TransactionStatusButtonExperiment } from "./ui-experiments/transaction-status-button/page";
import { VerticalIconSwitchExperiment } from "./ui-experiments/vertical-icon-switch/page";

const experiments = [
	ProfileMenuExperiment,
	TransactionStatusButtonExperiment,
	VerticalIconSwitchExperiment,
	DynamicIslandExperiment,
	CollapsableMenuExperiment,
];

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
			<div className="flex md:flex-row flex-col gap-8 md:gap-20 p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
				<IntroHeader />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md">
					<Tabs />
					<hr className="w-full border-gray-200" />
					<main className="flex flex-col gap-8 md:gap-20 items-center justify-center w-full max-w-screen-md">
						{experiments.map((experiment) => {
							const ExperimentComponent = experiment;
							return <ExperimentComponent key={experiment.name} />;
						})}
						<hr className="w-full border-gray-200" />
					</main>
					<footer className="flex gap-8 items-center justify-between mx-auto max-w-screen-md w-full text-sm pb-8 md:pb-20">
						<div className="flex gap-4">
							<TextLink
								href="https://github.com/sekeidesign/"
								target="_blank"
								hasFavicon
							>
								GitHub
							</TextLink>
							<TextLink
								href="https://www.threads.com/@sekeidesign"
								target="_blank"
								hasFavicon
							>
								Threads
							</TextLink>
						</div>
						<LastUpdated />
					</footer>
				</div>
			</div>
		</div>
	);
}
