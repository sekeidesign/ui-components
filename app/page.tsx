"use client";

import { IntroHeader } from "./IntroHeader";
import { FamilyStatusButton } from "./ui-experiments/FamilyStatusButton";
import { VerticalIconSwitch } from "./ui-experiments/VerticalIconSwitch";
import { Experiment } from "./ui-kit/Experiment";
import { LastUpdated } from "./ui-kit/LastUpdated";
import { TextLink } from "./ui-kit/TextLink";

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 md:gap-20 p-4 md:p-8 py-8 md:py-20 items-center justify-center container mx-auto max-w-screen-md">
				<IntroHeader />

				<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/VerticalIconSwitch.tsx">
					<Experiment.Title>Vertical icon switch</Experiment.Title>
					<Experiment.Tags>
						<Experiment.Tag>motion</Experiment.Tag>
						<Experiment.Tag>tailwind</Experiment.Tag>
						<Experiment.Tag>react</Experiment.Tag>
					</Experiment.Tags>
					<Experiment.Example>
						<VerticalIconSwitch />
					</Experiment.Example>
					<Experiment.Description>
						Based on{" "}
						<TextLink
							href="https://www.threads.com/@ozanoz/post/DDUEYvaCf4M"
							target="_blank"
							hasFavicon
						>
							this Threads post
						</TextLink>
						by{" "}
						<TextLink
							href="https://www.threads.com/@ozanoz"
							target="_blank"
							hasFavicon
						>
							Ozan Öztaskiran.
						</TextLink>
						<span className="py-1 block" />
						The original example was a more typical switch, with a checkmark
						icon that moves up and down based on the selection.
						<br />I left{" "}
						<TextLink
							href="https://www.threads.com/@sekeidesign/post/DDUnuo4xL7v"
							target="_blank"
							hasFavicon
						>
							a comment
						</TextLink>{" "}
						suggesting that the switch use a specific icon for each direction
						for added clarity.
						<br />I also wanted to use this as an opportunity to make use of
						clip-path, which I learned about in one of the earlier modules of
						Emil Kowalski&apos;s{" "}
						<TextLink href="https://animations.dev/" target="_blank" hasFavicon>
							Animations for the Web,
						</TextLink>
						{""} while also trying to learn to use Motion&apos;s{" "}
						<TextLink
							href="https://motion.dev/docs/react-use-transform"
							target="_blank"
							hasFavicon
						>
							useTransform
						</TextLink>{" "}
						function.
						<br />
						<span className="py-1 block" />
						Finally, I decided to animate the icons when the state switches,
						which added complexity to the code but also a nice little flair.
						<span className="py-1 block" />
						While I like the final effect, I&apos;m not super happy with all the
						magic numbers I&apos;m using to make the clip-path move smoothly
						between the two states.
					</Experiment.Description>
				</Experiment>
				<hr className="w-full border-gray-200" />

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
						<span className="py-1 block" />
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
				<hr className="w-full border-gray-200" />
			</main>
			<footer className="flex gap-8 items-center justify-between container mx-auto max-w-screen-md text-sm px-4 md:px-8 pb-8 md:pb-20">
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
	);
}
