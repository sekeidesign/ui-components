import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => {
	return twMerge(clsx(inputs));
};

export { cn };