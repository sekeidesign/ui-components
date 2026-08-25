"use client";

import { Experiment } from "./Experiment";

/**
 * Client wrapper so server components can render tags. Reaching for
 * `Experiment.Tags` directly from the server fails: those subcomponents are
 * Object.assign'd onto a client component, and the RSC boundary only forwards
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
