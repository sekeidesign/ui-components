import { PanelRow } from "@ui-kit/PanelRow";
import { BackLink } from "@ui-kit/BackLink";

/**
 * A post page is the feed's own layout: the same card, then its content, each
 * as a row in the same column. Only the back link is extra.
 */
export default function PostLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<PanelRow className="md:px-8 px-4 py-3">
				<BackLink />
			</PanelRow>
			{children}
		</>
	);
}
