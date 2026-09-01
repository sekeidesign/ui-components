const COMMIT_URL =
	"https://api.github.com/repos/sekeidesign/sekei-xyz/commits/main";

/** Long enough that the footer never costs a request per visitor. */
const REVALIDATE_SECONDS = 3600;

interface Commit {
	url: string;
	sha: string;
	date: string;
}

/**
 * Fetched on the server rather than in an effect: the sha is the same for every
 * reader, so a client fetch spent a round trip per visit and showed a loading
 * line first. Revalidated hourly, so a deploy isn't needed to move it on.
 */
async function readCommit(): Promise<Commit | null> {
	try {
		const res = await fetch(COMMIT_URL, {
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!res.ok) return null;

		const data = await res.json();
		return {
			url: data.html_url,
			sha: data.sha.slice(0, 7),
			date: new Date(data.commit.author.date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
		};
	} catch {
		return null;
	}
}

const LastUpdated = async () => {
	const commit = await readCommit();

	if (!commit)
		return (
			<p className="text-xs font-[500] text-gray-400 py-2">
				Latest commit unavailable
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
			<br />
			<span className="text-gray-400">on </span>
			<span>{commit.date}</span>
		</a>
	);
};

export { LastUpdated };
