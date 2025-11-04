import { type ContributionWeek, getContributions } from "@api/github/route";
import { Tooltip } from "@base-ui-components/react";
import { Fragment } from "react";
import { cn } from "./cn";

const getContributionColor = (contributionCount: number) => {
	if (contributionCount === 0) return "bg-gray-200";
	// if (contributionCount > 0 && contributionCount < 4) return "bg-gray-300";
	if (contributionCount > 0 && contributionCount < 8) return "bg-gray-400";
	if (contributionCount >= 8 && contributionCount < 12) return "bg-gray-500";
	if (contributionCount >= 12) return "bg-gray-600";
};

export async function ContributionGraph() {
	const weeks: ContributionWeek[] = await getContributions("sekeidesign");
	console.log(weeks);

	return (
		<div className="grid grid-flow-col gap-0.5 relative w-full mt-10">
			<Tooltip.Root delay={100}>
				{weeks.map((week) => (
					<div
						key={
							week.contributionDays[0]?.date ?? `week-${weeks.indexOf(week)}`
						}
						className="grid grid-rows-7 gap-0.5"
					>
						{week.contributionDays.map((day) => (
							<Fragment key={day.date ?? `week-${weeks.indexOf(week)}`}>
								<Tooltip.Trigger
									render={
										<div
											key={day.date}
											className={cn(
												"w-full aspect-square rounded-full saturate-100 transition-colors",
												getContributionColor(day.contributionCount),
											)}
										/>
									}
								/>
								<Tooltip.Portal>
									<Tooltip.Positioner>
										<Tooltip.Popup className="bg-gray-800 text-gray-100 p-2 rounded-md">
											<p>{day.date}</p>
										</Tooltip.Popup>
									</Tooltip.Positioner>
								</Tooltip.Portal>
							</Fragment>
						))}
					</div>
				))}
			</Tooltip.Root>
		</div>
	);
}
