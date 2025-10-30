import type { ReactNode } from "react";

export default function UIExperimentsLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
			<div className="p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md mx-auto">
					<main className="flex flex-col gap-8 md:gap-20 items-center justify-center w-full max-w-screen-md">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
}
