import { BackLink } from "./BackLink";

export default function CaseStudiesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex gap-px w-full">
			<div className="panel flex-1 shrink xl:block hidden stripes" />
			<div className="flex flex-col gap-6 w-full flex-4 grow-20 xl:max-w-screen-md shrink-0 panel md:p-8 p-4">
				<BackLink />
				<article>{children}</article>
			</div>
			<div className="panel flex-1 shrink xl:block hidden stripes" />
		</div>
	);
}
