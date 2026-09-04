import { Redis } from "@upstash/redis";

export type SocialKind = "fire" | "link";

export const SOCIAL_KINDS: SocialKind[] = ["fire", "link"];

export type SocialCounts = Record<SocialKind, number>;

/**
 * Per-request cap. Clicking is unlimited, but the client batches clicks into a
 * delta — so without one, a hand-rolled POST could add a billion in one call.
 */
export const MAX_DELTA_PER_REQUEST = 50;

// The Vercel/Upstash integration has shipped both namings over time, and a
// Custom Prefix in the connect dialog changes them again. Accept either rather
// than silently reading zeros because a var is spelled differently.
const url =
	process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
	process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

/** Null until the Upstash env vars are set, so the site builds and runs without a database. */
export const redis =
	url && token ? new Redis({ url, token }) : null;

export const isSocialConfigured = redis !== null;

/**
 * The free tier allows one database, so dev, preview and production share a
 * Redis. Namespacing by environment keeps test clicks out of the real counts.
 * VERCEL_ENV is unset locally.
 */
const ENV = process.env.VERCEL_ENV ?? "local";

const key = (slug: string, kind: SocialKind) =>
	`post:${ENV}:${slug}:${kind}`;

export async function readCounts(
	slugs: string[],
): Promise<Record<string, SocialCounts>> {
	const empty = () =>
		Object.fromEntries(SOCIAL_KINDS.map((k) => [k, 0])) as SocialCounts;

	if (!redis || slugs.length === 0) {
		return Object.fromEntries(slugs.map((s) => [s, empty()]));
	}

	// One round trip for the whole feed rather than one per post.
	const keys = slugs.flatMap((slug) =>
		SOCIAL_KINDS.map((kind) => key(slug, kind)),
	);
	const values = await redis.mget<(number | null)[]>(...keys);

	const out: Record<string, SocialCounts> = {};
	slugs.forEach((slug, i) => {
		const counts = empty();
		SOCIAL_KINDS.forEach((kind, k) => {
			counts[kind] = Number(values[i * SOCIAL_KINDS.length + k] ?? 0);
		});
		out[slug] = counts;
	});
	return out;
}

export async function incrementCounts(
	slug: string,
	deltas: Partial<Record<SocialKind, number>>,
): Promise<SocialCounts | null> {
	if (!redis) return null;

	// One round trip: INCRBY the kinds that changed, plain GET the ones that
	// didn't, so the caller still gets both numbers back without a second call.
	const pipeline = redis.pipeline();
	for (const kind of SOCIAL_KINDS) {
		const delta = deltas[kind];
		if (delta && delta > 0) {
			pipeline.incrby(key(slug, kind), Math.min(delta, MAX_DELTA_PER_REQUEST));
		} else {
			pipeline.get<number | null>(key(slug, kind));
		}
	}

	const results = (await pipeline.exec()) as (number | null)[];
	const counts = {} as SocialCounts;
	SOCIAL_KINDS.forEach((kind, i) => {
		counts[kind] = Number(results[i] ?? 0);
	});
	return counts;
}
