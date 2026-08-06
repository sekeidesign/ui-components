import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Matches the site's existing type scale/palette (see AboutPanel,
// WorkExperiencePanel) so case study prose reads as part of the same
// system instead of default browser typography.
export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: (props) => (
			<h1
				className="text-2xl md:text-3xl font-[550] text-gray-900 leading-tight mt-0 mb-4"
				{...props}
			/>
		),
		h2: (props) => (
			<h2
				className="text-xl font-[550] text-gray-900 leading-snug mt-10 mb-3"
				{...props}
			/>
		),
		h3: (props) => (
			<h3
				className="text-base font-[550] text-gray-900 leading-snug mt-8 mb-2"
				{...props}
			/>
		),
		p: (props) => (
			<p
				className="text-gray-500 text-[15px] font-[420] leading-relaxed mb-4"
				{...props}
			/>
		),
		a: ({ href, ...props }) => (
			<Link
				href={href ?? "#"}
				className="text-gray-900 font-[500] underline decoration-gray-300 hover:decoration-gray-900 underline-offset-2 transition-colors"
				{...props}
			/>
		),
		ul: (props) => (
			<ul
				className="list-disc pl-5 text-gray-500 text-[15px] font-[420] leading-relaxed space-y-1 mb-4"
				{...props}
			/>
		),
		ol: (props) => (
			<ol
				className="list-decimal pl-5 text-gray-500 text-[15px] font-[420] leading-relaxed space-y-1 mb-4"
				{...props}
			/>
		),
		li: (props) => <li className="pl-1" {...props} />,
		strong: (props) => (
			<strong className="font-[600] text-gray-900" {...props} />
		),
		blockquote: (props) => (
			<blockquote
				className="border-l-2 border-gray-300 pl-4 text-gray-500 italic mb-4"
				{...props}
			/>
		),
		hr: (props) => <hr className="border-gray-200 my-8" {...props} />,
		code: (props) => (
			<code
				className="bg-gray-200/60 rounded px-1.5 py-0.5 text-[13px] font-mono text-gray-800"
				{...props}
			/>
		),
		pre: (props) => (
			<pre
				className="bg-gray-900 text-gray-50 rounded-md p-4 overflow-x-auto text-[13px] my-6"
				{...props}
			/>
		),
		// eslint-disable-next-line @next/next/no-img-element -- MDX authors
		// pass arbitrary images without known dimensions.
		img: ({ alt, ...props }) => (
			<img
				alt={alt}
				className="w-full h-auto rounded-md border border-gray-200 shadow-skew bg-white my-6"
				{...props}
			/>
		),
		...components,
	};
}
