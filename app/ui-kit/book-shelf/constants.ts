/** Cover face, in px. */
export const BOOK_WIDTH = 132;
export const BOOK_HEIGHT = 188;

/** Spine thickness — the only width a shelved book reserves in layout. */
export const BOOK_DEPTH = 26;

/**
 * How far an open cover overshoots its spine-width slot: the amount trailing
 * siblings shift right by so the popped cover doesn't overlap them.
 */
export const BOOK_OPEN_SHIFT = BOOK_WIDTH - BOOK_DEPTH;
