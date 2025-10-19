"use client";

import { IntroHeader } from "./IntroHeader";
import CollapsableMenu, {
	CollapsableMenuProvider,
} from "./ui-experiments/CollapsableMenu";
import DynamicIsland from "./ui-experiments/DynamicIsland";
import { FamilyStatusButton } from "./ui-experiments/FamilyStatusButton";
import { ProfileMenu } from "./ui-experiments/ProfileMenu";
import { VerticalIconSwitch } from "./ui-experiments/VerticalIconSwitch";
import { Experiment } from "./ui-kit/Experiment";
import { LastUpdated } from "./ui-kit/LastUpdated";
import { Tabs } from "./ui-kit/Tabs";
import { TextLink } from "./ui-kit/TextLink";

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
			<div className="flex md:flex-row flex-col gap-8 md:gap-20 p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
				<IntroHeader />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md">
					<Tabs />
					<hr className="w-full border-gray-200" />
					<main className="flex flex-col gap-8 md:gap-20 items-center justify-center w-full max-w-screen-md">
						<Experiment sourceUrl="https://github.com/sekeidesign/">
							<Experiment.Title>Profile menu</Experiment.Title>
							<Experiment.Tags>
								<Experiment.Tag>motion</Experiment.Tag>
								<Experiment.Tag>useMeasure</Experiment.Tag>
								<Experiment.Tag>Base UI</Experiment.Tag>
								<Experiment.Tag>tailwind</Experiment.Tag>
								<Experiment.Tag>react</Experiment.Tag>
							</Experiment.Tags>
							<Experiment.Example className="p-0 min-h-[640px] items-start">
								<ProfileMenu />
							</Experiment.Example>
							<Experiment.Description>
								I wanted to improve upon our profile menu at Tato. When I
								joined, it was a standard shadcn/ui dropdown, the one that ships
								with the sidebar component. While the original dropdown did its
								job, I wanted to build something with a bit more flair. Inspired
								by liquid glass's shifting forms, I wanted to create something
								that felt fluid and part of a single morphin surface.
								<br />
								<br />
								I've also been using Base UI more frequently over Radix, and
								I've been loving the interface and the DX improvements the
								creators have made. In particular the render function which
								provides easy access to properties and state of the component.
							</Experiment.Description>
						</Experiment>
						<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/DynamicIsland.tsx">
							<Experiment.Title>Dynamic island</Experiment.Title>
							<Experiment.Tags>
								<Experiment.Tag>motion</Experiment.Tag>
								<Experiment.Tag>Motion+ Ticker</Experiment.Tag>
								<Experiment.Tag>useMeasure</Experiment.Tag>
								<Experiment.Tag>tailwind</Experiment.Tag>
								<Experiment.Tag>react</Experiment.Tag>
							</Experiment.Tags>
							<Experiment.Example className="p-0 items-start">
								<DynamicIsland
									title="Can the iPhone 17 Pro Beat a Leica Camera - Episode 24"
									subtitle="WVFRM Podcast"
								/>
							</Experiment.Example>
							<Experiment.Description>
								<span className="font-[500] text-gray-600">
									Click the island or swipe down with two fingers to smoothly
									expand it. You can interact with the media controls within
									there. Leave the island to smoothly collapse it.
									<br />
									<i className="font-[450] text-gray-500">
										Note: This behaves awkwardly on the home page because the
										two finger gesture is also a scroll.
									</i>
								</span>
								<br />
								<br />A media player interface inspired by{" "}
								<TextLink
									href="https://tryalcove.com/"
									target="_blank"
									hasFavicon
								>
									Alcove
								</TextLink>
								, a clean and beautiful little app to add Dynamic Island like
								funcitonality to your Mac&apos;s notch. It also uses Motion+
								Ticker to animate the podcast title with a smoothly masked
								marquee.
							</Experiment.Description>
						</Experiment>
						<hr className="w-full border-gray-200" />
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
									Drag the island outside of the container to detach it. Let go
									before detaching to snap back.
									<br />
									Turn on debug to view the drag constraints and drag handle
									affordance.
								</span>
								<br />
								<br />
								I&apos;ve been infatuated with islands, as they provide a great,
								malleable surface. <br />
								They allow AI to live in a layer above the rest of the
								application, making them ideal for ever present, omnipotent
								agents. <br />
								In this case, I wanted to experiment with a draggable island,
								snapping, and morphing.
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
								I also learned the importance of ergonomic affordances, so the
								drag handle uses{" "}
								<code className="bg-gray-100 text-gray-600 p-1 rounded-md font-[550] text-xs">
									after:content-[&apos;&apos;]
								</code>{" "}
								to increase its draggable area.
							</Experiment.Description>
						</Experiment>
						<hr className="w-full border-gray-200" />
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
						<hr className="w-full border-gray-200" />

						<Experiment sourceUrl="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/family-status-button.tsx">
							<Experiment.Title>Transaction status button</Experiment.Title>
							<Experiment.Tags>
								<Experiment.Tag>motion</Experiment.Tag>
								<Experiment.Tag>layout</Experiment.Tag>
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
								particularly when animating between the &quot;Analyzing&quot;
								and &quot;Success&quot; states. <br />
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
								The fix was simply to add a unique key to the text for each
								state, which ensures only the button magically transforms
								between states, while the label simply translates on the x axis
								and fades in and out.
							</Experiment.Description>
						</Experiment>
						<hr className="w-full border-gray-200" />
					</main>
					<footer className="flex gap-8 items-center justify-between mx-auto max-w-screen-md w-full text-sm pb-8 md:pb-20">
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
			</div>
		</div>
	);
}
