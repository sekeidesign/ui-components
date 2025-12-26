"use client";

import Link from "next/link";

import { Footer } from "./Footer";

export const Sidebar = () => {
  return (
    <div className="w-full md:max-w-2xs xl:max-w-xs md:sticky top-0 md:h-full flex-grow flex flex-col gap-px">
      <Link href="/">
        <div className="panel p-4">
          <h1 className="font-[550] text-gray-800 w-full">PG Gonni</h1>
          <h2 className="font-[450] text-gray-500 w-full">
            Design Engineer based in Montréal, QC
          </h2>
        </div>
      </Link>
      <div className="panel flex-1 md:block hidden" />

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
      <Footer className="md:grid hidden" />
    </div>
  );
};
