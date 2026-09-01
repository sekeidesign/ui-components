import type { ComponentType } from "react";
import type { EntryKind } from "@/lib/timeline";
import { CameraIcon } from "../icons/CameraIcon";
import {
	AppLaunchKindIcon,
	BookKindIcon,
	ExperimentKindIcon,
	type KindIconProps,
	WorkKindIcon,
	WritingKindIcon,
} from "../icons/KindIcons";

/** Eyebrow label and icon per kind, matching the filter tabs. */
export const KIND_META: Record<
	EntryKind,
	{ label: string; Icon: ComponentType<KindIconProps> }
> = {
	writing: { label: "Writing", Icon: WritingKindIcon },
	book: { label: "Book", Icon: BookKindIcon },
	note: { label: "Work", Icon: WorkKindIcon },
	launch: { label: "App launch", Icon: AppLaunchKindIcon },
	experiment: { label: "Experiment", Icon: ExperimentKindIcon },
	photo: { label: "Photography", Icon: CameraIcon },
};
