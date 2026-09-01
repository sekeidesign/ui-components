"use client";

import { useState } from "react";
import "slot-text/style.css";
import {
	DEFAULT_WIPE_PARAMS,
	type WipeParams,
} from "@ui-kit/loading-wipe/wipe-shader";
import { useWipePlayback } from "./use-wipe-playback";
import { WipeControls } from "./WipeControls";
import { WipeStage } from "./WipeStage";

/**
 * The sweep, the skeleton it uncovers, and the knobs behind both.
 *
 * The surface starts as plain DOM and the WebGPU device is created on the first
 * play or scrub — a device costs while it exists, and this sits in a feed.
 *
 * Owns only `params`. Playback lives in useWipePlayback, and the two halves
 * below render it.
 */
export function LoadingWipePlayground() {
	const [params, setParams] = useState<WipeParams>(DEFAULT_WIPE_PARAMS);
	const {
		stageRef,
		pageRef,
		textRef,
		wipeRef,
		scrubInputRef,
		ready,
		playing,
		scrub,
		play,
		reset,
		onScrub,
	} = useWipePlayback(params);

	// Only from a standing start does the button offer Play; anywhere else,
	// including part-way through a scrub, the useful action is to go back.
	const atRest = scrub <= 0 && !playing;

	return (
		<div className="flex w-full flex-col items-stretch self-stretch md:h-[420px] md:flex-row">
			<WipeStage
				stageRef={stageRef}
				pageRef={pageRef}
				textRef={textRef}
				wipeRef={wipeRef}
				ready={ready}
				playing={playing}
				atRest={atRest}
				onPlay={play}
				onReset={reset}
			/>
			<WipeControls
				params={params}
				setParams={setParams}
				scrub={scrub}
				scrubInputRef={scrubInputRef}
				onScrub={onScrub}
			/>
		</div>
	);
}
