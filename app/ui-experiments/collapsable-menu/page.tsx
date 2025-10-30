"use client";

import { Experiment } from "../../ui-kit/Experiment";
import { TextLink } from "../../ui-kit/TextLink";
import CollapsableMenu, { CollapsableMenuProvider } from "./CollapsableMenu";

export default function CollapsableMenuPage() {
	return (
		<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/CollapsableMenu.tsx">
			<Experiment.Title>Detachable island</Experiment.Title>
			<Experiment.Tags>
				<Experiment.Tag>motion</Experiment.Tag>
				<Experiment.Tag>useDragControls</Experiment.Tag>
				<Experiment.Tag>useMeasure</Experiment.Tag>
				<Experiment.Tag>tailwind</Experiment.Tag>
				<Experiment.Tag>react</Experiment.Tag>
			</Experiment.Tags>
			<Experiment.Example className="p-0">
				<CollapsableMenuProvider>
					<CollapsableMenu />
				</CollapsableMenuProvider>
			</Experiment.Example>
			<Experiment.Description>
				<span className="font-[500] text-gray-600">
					Drag the island outside of the container to detach it. Let go before
					detaching to snap back.
					<br />
					Turn on debug to view the drag constraints and drag handle affordance.
				</span>
				<br />
				<br />
				I&apos;ve been infatuated with islands, as they provide a great,
				malleable surface. <br />
				They allow AI to live in a layer above the rest of the application,
				making them ideal for ever present, omnipotent agents. <br />
				In this case, I wanted to experiment with a draggable island, snapping,
				and morphing.
				<br />
				<br />
				In{" "}
				<TextLink
					href="https://x.com/raunofreiberg?lang=en"
					target="_blank"
					hasFavicon
				>
					Rauno&apos;s
				</TextLink>{" "}
				course{" "}
				<TextLink
					href="https://devouringdetails.com/introduction"
					target="_blank"
					hasFavicon
				>
					Devouring Details
				</TextLink>{" "}
				I also learned the importance of ergonomic affordances, so the drag
				handle uses{" "}
				<code className="bg-gray-100 text-gray-600 p-1 rounded-md font-[550] text-xs">
					after:content-[&apos;&apos;]
				</code>{" "}
				to increase its draggable area.
			</Experiment.Description>
		</Experiment>
	);
}
