"use client";

import { useEffect, useState } from "react";

const LastUpdated = () => {
	const [commit, setCommit] = useState<{
		message: string;
		url: string;
		sha: string;
		date: string;
	} | null>(null);

	useEffect(() => {
		const fetchCommit = async () => {
			const res = await fetch(
				"https://api.github.com/repos/sekeidesign/ui-components/commits/main",
			);
			const data = await res.json();
			setCommit({
				message: data.commit.message,
				url: data.html_url,
				sha: data.sha.slice(0, 7),
				date: new Date(data.commit.author.date).toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}),
			});
		};

		fetchCommit();
	}, []);

	if (!commit)
		return (
			<p className="text-xs font-[500] text-gray-600 py-2">
				Loading latest commit…
			</p>
		);

	return (
		<a
			href={commit.url}
			target="_blank"
			className="text-xs font-[500] text-right text-gray-600 py-2"
			rel="noopener noreferrer"
			style={{ fontFamily: "var(--font-geist-mono)" }}
		>
			<span>{commit.sha}</span>
			<br/>
			<span className="text-gray-400">on </span>
			<span>{commit.date}</span>
		</a>
	);
};

export { LastUpdated };
