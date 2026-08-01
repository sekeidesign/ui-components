export const LIFELINE_LABEL_COLUMN_WIDTH = 56
export const LIFELINE_LABEL_GAP = 16
export const LIFELINE_STICKY_SHIELD_WIDTH =
  LIFELINE_LABEL_COLUMN_WIDTH + LIFELINE_LABEL_GAP
export const LIFELINE_STICKY_LEFT = 20

// Kept as a component (rather than inlined) even though it now renders no
// text: the shield still needs its reserved width for occlusion and for
// the per-marker sticky-pin-as-you-scroll effect (LIFELINE_STICKY_LEFT) in
// use-lifeline-scroll.ts.
export function LifelineStickyLabels() {
  return (
    <div
      className="relative"
      style={{ width: LIFELINE_LABEL_COLUMN_WIDTH, height: 40 }}
      aria-hidden="true"
    />
  )
}