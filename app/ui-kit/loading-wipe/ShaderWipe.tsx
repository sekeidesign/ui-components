"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "../cn";
import {
	packParams,
	UNIFORM_FLOATS,
	WIPE_WGSL,
	type WipeParams,
} from "./wipe-shader";

/**
 * The canvas the sweep is drawn into, and nothing else.
 *
 * Deliberately clockless: it draws whatever progress it is handed. The caller
 * runs the animation, which is what keeps the canvas and the DOM sitting above
 * it (a label the shader cannot erase) on one clock instead of two that drift.
 *
 * The device is created on the first `prepare()`, not on mount. An idle GPU
 * context costs even when nothing is animating, and this sits in a feed.
 */
export interface ShaderWipeHandle {
	/**
	 * Creates the device if it does not exist yet. Resolves false when WebGPU
	 * is unavailable or initialisation fails, so the caller can fall back.
	 */
	prepare(): Promise<boolean>;
	/**
	 * Hands over the loading page bitmap the fragment samples as its base.
	 * Call again whenever it is repainted; uploading is not free, so not
	 * per frame.
	 */
	setPage(page: HTMLCanvasElement): void;
	/** Draws a single frame. Cheap — call it from your own animation loop. */
	draw(params: WipeParams, progress: number): void;
}

interface Renderer {
	device: GPUDevice;
	context: GPUCanvasContext;
	pipeline: GPURenderPipeline;
	uniform: GPUBuffer;
	sampler: GPUSampler;
	/** Rebuilt whenever the page texture is replaced. */
	bindGroup: GPUBindGroup | null;
	texture: GPUTexture | null;
	scratch: Float32Array<ArrayBuffer>;
	destroy(): void;
}

async function createRenderer(
	canvas: HTMLCanvasElement,
): Promise<Renderer | null> {
	if (typeof navigator === "undefined" || !navigator.gpu) return null;

	let device: GPUDevice;
	try {
		const adapter = await navigator.gpu.requestAdapter();
		if (!adapter) return null;
		device = await adapter.requestDevice();
	} catch {
		// No adapter on this machine — common on older or locked-down drivers.
		return null;
	}

	const context = canvas.getContext("webgpu");
	if (!context) {
		device.destroy();
		return null;
	}

	const format = navigator.gpu.getPreferredCanvasFormat();
	// Premultiplied, so the fragment's own alpha is what lets the page behind
	// the canvas show through where the sweep has passed.
	context.configure({ device, format, alphaMode: "premultiplied" });

	try {
		const shader = device.createShaderModule({ code: WIPE_WGSL });
		const pipeline = device.createRenderPipeline({
			layout: "auto",
			vertex: { module: shader, entryPoint: "vs_main" },
			fragment: {
				module: shader,
				entryPoint: "fs_main",
				targets: [{ format }],
			},
			primitive: { topology: "triangle-list" },
		});
		const uniform = device.createBuffer({
			size: UNIFORM_FLOATS * 4,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
		});
		// Nearest, not linear. The page bitmap is built at exactly the drawing
		// surface's device size, so every texel maps to one fragment — and at
		// 1:1 a linear filter can only soften, never improve. Canvas text is
		// already grayscale-antialiased rather than subpixel; resampling it on
		// top is what makes rasterised UI look washed out.
		const sampler = device.createSampler({
			magFilter: "nearest",
			minFilter: "nearest",
			addressModeU: "clamp-to-edge",
			addressModeV: "clamp-to-edge",
		});

		const renderer: Renderer = {
			device,
			context,
			pipeline,
			uniform,
			sampler,
			bindGroup: null,
			texture: null,
			scratch: new Float32Array(UNIFORM_FLOATS),
			destroy() {
				renderer.texture?.destroy();
				uniform.destroy();
				context.unconfigure();
				device.destroy();
			},
		};
		return renderer;
	} catch {
		// Shader rejected by this driver. Unconfigure before tearing down, or
		// the canvas keeps a context pointing at a destroyed device.
		context.unconfigure();
		device.destroy();
		return null;
	}
}

