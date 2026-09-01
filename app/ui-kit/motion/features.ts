import { domMax } from "motion/react";

/**
 * Loaded as its own chunk by MotionProvider. `domMax` rather than
 * `domAnimation` because the shelf, the post cards and the status button use
 * layout animations, and the collapsable menu drags — neither of which
 * `domAnimation` carries.
 */
export default domMax;
