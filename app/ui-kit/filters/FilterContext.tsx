"use client";

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
}

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
 */
export function FilterProvider({ children }: { children: ReactNode }) {
	const [selected, setSelected] = useState<Set<FilterSlug>>(new Set());

	useEffect(() => {
		const read = () =>
			setSelected(
				parseFilters(
					new URLSearchParams(window.location.search).get(FILTER_PARAM),
				),
			);
		read();
		window.addEventListener("popstate", read);
		return () => window.removeEventListener("popstate", read);
	}, []);

	const write = useCallback((next: Set<FilterSlug>) => {
		setSelected(next);
		const params = new URLSearchParams(window.location.search);
		const value = serializeFilters(next);
		if (value) params.set(FILTER_PARAM, value);
		else params.delete(FILTER_PARAM);
		const query = params.toString();
		window.history.pushState(
			null,
			"",
			query ? `?${query}` : window.location.pathname,
		);
	}, []);

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
		() => ({ selected, toggle, clear }),
		[selected, toggle, clear],
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
