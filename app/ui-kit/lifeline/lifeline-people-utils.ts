import type { LifelineMarker } from "./types"

export interface AggregatedLifelinePerson {
  name: string
  mentor: boolean
  met: boolean
  photo?: string
}

/**
 * Folds a marker's mentors and the people it met into one list, so someone in
 * both shows up once. Apart from the component for Fast Refresh's sake.
 */
export function aggregateLifelinePeople(
  marker: LifelineMarker,
): AggregatedLifelinePerson[] {
  const map = new Map<string, AggregatedLifelinePerson>()

  const add = (
    name: string,
    type: "mentor" | "met",
    photo?: string,
  ) => {
    const person = map.get(name) ?? { name, mentor: false, met: false }
    person[type] = true
    person.photo = person.photo ?? photo
    map.set(name, person)
  }

  for (const person of marker.mentors ?? []) {
    add(person.name, "mentor", person.photo)
  }
  for (const person of marker.met ?? []) {
    add(person.name, "met", person.photo)
  }

  return [...map.values()]
}
