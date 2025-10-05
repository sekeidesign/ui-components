"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "./cn";

const iconButtonVariants = cva(
	"inline-flex items-center justify-center select-none disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:scale-[0.95] transition-colors duration-200",
	{
		variants: {
			variant: {
				primary:
					"bg-zinc-50/85 text-zinc-900 hover:bg-zinc-50 disabled:bg-zinc-50/25 disabled:text-zinc-500 focus-visible:ring-gray-400 disabled:hover:bg-zinc-50/85 disabled:hover:text-zinc-900",
				secondary:
					"bg-transparent text-white hover:bg-zinc-200/7 disabled:text-white/30 disabled:hover:bg-transparent disabled:hover:text-white",
			},
			size: {
				sm: "h-6 w-6 rounded-lg [&>*]:w-4 [&>*]:h-4",
				md: "h-9 w-9 rounded-xl [&>*]:w-6 [&>*]:h-6",
				lg: "h-12 w-12 rounded-2xl [&>*]:w-8 [&>*]:h-8",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface IconButtonProps
	extends NativeButtonProps,
		VariantProps<typeof iconButtonVariants> {
	"aria-label"?: string; // strongly recommended for icon-only buttons
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ variant, size, type = "button", children, ...props }, ref) => {
		if (process.env.NODE_ENV !== "production") {
			// Encourage accessible labeling for icon-only buttons
			if (!props["aria-label"] && !props["aria-labelledby"]) {
				// eslint-disable-next-line no-console
				console.warn(
					"IconButton: provide `aria-label` or `aria-labelledby` for accessibility.",
				);
			}
		}

		return (
			<button
				ref={ref}
				type={type}
				className={cn(iconButtonVariants({ variant, size }))}
				{...props}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
export type { IconButtonProps };
