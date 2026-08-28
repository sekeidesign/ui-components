/**
 * The content waiting underneath the sweep.
 *
 * A skeleton rather than a finished UI on purpose: the sweep is the subject,
 * and anything with real copy in it would pull the eye off the edge as it
 * travels. Static, too — a shimmer here would compete with the grain.
 */
export function Skeleton() {
	return (
		// Centred rather than stretched: the stage takes its height from the
		// control panel beside it, and a grid on flex-1 would pull the tiles into
		// columns half the card tall.
		<div className="flex h-full w-full flex-col justify-center gap-5 p-6 md:p-8">
			<div className="flex items-center gap-3">
				<div className="size-9 shrink-0 rounded-full bg-gray-200" />
				<div className="flex min-w-0 flex-1 flex-col gap-1.5">
					<div className="h-2.5 w-32 rounded-full bg-gray-200" />
					<div className="h-2 w-20 rounded-full bg-gray-100" />
				</div>
				<div className="h-6 w-16 shrink-0 rounded-full bg-gray-100" />
			</div>

			<div className="flex flex-col gap-2">
				<div className="h-2 w-full rounded-full bg-gray-100" />
				<div className="h-2 w-[92%] rounded-full bg-gray-100" />
				<div className="h-2 w-[64%] rounded-full bg-gray-100" />
			</div>

			<div className="grid grid-cols-3 gap-3">
				{["a", "b", "c"].map((key) => (
					<div
						key={key}
						className="h-20 rounded-lg bg-gray-100 ring-1 ring-gray-500/5"
					/>
				))}
			</div>
		</div>
	);
}
