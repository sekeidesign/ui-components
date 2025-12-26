"use client";

import { CollapsableMenuExperiment } from "./ui-experiments/collapsable-menu/Experiment";
import { DynamicIslandExperiment } from "./ui-experiments/dynamic-island/Experiment";
import { ProfileMenuExperiment } from "./ui-experiments/profile-menu/Experiment";
import { TransactionStatusButtonExperiment } from "./ui-experiments/transaction-status-button/Experiment";
import { VerticalIconSwitchExperiment } from "./ui-experiments/vertical-icon-switch/Experiment";
import { ExperimentDivider } from "./ui-kit/Experiment";

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
			{experiments.map((experiment, index) => {
				const ExperimentComponent = experiment;
				return (
					<>
						<ExperimentComponent key={experiment.name} />
						{index < experiments.length - 1 && <ExperimentDivider />}
					</>
				);
			})}
		</>
	);
}
