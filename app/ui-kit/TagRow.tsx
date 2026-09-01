"use client";

import { Experiment } from "./Experiment";

/**
 * Client wrapper so server components can render tags: `Experiment.Tags` is
 * Object.assign'd onto a client component, and the RSC boundary forwards only
 * the reference itself, not properties hung off it.
 */
export function TagRow({ tags }: { tags: string[] }) {
	if (tags.length === 0) return null;

	return (
		<Experiment.Tags>
			{tags.map((tag) => (
				<Experiment.Tag key={tag}>{tag}</Experiment.Tag>
			))}
		</Experiment.Tags>
	);
}
