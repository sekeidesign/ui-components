import { Tooltip } from '@ark-ui/react/tooltip'
import { CommandLineIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import FamilyStatusButton from "./ui-experiments/family-status-button";

export default function Home() {
	return (
		<div className="font-[family-name:var(--font-geist-sans)]">
      

      
			<main className="flex flex-col gap-8 p-8 mt-8 items-center justify-center container mx-auto max-w-screen-md">
				<div className="flex flex-col gap-4 w-full">
					<h2 className="text-xl text-gray-800 font-[500] leading-none">
						Transaction status button
					</h2>
					<div className="flex items-center gap-2">
						<div className="text-xs font-[450] font-mono text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg">
							motion
						</div>
						<div className="text-xs font-[450] font-mono text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg">
							tailwindcss
						</div>
						<div className="text-xs font-[450] font-mono text-gray-500 bg-gray-200/60 p-1 px-2 w-fit rounded-lg">
							nextjs
						</div>
					</div>
					<div className="relative shadow-skew size-24 flex items-center justify-center rounded-xl border border-gray-200 w-full p-10 min-h-[320px] h-fit bg-white">
						<Tooltip.Root positioning={{ placement: "top" }} openDelay={0} closeDelay={0}>
              <Tooltip.Trigger asChild>
                <Link
                  href="https://github.com/sekeidesign/ui-components/blob/main/app/ui-experiments/family-status-button.tsx"
                  target="_blank"
                  className="absolute top-2 right-2 bg-gray-200/60 hover:bg-gray-200 hover:text-gray-700 size-7 flex items-center justify-center rounded-md text-gray-500"
                  >
                  <CommandLineIcon className="w-4 h-4" />
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
      <Tooltip.Content className='bg-gray-900 text-gray-50 font-[450] p-2 py-1 text-xs rounded-md'>View source code</Tooltip.Content>
    </Tooltip.Positioner>
            </Tooltip.Root>
						<FamilyStatusButton />
					</div>
					<div className="space-y-2">
						<h3 className="text-sm text-gray-600 font-[500] leading-none">
							Learnings
						</h3>
						<p className="text-sm text-gray-500 font-[420] leading-relaxed space-y-1">
							
								In my first attempt at animating the text, it had a "jelly"
								effect, particularly when switching between the "Analyzing" and
								"Success" states. <br />
							
								Thankfully I had recently read about{" "}
								<TextLink
									href="https://www.nan.fyi/magic-motion"
									target="_blank"
								>
									how Motion's "magic" layout property works under the hood
								</TextLink>
								, which made it clear that this was caused by the text trying to
								transform from one string to the next. <br />
							
								The fix was simply to add a unique key to the text element for
								each state, which ensures only the button magically transforms
								between states, while the label simply translates on the x axis and fades in and out.
							
						</p>
					</div>
				</div>
			</main>
      
		</div>
	);
}

const TextLink = ({
	href,
	children,
	target,
}: {
	href: string;
	children: React.ReactNode;
	target: string;
}) => {
	return (
		<Link
			href={href}
			className="text-blue-500 font-[500] underline hover:no-underline"
			target={target}
		>
			{children}
		</Link>
	);
};
