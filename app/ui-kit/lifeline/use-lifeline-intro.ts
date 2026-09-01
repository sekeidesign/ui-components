"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  getTransitionMarkerFadeDuration,
  LIFELINE_FAST_MARKER_FADE_MS,
  timeAtTrackProgress,
  trackProgressAtTime,
} from "./lifeline-intro-timing"
import { usePrefersReducedMotion } from "../use-prefers-reduced-motion"

/** Tweak these */
export const LIFELINE_LABELS_MS = 400
export const LIFELINE_RAIL_MS = 1800
/**
 * Track length the base rail duration was tuned for. Longer tracks slow the
 * sweep sublinearly, capped so a 250-year timeline isn't a screensaver.
 */
export const LIFELINE_REFERENCE_TRACK = 9000
export const LIFELINE_RAIL_MAX_MS = 7200
export const LIFELINE_RAIL_SCALE_POWER = 0.45
/** Long fades lag behind the sweeping line and read as out of sync. */
export const LIFELINE_FADE_SCALE_MAX = 1.5

const INTRO_LAST_PLAYED_KEY = "lifeline-intro-last-played"

function hasPlayedIntroToday() {
  try {
    return window.localStorage.getItem(INTRO_LAST_PLAYED_KEY) === new Date().toDateString()
  } catch {
    // Storage unavailable (private browsing, etc.) — just let it replay.
    return false
  }
}

function markIntroPlayedToday() {
  try {
    window.localStorage.setItem(INTRO_LAST_PLAYED_KEY, new Date().toDateString())
  } catch {
    // Ignore — worst case the intro replays next load.
  }
}

export function useLifelineIntro(markerWidths: number[]) {
  // Skip straight to the settled end state for users who prefer reduced
  // motion, or who have already seen the sweep-in today.
  const prefersReducedMotion = usePrefersReducedMotion()
  const [playedToday] = useState(
    () => typeof window !== "undefined" && hasPlayedIntroToday(),
  )
  const shouldPlay = !prefersReducedMotion && !playedToday
  const [isPlaying, setIsPlaying] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const introTimeoutRef = useRef(0)

  const totalMarkersWidth = useMemo(
    () => markerWidths.reduce((sum, width) => sum + width, 0),
    [markerWidths],
  )

  const railDuration = useMemo(() => {
    if (totalMarkersWidth <= LIFELINE_REFERENCE_TRACK) return LIFELINE_RAIL_MS

    const scale = Math.pow(
      totalMarkersWidth / LIFELINE_REFERENCE_TRACK,
      LIFELINE_RAIL_SCALE_POWER,
    )
    return Math.min(LIFELINE_RAIL_MAX_MS, Math.round(LIFELINE_RAIL_MS * scale))
  }, [totalMarkersWidth])

  // Stretch each marker's fade with the sweep so dense timelines bloom
  // in a trailing wave instead of flickering past.
  const fadeScale = Math.min(
    LIFELINE_FADE_SCALE_MAX,
    railDuration / LIFELINE_RAIL_MS,
  )

  const introDuration =
    railDuration + Math.round(LIFELINE_FAST_MARKER_FADE_MS * fadeScale)

  const getTrackProgressAtTime = useCallback(
    (elapsedMs: number) => {
      if (!shouldPlay || totalMarkersWidth <= 0) {
        return Math.min(elapsedMs / railDuration, 1)
      }

      // Mirrored in time: the sweep travels right-to-left, so the eased curve runs
      // backwards and the rail decelerates into the present.
      return (
        1 -
        trackProgressAtTime(
          Math.max(0, railDuration - elapsedMs),
          markerWidths,
          railDuration,
        )
      )
    },
    [markerWidths, railDuration, shouldPlay, totalMarkersWidth],
  )

  const getMarkerDelay = useCallback(
    (index: number) => {
      if (!shouldPlay || totalMarkersWidth <= 0) return 0

      // The sweep front moves right-to-left, so the oldest (rightmost) marker opens
      // first and the newest last.
      const offset = markerWidths
        .slice(0, index + 1)
        .reduce((sum, width) => sum + width, 0)

      return Math.max(
        0,
        railDuration -
          timeAtTrackProgress(
            offset / totalMarkersWidth,
            markerWidths,
            railDuration,
          ),
      )
    },
    [markerWidths, railDuration, shouldPlay, totalMarkersWidth],
  )

  const getMarkerFadeDuration = useCallback(
    (index: number) => {
      return Math.round(getTransitionMarkerFadeDuration(index) * fadeScale)
    },
    [fadeScale],
  )

  const completeIntro = useCallback(() => {
    setIsComplete(true)
  }, [])

  const startIntroTimer = useCallback(() => {
    window.clearTimeout(introTimeoutRef.current)
    setIsPlaying(true)
    setIsComplete(false)

    introTimeoutRef.current = window.setTimeout(() => {
      setIsPlaying(false)
    }, introDuration)
  }, [introDuration])

  useEffect(() => {
    if (shouldPlay) markIntroPlayedToday()
  }, [shouldPlay])

  useEffect(() => {
    return () => window.clearTimeout(introTimeoutRef.current)
  }, [])

  return {
    shouldPlay,
    isPlaying,
    isComplete,
    labelsDuration: LIFELINE_LABELS_MS,
    railDuration,
    getTrackProgressAtTime,
    getMarkerDelay,
    getMarkerFadeDuration,
    startIntroTimer,
    completeIntro,
  }
}