"use client";

import { LastUpdated } from "@ui-kit/LastUpdated";
import { Tabs } from "@ui-kit/Tabs";
import { TextLink } from "@ui-kit/TextLink";
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
		<>
			{experiments.map((experiment) => {
				const ExperimentComponent = experiment;
				return <ExperimentComponent key={experiment.name} />;
			})}
		</>
	);
}
