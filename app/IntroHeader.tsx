"use client";

import { motion, type Transition } from "motion/react";
import { TextLink } from "./ui-kit/TextLink";

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
	return (
		<>
			<motion.div
				variants={textVariants}
				initial="initial"
				animate="animate"
				className="w-full"
				transition={{
					staggerChildren: 0.1,
					type: "spring",
					duration: 1,
					bounce: 0.2,
				}}
			>
				<motion.h1
					variants={textVariants}
					transition={textTransition}
					className="font-[500] text-gray-800"
				>
					PG Gonni
				</motion.h1>
				<motion.h2
					variants={textVariants}
					transition={textTransition}
					className="font-[500] text-gray-500"
				>
					Design Engineer based in Montréal, QC
				</motion.h2>

				<div className="text-sm text-gray-500 font-[450] pt-4 md:pt-10 leading-relaxed space-y-2">
					<motion.p variants={textVariants} transition={textTransition}>
						At the moment, I&apos;m Head of Design at{" "}
						<TextLink href="https://www.planned.com" target="_blank" hasFavicon>
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
					</motion.p>
				</div>
				<motion.p
					variants={textVariants}
					transition={textTransition}
					className="text-sm text-gray-500 font-[450] pt-4 md:pt-10 leading-relaxed"
				>
					Below are some UI experiments I&apos;ve been cooking up to practice
					micro-interactions and animations.
				</motion.p>
			</motion.div>
			<hr className="w-full border-gray-200" />
		</>
	);
};

export { IntroHeader };
