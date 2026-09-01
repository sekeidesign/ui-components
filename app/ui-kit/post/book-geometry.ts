import {
	BOOK_HEIGHT,
	BOOK_OPEN_SHIFT,
	BOOK_WIDTH,
} from "../book-shelf/constants";
import { MEDIA_SIZE } from "./surface";

/**
 * Places the shelf's 3D book inside a post card's media box.
 *
 * Book3D draws at its own scale and pivots about its cover's left edge, so
 * dropping it into a card is a projection problem, not a sizing one. These
 * constants do that projection once, in one place, so PostMedia stays legible.
 */

/**
 * A book has no frame or background. Keeps MEDIA_SIZE's width so every card's
 * media lines up in the same column, but a shorter height.
 */
export const BOOK_BOX_WIDTH = MEDIA_SIZE;
export const BOOK_BOX_HEIGHT = 130;

/**
 * Projected width of Book3D's open cover at scale 1, in px.
 *
 * Not simply its 132px width: the cover rotates -16° about its own left edge,
 * foreshortening it to 132·cos(16°) ≈ 127, and the parent's 900px perspective
 * then magnifies the near edge by ~1.04.
 */
const BOOK_PROJECTED_WIDTH = 130.5;

/** How far Book3D shifts its open cover left of its own layout box. */
const BOOK_OPEN_DEPTH = BOOK_WIDTH - BOOK_OPEN_SHIFT;

/**
 * Center of the open cover's footprint, in Book3D's local coordinates. Used as
 * the wrapper's transform-origin, so scaling and rotating around the cover's
 * own center keeps it centered in the box at any scale or angle.
 */
export const BOOK_PIVOT_X = -BOOK_OPEN_DEPTH + BOOK_PROJECTED_WIDTH / 2;
export const BOOK_PIVOT_Y = BOOK_HEIGHT / 2;

/** Margin the cover leaves inside BOOK_BOX_HEIGHT. Well past what fitting requires — a book is meant to look small. */
const BOOK_MARGIN = 24;

/** Derived, so BOOK_MARGIN is the only number to tune. */
export const BOOK_SCALE = (BOOK_BOX_HEIGHT - BOOK_MARGIN) / BOOK_HEIGHT;

/** A few degrees off vertical, like a book set down rather than shelved. */
export const BOOK_TILT = 7;

/**
 * drop-shadow, not box-shadow: a box-shadow follows the untransformed element's
 * rectangle and would sit skewed under a tilted cover. Values are in this
 * wrapper's pre-scale space, so they end up BOOK_SCALE× smaller in the card.
 */
export const BOOK_SHADOW =
	"drop-shadow(0 26px 24px rgba(15,23,42,0.22)) drop-shadow(0 10px 10px rgba(15,23,42,0.16))";
