import Image from "next/image";
import Link from "next/link";
import { NavigationIcon } from "./ui-kit/icons/NavigationIcon";
import { WifiIcon } from "./ui-kit/icons/WifiIcon";

const BATTERY_LEVEL = 82;

export function AppsPanel() {
	return (
		<div className="flex-1 panel p-4 md:p-6 overflow-hidden max-h-80 flex flex-col gap-6">
			{/* <p className="text-gray-500 text-sm font-[500] leading-tight cursor-default">
				Building apps for the web and mobile.
			</p> */}
			<div className="relative">
				<Image
					src="/iphone-bezels-silver.webp"
					alt="iPhone bezels"
					width={1000}
					height={1000}
				/>
				<div className="absolute inset-0 p-12 flex flex-col gap-6">
					<div className="flex items-center justify-between gap-2 font-[450]">
						<div className="flex-1 flex items-center justify-center gap-1.5">
							09:41 <NavigationIcon size={18} />
						</div>
						<div className="flex-1 flex items-center justify-center"></div>
						<div className="flex-1 flex items-center justify-center gap-1.5">
							<div className="flex gap-0.5 items-end">
								<div className="w-[3px] rounded-sm bg-gray-900 h-1.5" />
								<div className="w-[3px] rounded-sm bg-gray-900 h-2" />
								<div className="w-[3px] rounded-sm bg-gray-900/25 h-2.5" />
								<div className="w-[3px] rounded-sm bg-gray-900/25 h-3" />
							</div>
							<WifiIcon size={18} />
							<div className="relative w-[22px] h-[13px] flex items-center justify-center shrink-0">
								{/* terminal nub */}
								<div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 rounded-r-[1px] bg-gray-800/25" />
								{/* body outline */}
								<div className="absolute inset-0 rounded-[4px] bg-gray-800/25" />
								{/* charge level */}
								<div
									className="absolute left-0 top-0 bottom-0 rounded-[1px] rounded-l-[4px] bg-gray-900"
									style={{ width: `${BATTERY_LEVEL}%` }}
								/>
								<span className="relative z-10 text-[9px] font-bold text-white leading-none tabular-nums">
									{BATTERY_LEVEL}
								</span>
							</div>
						</div>
					</div>
					<Link
						href="https://www.tomokanji.app"
						className="flex group flex-col items-center justify-center w-fit text-xs text-gray-600 gap-1"
					>
						<Image
							src="/tomokanji-icon-light.jpg"
							alt="iPhone bezels"
							width={72}
							height={72}
							className="rounded-[20px] group-hover:scale-103 transition-transform duration-150 will-change-transform"
						/>
						Tomokanji
					</Link>
				</div>
			</div>
		</div>
	);
}
