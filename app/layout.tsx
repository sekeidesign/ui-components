import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LastUpdated } from "@ui-kit/LastUpdated";
import { Tabs } from "@ui-kit/Tabs";
import { TextLink } from "@ui-kit/TextLink";
import { Analytics } from "@vercel/analytics/next";
import { IntroHeader } from "./IntroHeader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "PG's UI Kitchen",
	description: "Design Engineer based in Montréal, QC",
	metadataBase: new URL("https://uikitchen.dev"),
	openGraph: {
		title: "PG's UI Kitchen",
		description: "Design Engineer cooking up some UI experiments",
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
				style={{ backgroundColor: "oklch(0.985 0.002 247.839)" }}
			>
				<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border">
					<div className="flex md:flex-row flex-col gap-8 md:gap-20 p-4 md:p-8 py-8 md:py-20 justify-center mx-auto">
						<IntroHeader />
						<div className="flex flex-col gap-8 items-center justify-center max-w-screen-md">
							<Tabs />
							<hr className="w-full border-gray-200" />
							<main className="flex flex-col gap-8 md:gap-20 items-center justify-center w-full max-w-screen-md">
								{children}
								<hr className="w-full border-gray-200" />
							</main>
							<footer className="flex gap-8 items-center justify-between mx-auto max-w-screen-md w-full text-sm pb-8 md:pb-20">
								<div className="flex gap-4">
									<TextLink
										href="https://github.com/sekeidesign/"
										target="_blank"
										hasFavicon
									>
										GitHub
									</TextLink>
									<TextLink
										href="https://www.threads.com/@sekeidesign"
										target="_blank"
										hasFavicon
									>
										Threads
									</TextLink>
								</div>
								<LastUpdated />
							</footer>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
