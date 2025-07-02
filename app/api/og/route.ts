// app/api/og/route.ts
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = req.nextUrl.searchParams.get("url");
	if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

	try {
		const res = await fetch(url);
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
