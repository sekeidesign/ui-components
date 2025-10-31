"use client";

import { CollapsableMenuExperiment } from "./ui-experiments/collapsable-menu/page";
import { DynamicIslandExperiment } from "./ui-experiments/dynamic-island/page";
import { ProfileMenuExperiment } from "./ui-experiments/profile-menu/page";
import { TransactionStatusButtonExperiment } from "./ui-experiments/transaction-status-button/page";
import { VerticalIconSwitchExperiment } from "./ui-experiments/vertical-icon-switch/page";

const experiments = [
	ProfileMenuExperiment,
	DynamicIslandExperiment,
	TransactionStatusButtonExperiment,
	CollapsableMenuExperiment,
	VerticalIconSwitchExperiment,
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
