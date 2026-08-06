"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { cn } from "./ui-kit/cn";
import { BookIcon, BookIconFilled } from "./ui-kit/icons/BookIcon";
import { CameraIcon, CameraIconFilled } from "./ui-kit/icons/CameraIcon";
import { HomeIcon, HomeIconFilled } from "./ui-kit/icons/HomeIcon";
import { KitchenIcon, KitchenIconFilled } from "./ui-kit/icons/KitchenIcon";

const navItems = [
	{
		href: "/",
		label: "About",
		icon: <HomeIcon />,
		selectedIcon: <HomeIconFilled />,
	},
	{
		href: "/kitchen",
		label: "Kitchen",
		icon: <KitchenIcon />,
		selectedIcon: <KitchenIconFilled />,
	},
	{
		href: "/photography",
		label: "Photography",
		icon: <CameraIcon />,
		selectedIcon: <CameraIconFilled />,
	},
	{
		href: "https://learn.sekei.xyz",
		label: "Course",
		external: true,
		icon: <BookIcon />,
		selectedIcon: <BookIconFilled />,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();

	return (
		<div className="w-full md:max-w-2xs xl:max-w-xs md:sticky top-0 md:h-full flex-grow flex flex-col gap-px">
			<Link href="/">
				<div className="panel p-4">
					<h1 className="font-[550] text-gray-800 w-full">PG Gonni</h1>
					<h2 className="font-[450] text-gray-500 w-full">
						Design Engineer based in Montréal, QC
					</h2>
				</div>
			</Link>

			{/* Hidden on mobile until there's a proper compact nav — the full
			    stack of items ate half the screen. */}
			<nav className="panel md:flex flex-col hidden p-0.5">
				{navItems.map((item) => {
					const isActive =
						!item.external &&
						(item.href === "/"
							? pathname === "/"
							: pathname?.startsWith(item.href));

					return (
						<Link
							key={item.href}
							href={item.href}
							target={item.external ? "_blank" : undefined}
							rel={item.external ? "noopener noreferrer" : undefined}
							className={cn(
								"p-3 text-sm rounded-sm font-[500] transition-colors flex items-center gap-2 justify-between",
								isActive
									? "text-gray-900 bg-gray-200"
									: "text-gray-500 hover:text-gray-900",
							)}
						>
							{item.label}
							{isActive ? item.selectedIcon : item.icon}
						</Link>
					);
				})}
			</nav>

			<div className="panel flex-1 md:block hidden" />

			<Footer className="md:grid hidden" />
		</div>
	);
};
