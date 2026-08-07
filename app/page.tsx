import { AboutPanel } from "./AboutPanel";
import { AppsPanel } from "./AppsPanel";
import { GlobePanel } from "./GlobePanel";
import { LibraryPanel } from "./LibraryPanel";
import { Experiment, ExperimentDivider } from "./ui-kit/Experiment";
import { HoverProvider } from "./ui-kit/HoverContext";
import { WipBanner } from "./WipBanner";
import { WorkExperiencePanelVertical } from "./WorkExperiencePanelVertical";

export default function Home() {
	return (
		<HoverProvider>
			<Experiment className="p-0 md:p-0 gap-px bg-gray-200! flex flex-col xl:max-w-3xl">
				<WipBanner />
				<div className="flex gap-px bg-gray-200">
					<AboutPanel />
				</div>
			</Experiment>
			<ExperimentDivider />
			<Experiment className="p-0 md:p-0 gap-px bg-gray-200! flex flex-col xl:max-w-3xl">
				<WorkExperiencePanelVertical />
			</Experiment>
			<ExperimentDivider />
			<Experiment className="p-0 md:p-0 gap-px bg-gray-200! flex flex-col xl:max-w-3xl">
				<div className="flex gap-px bg-gray-200">
					<GlobePanel />
					<AppsPanel />
				</div>
				<div className="flex gap-px bg-gray-200">
					{/* <GlobePanel /> */}
					<LibraryPanel />
				</div>
			</Experiment>
		</HoverProvider>
	);
}
