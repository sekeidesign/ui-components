/**
 * Geist for Satori.
 *
 * next/font can't help here — it hands back CSS, and Satori needs the raw font
 * bytes. Static instances rather than the variable file: Satori renders a
 * variable font at its default weight only, so the three weights the OG card
 * uses have to be three files.
 *
 * Addressed with `new URL(..., import.meta.url)` rather than a path off
 * `process.cwd()`: that's what the bundler resolves statically, emits the file
 * for and traces into the deployed function. A runtime path read isn't traced,
 * and the fonts would be missing in production. Read with `fs` rather than the
 * `fetch` the Next docs pair with it — the URL is a `file:` one, which Node's
 * fetch refuses.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const FILES = [
	{ weight: 400, url: new URL("./fonts/geist-400.ttf", import.meta.url) },
	{ weight: 500, url: new URL("./fonts/geist-500.ttf", import.meta.url) },
	{ weight: 600, url: new URL("./fonts/geist-600.ttf", import.meta.url) },
] as const;

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
		FILES.map(async ({ weight, url }) => ({
			name: "Geist",
			// A Buffer is a view into a pooled ArrayBuffer, so slice to this file's
			// own bytes rather than handing Satori the whole pool.
			data: await readFile(fileURLToPath(url)).then(
				(file) =>
					file.buffer.slice(
						file.byteOffset,
						file.byteOffset + file.byteLength,
					) as ArrayBuffer,
			),
			weight,
			style: "normal" as const,
		})),
	);
	return cached;
}
