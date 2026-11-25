import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, MOTION_QUERY } from '../motion/gsap.js'
import { buildPage } from '../motion/page.js'
import { initMagneticButtons } from '../motion/interactions.js'

/**
 * Reveal engine for shared chrome (Act 5 Footer CTA & Footer), magnetic interactions,
 * and inner routes (`/services`, `/about-us`, `/our-work`, `/faqs`, `/contact`).
 */
export default function useScrollReveals(rootRef, pathname, ready = true) {
  const revertRef = useRef(null)

  useLayoutEffect(() => () => {
    revertRef.current?.()
    revertRef.current = null
  }, [pathname])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || !ready) return undefined

    revertRef.current?.()
    const media = gsap.matchMedia(root)
    let cleanupMagnet = () => {}

    media.add(MOTION_QUERY, () => {
      const disposePage = buildPage(root)
      cleanupMagnet = initMagneticButtons(root)
      return () => {
        disposePage?.()
        cleanupMagnet()
      }
    })

    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {})
    }
    const rafId = window.requestAnimationFrame(refresh)

    const revert = () => {
      window.cancelAnimationFrame(rafId)
      media.revert()
      if (revertRef.current === revert) revertRef.current = null
    }
    revertRef.current = revert
    return undefined
  }, [rootRef, pathname, ready])
}
