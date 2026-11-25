import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, MOTION_QUERY } from '../motion/gsap.js'
import {
  initHeroSection,
  initIntroductionSection,
  initCapabilitiesSection,
  initWellFeatureSection,
  initGeothermalSection,
  initWhyAndProcessSections,
  initWorkPreviewSection,
  initFaqPreviewSection,
} from '../motion/homeSections.js'


/** Adds a consistent reveal to homepage images not already animated by PhotoMount timelines. */
function initRemainingHomeImageReveals(root) {
  const images = [...root.querySelectorAll(
    '.home-page img:not(.hero-slide img):not(.photo-mount img)',
  )]

  images.forEach((img) => {
    gsap.fromTo(img,
      { autoAlpha: 0, y: 24, scale: 1.035 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'willChange',
        scrollTrigger: {
          trigger: img,
          start: 'top 88%',
          once: true,
        },
      },
    )
  })
}

/**
 * Orchestrates the 5-Act cinematic Home page timeline.
 *
 * Setup runs in `useLayoutEffect` so initial GSAP states are applied before paint (zero FOUC).
 * Act 1 (Hero) stays paused until `ready` is true (when the Preloader curtain lifts).
 */
export default function useHomeAnimations(rootRef, ready = true) {
  const heroControlRef = useRef(null)
  const hasPlayedHeroRef = useRef(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    hasPlayedHeroRef.current = false
    const media = gsap.matchMedia(root)
    let cancelled = false

    media.add(MOTION_QUERY, () => {
      const hero = initHeroSection(root)
      heroControlRef.current = hero

      initIntroductionSection(root)
      initCapabilitiesSection(root)
      initWellFeatureSection(root)
      initGeothermalSection(root)
      initWhyAndProcessSections(root)
      initWorkPreviewSection(root)
      initFaqPreviewSection(root)
      initRemainingHomeImageReveals(root)

      if (ready && !hasPlayedHeroRef.current) {
        hasPlayedHeroRef.current = true
        hero.play(0.06)
      }
    })

    // Refresh ScrollTrigger positions once fonts and images finish laying out
    const refreshTriggers = () => {
      if (!cancelled) ScrollTrigger.refresh()
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(refreshTriggers).catch(() => {})
    }

    const initialRefreshId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(refreshTriggers)
    })

    const images = [...root.querySelectorAll('img')]
    const pendingImages = images.filter((img) => !img.complete)
    const onImageLoad = () => refreshTriggers()

    pendingImages.forEach((img) => {
      img.addEventListener('load', onImageLoad, { once: true })
      img.addEventListener('error', onImageLoad, { once: true })
    })

    window.addEventListener('load', refreshTriggers, { once: true })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(initialRefreshId)
      heroControlRef.current = null
      pendingImages.forEach((img) => {
        img.removeEventListener('load', onImageLoad)
        img.removeEventListener('error', onImageLoad)
      })
      window.removeEventListener('load', refreshTriggers)
      media.revert()
    }
  }, [rootRef])

  // Fire Act 1 entrance the moment the preloader / route curtain finishes lifting
  useEffect(() => {
    if (!ready || hasPlayedHeroRef.current || !heroControlRef.current) return
    hasPlayedHeroRef.current = true
    heroControlRef.current.play(0.04)
  }, [ready])
}
