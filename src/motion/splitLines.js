import { gsap, SplitText, MOTION, scaledDuration } from './gsap.js'

/** How far a masked line starts below its resting position, in % of its own height. */
const LINE_SHIFT = 120

/**
 * Splits a heading into masked lines and hides them via GSAP before paint.
 * Preserves state across responsive `autoSplit` re-wraps so lines never replay on resize.
 */
export function createLineReveal(heading, { duration = 1.05, stagger = MOTION.stagger.base } = {}) {
  if (!heading) return { count: 0, play: () => {}, revert: () => {} }

  const state = { revealed: false }
  const split = SplitText.create(heading, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'st-line',
    autoSplit: true,
    onSplit(self) {
      if (!state.revealed) gsap.set(self.lines, { yPercent: LINE_SHIFT })
      return null
    },
  })

  return {
    get count() {
      return split.lines.length
    },
    play(delay = 0) {
      if (state.revealed) return
      state.revealed = true
      gsap.to(split.lines, {
        yPercent: 0,
        duration: scaledDuration(duration),
        delay,
        ease: MOTION.ease.lines,
        stagger,
        overwrite: true,
      })
    },
    revert() {
      split.revert()
    },
  }
}

/** Splits a short numeral (e.g. "1973") into masked characters and hides them. */
export function createDigitReveal(target) {
  if (!target) return { play: () => {}, revert: () => {} }

  const split = SplitText.create(target, {
    type: 'chars',
    mask: 'chars',
    tag: 'span',
    charsClass: 'st-char',
  })
  gsap.set(split.chars, { yPercent: LINE_SHIFT })

  return {
    play(delay = 0) {
      gsap.to(split.chars, {
        yPercent: 0,
        duration: scaledDuration(0.85),
        delay,
        ease: MOTION.ease.lines,
        stagger: 0.055,
      })
    },
    revert() {
      split.revert()
    },
  }
}

/**
 * Animates an integer counter inside `element` (e.g. 1940 -> 1973 or 00 -> 01)
 * without triggering layout reflows outside its fixed-width slot.
 */
export function createCounterTween(element, { from = 0, to, pad = 0, duration = 1.1 } = {}) {
  if (!element) return gsap.timeline({ paused: true })
  const targetValue = Number.isFinite(to) ? to : Number.parseInt(element.textContent, 10) || 0
  const proxy = { value: from }
  const format = (num) => {
    const rounded = Math.round(num)
    return pad > 0 ? String(rounded).padStart(pad, '0') : String(rounded)
  }

  element.textContent = format(from)

  return gsap.to(proxy, {
    value: targetValue,
    duration: scaledDuration(duration),
    ease: MOTION.ease.expo,
    paused: true,
    onUpdate: () => {
      element.textContent = format(proxy.value)
    },
  })
}
