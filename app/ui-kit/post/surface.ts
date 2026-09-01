/**
 * The shared surface treatments a post card is built from. Kept together so a
 * card, its media and its actions can't drift apart visually.
 */

// The design's white-chip treatment: a 1px #6A72821A ring plus the theme's own
// shadow-skew. Shared by the media badge, the work icon and the code link.
export const CHIP = "bg-white ring-1 ring-gray-500/10 shadow-skew";

export const MEDIA_SIZE = 179;

/** The nested-bezel surface from Problems: a gray-100 ringed frame holding a white ringed card. */
export const SURFACE_OUTER =
	"ring ring-gray-500/10 bg-gray-100 shadow-skew overflow-hidden p-1";
export const SURFACE_INNER =
	"ring ring-gray-500/10 bg-white shadow-skew overflow-hidden";

/** The screen-md column minus the card's md:p-8, for full-width image sizing. */
export const COLUMN_INNER = 768 - 64;
