"use client";

import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	FILTER_PARAM,
	type FilterSlug,
	parseFilters,
	serializeFilters,
} from "@/lib/timeline-filters";

interface FilterContextValue {
	selected: Set<FilterSlug>;
	toggle: (slug: FilterSlug) => void;
	clear: () => void;
	/**
	 * Whether the filters actually apply to what's on screen. False anywhere but
	 * the feed — on a post page nothing is being filtered, so every tab reads
	 * unselected, "All posts" included.
	 */
	active: boolean;
}

/** The one route the filters describe. */
const FEED_PATH = "/";

const FilterContext = createContext<FilterContextValue | null>(null);

/**
 * Multi-select filter state, mirrored to the URL.
 *
 * Read from the URL after mount rather than through useSearchParams: the feed
 * is a static page, and reading search params during render would opt the whole
 * route into dynamic rendering for a value only the client can know.
 *
 * pushState rather than router.replace, so toggling a tab is instant and
 * doesn't refetch the route — and back/forward still work, via popstate.
 *
 * Off the feed the tabs stop being state and become navigation: nothing on a
 * post page is filtered, so they show unselected and a click takes you home
 * with that filter applied.
 */
export function FilterProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Set<FilterSlug>>(new Set());
	const router = useRouter();
	// usePathname, not useSearchParams: the route stays static, and the param
	// itself is read from window.location once the client is running.
	const onFeed = usePathname() === FEED_PATH;

	useEffect(() => {
		// Leaving the feed drops the selection rather than carrying it along —
		// a lit tab beside a post would claim the post was one of N results.
		if (!onFeed) {
			setSelected(new Set());
			return;
		}

		const read = () =>
			setSelected(
				parseFilters(
					new URLSearchParams(window.location.search).get(FILTER_PARAM),
				),
			);
		read();
		window.addEventListener("popstate", read);
		return () => window.removeEventListener("popstate", read);
	}, [onFeed]);

	const write = useCallback(
		(next: Set<FilterSlug>) => {
			setSelected(next);
			const value = serializeFilters(next);

			// Off the feed there are no existing params worth preserving and no feed
			// to re-filter in place, so this is a real navigation.
			if (!onFeed) {
				router.push(value ? `${FEED_PATH}?${FILTER_PARAM}=${value}` : FEED_PATH);
				return;
			}

			const params = new URLSearchParams(window.location.search);
			if (value) params.set(FILTER_PARAM, value);
			else params.delete(FILTER_PARAM);
			const query = params.toString();
			window.history.pushState(
				null,
				"",
				query ? `?${query}` : window.location.pathname,
			);
		},
		[onFeed, router],
	);

	const toggle = useCallback(
		(slug: FilterSlug) => {
			const next = new Set(selected);
			if (next.has(slug)) next.delete(slug);
			else next.add(slug);
			write(next);
		},
		[selected, write],
	);

	const clear = useCallback(() => write(new Set()), [write]);

	const value = useMemo(
		() => ({ selected, toggle, clear, active: onFeed }),
		[selected, toggle, clear, onFeed],
	);

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
}

export function useFilters() {
	const ctx = useContext(FilterContext);
	if (!ctx) {
		throw new Error("useFilters must be used inside a FilterProvider");
	}
	return ctx;
}
