import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
				{children}
			</body>
		</html>
	);
}
