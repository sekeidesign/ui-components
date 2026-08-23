/**
 * Press affordance for an icon inside a chip button. The button needs `group`.
 *
 * Two transitions, not one: pressing snaps down fast and linear, releasing runs
 * an overshooting curve so the icon springs back past its resting size before
 * settling. That's the bounce, without a JS spring — a transform transition
 * stays on the compositor with no per-frame work, and a post card has three of
 * these sitting idle.
 *
 * Amplitude is the whole difficulty here. The overshoot is a fraction of the
 * press DELTA, not of the icon, and the icon is 16px — so 0.9 with a 1.56 curve
 * peaked ~1% over resting, about 0.2px, and 0.85 with a 2.6 curve peaks ~7%,
 * about 1.1px. Both are true springs and neither is visible. Hence the vars:
 * --press-scale, --press-down and --press-return are tunable from the sandbox.
 * A deeper press and a longer return are what make the bounce legible.
 */
export const ICON_PRESS =
	"transition-transform duration-[var(--press-return,340ms)] ease-[cubic-bezier(0.2,2.6,0.4,1)] group-active:duration-[var(--press-down,75ms)] group-active:ease-out group-active:scale-[var(--press-scale,0.8)]";

/**
 * Cross-fade between two icons in the same slot — blur, scale and opacity
 * together, after Jakub Krehel's copy-button pattern. Put ICON_SWAP on both
 * layers and toggle IN/OUT.
 *
 * No will-change: it would promote a layer permanently on every one of these in
 * the feed, for an animation that runs for 300ms after a click. Blurring a 16px
 * icon is cheap enough not to need it.
 */
export const ICON_SWAP =
	"transition-[opacity,filter,scale] duration-200 ease-in-out";
export const ICON_SWAP_IN = "scale-100 opacity-100 blur-none";
export const ICON_SWAP_OUT = "blur-xs scale-[0.25] opacity-0";
