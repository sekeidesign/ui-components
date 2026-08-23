import type { EntryKind } from "./timeline";

/**
 * URL segment for each kind, so a filtered feed is a real shareable route:
 * /books rather than a client-only toggle. The unfiltered feed is the home page.
 */
export const FILTER_KINDS = {
	apps: "launch",
	books: "book",
	experiments: "experiment",
	work: "note",
	writing: "writing",
	photos: "photo",
} as const satisfies Record<string, EntryKind>;

export type FilterSlug = keyof typeof FILTER_KINDS;

/** Tab order from the design, independent of how many entries each kind has. */
export const FILTER_ORDER: FilterSlug[] = [
	"apps",
	"books",
	"experiments",
	"work",
	"writing",
	"photos",
];

export const FILTER_LABELS: Record<FilterSlug, string> = {
	apps: "Apps",
	books: "Books",
	experiments: "Experiments",
	work: "Work",
	writing: "Writing",
	photos: "Photos",
};

export function isFilterSlug(value: string): value is FilterSlug {
	return value in FILTER_KINDS;
}

export const filterHref = (slug?: FilterSlug) => (slug ? `/${slug}` : "/");
