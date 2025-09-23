import { BellIcon, EnvelopeIcon, HomeIcon } from "@heroicons/react/20/solid";
import { motion, useDragControls } from "motion/react";
import {
	createContext,
	type ReactNode,
	useContext,
	useRef,
	useState,
} from "react";
import useMeasure from "react-use-measure";
import { cn } from "../ui-kit/cn";

// Context for collapsible menu state
interface CollapsableMenuContextValue {
	isDetached: boolean;
	setIsDetached: (detached: boolean) => void;
}

const CollapsableMenuContext =
	createContext<CollapsableMenuContextValue | null>(null);

// Provider component
interface CollapsableMenuProviderProps {
	children: ReactNode;
}

const CollapsableMenuProvider = ({
	children,
}: CollapsableMenuProviderProps) => {
	const [isDetached, setIsDetached] = useState(false);

	return (
		<CollapsableMenuContext.Provider value={{ isDetached, setIsDetached }}>
			{children}
		</CollapsableMenuContext.Provider>
	);
};

const CollapsableMenuItem = ({
	icon,
	label,
}: {
	icon: ReactNode;
	label: string;
}) => {
	const { isDetached } = useCollapsableMenu();
	const [ref, { width }] = useMeasure();
	return (
		<motion.div className="py-1 px-2 bg-gray-100 h-8 min-w-8 overflow-hidden hover:bg-gray-200 rounded-full text-sm text-gray-500 flex items-center justify-center">
			{icon}
			<motion.div
				animate={{
					x: isDetached ? 8 : 0,
					width: isDetached ? 0 : width,
					transition: { type: "spring", duration: 0.4, bounce: 0.1 },
				}}
			>
				<span className="font-[500] pl-1" ref={ref}>
					{label}
				</span>
			</motion.div>
		</motion.div>
	);
};

// Hook to use the context
const useCollapsableMenu = () => {
	const context = useContext(CollapsableMenuContext);
	if (!context) {
		throw new Error(
			"useCollapsableMenu must be used within a CollapsableMenuProvider",
		);
	}
	return context;
};

const CollapsableMenu = () => {
	const DRAG_THRESHOLD = 100;
	const dragWrapperRef = useRef<HTMLDivElement>(null);
	const { isDetached, setIsDetached } = useCollapsableMenu();
	const dragControls = useDragControls();
	const [debug, setDebug] = useState(false);
	const startDrag = (event: React.PointerEvent<Element>) => {
		dragControls.start(event, { snapToCursor: false });
	};

	return (
		<div
			ref={dragWrapperRef}
			className="w-full h-full flex items-end justify-center p-4 relative"
		>
			<div
				className={cn(
					`absolute bottom-0 left-0 w-full h-[100px] bg-gray-100/50 z-0 border-t border-gray-200 border-dashed flex items-start justify-center text-xs text-gray-300 font-[450]`,
					debug ? "opacity-100" : "opacity-0",
				)}
			>
				<span className="-mt-6">Drag outside this area to detach</span>
			</div>
			<motion.div
				drag
				dragControls={dragControls}
				dragConstraints={
					isDetached ? dragWrapperRef : { top: 0, right: 0, bottom: 0, left: 0 }
				}
				dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
				dragElastic={0.7}
				whileDrag={{ cursor: "grabbing" }}
				onDrag={(_, info) => {
					const dragDistance = Math.sqrt(info.offset.y ** 2);
					if (!isDetached && dragDistance > DRAG_THRESHOLD) {
						if (debug) console.log("Detached");
						setIsDetached(true);
					}
				}}
				className={cn(
					"flex relative items-center justify-center p-1 rounded-full gap-1 bg-white transition-shadow duration-300 border border-gray-100 z-10",
					isDetached ? "shadow-xl" : "shadow-skew",
				)}
			>
				{/* This should be the drag handle, not the parent container */}
				<div
					className={cn(
						"w-7 h-1 bg-gray-300 rounded-full absolute -top-3 left-1/2 transition-transform duration-200 hover:scale-110 cursor-grab active:cursor-grabbing active:scale-100 -translate-x-1/2",
						"after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[150%] after:rounded-full after:border after:border-red-500  after:aspect-video",
						debug ? "after:opacity-100" : "after:opacity-0",
					)}
					onPointerDown={startDrag}
				/>

				{/* Instead of a menu, this should be a nice media player with controls */}
				<CollapsableMenuItem
					icon={<HomeIcon className="w-4 h-4" />}
					label="Home"
				/>
				<CollapsableMenuItem
					icon={<BellIcon className="w-4 h-4" />}
					label="Notifications"
				/>
				<CollapsableMenuItem
					icon={<EnvelopeIcon className="w-4 h-4" />}
					label="Messages"
				/>
			</motion.div>
			<button
				type="button"
				className="bg-gray-100 hover:bg-gray-200 hover:text-gray-500 cursor-pointer rounded-md px-2 py-1 text-xs font-[500] text-gray-400 absolute bottom-2 right-2"
				onClick={() => setDebug(!debug)}
			>
				{debug ? "Hide" : "Debug"}
			</button>
		</div>
	);
};

// Export the provider and component
export { CollapsableMenuProvider, useCollapsableMenu };
export default CollapsableMenu;
