"use client"

import { useLayoutEffect, useState } from "react"
import { cn } from "../cn"
import { LifelineDesktop } from "./lifeline-desktop"
import { LifelineFireworksProvider } from "./lifeline-fireworks"
import { LifelineVertical } from "./lifeline-vertical"
import { LIFELINE_MOBILE_BREAKPOINT } from "./lifeline-layout"
import type { LifelineProps } from "./types"

/**
 * `lifeline-typeset` carries the timeline's own font stack rather than
 * inheriting the host's `font-sans`, which a shadcn init can leave
 * self-referential and resolving to the browser serif. Override
 * `--lifeline-font` to typeset it in something else.
 */
export function Lifeline(props: LifelineProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useLayoutEffect(() => {
    // Matches Tailwind's md: breakpoint so JS and CSS can never disagree.
    const query = window.matchMedia(
      `(min-width: ${LIFELINE_MOBILE_BREAKPOINT}px)`,
    )
    const update = () => setIsMobile(!query.matches)

    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  if (isMobile === null) {
    return <div className="invisible h-full" aria-hidden="true" />
  }

  if (isMobile) {
    return (
      <LifelineFireworksProvider>
        {/* The vertical timeline renders at natural height in both modes; the page's
            scroller owns all scrolling. */}
        <div className="lifeline-typeset pt-5">
          <LifelineVertical {...props} />
        </div>
      </LifelineFireworksProvider>
    )
  }

  return (
    <LifelineFireworksProvider>
      <LifelineDesktop
        {...props}
        className={cn("lifeline-typeset pt-5", props.className)}
      />
    </LifelineFireworksProvider>
  )
}