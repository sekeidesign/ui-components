import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Geist for Satori, which needs raw font bytes rather than the CSS next/font
 * hands back. Three static instances, since Satori renders a variable font at
 * its default weight only.
 *
 * Read off disk rather than through `new URL(..., import.meta.url)`, which is
 * what the Next docs pair with `fetch`: in the webpack server build that
 * resolves to the asset's public path, not a file one, so the route 500s in
 * production while dev renders fine under Turbopack. A path read isn't traced
 * on its own, so next.config's `outputFileTracingIncludes` ships this
 * directory with the route.
 */

const FONT_DIR = path.join(process.cwd(), "lib", "og", "fonts");

export type OgFont = {
	name: string;
	data: ArrayBuffer;
	weight: 400 | 500 | 600;
	style: "normal";
};

let cached: Promise<OgFont[]> | undefined;

export function geistForOg(): Promise<OgFont[]> {
	cached ??= Promise.all(
		([400, 500, 600] as const).map(async (weight) => {
			const file = await readFile(path.join(FONT_DIR, `geist-${weight}.ttf`));
			return {
				name: "Geist",
				data: file.buffer.slice(
					file.byteOffset,
					file.byteOffset + file.byteLength,
				) as ArrayBuffer,
				weight,
				style: "normal" as const,
			};
		}),
	);
	return cached;
}
