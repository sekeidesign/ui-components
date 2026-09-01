"use client";

import { useEffect, useState } from "react";

const LastUpdated = () => {
	const [commit, setCommit] = useState<{
		message: string;
		url: string;
		sha: string;
		date: string;
	} | null>(null);
	const [status, setStatus] = useState<"loading" | "loaded" | "error">(
		"loading",
	);

	useEffect(() => {
		const fetchCommit = async () => {
			try {
				const res = await fetch(
					"https://api.github.com/repos/sekeidesign/sekei-xyz/commits/main",
				);
				if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
				const data = await res.json();
				setCommit({
					message: data.commit.message,
					url: data.html_url,
					sha: data.sha.slice(0, 7),
					date: new Date(data.commit.author.date).toLocaleDateString(
						"en-US",
						{
							month: "short",
							day: "numeric",
							year: "numeric",
						},
					),
				});
				setStatus("loaded");
			} catch {
				setStatus("error");
			}
		};

		fetchCommit();
	}, []);

	if (status === "error")
		return (
			<p className="text-xs font-[500] text-gray-400 py-2">
				Latest commit unavailable
			</p>
		);

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
