import { cn } from "./cn";

export function SparkleDivider({ className }: { className?: string }) {
	return (
		<div className={cn("flex items-center gap-4 w-full", className)}>
			<hr className="w-full border-gray-200" />
			<svg
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="size-4 text-gray-200 shrink-0"
			>
				<path
					d="M6.59028 0.326456C6.75136 -0.108853 7.36705 -0.108852 7.52813 0.326457L9.14014 4.68286C9.19079 4.81972 9.29869 4.92762 9.43555 4.97826L13.792 6.59028C14.2273 6.75136 14.2273 7.36705 13.792 7.52813L9.43555 9.14014C9.29869 9.19079 9.19079 9.29869 9.14014 9.43555L7.52813 13.792C7.36705 14.2273 6.75136 14.2273 6.59028 13.792L4.97826 9.43555C4.92762 9.29869 4.81972 9.19079 4.68286 9.14014L0.326456 7.52813C-0.108853 7.36705 -0.108852 6.75136 0.326457 6.59028L4.68286 4.97826C4.81972 4.92762 4.92762 4.81972 4.97826 4.68286L6.59028 0.326456Z"
					fill="currentColor"
				/>
			</svg>
			<hr className="w-full border-gray-200" />
		</div>
	);
}
