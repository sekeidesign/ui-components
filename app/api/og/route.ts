import { type NextRequest, NextResponse } from "next/server";

const FETCH_TIMEOUT_MS = 5000;

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");
	if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

	// Caller-controlled, so only ordinary web URLs get fetched — not file:,
	// data: or anything else that would reach the build machine's own resources.
	let target: URL;
	try {
		target = new URL(url);
	} catch {
		return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
	}
	if (target.protocol !== "http:" && target.protocol !== "https:") {
		return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 });
	}

	try {
		const res = await fetch(target, {
			// fetch() resolves on 4xx/5xx, so an error page would otherwise be
			// scraped as though it were the real one.
			signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
		});
		if (!res.ok) {
			return NextResponse.json(
				{ error: `Upstream responded ${res.status}` },
				{ status: 502 },
			);
		}
		const html = await res.text();

		const og: Record<string, string> = {};
		const ogRegex =
			/<meta[^>]+property=["']og:([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*>/gi;
		let match: RegExpExecArray | null;
		while (true) {
			match = ogRegex.exec(html);
			if (match === null) break;
			og[match[1]] = match[2];
		}

		return NextResponse.json(og);
	} catch (error) {
		return NextResponse.json(
			{ error: `Failed to fetch or parse HTML: ${error}` },
			{ status: 500 },
		);
	}
}
