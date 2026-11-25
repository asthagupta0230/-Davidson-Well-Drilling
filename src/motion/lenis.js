import Lenis from 'lenis'
import { gsap, ScrollTrigger, MOTION, prefersReducedMotion } from './gsap.js'

let lenisInstance = null
let tickerCallback = null

/**
 * Starts Lenis smooth scrolling and binds it to GSAP's ticker + ScrollTrigger.
 * Disabled automatically when `prefers-reduced-motion: reduce` is active.
 */
export function initLenis() {
  if (prefersReducedMotion()) return () => {}
  if (lenisInstance) return () => destroyLenis()

  const lenis = new Lenis({
    duration: MOTION.lenis.duration,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: MOTION.lenis.wheelMultiplier,
    touchMultiplier: MOTION.lenis.touchMultiplier,
  })

  lenisInstance = lenis
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  lenis.on('scroll', ScrollTrigger.update)

  tickerCallback = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  return () => destroyLenis()
}

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback)
    tickerCallback = null
  }
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
  document.documentElement.classList.remove('lenis', 'lenis-smooth')
}

export function getLenis() {
  return lenisInstance
}

/**
 * Scrolls to a top offset, selector, or DOM element through Lenis when active,
 * falling back to native scroll when reduced motion is preferred.
 */
export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenisInstance && !prefersReducedMotion()) {
    lenisInstance.scrollTo(target, { immediate, offset })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({
      top: target,
      behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth',
    })
    return
  }

  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (element) {
    element.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}
