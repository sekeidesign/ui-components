import Image from "next/image"
import type { AggregatedLifelinePerson } from "./lifeline-people-utils"

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

interface LifelinePeopleProps {
  people: AggregatedLifelinePerson[]
  allowWrap?: boolean
}

export function LifelinePeople({
  people,
  allowWrap = false,
}: LifelinePeopleProps) {
  if (people.length === 0) return null

  return (
    <div className="w-full space-y-3">
      {people.map((person) => (
        <div key={person.name} className="flex w-full items-center gap-2.5">
          <div className="flex w-3 shrink-0 items-center justify-center gap-0.5">
            {person.mentor && (
              <span
                className="h-1.5 w-1.5 rounded-full bg-blue-500"
                aria-hidden="true"
              />
            )}
            {person.met && (
              <span
                className="h-1.5 w-1.5 rounded-full bg-pink-500"
                aria-hidden="true"
              />
            )}
          </div>
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white transition-colors duration-300">
              {getInitials(person.name)}
            </span>
          )}
          <p
            className={
              allowWrap
                ? "text-left text-[13px] leading-snug text-zinc-500 transition-colors duration-300"
                : "whitespace-nowrap text-left text-[13px] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-700"
            }
          >
            {person.name}
          </p>
        </div>
      ))}
    </div>
  )
}