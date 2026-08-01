"use client";

import { HoverCard } from "@ark-ui/react/hover-card";
import { Portal } from "@ark-ui/react/portal";
import Image from "next/image";
import type { ReactNode } from "react";

interface BookPreviewProps {
	cover: string;
	title: ReactNode;
	author?: string;
	description?: string;
	children: ReactNode;
}

const BookPreview = ({
	cover,
	title,
	author,
	description,
	children,
}: BookPreviewProps) => {
	return (
		<HoverCard.Root
			lazyMount
			openDelay={250}
			closeDelay={0}
			positioning={{ placement: "top" }}
		>
			<HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
			<Portal>
				<HoverCard.Positioner>
					<HoverCard.Content className="z-[1000] relative">
						<div
							className="p-4 bg-white ring ring-gray-400/15 shadow-xl rounded-xl w-72 flex items-center gap-4 hover-card-animate"
							style={{ fontFamily: "var(--font-geist-sans)" }}
						>
							<div className="w-16 aspect-[2/3] shrink-0 grow-0 rounded-[2px] ring ring-gray-400/15 overflow-hidden shadow-md bg-gray-100 relative">
								<Image src={cover} alt="" fill className="object-cover" />
							</div>
							<div className="min-w-0 space-y-1 py-0.5">
								<h2 className="font-[550] text-gray-800 leading-snug line-clamp-2">
									{title}
								</h2>
								{author && <p className="text-xs text-gray-500">by {author}</p>}
								{description && (
									<p className="text-xs text-gray-500 line-clamp-2 pt-0.5">
										{description}
									</p>
								)}
							</div>
						</div>
					</HoverCard.Content>
				</HoverCard.Positioner>
			</Portal>
		</HoverCard.Root>
	);
};

export { BookPreview };
export type { BookPreviewProps };
