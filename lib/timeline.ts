import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type EntryKind =
	| "experiment"
	/** Long-form prose: case studies, articles. Excerpt in the feed, body on its page. */
	| "writing"
	/** Short status post — a new job, a small announcement. Body renders inline
	 * in the feed and it gets no page of its own, because the post IS the content. */
	| "note"
	/** An app or project going live. Carries artwork and an outbound link. */
	| "launch"
	/** A book finished. Cover thumbnail, author, rating; prose optional. */
	| "book"
	| "photo";

/**
 * How much a live preview costs to leave running offscreen.
 *
 * `light` — DOM + transforms, idle cost near zero. Mounted once it comes near
 * the viewport and kept mounted, so interaction state survives scrolling.
 * `heavy` — canvas, WebGL, video. An idle GPU context still costs, so these
 * unmount whenever they leave the nearby band.
 */
export type PreviewCost = "light" | "heavy";

export type PreviewMode = "live" | "cover" | "none";

export interface TimelineEntry {
	slug: string;
	title: string;
	/** ISO yyyy-mm-dd. Sorts lexicographically, so no Date parsing needed. */
	date: string;
	kind: EntryKind;
	tags: string[];
	excerpt?: string;
	preview: PreviewMode;
	previewCost: PreviewCost;
	/** Reserved px for the preview slot, so mount/unmount never shifts layout. */
	previewHeight: number;
	/** Raw Tailwind for the preview container, when a demo needs its own
	 * padding or alignment (e.g. `p-0 items-start` for a top-anchored island). */
	previewClassName?: string;
	sourceUrl?: string;
	/** Outbound destination — App Store, project site. Absolute URL. */
	link?: string;
	/** Button label for `link`. Defaults to the link's hostname. */
	linkLabel?: string;
	/** Artwork: a path under public/ (`/covers/x.png`) or an absolute URL. */
	cover?: string;
	/** Book author. */
	author?: string;
	/** Book rating, 0–5. */
	rating?: number;
	/** Book spine cloth colour for Book3D — covers rarely have a spine image. */
	spineColor?: string;
	/** CSS aspect-ratio for the cover box. Defaults to 16/9. */
	coverAspect?: string;
	/** Whether this entry gets its own /p/<slug> page. Notes default to false. */
	hasPage: boolean;
	draft?: boolean;
}

const KINDS: EntryKind[] = [
	"experiment",
	"writing",
	"note",
	"launch",
	"book",
	"photo",
];
const PREVIEW_MODES: PreviewMode[] = ["live", "cover", "none"];
const PREVIEW_COSTS: PreviewCost[] = ["light", "heavy"];

function fail(slug: string, message: string): never {
	throw new Error(`content/${slug}/index.mdx: ${message}`);
}

function parseEntry(slug: string): TimelineEntry {
	const source = fs.readFileSync(
		path.join(CONTENT_ROOT, slug, "index.mdx"),
		"utf8",
	);
	const data = matter(source).data as Partial<TimelineEntry>;

	if (!data.title) fail(slug, "missing `title`");
	if (!data.date) fail(slug, "missing `date`");
	// gray-matter turns unquoted YAML dates into Date objects; keep it a string.
	const rawDate: unknown = data.date;
	const date =
		rawDate instanceof Date
			? rawDate.toISOString().slice(0, 10)
			: String(rawDate);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
		fail(slug, `\`date\` must be yyyy-mm-dd, got "${date}"`);
	if (!data.kind || !KINDS.includes(data.kind))
		fail(slug, `\`kind\` must be one of ${KINDS.join(" | ")}`);

	const preview = data.preview ?? "none";
	if (!PREVIEW_MODES.includes(preview))
		fail(slug, `\`preview\` must be one of ${PREVIEW_MODES.join(" | ")}`);

	const previewCost = data.previewCost ?? "light";
	if (!PREVIEW_COSTS.includes(previewCost))
		fail(slug, `\`previewCost\` must be one of ${PREVIEW_COSTS.join(" | ")}`);

	if (preview === "live" && !fs.existsSync(path.join(CONTENT_ROOT, slug, "Preview.tsx")))
		fail(slug, "`preview: live` but no Preview.tsx alongside it");

	if (data.link && !/^https?:\/\//.test(data.link))
		fail(slug, `\`link\` must be an absolute http(s) URL, got "${data.link}"`);

	// Either a public/ path or a remote URL. A path relative to the content
	// folder would 404 silently at request time, so reject it here.
	if (
		data.cover &&
		!data.cover.startsWith("/") &&
		!/^https?:\/\//.test(data.cover)
	)
		fail(
			slug,
			`\`cover\` must start with "/" (a public/ path) or be an absolute URL, got "${data.cover}"`,
		);

	if (data.spineColor && !/^#[0-9a-fA-F]{3,8}$/.test(data.spineColor))
		fail(slug, `\`spineColor\` must be a hex colour, got "${data.spineColor}"`);

	if (
		data.rating !== undefined &&
		(!Number.isInteger(data.rating) || data.rating < 0 || data.rating > 5)
	)
		fail(slug, `\`rating\` must be a whole number 0–5, got "${data.rating}"`);

	if (data.linkLabel && !data.link)
		fail(slug, "`linkLabel` set but no `link` to label");

	return {
		slug,
		title: data.title,
		date,
		kind: data.kind,
		tags: data.tags ?? [],
		excerpt: data.excerpt,
		preview,
		previewCost,
		previewHeight: data.previewHeight ?? 240,
		previewClassName: data.previewClassName,
		link: data.link,
		linkLabel: data.linkLabel,
		cover: data.cover,
		author: data.author,
		rating: data.rating,
		spineColor: data.spineColor,
		coverAspect: data.coverAspect ?? "16 / 9",
		// Notes and books are short enough that the feed shows all of them, so a
		// page would just be the same words alone. Set `hasPage: true` on a book
		// to give a longer review its own page.
		hasPage: data.hasPage ?? !["note", "book"].includes(data.kind),
		sourceUrl: data.sourceUrl,
		draft: data.draft ?? false,
	};
}

function readTimeline(): TimelineEntry[] {
	if (!fs.existsSync(CONTENT_ROOT)) return [];

	return fs
		.readdirSync(CONTENT_ROOT, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
		.filter((slug) =>
			fs.existsSync(path.join(CONTENT_ROOT, slug, "index.mdx")),
		)
		.map(parseEntry)
		.filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
		// Slug breaks ties so posts sharing a date keep a stable order across
		// builds instead of following directory read order.
		.sort(
			(a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
		);
}

let cached: TimelineEntry[] | null = null;

/**
 * Cached per process in production, since content is fixed at build time.
 * Re-read every call in development — the bundler does not track these fs
 * reads, so a cached registry would leave frontmatter edits invisible until a
 * dev server restart.
 */
export function getTimeline(): TimelineEntry[] {
	if (process.env.NODE_ENV === "development") return readTimeline();
	if (!cached) cached = readTimeline();
	return cached;
}

export function getAllTags(): string[] {
	return [...new Set(getTimeline().flatMap((entry) => entry.tags))].sort();
}
