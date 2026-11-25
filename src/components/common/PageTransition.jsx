import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION, prefersReducedMotion, scaledDuration } from '../../motion/gsap.js'

/**
 * Lightweight route-change curtain wipe that sweeps clear on navigation
 * without delaying route rendering, hash scrolling, or browser history.
 */
export default function PageTransition({ pathname, enabled }) {
  const curtainRef = useRef(null)
  const prevPathRef = useRef(pathname)

  useLayoutEffect(() => {
    if (prevPathRef.current === pathname) return
    prevPathRef.current = pathname

    const curtain = curtainRef.current
    if (!enabled || !curtain || prefersReducedMotion()) return

    gsap.killTweensOf(curtain)
    gsap.fromTo(
      curtain,
      { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: scaledDuration(0.58),
        ease: MOTION.ease.curtain,
        onComplete: () => gsap.set(curtain, { autoAlpha: 0 }),
      },
    )
  }, [pathname, enabled])

  return <div className="route-curtain" ref={curtainRef} aria-hidden="true" />
}
