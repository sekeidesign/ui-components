import { AboutPanel } from "./AboutPanel";
import { Experiment } from "./ui-kit/Experiment";
import { GlobePanel } from "./GlobePanel";

export default function Home() {
	return (
		<Experiment className="p-0 md:p-0">
			<div className="flex gap-px bg-slate-200">
				<AboutPanel />
				<GlobePanel />
			</div>
		</Experiment>
	);
}
