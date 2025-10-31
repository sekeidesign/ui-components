"use client";

import { Tooltip } from "@ark-ui/react/tooltip";
import { CommandLineIcon } from "@heroicons/react/16/solid";
import { AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import {
	createContext,
	type ReactNode,
	useContext,
	useRef,
	useState,
} from "react";
import { cn } from "./cn";

interface ExperimentContextValue {
	sourceUrl?: string;
	isRootInView?: boolean;
}

const ExperimentContext = createContext<ExperimentContextValue>({});

// Root component
interface ExperimentRootProps {
	children: ReactNode;
	sourceUrl?: string;
}

const ExperimentRoot = ({ children, sourceUrl }: ExperimentRootProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const isRootInView = useInView(ref, { once: false, amount: "some" });

	return (
		<ExperimentContext.Provider value={{ sourceUrl, isRootInView }}>
			<motion.div
				ref={ref}
				className="flex flex-col gap-4 w-full"
				initial={{ opacity: 0 }}
				animate={isRootInView ? { opacity: 1 } : { opacity: 0 }}
				transition={{ type: "spring", duration: 0.9, bounce: 0.2 }}
			>
				{children}
			</motion.div>
		</ExperimentContext.Provider>
	);
};

// Title component
interface ExperimentTitleProps {
	children: ReactNode;
	pageUrl: string;
}

const ExperimentTitle = ({ children, pageUrl }: ExperimentTitleProps) => {
	const [hovering, setHovering] = useState(false);

	return (
		<Link
			href={pageUrl}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			className="flex items-center gap-1"
		>
			<h2 className="text-xl text-gray-800 font-[500] leading-none">
				{children}
			</h2>
			<AnimatePresence mode="popLayout" initial={false}>
				{hovering && (
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2.5}
						stroke="currentColor"
						className="size-3.5 text-gray-500 mt-0.5"
						initial={{ x: -4, y: 4, opacity: 0 }}
						animate={{ x: 0, y: 0, opacity: 1 }}
						exit={{ x: 4, y: -4, opacity: 0 }}
						transition={{ duration: 0.2, type: "spring", bounce: 0 }}
					>
						<title>Link icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
						/>
					</motion.svg>
				)}
			</AnimatePresence>
		</Link>
	);
};

// Tags container component
interface ExperimentTagsProps {
	children: ReactNode;
}

const ExperimentTags = ({ children }: ExperimentTagsProps) => {
	return (
		<div
			className="flex items-center gap-2 w-full overflow-x-auto -ml-3 pl-3"
			style={{
				maskImage:
					"linear-gradient(to right, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)",
			}}
		>
			{children}
		</div>
	);
};

// Individual tag component
interface ExperimentTagProps {
	children: ReactNode;
}

const ExperimentTag = ({ children }: ExperimentTagProps) => {
	return (
		<div className="text-xs font-[450] font-mono whitespace-nowrap text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg">
			{children}
		</div>
	);
};

// Example container component
interface ExperimentExampleProps {
	children: ReactNode;
	className?: string;
}

const ExperimentExample = ({ children, className }: ExperimentExampleProps) => {
	const { sourceUrl, isRootInView } = useContext(ExperimentContext);

	return (
		<div
			className={cn(
				"relative shadow-skew size-24 flex items-center justify-center rounded-xl border border-gray-200 w-full p-10 min-h-[320px] h-fit bg-white overflow-hidden",
				className,
			)}
		>
			{sourceUrl && (
				<Tooltip.Root
					positioning={{ placement: "top" }}
					openDelay={0}
					closeDelay={0}
				>
					<Tooltip.Trigger asChild>
						<Link
							href={sourceUrl}
							target="_blank"
							className="absolute top-2 right-2 bg-gray-200/60 hover:bg-gray-200 hover:text-gray-700 size-7 flex items-center justify-center rounded-md text-gray-500"
						>
							<CommandLineIcon className="w-4 h-4" />
						</Link>
					</Tooltip.Trigger>
					<Tooltip.Positioner>
						<Tooltip.Content className="bg-gray-900 text-gray-50 font-[450] p-2 py-1 text-xs rounded-md">
							View source code
						</Tooltip.Content>
					</Tooltip.Positioner>
				</Tooltip.Root>
			)}
			{isRootInView && children}
		</div>
	);
};

// Description component
interface ExperimentDescriptionProps {
	children: ReactNode;
}

const ExperimentDescription = ({ children }: ExperimentDescriptionProps) => {
	return (
		<div className="space-y-2">
			<p className="text-sm text-gray-500 font-[420] leading-relaxed">
				{children}
			</p>
		</div>
	);
};

// Compose the component with subcomponents
export const Experiment = Object.assign(ExperimentRoot, {
	Title: ExperimentTitle,
	Tags: ExperimentTags,
	Tag: ExperimentTag,
	Example: ExperimentExample,
	Description: ExperimentDescription,
});

export type {
	ExperimentRootProps,
	ExperimentTitleProps,
	ExperimentTagsProps,
	ExperimentTagProps,
	ExperimentExampleProps,
	ExperimentDescriptionProps,
};
