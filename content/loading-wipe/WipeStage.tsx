"use client";

import { PlayIcon } from "@ui-kit/icons/PlayIcon";
import { ResetIcon } from "@ui-kit/icons/ResetIcon";
import {
	ShaderWipe,
	type ShaderWipeHandle,
} from "@ui-kit/loading-wipe/ShaderWipe";
import { Skeleton } from "@ui-kit/loading-wipe/Skeleton";
import type { RefObject } from "react";
import { SlotText } from "slot-text/react";

/**
 * The surface being uncovered: the skeleton, the page bitmap, the shader canvas
 * over it, and the one button that drives them. Holds no playback state — every
 * ref here belongs to useWipePlayback.
 */
export function WipeStage({
	stageRef,
	pageRef,
	textRef,
	wipeRef,
	ready,
	playing,
	atRest,
	onPlay,
	onReset,
}: {
	stageRef: RefObject<HTMLDivElement | null>;
	pageRef: RefObject<HTMLCanvasElement | null>;
	textRef: RefObject<HTMLDivElement | null>;
	wipeRef: RefObject<ShaderWipeHandle | null>;
	ready: boolean | null;
	playing: boolean;
	atRest: boolean;
	onPlay: () => void;
	onReset: () => void;
}) {
	return (
		<div ref={stageRef} className="relative flex-1 overflow-hidden">
			<Skeleton />

			{/* Visible until a device exists; after that the canvas below paints the same
			    bitmap, so this steps aside. */}
			<canvas
				ref={pageRef}
				aria-hidden
				className="absolute inset-0 block size-full"
				style={{ display: ready === true ? "none" : undefined }}
			/>

			{/* Mounted from the start: an undrawn canvas is transparent and costs nothing,
			    and one inside a display:none wrapper would measure 0x0 on its first draw. */}
			<div className="absolute inset-0">
				<ShaderWipe ref={wipeRef} />
			</div>

			<div
				ref={textRef}
				className="pointer-events-none absolute inset-0 flex items-center justify-center"
			>
				<span className="text-[15px] leading-[1.625] font-[420] text-gray-500">
					Loader content
				</span>
			</div>

			<button
				type="button"
				onClick={atRest ? onPlay : onReset}
				disabled={playing}
				className="absolute right-3 bottom-3 flex cursor-pointer items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-[450] text-gray-600 shadow-skew ring-1 ring-gray-500/10 hover:bg-gray-50 disabled:cursor-default disabled:opacity-60"
			>
				<span className="shrink-0">
					{atRest ? <PlayIcon size={14} /> : <ResetIcon size={14} />}
				</span>
				<SlotText
					text={playing ? "Sweeping…" : atRest ? "Play wipe" : "Reset"}
					options={{
						direction: "down",
						bounce: 0.1,
						duration: 300,
						stagger: 14,
						skipUnchanged: true,
					}}
				/>
			</button>
		</div>
	);
}
