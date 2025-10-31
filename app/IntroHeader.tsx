"use client";

import { TextLink } from "@ui-kit/TextLink";
import { motion, type Transition } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContributionGraph } from "./ui-kit/ContributionGraph";

const textVariants = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0 },
};

const textTransition: Transition = {
	type: "spring",
	duration: 0.5,
	bounce: 0.3,
};

const IntroHeader = () => {
	const pathname = usePathname();
	return (
		<div
			// variants={textVariants}
			// initial="initial"
			// animate="animate"
			className="w-full"
			// transition={{
			// 	staggerChildren: 0.1,
			// 	type: "spring",
			// 	duration: 1,
			// 	bounce: 0.2,
			// }}
		>
			<Link href="/">
				<motion.h1
					variants={textVariants}
					transition={textTransition}
					className="font-[550] text-gray-800"
				>
					PG Gonni
				</motion.h1>
				<motion.h2
					variants={textVariants}
					transition={textTransition}
					className="font-[450] text-gray-500"
				>
					Design Engineer based in Montréal, QC
				</motion.h2>
			</Link>

			{/* <ContributionGraph /> */}

			{pathname === "/" && (
				<div className="text-sm text-gray-500 font-[450] pt-4 md:pt-10 leading-relaxed space-y-2">
					<motion.p variants={textVariants} transition={textTransition}>
						<span className="font-[550] block text-gray-600">Currently</span>
						Head of Design at{" "}
						<TextLink href="https://www.tato.co" target="_blank" hasFavicon>
							Tato
						</TextLink>
						<br />
						<span className="font-[550] block pt-2 text-gray-600">
							Previously
						</span>
						Head of Design at{" "}
						<TextLink href="https://www.planned.com" target="_blank" hasFavicon>
							Planned
						</TextLink>
						<br />
						Design Engineer at{" "}
						<TextLink href="https://www.metafy.gg" target="_blank" hasFavicon>
							Metafy
						</TextLink>{" "}
						<br />
						Product Designer at{" "}
						<TextLink href="https://metalab.co" target="_blank" hasFavicon>
							Metalab
						</TextLink>
						.
					</motion.p>
				</div>
			)}
		</div>
	);
};

export { IntroHeader };
