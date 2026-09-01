import { cn } from "../cn"
import {
  type CompanyIconId,
  getCompanyIcon,
} from "./company-icon-registry"

export function CompanyIcon({
  id,
  label,
  className,
}: {
  id: CompanyIconId
  label: string
  className?: string
}) {
  const entry = getCompanyIcon(id)

  if (entry) {
    const Icon = entry.icon
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center text-black transition-colors duration-300",
          entry.sizeClassName ?? "h-4 w-4",
          className,
        )}
        aria-label={label}
        title={label}
      >
        <Icon className="h-full w-full" />
      </span>
    )
  }

  return (
    <span
      title={label}
      aria-label={label}
      className={cn(
        "inline-flex h-5 w-5 select-none items-center justify-center rounded-full text-[10px] font-semibold uppercase leading-none ring-1 ring-current/30",
        className,
      )}
    >
      {label.charAt(0)}
    </span>
  )
}
