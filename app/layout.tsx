import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LastUpdated } from "@ui-kit/LastUpdated";
import { Tabs } from "@ui-kit/Tabs";
import { TextLink } from "@ui-kit/TextLink";
import { Analytics } from "@vercel/analytics/next";
import { Sidebar } from "./Sidebar";

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
				style={{ backgroundColor: "var(--color-gray-200)" }}
			>
				<div className="font-[family-name:var(--font-geist-sans)] w-screen box-border text-[15px]">
					<div className="flex md:flex-row flex-col justify-center mx-auto h-screen p-px gap-px">
						<Sidebar />
						<div className="flex flex-col items-center justify-start w-full h-full rounded-sm overflow-y-auto">							
							<main className="flex flex-col gap-px items-center justify-center w-full">
								{children}
								<hr className="w-full border-gray-200" />
							</main>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
