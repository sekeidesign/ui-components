import type { ComponentType } from "react"

export type CompanyIconId = string

export interface CompanyIconEntry {
  icon: ComponentType<{ className?: string }>
  /** Tailwind size for the mark — wordmarks want a wide box. */
  sizeClassName?: string
}

const registry: Record<string, CompanyIconEntry> = {}

/**
 * Map your organization ids to icon components. Call once at module
 * scope, from a module that loads before the timeline renders:
 *
 *   registerCompanyIcons({
 *     acme: { icon: AcmeIcon, sizeClassName: "h-4 w-4" },
 *   })
 *
 * Unregistered ids fall back to the name's initial in a small ring,
 * so a timeline reads cleanly before you've drawn a single logo.
 */
export function registerCompanyIcons(
  entries: Record<string, CompanyIconEntry>,
) {
  Object.assign(registry, entries)
}

export function getCompanyIcon(id: string): CompanyIconEntry | undefined {
  return registry[id]
}
