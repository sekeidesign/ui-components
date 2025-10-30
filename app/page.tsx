"use client";

import Link from "next/link";
import { IntroHeader } from "./IntroHeader";
import { LastUpdated } from "./ui-kit/LastUpdated";
import { Tabs } from "./ui-kit/Tabs";
import { TextLink } from "./ui-kit/TextLink";

const experiments = [
	{
		href: "/profile-menu",
		title: "Profile menu",
		tags: ["motion", "useMeasure", "Base UI", "tailwind", "react"],
	},
	{
		href: "/dynamic-island",
		title: "Dynamic island",
		tags: ["motion", "Motion+ Ticker", "useMeasure", "tailwind", "react"],
	},
	{
		href: "/collapsable-menu",
		title: "Detachable island",
		tags: ["motion", "useDragControls", "useMeasure", "tailwind", "react"],
	},
	{
		href: "/vertical-icon-switch",
		title: "Vertical icon switch",
		tags: ["motion", "clip-path", "useTransform", "tailwind", "react"],
	},
	{
		href: "/transaction-status-button",
		title: "Transaction status button",
		tags: ["motion", "layout", "tailwind", "react"],
	},
];

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
			<div className="flex md:flex-row flex-col gap-8 md:gap-20 p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
				<IntroHeader />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md">
					<Tabs />
					<hr className="w-full border-gray-200" />
					<main className="flex flex-col gap-4 items-center justify-center w-full max-w-screen-md">
						<div className="flex flex-col gap-4 w-full">
							{experiments.map((experiment) => (
								<Link
									key={experiment.href}
									href={experiment.href}
									className="group relative shadow-skew flex flex-col gap-3 p-6 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors duration-200 ease"
								>
									<h2 className="text-xl text-gray-800 font-[500] leading-none group-hover:text-gray-900 transition-colors duration-200 ease">
										{experiment.title}
									</h2>
									<div className="flex items-center gap-2 flex-wrap">
										{experiment.tags.map((tag) => (
											<div
												key={tag}
												className="text-xs font-[450] font-mono whitespace-nowrap text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg"
											>
												{tag}
											</div>
										))}
									</div>
								</Link>
							))}
						</div>
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
