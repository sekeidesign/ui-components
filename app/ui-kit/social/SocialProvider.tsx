"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { SocialCounts, SocialKind } from "@/lib/social";

const STORAGE_PREFIX = "social:v1:";
const FLUSH_DELAY = 600;

type CountMap = Record<string, SocialCounts>;

interface SocialContextValue {
	counts: CountMap;
	/** What this reader has contributed, from localStorage. Drives active state. */
	mine: CountMap;
	bump: (slug: string, kind: SocialKind) => void;
}

const SocialContext = createContext<SocialContextValue | null>(null);

const emptyCounts = (): SocialCounts => ({ fire: 0, link: 0 });

function readStored(slug: string): SocialCounts {
	try {
		const raw = localStorage.getItem(STORAGE_PREFIX + slug);
		if (!raw) return emptyCounts();
		const parsed = JSON.parse(raw) as Partial<SocialCounts>;
		return { fire: Number(parsed.fire ?? 0), link: Number(parsed.link ?? 0) };
	} catch {
		// Private windows and blocked site data both throw here.
		return emptyCounts();
	}
}

function writeStored(slug: string, counts: SocialCounts) {
	try {
		localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(counts));
	} catch {
		// Non-fatal: the reader just loses the active state next visit.
	}
}

export function SocialProvider({
	slugs,
	children,
}: {
	slugs: string[];
	children: React.ReactNode;
}) {
	const [counts, setCounts] = useState<CountMap>({});
	const [mine, setMine] = useState<CountMap>({});

	// Deltas not yet sent, keyed by slug. A ref so rapid clicks accumulate
	// without each one re-rendering or resetting the timer's closure.
	const pending = useRef<Record<string, Partial<SocialCounts>>>({});
	const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

	const slugKey = slugs.join(",");

	// Active state is read after mount: touching localStorage during render
	// would mismatch the server HTML.
	useEffect(() => {
		const stored: CountMap = {};
		for (const slug of slugKey ? slugKey.split(",") : []) {
			stored[slug] = readStored(slug);
		}
		setMine(stored);
	}, [slugKey]);

	// One request for the whole feed, not one per post.
	useEffect(() => {
		if (!slugKey) return;
		let cancelled = false;
		fetch(`/api/social?slugs=${encodeURIComponent(slugKey)}`)
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (!cancelled && data?.counts) setCounts(data.counts);
			})
			.catch(() => {
				// Counts stay at zero; clicking still works.
			});
		return () => {
			cancelled = true;
		};
	}, [slugKey]);

	const flush = useCallback((slug: string, keepalive = false) => {
		const deltas = pending.current[slug];
		if (!deltas) return;
		delete pending.current[slug];

		fetch("/api/social", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug, deltas }),
			keepalive,
		})
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (!data?.counts) return;
				// Anything clicked while this was in flight is still pending, so add
				// it back on top of the server's number.
				const inFlight = pending.current[slug] ?? {};
				setCounts((prev) => ({
					...prev,
					[slug]: {
						fire: data.counts.fire + (inFlight.fire ?? 0),
						link: data.counts.link + (inFlight.link ?? 0),
					},
				}));
			})
			.catch(() => {
				// Optimistic count stands; the next click retries.
			});
	}, []);

	const bump = useCallback(
		(slug: string, kind: SocialKind) => {
			setCounts((prev) => {
				const current = prev[slug] ?? emptyCounts();
				return { ...prev, [slug]: { ...current, [kind]: current[kind] + 1 } };
			});

			setMine((prev) => {
				const current = prev[slug] ?? emptyCounts();
				const next = { ...current, [kind]: current[kind] + 1 };
				writeStored(slug, next);
				return { ...prev, [slug]: next };
			});

			const slot = pending.current[slug] ?? {};
			slot[kind] = (slot[kind] ?? 0) + 1;
			pending.current[slug] = slot;

			// Mashing the button is one request, not fifty.
			clearTimeout(timers.current[slug]);
			timers.current[slug] = setTimeout(() => flush(slug), FLUSH_DELAY);
		},
		[flush],
	);

	// Don't lose the last clicks when the reader navigates away mid-debounce.
	useEffect(() => {
		const flushAll = () => {
			for (const slug of Object.keys(pending.current)) {
				clearTimeout(timers.current[slug]);
				flush(slug, true);
			}
		};
		const onHide = () => {
			if (document.visibilityState === "hidden") flushAll();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", flushAll);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", flushAll);
			flushAll();
		};
	}, [flush]);

	const value = useMemo(() => ({ counts, mine, bump }), [counts, mine, bump]);

	return (
		<SocialContext.Provider value={value}>{children}</SocialContext.Provider>
	);
}

export function useSocial(slug: string) {
	const ctx = useContext(SocialContext);
	return {
		counts: ctx?.counts[slug] ?? emptyCounts(),
		mine: ctx?.mine[slug] ?? emptyCounts(),
		bump: (kind: SocialKind) => ctx?.bump(slug, kind),
		available: ctx !== null,
	};
}
