"use client";

import FamilyStatusButton from "./ui-experiments/family-status-button";
import { Experiment } from "./ui-kit/Experiment";
import { TextLink } from "./ui-kit/TextLink";

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 p-4 md:p-8 mt-8 items-center justify-center container mx-auto max-w-screen-md">
				<div className="w-full pt-20">
					<h1 className="font-[500] text-gray-800">PG Gonni</h1>
					<h2 className="font-[500] text-gray-500">
						Design Engineer based in Montréal, QC
					</h2>

					<div className="text-sm text-gray-500 font-[450] pt-10 leading-relaxed space-y-2">
						<p>
							At the moment, I&apos;m Head of Design at{" "}
							<TextLink
								href="https://www.planned.com"
								target="_blank"
								hasFavicon
							>
								Planned
							</TextLink>
							. <br />
							Before that, I was a Design Engineer at{" "}
							<TextLink href="https://www.metafy.gg" target="_blank" hasFavicon>
								Metafy
							</TextLink>{" "}
							and a Product Designer at{" "}
							<TextLink href="https://metalab.co" target="_blank" hasFavicon>
								Metalab
							</TextLink>
							.
						</p>
					</div>
					<p className="text-sm text-gray-500 font-[450] pt-10 leading-relaxed">
						Below are some UI experiments I&apos;ve been cooking up to practice
						micro-interactions and animations.
					</p>
				</div>

				<hr className="w-full border-gray-200 my-20" />

				<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/family-status-button.tsx">
					<Experiment.Title>Transaction status button</Experiment.Title>
					<Experiment.Tags>
						<Experiment.Tag>motion</Experiment.Tag>
						<Experiment.Tag>tailwind</Experiment.Tag>
						<Experiment.Tag>react</Experiment.Tag>
					</Experiment.Tags>
					<Experiment.Example>
						<FamilyStatusButton />
					</Experiment.Example>
					<Experiment.Description>
						Based on{" "}
						<TextLink href="https://family.co/" target="_blank" hasFavicon>
							Family
						</TextLink>{" "}
						by{" "}
						<TextLink
							href="https://benji.org/family-values"
							target="_blank"
							hasFavicon
						>
							Benji Taylor
						</TextLink>
						<p className="py-1" />
						In my first attempt the text had a &quot;jelly&quot; effect,
						particularly when animating between the &quot;Analyzing&quot; and
						&quot;Success&quot; states. <br />
						Thankfully I had recently read about{" "}
						<TextLink
							href="https://www.nan.fyi/magic-motion"
							target="_blank"
							hasFavicon
						>
							how Motion&apos;s &quot;magic&quot; layout property works
						</TextLink>
						, which made it clear that this was caused by the text trying to
						transform from one string to the next. <br />
						The fix was simply to add a unique key to the text for each state,
						which ensures only the button magically transforms between states,
						while the label simply translates on the x axis and fades in and
						out.
					</Experiment.Description>
				</Experiment>
				<hr className="w-full border-gray-200 my-20" />
			</main>
			<footer className="flex gap-8 items-center justify-between container mx-auto max-w-screen-md text-sm px-4 md:px-8 pb-20">
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
				<p className="text-gray-400 leading-relaxed">
					Updated on June 27, 2025
				</p>
			</footer>
		</div>
	);
}
