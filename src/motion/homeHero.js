import { gsap, EASE } from './gsap.js'
import { createLineReveal, createDigitReveal } from './splitLines.js'

/**
 * The home hero plays as one composition: the headline rises through its masks,
 * the photograph wipes in beside it, and the proof line rolls its year into place.
 */
export function buildHomeHero(section) {
  const copy = section.querySelector('.hero-copy')
  const visual = section.querySelector('.hero-visual')
  const eyebrow = copy?.querySelector('.eyebrow')
  const heading = copy?.querySelector('h1')
  const text = copy?.querySelector(':scope > p:not(.eyebrow)')
  const buttons = [...(copy?.querySelectorAll('.hero-actions > *') || [])]
  const proof = copy?.querySelector('.hero-proof')
  const digits = proof?.querySelector('[data-digits]')
  const photo = visual?.querySelector('.hero-photo')
  const windowEl = visual?.querySelector('.hero-image-window')
  const caption = visual?.querySelector('figcaption')
  const corners = [...(visual?.querySelectorAll('.blueprint-corners i') || [])]
  const decor = [...section.querySelectorAll('.hero-ripple, .hero-scroll-cue')]

  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE.out, duration: 0.9 } })

  if (eyebrow) {
    gsap.set(eyebrow, { autoAlpha: 0, '--eyebrow-line': 0 })
    timeline
      .to(eyebrow, { autoAlpha: 1, duration: 0.5 }, 0)
      .to(eyebrow, { '--eyebrow-line': 1, duration: 0.9, ease: EASE.inOut }, 0.05)
  }

  if (heading) {
    const lines = createLineReveal(heading)
    heading.classList.remove('is-revealed')
    timeline.call(() => lines.play(), undefined, 0.15)
    // Flags the emphasized line so its gradient sweep runs once the line has risen.
    timeline.call(() => heading.classList.add('is-revealed'), undefined, 0.8)
  }

  if (text) {
    gsap.set(text, { autoAlpha: 0, y: 24 })
    timeline.to(text, { autoAlpha: 1, y: 0 }, 0.5)
  }

  if (buttons.length) {
    gsap.set(buttons, { autoAlpha: 0, y: 22 })
    timeline.to(buttons, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.68)
  }

  if (proof) {
    gsap.set(proof, { autoAlpha: 0, y: 14 })
    timeline.to(proof, { autoAlpha: 1, y: 0 }, 0.95)
  }

  if (digits) {
    const digitReveal = createDigitReveal(digits)
    timeline.call(() => digitReveal.play(), undefined, 1.05)
  }

  if (photo && windowEl) {
    gsap.set(photo, { autoAlpha: 0, y: 30 })
    gsap.set(windowEl, { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.06 })
    timeline
      .to(photo, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.3)
      .to(windowEl, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE.inOut }, 0.35)
      .to(windowEl, { scale: 1, duration: 1.8 }, 0.35)
  }

  if (caption) {
    gsap.set(caption, { autoAlpha: 0, y: 8 })
    timeline.to(caption, { autoAlpha: 1, y: 0, duration: 0.6 }, 1)
  }

  if (corners.length) {
    gsap.set(corners, { scale: 0 })
    timeline.to(corners, { scale: 1, duration: 0.7, ease: 'back.out(2.2)', stagger: 0.07 }, 0.95)
  }

  if (decor.length) {
    gsap.set(decor, { autoAlpha: 0 })
    timeline.to(decor, { autoAlpha: 1, duration: 1 }, 1.2)
  }

  // Scrolling away, the photograph drifts up a little faster than the copy.
  const scrollRange = () => ({ trigger: section, start: 'top top', end: 'bottom top', scrub: true })
  gsap.to(visual, { y: -48, ease: 'none', scrollTrigger: scrollRange() })
  gsap.to(copy, { y: 36, ease: 'none', scrollTrigger: scrollRange() })

  function play(delay = 0) {
    timeline.delay(delay)
    timeline.play()
  }

  return { el: section, delay: 0, play }
}
