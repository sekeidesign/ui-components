"use client";

import { Tooltip } from "@ark-ui/react/tooltip";
import { CommandLineIcon } from "@heroicons/react/16/solid";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { createContext, type ReactNode, useContext, useRef } from "react";

interface ExperimentContextValue {
	sourceUrl?: string;
}

const ExperimentContext = createContext<ExperimentContextValue>({});

// Root component
interface ExperimentRootProps {
	children: ReactNode;
	sourceUrl?: string;
}

const ExperimentRoot = ({ children, sourceUrl }: ExperimentRootProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	return (
		<ExperimentContext.Provider value={{ sourceUrl }}>
			<motion.div
				ref={ref}
				className="flex flex-col gap-4 w-full"
				initial={{ opacity: 0, y: 80 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
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
}

const ExperimentTitle = ({ children }: ExperimentTitleProps) => {
	return (
		<h2 className="text-xl text-gray-800 font-[500] leading-none">
			{children}
		</h2>
	);
};

// Tags container component
interface ExperimentTagsProps {
	children: ReactNode;
}

const ExperimentTags = ({ children }: ExperimentTagsProps) => {
	return <div className="flex items-center gap-2">{children}</div>;
};

// Individual tag component
interface ExperimentTagProps {
	children: ReactNode;
}

const ExperimentTag = ({ children }: ExperimentTagProps) => {
	return (
		<div className="text-xs font-[450] font-mono text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg">
			{children}
		</div>
	);
};

// Example container component
interface ExperimentExampleProps {
	children: ReactNode;
	scale?: boolean;
}

const ExperimentExample = ({
	children,
	scale = true,
}: ExperimentExampleProps) => {
	const { sourceUrl } = useContext(ExperimentContext);

	return (
		<div className="relative shadow-skew size-24 flex items-center justify-center rounded-xl border border-gray-200 w-full p-10 min-h-[320px] h-fit bg-white">
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
			<div className={scale ? "scale-90 md:scale-100" : ""}>{children}</div>
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
