"use client";

import { TextLink } from "@ui-kit/TextLink";
import { motion, type Transition } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LastUpdated } from "./ui-kit/LastUpdated";

const textVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const textTransition: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0.3,
};

export const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full md:max-w-xs md:sticky top-0 h-full flex-grow flex flex-col gap-px">
      <Link href="/">
        <div className="panel p-4">
          <h1 className="font-[550] text-gray-800 w-full">PG Gonni</h1>
          <h2 className="font-[450] text-gray-500 w-full">
            Design Engineer based in Montréal, QC
          </h2>
        </div>
      </Link>
      <div className="panel flex-1" />

      {/* {pathname === "/" && (
				<div className="text-sm text-gray-500 font-[450] pt-4 md:pt-10 leading-relaxed space-y-2">
					<motion.p variants={textVariants} transition={textTransition}>
						<span className="font-[550] block text-gray-600">Currently</span>
						Head of Design at{" "}
						<TextLink href="https://www.tato.co" target="_blank" hasFavicon>
							Tato
						</TextLink>
						<br />
						<span className="font-[550] block pt-2 text-gray-600">
							Previously
						</span>
						Head of Design at{" "}
						<TextLink href="https://www.planned.com" target="_blank" hasFavicon>
							Planned
						</TextLink>
						<br />
						Design Engineer at{" "}
						<TextLink href="https://www.metafy.gg" target="_blank" hasFavicon>
							Metafy
						</TextLink>{" "}
						<br />
						Product Designer at{" "}
						<TextLink href="https://metalab.co" target="_blank" hasFavicon>
							Metalab
						</TextLink>
						.
					</motion.p>
				</div>
			)} */}
      <footer className="grid grid-cols-4 gap-px w-full text-sm">
        <div className="flex gap-px col-span-2">
          <Link
            href="https://github.com/sekeidesign/"
            target="_blank"
            className="panel p-4 text-xs font-[500] w-full flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-gray-950"
          >
            <GithubIcon />
            GitHub
          </Link>
          <Link
            href="https://www.threads.com/@sekeidesign"
            target="_blank"
            className="panel p-4 text-xs font-[500] w-full flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-gray-950"
          >
            <ThreadsIcon />
            Threads
          </Link>
        </div>
        <div className="col-span-2 panel p-4 text-xs font-[500]">
          <LastUpdated />
        </div>
      </footer>
    </div>
  );
};

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
      ></path>
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Threads"
      viewBox="0 0 192 192"
      className="size-3"
    >
      <path
        fill="currentColor"
        d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
      />
    </svg>
  );
}
