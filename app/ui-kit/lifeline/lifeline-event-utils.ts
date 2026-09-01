import type {
	LifelineEvent,
	LifelineEventEffect,
	LifelineEventImage,
	LifelineEventSegment,
} from "./types";

/**
 * Pure readers for the event union. They live apart from the components that
 * use them so editing either half keeps Fast Refresh's component state.
 */
export function getEventContent(
	event: LifelineEvent,
): string | LifelineEventSegment[] {
	if (typeof event === "object" && !Array.isArray(event) && "text" in event) {
		return event.text;
	}

	return event;
}

export function getLifelineEventImage(
	event: LifelineEvent,
): LifelineEventImage | undefined {
	if (typeof event === "object" && !Array.isArray(event) && "image" in event) {
		return event.image;
	}

	return undefined;
}

export function getLifelineEventEffect(
	event: LifelineEvent,
): LifelineEventEffect | undefined {
	if (typeof event === "object" && !Array.isArray(event) && "effect" in event) {
		return event.effect;
	}

	return undefined;
}

export function getLifelineEventTitle(
	event: LifelineEvent,
): string | undefined {
	if (typeof event === "object" && !Array.isArray(event) && "title" in event) {
		return event.title;
	}

	return undefined;
}

export function getLifelineEventKey(event: LifelineEvent, index: number) {
	const content = getEventContent(event);

	if (typeof content === "string") return `${index}-${content}`;

	return `${index}-${content.map((segment) => segment.value).join("")}`;
}
