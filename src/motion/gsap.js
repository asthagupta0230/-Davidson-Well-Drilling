import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, DrawSVGPlugin)

/** Motion only runs when the visitor has not asked for reduced motion. */
export const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
/** Hover effects that follow the pointer only make sense with a real mouse. */
export const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
/** Desktop query for pinned storytelling scenes. */
export const DESKTOP_PIN_QUERY = '(prefers-reduced-motion: no-preference) and (min-width: 981px) and (min-height: 640px)'

/**
 * Central motion tuning knobs.
 * Adjust `speed` (< 1 faster, > 1 slower) or `intensity` (0.5 subtle, 1 default, 1.4 dramatic)
 * to dial the site-wide feel without hunting across files.
 */
export const MOTION = {
  speed: 1,
  intensity: 1,
  ease: {
    out: 'power3.out',
    expo: 'expo.out',
    lines: 'power4.out',
    inOut: 'power3.inOut',
    curtain: 'power4.inOut',
  },
  duration: {
    fast: 0.45,
    base: 0.85,
    slow: 1.25,
    kenBurns: 1.8,
  },
  stagger: {
    tight: 0.06,
    base: 0.09,
    wide: 0.14,
  },
  parallax: {
    photo: 6,
    heroVisual: -44,
    heroCopy: 28,
    workHorizontal: 22,
  },
  lenis: {
    duration: 1.15,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
  },
}

export const EASE = MOTION.ease

export const scaledDuration = (seconds) => seconds * MOTION.speed
export const scaledDistance = (value) => value * MOTION.intensity

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, Flip, SplitText, DrawSVGPlugin }
