import { Tooltip } from "@ark-ui/react";
import { WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import { AcademicCapIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { cn } from "./cn";

const Tab = ({
	icon,
	label,
	active,
	disabled,
}: {
	icon: React.ReactNode;
	label: string;
	active: boolean;
	disabled: boolean;
}) => {
	const tabContents = (
		<div
			className={cn(
				"flex items-center gap-2 px-3 py-1 rounded-full",
				active ? "bg-gray-200/50" : "",
				disabled
					? "cursor-not-allowed text-gray-300"
					: "cursor-pointer text-gray-500",
			)}
		>
			{icon}
			<span
				className={cn(
					"text-sm font-[500]",
					disabled ? "text-gray-300 pointer-events-none" : "text-gray-500",
				)}
			>
				{label}
			</span>
		</div>
	);
	if (disabled) {
		return (
			<Tooltip.Root positioning={{ placement: "top" }}>
				<Tooltip.Trigger asChild>{tabContents}</Tooltip.Trigger>
				<Tooltip.Positioner>
					<Tooltip.Content>
						<div className="text-xs text-gray-500 rounded-lg shadow-xl bg-white border border-gray-200 p-2">
							Coming soon...
						</div>
					</Tooltip.Content>
				</Tooltip.Positioner>
			</Tooltip.Root>
		);
	}
	return tabContents;
};

const Tabs = () => {
	return (
		<div className="w-full flex items-center gap-2 justify-start">
			<Tab
				icon={<WrenchScrewdriverIcon className="w-3 h-3 text-gray-500" />}
				label="UI Experiments"
				active={true}
				disabled={false}
			/>

			<Tab
				icon={<BookOpenIcon className="w-3 h-3 text-gray-300" />}
				label="Writing"
				active={false}
				disabled={true}
			/>

			<Tab
				icon={<AcademicCapIcon className="w-3 h-3 text-gray-300" />}
				label="Courses"
				active={false}
				disabled={true}
			/>
		</div>
	);
};

export { Tabs };
