import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Sidebar } from "./Sidebar";
import { FilterProvider } from "./ui-kit/filters/FilterContext";
import { SocialProvider } from "./ui-kit/social/SocialProvider";
import { TooltipProvider, TooltipSurface } from "./ui-kit/Tooltip";
import { getTimeline } from "@/lib/timeline";
import { Footer } from "./Footer";
import { MotionProvider } from "./ui-kit/motion/MotionProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "PG Gonni | Building software in Montréal",
		template: "%s | PG Gonni",
	},
	description: "Design Engineer making beautiful software",
	metadataBase: new URL("https://www.sekei.xyz"),
	openGraph: {
		title: "PG Gonni | Building software in Montréal",
		description: "Design Engineer making beautiful software",
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
				<MotionProvider>
				<TooltipProvider delay={200} closeDelay={0} timeout={400}>
					<TooltipSurface />
					<FilterProvider>
					<div className="font-[family-name:var(--font-geist-sans)] w-full box-border text-[15px]">
					<div className="flex md:flex-row flex-col justify-center mx-auto min-h-screen p-px gap-px">
						<div className="panel stripes flex-1 shrink md:block hidden md:sticky md:top-px md:self-start md:h-[calc(100vh-2px)]" />
						<Sidebar />
						<div className="panel flex flex-col w-full md:max-w-screen-md min-w-0">
							<main className="flex flex-col w-full p-2 md:p-5">
								{/* One counts fetch for the whole app, so navigating doesn't refetch. */}
								<SocialProvider
									slugs={getTimeline().map((entry) => entry.slug)}
								>
									{children}
								</SocialProvider>
							</main>
							<Footer className="md:hidden grid" />
						</div>
						<div className="panel stripes flex-1 shrink md:block hidden md:sticky md:top-px md:self-start md:h-[calc(100vh-2px)]" />
					</div>
				</div>
					</FilterProvider>
				</TooltipProvider>
				</MotionProvider>
			</body>
		</html>
	);
}
