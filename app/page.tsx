import { AboutPanel } from "./AboutPanel";
import { GlobePanel } from "./GlobePanel";
import { LibraryPanel } from "./LibraryPanel";
import { PlaceholderPanel } from "./PlaceholderPanel";
import { Experiment } from "./ui-kit/Experiment";
import { HoverProvider } from "./ui-kit/HoverContext";
import { WorkExperiencePanel } from "./WorkExperiencePanel";

export default function Home() {
	return (
		<HoverProvider>
			<Experiment className="p-0 md:p-0 gap-px bg-gray-200! flex flex-col xl:max-w-5xl">
				<div className="flex gap-px bg-gray-200">
					<AboutPanel />
					<GlobePanel />
				</div>
				<WorkExperiencePanel />
				<div className="flex gap-px bg-gray-200">
					<PlaceholderPanel />
					<LibraryPanel />
				</div>
			</Experiment>
		</HoverProvider>
	);
}
