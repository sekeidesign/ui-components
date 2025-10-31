import { cn } from "@ui-kit/cn";
import {
	AnimatePresence,
	animate,
	MotionConfig,
	motion,
	type Transition,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from "motion/react";
import { useState } from "react";

const VerticalIconSwitch = () => {
	const [trip, setTrip] = useState<"oneWay" | "return">("oneWay");
	const [animationSpeed, setAnimationSpeed] = useState(1);

	const spring: Transition = {
		type: "spring",
		duration: 0.35 / animationSpeed,
		bounce: 0.2,
	};

	const tripValue = useMotionValue(0);
	const switchClipPathTop = useTransform(tripValue, [0, 1], [1, 26]);
	const switchClipPathBottom = useTransform(tripValue, [0, 1], [26, 1]);
	const switchClipPath = useMotionTemplate`inset(${switchClipPathTop}px 0px ${switchClipPathBottom}px 0px)`;
	const rectangleClipPathTop = useTransform(tripValue, [0, 1], [4, 28]);
	const rectangleClipPathBottom = useTransform(tripValue, [0, 1], [28, 4]);
	const rectangleClipPath = useMotionTemplate`inset(${rectangleClipPathTop}px 0% ${rectangleClipPathBottom}px 0%)`;

	return (
		<>
			<MotionConfig transition={spring}>
				<button
					type="button"
					className="flex items-center justify-center gap-1.5 cursor-pointer"
					onClick={() => {
						setTrip(trip === "oneWay" ? "return" : "oneWay");
						animate(tripValue, trip === "oneWay" ? 1 : 0, {
							...spring,
						});
					}}
				>
					<div className="relative">
						<div
							className={cn(
								"w-7 h-12 bg-gray-100 rounded-md overflow-hidden p-0.5 flex flex-col inset-shadow-sm outline outline-gray-200",
								trip === "oneWay" ? "justify-start" : "justify-end",
							)}
						>
							<motion.div
								layout
								className="w-6 h-5 bg-orange-500 rounded-sm shadow-md"
							/>
						</div>
						<motion.div
							className="absolute inset-0 p-0.5 flex flex-col justify-between text-white z-20"
							style={{
								clipPath: switchClipPath,
							}}
						>
							<div className="w-6 h-5 flex items-center justify-center">
								<OneWayIcon isActive={trip === "oneWay"} />
							</div>
							<div className="w-6 h-5 flex items-center justify-center">
								<ReturnIcon isActive={trip === "return"} />
							</div>
						</motion.div>
						<div className="absolute inset-0 p-0.5 flex flex-col justify-between text-gray-300 z-10">
							<div className="w-6 h-5 flex items-center justify-center">
								<OneWayIcon isActive={trip === "oneWay"} />
							</div>
							<div className="w-6 h-5 flex items-center justify-center">
								<ReturnIcon isActive={trip === "return"} />
							</div>
						</div>
					</div>
					<div className="relative">
						<motion.div
							className="p-0.5 flex relative flex-col h-12 items-start text-xs font-[500] justify-between text-orange-500 z-20"
							style={{ clipPath: rectangleClipPath }}
						>
							<div className=" h-5 flex items-center justify-center">
								One way
							</div>
							<div className=" h-5 flex items-center justify-center">
								Return
							</div>
						</motion.div>
						<div className="p-0.5 absolute inset-0 flex flex-col items-start text-xs font-[500] justify-between text-gray-300 z-10">
							<div className=" h-5 flex items-center justify-center">
								One way
							</div>
							<div className=" h-5 flex items-center justify-center">
								Return
							</div>
						</div>
					</div>
				</button>

				<button
					type="button"
					className="bg-gray-100 hover:bg-gray-200 hover:text-gray-500 cursor-pointer rounded-md px-2 py-1 text-xs font-[500] text-gray-400 absolute bottom-2 right-2"
					onClick={() => setAnimationSpeed(animationSpeed === 1 ? 0.15 : 1)}
				>
					{animationSpeed}x speed
				</button>
			</MotionConfig>
		</>
	);
};

const OneWayIcon = ({ isActive }: { isActive: boolean }) => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				className="h-4 w-full"
				aria-label="One way icon"
			>
				<title>One way icon</title>
				<MotionConfig transition={{ delay: 0.15 }}>
					<AnimatePresence mode="popLayout" initial={false}>
						{isActive ? (
							<motion.path
								key="default"
								initial={{ opacity: 0, x: -12 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 1,
									x: 0,
								}}
								fillRule="evenodd"
								d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
								clipRule="evenodd"
							/>
						) : (
							<motion.path
								key="animate"
								initial={{ opacity: 1, x: 0 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 0,
									x: 16,
									filter: "blur(2px)",
								}}
								fillRule="evenodd"
								d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
								clipRule="evenodd"
							/>
						)}
					</AnimatePresence>
				</MotionConfig>
			</svg>
		</div>
	);
};

