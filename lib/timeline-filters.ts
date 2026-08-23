import type { EntryKind } from "./timeline";

/**
 * Filters live in a query param so several can be active at once:
 * /?kind=apps,experiments,work. No param means everything.
 */
export const FILTER_PARAM = "kind";

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

/** Reverse lookup, for deciding whether an entry passes the current filter. */
export const KIND_FILTER = Object.fromEntries(
	Object.entries(FILTER_KINDS).map(([slug, kind]) => [kind, slug]),
) as Record<EntryKind, FilterSlug>;

export function isFilterSlug(value: string): value is FilterSlug {
	return value in FILTER_KINDS;
}

/** Unknown slugs are dropped rather than 404ing — a stale link still works. */
export function parseFilters(value: string | null): Set<FilterSlug> {
	if (!value) return new Set();
	return new Set(value.split(",").map((s) => s.trim()).filter(isFilterSlug));
}

/** Serialised in FILTER_ORDER so the same selection always gives the same URL. */
export function serializeFilters(selected: Set<FilterSlug>): string {
	return FILTER_ORDER.filter((slug) => selected.has(slug)).join(",");
}
