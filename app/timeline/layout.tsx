import { SocialProvider } from "@ui-kit/social/SocialProvider";
import { getTimeline } from "@/lib/timeline";

/**
 * Social counts live here so switching filters swaps only the list rather than
 * refetching. The filter tabs moved to the sidebar, where they're global nav.
 */
export default function TimelineLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SocialProvider slugs={getTimeline().map((entry) => entry.slug)}>
			{children}
		</SocialProvider>
	);
}
