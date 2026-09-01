/**
 * Press affordance for an icon inside a chip button. The button needs `group`.
 *
 * Two transitions: pressing snaps down fast and linear, releasing runs an
 * overshooting curve so the icon springs back past its resting size. A
 * transform transition stays on the compositor, unlike a JS spring.
 *
 * The overshoot is a fraction of the press DELTA, not of the 16px icon, so a
 * shallow press is a true spring that isn't visible at all — hence the tunable
 * --press-scale, --press-down and --press-return.
 */
export const ICON_PRESS =
	"transition-transform duration-[var(--press-return,340ms)] ease-[cubic-bezier(0.2,2.6,0.4,1)] group-active:duration-[var(--press-down,75ms)] group-active:ease-out group-active:scale-[var(--press-scale,0.8)]";

/**
 * Cross-fade between two icons in the same slot — blur, scale and opacity,
 * after Jakub Krehel's copy-button pattern. Put ICON_SWAP on both layers and
 * toggle IN/OUT. No will-change: it would promote a layer permanently for an
 * animation that runs 300ms after a click.
 */
export const ICON_SWAP =
	"transition-[opacity,filter,scale] duration-200 ease-in-out";
export const ICON_SWAP_IN = "scale-100 opacity-100 blur-none";
export const ICON_SWAP_OUT = "blur-xs scale-[0.25] opacity-0";
