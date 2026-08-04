"use client";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

interface HoverContextValue {
	hoveredId: string | null;
	setHoveredId: Dispatch<SetStateAction<string | null>>;
}

const HoverContext = createContext<HoverContextValue>({
	hoveredId: null,
	setHoveredId: () => {},
});

export function HoverProvider({ children }: { children: ReactNode }) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	return (
		<HoverContext.Provider value={{ hoveredId, setHoveredId }}>
			{children}
		</HoverContext.Provider>
	);
}

// Pairs any number of elements under the same id — hovering one marks all
// of them active, so e.g. a panel and its related sentence can highlight
// each other regardless of which one triggered the hover.
export function useHoverGroup(id: string) {
	const { hoveredId, setHoveredId } = useContext(HoverContext);

	return {
		isActive: hoveredId === id,
		isSiblingActive: hoveredId !== null && hoveredId !== id,
		onMouseEnter: () => setHoveredId(id),
		onMouseLeave: () =>
			setHoveredId((current) => (current === id ? null : current)),
	};
}
