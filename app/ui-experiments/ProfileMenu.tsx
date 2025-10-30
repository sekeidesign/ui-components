import { Popover } from "@base-ui-components/react";
import {
	ArrowRightStartOnRectangleIcon,
	BellIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	Cog6ToothIcon,
	DocumentTextIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { cn } from "../ui-kit/cn";

const ProfileMenu = () => {
	return (
		<div className="h-full w-full flex items-start justify-start bg-gray-200 pb-1">
			<Sidebar />
			<MainContent />
		</div>
	);
};

interface ProfileButtonProps {
	name?: string;
	email?: string;
	imageSrc?: string;
	open?: boolean;
	ref?: React.RefObject<HTMLDivElement>;
}

const ProfileButton = ({
	name = "Leonardo di Potato",
	email = "leonardo@tato.co",
	open = false,
	imageSrc = "https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/golden-retriever-dog-breed-info.jpeg",
}: ProfileButtonProps) => {
	return (
		<div className="flex gap-2 items-center relative z-20 pointer-events-none justify-center p-2 pr-3 w-full">
			<div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
				<Image
					src={imageSrc}
					alt={`${name} avatar`}
					width={56}
					height={56}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex flex-col items-start flex-1 w-full">
				<span className="text-xs font-[550] text-gray-900 truncate">
					{name}
				</span>
				<span className="text-xs font-[450] text-gray-500 truncate">
					{email}
				</span>
			</div>
			<AnimatePresence mode="popLayout">
				{open ? (
					<motion.div
						key="chevron-down"
						initial={{ opacity: 0, scale: 0.4, filter: "blur(2px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.4, filter: "blur(2px)" }}
						transition={{
							type: "spring",
							duration: 0.3,
							bounce: 0.1,
						}}
					>
						<ChevronDownIcon
							className={cn("w-3 h-3 text-gray-400 flex-shrink-0")}
							strokeWidth={3}
						/>
					</motion.div>
				) : (
					<motion.div
						key="chevron-up"
						initial={{ opacity: 0, scale: 0.4, filter: "blur(2px)" }}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, scale: 0.4, filter: "blur(2px)" }}
						transition={{
							type: "spring",
							duration: 0.3,
							bounce: 0.1,
						}}
					>
						<ChevronUpIcon
							className={cn("w-3 h-3 text-gray-400 flex-shrink-0")}
							strokeWidth={3}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const PopoverContent = ({
	name = "Leonardo di Potato",
	email = "leonardo@tato.co",
	imageSrc = "https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/golden-retriever-dog-breed-info.jpeg",
}: {
	name?: string;
	email?: string;
	imageSrc?: string;
}) => {
	return (
		<div className="w-full relative">
			<div className="p-1">
				<div className="w-full p-1 gap-1 flex flex-col text-sm font-sans font-medium bg-white rounded-lg shadow-skew ring-1 ring-gray-400/5">
					<div>
						<div className="w-full flex items-center gap-2 text-gray-600 px-2.5 h-8.5 cursor-default hover:bg-gray-400/10 rounded-md">
							<UserIcon className="w-4 h-4  flex-shrink-0" strokeWidth={2} />
							Profile
						</div>
						<div className="w-full flex items-center gap-2 text-gray-600 px-2.5 h-8.5 cursor-default hover:bg-gray-400/10 rounded-md">
							<BellIcon className="w-4 h-4  flex-shrink-0" strokeWidth={2} />
							Notifications
						</div>
						<div className="w-full flex items-center gap-2 text-gray-600 px-2.5 h-8.5 cursor-default hover:bg-gray-400/10 rounded-md">
							<Cog6ToothIcon
								className="w-4 h-4  flex-shrink-0"
								strokeWidth={2}
							/>
							Settings
						</div>
						<div className="w-full flex items-center gap-2 text-gray-600 px-2.5 h-8.5 cursor-default hover:bg-gray-400/10 rounded-md">
							<DocumentTextIcon
								className="w-4 h-4  flex-shrink-0"
								strokeWidth={2}
							/>
							Documentation
						</div>
					</div>
					<hr className="w-full border-gray-400/10" />
					<div className="w-full flex items-center gap-2 text-red-600 px-2.5 h-8.5 cursor-default hover:bg-gray-400/10 rounded-md">
						<ArrowRightStartOnRectangleIcon
							className="w-4 h-4  flex-shrink-0"
							strokeWidth={2}
						/>
						Logout
					</div>
				</div>
			</div>
			<div className="opacity-0">
				<ProfileButton name={name} email={email} imageSrc={imageSrc} />
			</div>
		</div>
	);
};

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	const [contentRef, { height: contentHeight }] = useMeasure();
	const [triggerRef, { height: triggerHeight }] = useMeasure();
	return (
		<div className="h-full w-2/3 max-w-64 flex-shrink-0 flex flex-col justify-end items-end p-1 pb-0 ">
			<div className="w-full relative">
				<LayoutGroup>
					<Popover.Root open={open} onOpenChange={setOpen}>
						<Popover.Trigger className="w-full relative z-10" ref={triggerRef}>
							<motion.div
								whileTap={{
									scale: 0.95,
									y: 1,
									transition: {
										type: "spring",
										duration: 0.4,
										bounce: 0.4,
									},
								}}
								transition={{
									type: "spring",
									duration: 0.6,
									bounce: 0.2,
								}}
							>
								<motion.div
									className={cn(
										"absolute left-0 right-0 bottom-0 z-10 w-full bg-gray-100 transition-shadow duration-400",
										open && " shadow-xl",
									)}
									whileHover={{ opacity: 1 }}
									animate={{
										height: open ? contentHeight : triggerHeight,
										borderRadius: open
											? "var(--radius-xl)"
											: "var(--radius-lg)",
										opacity: open ? 1 : 0,
									}}
									transition={{
										type: "spring",
										duration: 0.3,
										bounce: 0.1,
									}}
								/>
								<ProfileButton open={open} />
							</motion.div>
						</Popover.Trigger>
						<Popover.Portal keepMounted>
							<AnimatePresence>
								{open && (
									<Popover.Positioner
										side="top"
										sideOffset={({ anchor }) => {
											return anchor.height * -1;
										}}
										className="fixed z-20"
									>
										<Popover.Popup
											finalFocus={false}
											render={
												<motion.div
													ref={contentRef}
													className="w-[var(--anchor-width)] relative z-20"
													initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
													animate={{
														opacity: 1,
														y: 0,
														filter: "blur(0px)",
														transition: {
															delay: 0.1,
															type: "spring",
															duration: 0.4,
															bounce: 0.1,
														},
													}}
													exit={{ opacity: 0, y: 16, filter: "blur(8px)" }}
													transition={{
														type: "spring",
														duration: 0.15,
														bounce: 0.1,
													}}
												>
													<PopoverContent />
												</motion.div>
											}
										/>
									</Popover.Positioner>
								)}
							</AnimatePresence>
						</Popover.Portal>
					</Popover.Root>
				</LayoutGroup>
			</div>
		</div>
	);
};

const MainContent = () => {
	return (
		<div className="h-full w-full bg-white rounded-bl-md shadow-skew ring-1 p-6 ring-gray-400/5">
			<div className="mask-r-from-0% mask-b-from-0% w-full h-full">
				<div className="min-w-[440px] w-full space-y-3 text-gray-400 leading-loose h-full">
					<h2 className="text-lg font-[550]">Some mock content</h2>
					<h1 className="text-2xl font-[550]">The Montrèal café scene</h1>
					<p>
						Montreal is a haven for coffee lovers, boasting a vibrant café
						culture. Each neighborhood has its own unique spots, from cozy
						corners to bustling hubs. The aroma of freshly brewed coffee fills
						the air, inviting locals and tourists alike to take a break and
						enjoy the atmosphere.
					</p>
					<p>
						Many cafes offer more than just coffee; they serve delicious
						pastries and light bites. It&apos;s common to find artisanal treats
						that pair perfectly with a cup of joe. Some places even feature
						local art, creating a warm and inviting environment. Outdoor seating
						is a big draw, especially during the warmer months.
					</p>
					<p>
						Patrons can sip their drinks while soaking up the sun and
						people-watching. The lively streets of Montreal provide the perfect
						backdrop for a leisurely café experience. For those seeking a quiet
						spot to work or read, there are plenty of options.
					</p>
					<p>
						Many cafes have free Wi-Fi and comfortable seating, making them
						ideal for remote work or study sessions. The blend of good coffee
						and a relaxed vibe keeps people coming back for more.
					</p>
				</div>
			</div>
		</div>
	);
};

export { ProfileMenu };
