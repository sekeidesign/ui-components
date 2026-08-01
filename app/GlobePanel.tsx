"use client";

import "slot-text/style.css";
import { useEffect, useState } from "react";
import { SlotText } from "slot-text/react";
import { Globe } from "./ui-kit/Globe";

interface Stop {
	label: string;
	place: string;
	coords: [number, number];
}

const STOPS: Stop[] = [
	{ label: "Previously", place: "Forlì", coords: [44.2226, 12.0408] },
	{ label: "Previously", place: "Wichita Falls", coords: [33.9137, -98.4934] },
	{ label: "Previously", place: "Dubai", coords: [25.2048, 55.2708] },
	{ label: "Previously", place: "Los Angeles", coords: [34.0549, -118.2426] },
	{ label: "Previously", place: "Klamath Falls", coords: [42.2249, -121.7817] },
	{ label: "Previously", place: "Ottawa", coords: [45.4215, -75.6972] },
	{ label: "Currently in", place: "Montreal", coords: [45.5019, -73.5674] },
];

const HOME_INDEX = STOPS.length - 1;
const HOLD_MS = 1800;

export function GlobePanel() {
	const [index, setIndex] = useState(HOME_INDEX);
	const [hovering, setHovering] = useState(false);

	useEffect(() => {
		if (!hovering) {
			setIndex(HOME_INDEX);
			return;
		}

		setIndex(0);
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % STOPS.length);
		}, HOLD_MS);

		return () => clearInterval(id);
	}, [hovering]);

	const current = STOPS[index];

	return (
		<div
			className="flex-1 panel relative p-4 md:p-6 overflow-hidden min-h-[210px]"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<div className="relative z-10 flex flex-col">
				<SlotText
					text={current.label}
					options={{
						direction: "down",
						bounce: 0.1,
						duration: 200,
						stagger: 10,
						skipUnchanged: false,
					}}
					className="text-sm text-gray-400 tracking-tight"
				/>
				<SlotText
					text={current.place}
					options={{
						direction: "down",
						bounce: 0.1,
						duration: 400,
						stagger: 20,
						skipUnchanged: false,
					}}
					className="text-sm font-[550] tracking-tight -mt-0.5 text-gray-800"
				/>
			</div>
			<Globe className="absolute inset-0" location={current.coords} />
		</div>
	);
}
