"use client";

import CollapsableMenu, { CollapsableMenuProvider } from "./CollapsableMenu";

export default function Preview() {
	return (
		<CollapsableMenuProvider>
			<CollapsableMenu />
		</CollapsableMenuProvider>
	);
}
