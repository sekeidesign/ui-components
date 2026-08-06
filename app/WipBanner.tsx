"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "wip-banner-dismissed";

export function WipBanner() {
	// Start hidden and reveal after the localStorage check so a returning
	// visitor who dismissed the banner never sees it flash on load.
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(STORAGE_KEY) !== "true") {
			setVisible(true);
		}
	}, []);

	const dismiss = () => {
		setVisible(false);
		localStorage.setItem(STORAGE_KEY, "true");
	};

	if (!visible) return null;

	return (
		<div className="panel bg-amber-50! p-4 md:px-6 flex items-center justify-between gap-4">
			<p className="text-amber-800 text-sm font-[450] leading-relaxed">
				This website is currently a work in progress. Expect minor bugs.
			</p>
			<button
				type="button"
				aria-label="Dismiss"
				onClick={dismiss}
				className="text-amber-800/50 hover:text-amber-800 transition-colors shrink-0 cursor-pointer"
			>
				<X className="size-4" />
			</button>
		</div>
	);
}
