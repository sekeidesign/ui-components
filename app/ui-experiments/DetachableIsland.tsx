import { BellIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/20/solid";
import {
	animate,
	motion,
	type PanInfo,
	type Transition,
	useDragControls,
	useMotionValue,
	useMotionValueEvent,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../ui-kit/cn";

const DRAG_THRESHOLD = 88;
const SPRING_CONFIG: Transition = {
	type: "spring",
	duration: 0.5,
	bounce: 0.4,
};

// Once offset > threshold, update exited state to true

const DetachableIsland = () => {
	const dragControls = useDragControls();
	const startDrag = (event: React.PointerEvent<Element>) => {
		dragControls.start(event, { snapToCursor: false });
	};
	const xOffset = useMotionValue(0);
	const yOffset = useMotionValue(0);
	const onDrag = (
		event: PointerEvent | MouseEvent | TouchEvent,
		info: PanInfo,
	) => {
		animate(xOffset, info.offset.x, { ...SPRING_CONFIG });
		animate(yOffset, info.offset.y, { ...SPRING_CONFIG });
	};
	const onDragEnd = () => {
		animate(xOffset, 0, { ...SPRING_CONFIG });
		animate(yOffset, 0, { ...SPRING_CONFIG });
	};

	// For tracking re-renders. If the number changes, the component has re-rendered.
	const [randomNumber, setRandomNumber] = useState(0);
	useEffect(() => {
		setRandomNumber(Math.random());
	}, []);

	return (
		<div className="h-full w-full flex items-end relative justify-center p-4">
			{randomNumber}
			<motion.div
				style={{ x: xOffset, y: yOffset }}
				className="w-20 h-10 rounded-full bg-green-500"
			>
				<div
					onPointerDown={startDrag}
					className="w-full h-full bg-blue-500/20 cursor-grab active:cursor-grabbing"
				/>
			</motion.div>
			<motion.div
				drag
				onDrag={onDrag}
				onDragEnd={onDragEnd}
				dragListener={false}
				dragControls={dragControls}
				className="absolute rounded-full bg-transparent"
			/>
		</div>
	);
};

// Export the provider and component
export { DetachableIsland };
