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

/**
 * What relative OG paths resolve against. On a preview deployment that has to
 * be the deployment's own URL: pinned to the production domain, a preview's
 * card points at whatever production is serving, so anything new — a share card
 * that only exists on this branch — resolves to a 404 there.
 */
const siteUrl =
	// Keyed off VERCEL_URL rather than VERCEL_ENV alone: a preview build with
	// the host missing would interpolate to a bare "https://", and new URL()
	// throwing here takes down every page in the app.
	process.env.VERCEL_ENV !== "production" && process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: "https://www.sekei.xyz";

export const metadata: Metadata = {
	title: {
		default: "PG Gonni | Building software in Montréal",
		template: "%s | PG Gonni",
	},
	description: "Design Engineer making beautiful software",
	// react-doctor-disable-next-line no-unguarded-throwing-parse-call -- siteUrl is either a literal or "https://" plus a non-empty host, so both branches parse
	metadataBase: new URL(siteUrl),
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
