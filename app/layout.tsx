import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Sidebar } from "./Sidebar";
import { SocialProvider } from "./ui-kit/social/SocialProvider";
import { TooltipProvider, TooltipSurface } from "./ui-kit/Tooltip";
import { getTimeline } from "@/lib/timeline";
import { Footer } from "./Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PG Gonni",
	description: "Design Engineer based in Montréal, QC",
	metadataBase: new URL("https://uikitchen.dev"),
	openGraph: {
		title: "PG Gonni",
		description: "Design Engineer based in Montréal, QC",
		images: "/og-image.jpg",
	},
	icons: {
		icon: [
			{
				url: "/icons/favicon-light.svg",
				media: "(prefers-color-scheme: light)",
			},
			{ url: "/icons/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Analytics />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				style={{ backgroundColor: "var(--color-gray-200)" }}
			>
				<TooltipProvider delay={200} closeDelay={0} timeout={400}>
					{/* One shared tooltip for every trigger in the app, so moving between
					    controls repositions the same element instead of swapping popups. */}
					<TooltipSurface />
					<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border text-[15px]">
					{/* Striped gutters flank the sidebar and the feed together, so the
					    sidebar sits right against the content instead of being pushed
					    away by a gutter of its own. */}
					<div className="flex md:flex-row flex-col justify-center mx-auto h-screen p-px gap-px">
						<div className="panel stripes flex-1 shrink xl:block hidden" />
						<Sidebar />
						{/* One continuous panel: posts are separated by dividers, not by
						    being individual blocks. */}
						<div className="panel flex flex-col w-full md:max-w-screen-md shrink-0 h-full overflow-y-auto">
							<main className="flex flex-col w-full p-5">
								{/* One counts fetch for the whole app, so navigating between
								    the feed and a post doesn't refetch. */}
								<SocialProvider
									slugs={getTimeline().map((entry) => entry.slug)}
								>
									{children}
								</SocialProvider>
							</main>
							<Footer className="md:hidden grid" />
						</div>
						<div className="panel stripes flex-1 shrink xl:block hidden" />
					</div>
				</div>
				</TooltipProvider>
			</body>
		</html>
	);
}
