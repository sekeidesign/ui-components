/**
 * Points up at `rotate = 0`. Every other direction is the same glyph turned,
 * rather than eight hand-drawn variants that can drift apart.
 */
export const ArrowIcon = ({ size = 16, rotate = 0 }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
		>
			<title>Arrow</title>
			<line
				x1="12"
				y1="19.25"
				x2="12"
				y2="4.25"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<polyline
				points="5.975,10.3 12,4.25 18.025,10.3"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};
