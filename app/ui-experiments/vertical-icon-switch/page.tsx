"use client";

import { Experiment } from "../../ui-kit/Experiment";
import { TextLink } from "../../ui-kit/TextLink";
import { VerticalIconSwitch } from "../VerticalIconSwitch";

export default function VerticalIconSwitchPage() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
			<div className="p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md mx-auto">
					<main className="flex flex-col gap-8 md:gap-20 items-center justify-center w-full max-w-screen-md">
						<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/VerticalIconSwitch.tsx">
							<Experiment.Title>Vertical icon switch</Experiment.Title>
							<Experiment.Tags>
								<Experiment.Tag>motion</Experiment.Tag>
								<Experiment.Tag>clip-path</Experiment.Tag>
								<Experiment.Tag>useTransform</Experiment.Tag>
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
								suggesting that the switch use a specific icon for each
								direction for added clarity.
								<br />I also wanted to use this as an opportunity to make use of
								clip-path, which I learned about in one of the earlier modules
								of Emil Kowalski&apos;s{" "}
								<TextLink
									href="https://animations.dev/"
									target="_blank"
									hasFavicon
								>
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
								While I like the final effect, I&apos;m not super happy with all
								the magic numbers I&apos;m using to make the clip-path move
								smoothly between the two states.
							</Experiment.Description>
						</Experiment>
					</main>
				</div>
			</div>
		</div>
	);
}
