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
import useMeasure from "react-use-measure";
import { cn } from "../ui-kit/cn";

const DRAG_THRESHOLD = 88;
const SPRING_CONFIG: Transition = {
	type: "spring",
	duration: 0.5,
	bounce: 0.4,
};

// Once offset > threshold, update exited state to true

const DetachableIsland = () => {
	const startingPointRef = useRef<HTMLDivElement>(null);
	const [startingPoint, setStartingPoint] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [containerRef, { width, height }] = useMeasure();
	const dragControls = useDragControls();
	const startDrag = (event: React.PointerEvent<Element>) => {
		dragControls.start(event, { snapToCursor: false });
	};
	const xDelta = useMotionValue(0);
	const xPosition = useMotionValue(0);
	const yDelta = useMotionValue(0);
	const yPosition = useMotionValue(0);

	const onDrag = (
		event: PointerEvent | MouseEvent | TouchEvent,
		info: PanInfo,
	) => {
		if (!startingPoint) return;
		console.log(xDelta.get(), yDelta.get());
		animate(xDelta, info.point.x - (startingPoint?.x + width / 2), {
			...SPRING_CONFIG,
		});
		animate(yDelta, info.point.y - (startingPoint?.y + height / 2), {
			...SPRING_CONFIG,
		});
	};
	const onDragEnd = () => {
		if (
			Math.abs(xDelta.get()) < DRAG_THRESHOLD &&
			Math.abs(yDelta.get()) < DRAG_THRESHOLD
		) {
			animate(xDelta, 0, { ...SPRING_CONFIG });
			animate(yDelta, 0, { ...SPRING_CONFIG });
		}
		return;
	};

	// For tracking re-renders. If the number changes, the component has re-rendered.
	const [randomNumber, setRandomNumber] = useState(0);
	useEffect(() => {
		setStartingPoint({
			x: startingPointRef.current?.getBoundingClientRect().x ?? 0 + width / 2,
			y: startingPointRef.current?.getBoundingClientRect().y ?? 0 + height / 2,
		});
		setRandomNumber(Math.random());
	}, [width, height]);

	return (
		<div className="h-full w-full flex items-end relative justify-center p-4">
			{randomNumber.toFixed(2)}
			<div
				className="bg-gray-100"
				style={{
					padding: `${DRAG_THRESHOLD - height / 2}px ${DRAG_THRESHOLD - width / 2}px`,
				}}
			>
				<motion.div
					style={{ x: xDelta, y: yDelta }}
					className="w-20 h-10 rounded-full bg-green-500"
					ref={containerRef}
				>
					<div
						onPointerDown={startDrag}
						ref={startingPointRef}
						className="w-full h-full bg-blue-500/20 cursor-grab active:cursor-grabbing"
					/>
				</motion.div>
			</div>
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
