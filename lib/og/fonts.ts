import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Geist for Satori.
 *
 * next/font can't help here — it hands back CSS, and Satori needs the raw font
 * bytes. Static instances rather than the variable file: Satori renders a
 * variable font at its default weight only, so the three weights the OG card
 * uses have to be three files.
 *
 * Read off disk rather than through `new URL(..., import.meta.url)`, which is
 * what the Next docs pair with `fetch`: in the webpack server build that
 * resolves to the asset's *public* path (`/_next/static/media/geist-400.ttf`),
 * not a file one, so `fileURLToPath` throws ERR_INVALID_URL and the route 500s.
 * It works under Turbopack in dev, where the URL comes back native and local —
 * the failure only appears in a production build.
 *
 * A path read isn't traced on its own, so next.config's
 * `outputFileTracingIncludes` ships this directory with the route.
 */

const FONT_DIR = path.join(process.cwd(), "lib", "og", "fonts");

export type OgFont = {
	name: string;
	data: ArrayBuffer;
	weight: 400 | 500 | 600;
	style: "normal";
};

// Module scope, so a build drawing every book's card reads each file once.
let cached: Promise<OgFont[]> | undefined;

export function geistForOg(): Promise<OgFont[]> {
	cached ??= Promise.all(
		([400, 500, 600] as const).map(async (weight) => {
			const file = await readFile(path.join(FONT_DIR, `geist-${weight}.ttf`));
			return {
				name: "Geist",
				// A Buffer is a view into a pooled ArrayBuffer, so slice to this
				// file's own bytes rather than handing Satori the whole pool.
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