export const ShaderWipe = forwardRef<
	ShaderWipeHandle,
	{ className?: string }
>(function ShaderWipe({ className }, ref) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const rendererRef = useRef<Renderer | null>(null);
	const pendingRef = useRef<Promise<boolean> | null>(null);
	const disposedRef = useRef(false);

	useEffect(() => {
		disposedRef.current = false;
		return () => {
			disposedRef.current = true;
			rendererRef.current?.destroy();
			rendererRef.current = null;
			pendingRef.current = null;
		};
	}, []);

	useImperativeHandle(ref, () => ({
		prepare() {
			if (rendererRef.current) return Promise.resolve(true);
			// Share one in-flight attempt: React invokes effects twice in dev, and
			// two devices configuring the same canvas would leave the survivor
			// drawing into a context the loser unconfigured.
			pendingRef.current ??= (async () => {
				const canvas = canvasRef.current;
				if (!canvas) return false;
				const renderer = await createRenderer(canvas);
				if (!renderer) return false;
				if (disposedRef.current) {
					renderer.destroy();
					return false;
				}
				rendererRef.current = renderer;
				return true;
			})();
			return pendingRef.current;
		},

		setPage(page) {
			const renderer = rendererRef.current;
			if (!renderer || page.width === 0 || page.height === 0) return;
			const { device } = renderer;

			// Reallocate only when the size changes; a repaint at the same size
			// reuses the texture.
			if (
				!renderer.texture ||
				renderer.texture.width !== page.width ||
				renderer.texture.height !== page.height
			) {
				renderer.texture?.destroy();
				renderer.texture = device.createTexture({
					size: [page.width, page.height],
					format: "rgba8unorm",
					usage:
						GPUTextureUsage.TEXTURE_BINDING |
						GPUTextureUsage.COPY_DST |
						GPUTextureUsage.RENDER_ATTACHMENT,
				});
				renderer.bindGroup = device.createBindGroup({
					layout: renderer.pipeline.getBindGroupLayout(0),
					entries: [
						{ binding: 0, resource: { buffer: renderer.uniform } },
						{ binding: 1, resource: renderer.sampler },
						{ binding: 2, resource: renderer.texture.createView() },
					],
				});
			}

			device.queue.copyExternalImageToTexture(
				{ source: page },
				{ texture: renderer.texture },
				[page.width, page.height],
			);
		},

		draw(params, progress) {
			const renderer = rendererRef.current;
			const canvas = canvasRef.current;
			// No page uploaded yet means no bind group, and drawing without one
			// would paint the ribbon over nothing.
			if (!renderer || !canvas || !renderer.bindGroup) return;

			// Match the backing store to the box, capped at 2x: past that the
			// fragment cost doubles again for no visible gain on a demo this size.
			const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
			const width = Math.max(Math.round(canvas.clientWidth * dpr), 1);
			const height = Math.max(Math.round(canvas.clientHeight * dpr), 1);
			if (canvas.width !== width) canvas.width = width;
			if (canvas.height !== height) canvas.height = height;

			const { device, context, pipeline, uniform, bindGroup, scratch } =
				renderer;
			device.queue.writeBuffer(
				uniform,
				0,
				packParams(scratch, params, progress, width, height),
			);

			const encoder = device.createCommandEncoder();
			const pass = encoder.beginRenderPass({
				colorAttachments: [
					{
						view: context.getCurrentTexture().createView(),
						clearValue: { r: 0, g: 0, b: 0, a: 0 },
						loadOp: "clear",
						storeOp: "store",
					},
				],
			});
			pass.setPipeline(pipeline);
			pass.setBindGroup(0, bindGroup);
			pass.draw(3);
			pass.end();
			device.queue.submit([encoder.finish()]);
		},
	}));

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className={cn("block size-full", className)}
		/>
	);
});
