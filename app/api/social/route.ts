import { NextResponse } from "next/server";
import {
	incrementCounts,
	isSocialConfigured,
	MAX_DELTA_PER_REQUEST,
	readCounts,
	SOCIAL_KINDS,
	type SocialKind,
} from "@/lib/social";
import { getTimeline } from "@/lib/timeline";

// Counts change on every click, so nothing here may be cached.
export const dynamic = "force-dynamic";

/** Only real posts get keys — otherwise any POST could fill Redis with junk. */
function knownSlugs() {
	return new Set(getTimeline().map((entry) => entry.slug));
}

export async function GET(request: Request) {
	const param = new URL(request.url).searchParams.get("slugs");
	const known = knownSlugs();
	const slugs: string[] = [];
	for (const raw of param ? param.split(",") : known) {
		const slug = raw.trim();
		if (known.has(slug)) slugs.push(slug);
	}

	const counts = await readCounts(slugs);
	return NextResponse.json({ configured: isSocialConfigured, counts });
}

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
	}

	const { slug, deltas } = (body ?? {}) as {
		slug?: string;
		deltas?: Record<string, unknown>;
	};

	if (!slug || !knownSlugs().has(slug)) {
		return NextResponse.json({ error: "unknown slug" }, { status: 400 });
	}

	const clean: Partial<Record<SocialKind, number>> = {};
	for (const kind of SOCIAL_KINDS) {
		const raw = Number(deltas?.[kind] ?? 0);
		if (!Number.isFinite(raw) || raw <= 0) continue;
		clean[kind] = Math.min(Math.floor(raw), MAX_DELTA_PER_REQUEST);
	}

	if (!isSocialConfigured) {
		// Nothing to persist to yet. Not an error the reader should see — the
		// client keeps its optimistic count either way.
		return NextResponse.json({ configured: false, counts: null });
	}

	const counts = await incrementCounts(slug, clean);
	return NextResponse.json({ configured: true, counts });
}