const ReturnIcon = ({ isActive }: { isActive: boolean }) => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				className="h-4 w-full"
				aria-label="Return icon"
			>
				<title>Return icon</title>
				<MotionConfig transition={{ delay: 0.15 }}>
					<AnimatePresence mode="popLayout" initial={false}>
						{isActive ? (
							<motion.path
								key="primary-default"
								initial={{ opacity: 0, x: -12 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 1,
									x: 0,
								}}
								d="M10.47 2.22001C10.6106 2.07956 10.8012 2.00067 11 2.00067C11.1988 2.00067 11.3894 2.07956 11.53 2.22001L13.78 4.47001C13.9205 4.61064 13.9993 4.80126 13.9993 5.00001C13.9993 5.19876 13.9205 5.38939 13.78 5.53001L11.53 7.78001C11.4613 7.8537 11.3785 7.9128 11.2865 7.95379C11.1945 7.99478 11.0952 8.01683 10.9945 8.0186C10.8938 8.02038 10.7938 8.00186 10.7004 7.96413C10.607 7.92641 10.5222 7.87027 10.451 7.79905C10.3797 7.72783 10.3236 7.643 10.2859 7.54961C10.2482 7.45622 10.2296 7.35619 10.2314 7.25549C10.2332 7.15479 10.2552 7.05547 10.2962 6.96347C10.3372 6.87147 10.3963 6.78867 10.47 6.72001L11.44 5.75001H5.75C5.55109 5.75001 5.36032 5.67099 5.21967 5.53034C5.07902 5.38969 5 5.19892 5 5.00001C5 4.8011 5.07902 4.61033 5.21967 4.46968C5.36032 4.32903 5.55109 4.25001 5.75 4.25001H11.44L10.47 3.28001C10.3295 3.13939 10.2507 2.94876 10.2507 2.75001C10.2507 2.55126 10.3295 2.36064 10.47 2.22001Z"
								fill="currentColor"
							/>
						) : (
							<motion.path
								key="primary-animate"
								initial={{ opacity: 1, x: 0 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 0,
									x: 16,
									filter: "blur(2px)",
								}}
								d="M10.47 2.22001C10.6106 2.07956 10.8012 2.00067 11 2.00067C11.1988 2.00067 11.3894 2.07956 11.53 2.22001L13.78 4.47001C13.9205 4.61064 13.9993 4.80126 13.9993 5.00001C13.9993 5.19876 13.9205 5.38939 13.78 5.53001L11.53 7.78001C11.4613 7.8537 11.3785 7.9128 11.2865 7.95379C11.1945 7.99478 11.0952 8.01683 10.9945 8.0186C10.8938 8.02038 10.7938 8.00186 10.7004 7.96413C10.607 7.92641 10.5222 7.87027 10.451 7.79905C10.3797 7.72783 10.3236 7.643 10.2859 7.54961C10.2482 7.45622 10.2296 7.35619 10.2314 7.25549C10.2332 7.15479 10.2552 7.05547 10.2962 6.96347C10.3372 6.87147 10.3963 6.78867 10.47 6.72001L11.44 5.75001H5.75C5.55109 5.75001 5.36032 5.67099 5.21967 5.53034C5.07902 5.38969 5 5.19892 5 5.00001C5 4.8011 5.07902 4.61033 5.21967 4.46968C5.36032 4.32903 5.55109 4.25001 5.75 4.25001H11.44L10.47 3.28001C10.3295 3.13939 10.2507 2.94876 10.2507 2.75001C10.2507 2.55126 10.3295 2.36064 10.47 2.22001Z"
								fill="currentColor"
							/>
						)}
					</AnimatePresence>
					<AnimatePresence mode="popLayout" initial={false}>
						{isActive ? (
							<motion.path
								key="secondary-default"
								initial={{ opacity: 0, x: 12 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 1,
									x: 0,
								}}
								d="M5.53 8.22001C5.67045 8.36064 5.74934 8.55126 5.74934 8.75001C5.74934 8.94876 5.67045 9.13939 5.53 9.28001L4.56 10.25H10.25C10.4489 10.25 10.6397 10.329 10.7803 10.4697C10.921 10.6103 11 10.8011 11 11C11 11.1989 10.921 11.3897 10.7803 11.5303C10.6397 11.671 10.4489 11.75 10.25 11.75H4.56L5.53 12.72C5.60368 12.7887 5.66279 12.8715 5.70378 12.9635C5.74477 13.0555 5.76681 13.1548 5.76859 13.2555C5.77036 13.3562 5.75184 13.4562 5.71412 13.5496C5.6764 13.643 5.62025 13.7278 5.54903 13.799C5.47782 13.8703 5.39298 13.9264 5.29959 13.9641C5.20621 14.0019 5.10618 14.0204 5.00547 14.0186C4.90477 14.0168 4.80546 13.9948 4.71346 13.9538C4.62146 13.9128 4.53866 13.8537 4.47 13.78L2.22 11.53C2.07955 11.3894 2.00066 11.1988 2.00066 11C2.00066 10.8013 2.07955 10.6106 2.22 10.47L4.47 8.22001C4.61062 8.07956 4.80125 8.00067 5 8.00067C5.19875 8.00067 5.38937 8.07956 5.53 8.22001Z"
								fill="currentColor"
							/>
						) : (
							<motion.path
								key="secondary-animate"
								initial={{ opacity: 1, x: 0 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								exit={{
									opacity: 0,
									x: -16,
									filter: "blur(2px)",
								}}
								d="M5.53 8.22001C5.67045 8.36064 5.74934 8.55126 5.74934 8.75001C5.74934 8.94876 5.67045 9.13939 5.53 9.28001L4.56 10.25H10.25C10.4489 10.25 10.6397 10.329 10.7803 10.4697C10.921 10.6103 11 10.8011 11 11C11 11.1989 10.921 11.3897 10.7803 11.5303C10.6397 11.671 10.4489 11.75 10.25 11.75H4.56L5.53 12.72C5.60368 12.7887 5.66279 12.8715 5.70378 12.9635C5.74477 13.0555 5.76681 13.1548 5.76859 13.2555C5.77036 13.3562 5.75184 13.4562 5.71412 13.5496C5.6764 13.643 5.62025 13.7278 5.54903 13.799C5.47782 13.8703 5.39298 13.9264 5.29959 13.9641C5.20621 14.0019 5.10618 14.0204 5.00547 14.0186C4.90477 14.0168 4.80546 13.9948 4.71346 13.9538C4.62146 13.9128 4.53866 13.8537 4.47 13.78L2.22 11.53C2.07955 11.3894 2.00066 11.1988 2.00066 11C2.00066 10.8013 2.07955 10.6106 2.22 10.47L4.47 8.22001C4.61062 8.07956 4.80125 8.00067 5 8.00067C5.19875 8.00067 5.38937 8.07956 5.53 8.22001Z"
								fill="currentColor"
							/>
						)}
					</AnimatePresence>
				</MotionConfig>
			</svg>
		</div>
	);
};

export { VerticalIconSwitch };
