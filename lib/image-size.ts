import fs from "node:fs";
import path from "node:path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");

/** Enough for a WebP or PNG header, and a JPEG's SOF marker without a huge EXIF payload. */
const HEAD_BYTES = 65536;

export interface ImageSize {
	width: number;
	height: number;
}

/**
 * Intrinsic pixel size of an image in public/, read straight from its header.
 *
 * Dependency-free on purpose: `sharp` ships inside Next's own tree rather than
 * this project's. Handles WebP and JPEG, plus PNG for free, and returns
 * undefined for anything else.
 */
export function readPublicImageSize(src: string): ImageSize | undefined {
	// Only public/ paths, and never out of it — a cover is author-controlled
	// content, so `..` shouldn't be able to walk the build machine's disk.
	if (!src.startsWith("/")) return undefined;
	const file = path.join(PUBLIC_ROOT, src.split("?")[0]);
	if (!file.startsWith(`${PUBLIC_ROOT}${path.sep}`)) return undefined;

	let head: Buffer;
	try {
		const fd = fs.openSync(file, "r");
		try {
			const buffer = Buffer.alloc(HEAD_BYTES);
			const read = fs.readSync(fd, buffer, 0, HEAD_BYTES, 0);
			head = buffer.subarray(0, read);
		} finally {
			fs.closeSync(fd);
		}
	} catch {
		return undefined;
	}

	return parseWebp(head) ?? parsePng(head) ?? parseJpeg(head);
}

function parseWebp(buf: Buffer): ImageSize | undefined {
	if (buf.length < 30) return undefined;
	if (buf.toString("ascii", 0, 4) !== "RIFF") return undefined;
	if (buf.toString("ascii", 8, 12) !== "WEBP") return undefined;

	switch (buf.toString("ascii", 12, 16)) {
		// Lossy: a 3-byte frame tag, the 0x9d012a start code, then 14-bit
		// dimensions — the top two bits of each 16 are the scaling hint.
		case "VP8 ":
			return {
				width: buf.readUInt16LE(26) & 0x3fff,
				height: buf.readUInt16LE(28) & 0x3fff,
			};
		// Lossless: one signature byte, then width-1 and height-1 as adjacent
		// 14-bit fields in a little-endian bitstream.
		case "VP8L": {
			const bits = buf.readUInt32LE(21);
			return {
				width: (bits & 0x3fff) + 1,
				height: ((bits >> 14) & 0x3fff) + 1,
			};
		}
		// Extended (alpha, animation): canvas size as two 24-bit minus-one fields.
		case "VP8X":
			return {
				width: buf.readUIntLE(24, 3) + 1,
				height: buf.readUIntLE(27, 3) + 1,
			};
		default:
			return undefined;
	}
}

function parsePng(buf: Buffer): ImageSize | undefined {
	if (buf.length < 24) return undefined;
	if (buf.readUInt32BE(0) !== 0x89504e47) return undefined;
	return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function parseJpeg(buf: Buffer): ImageSize | undefined {
	if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return undefined;

	let offset = 2;
	while (offset + 9 < buf.length) {
		if (buf[offset] !== 0xff) {
			offset += 1;
			continue;
		}

		const marker = buf[offset + 1];
		// Start-of-frame, in any of its flavours — baseline, progressive,
		// lossless — but not the DHT/JPG/DAC markers that share the range.
		if (
			marker >= 0xc0 &&
			marker <= 0xcf &&
			marker !== 0xc4 &&
			marker !== 0xc8 &&
			marker !== 0xcc
		) {
			return {
				height: buf.readUInt16BE(offset + 5),
				width: buf.readUInt16BE(offset + 7),
			};
		}

		// Padding and the standalone markers carry no length to skip over.
		if (marker === 0xff || (marker >= 0xd0 && marker <= 0xd9)) {
			offset += 2;
			continue;
		}

		offset += 2 + buf.readUInt16BE(offset + 2);
	}

	return undefined;
}
