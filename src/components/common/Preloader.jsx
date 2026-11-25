import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, MOTION, prefersReducedMotion, scaledDuration } from '../../motion/gsap.js'

/**
 * Opening film slate using Davidson's established cyan & off-white palette.
 * Lifts smoothly via GSAP clip-path so Act 1 unfolds directly underneath.
 */
export default function Preloader({ onReady }) {
  const [done, setDone] = useState(() => prefersReducedMotion())
  const overlayRef = useRef(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      onReadyRef.current?.()
      return undefined
    }

    const overlay = overlayRef.current
    if (!overlay) return undefined

    const brand = overlay.querySelector('.preloader-brand')
    const meta = overlay.querySelector('.preloader-meta')
    const line = overlay.querySelector('.preloader-line')
    let readySignaled = false

    const signalReady = () => {
      if (readySignaled) return
      readySignaled = true
      onReadyRef.current?.()
    }

    const tl = gsap.timeline({
      onComplete: () => {
        signalReady()
        setDone(true)
      },
    })

    gsap.set([brand, meta], { autoAlpha: 0, y: 14 })
    gsap.set(line, { scaleX: 0 })

    tl.to(brand, { autoAlpha: 1, y: 0, duration: scaledDuration(0.45), ease: MOTION.ease.out }, 0.05)
      .to(meta, { autoAlpha: 1, y: 0, duration: scaledDuration(0.4), ease: MOTION.ease.out }, 0.14)
      .to(line, { scaleX: 1, duration: scaledDuration(0.55), ease: MOTION.ease.inOut }, 0.12)
      .call(signalReady, undefined, 0.72)
      .to(overlay, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: scaledDuration(0.75),
        ease: MOTION.ease.curtain,
      }, 0.7)

    return () => {
      tl.kill()
      signalReady()
    }
  }, [])

  if (done) return null

  return (
    <div className="site-preloader" ref={overlayRef} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-brand">
          <strong>Davidson</strong>
          <span>Well Drilling, Inc.</span>
        </div>
        <span className="preloader-line" />
        <div className="preloader-meta">EST. 1973 · TURNERVILLE, GEORGIA</div>
      </div>
    </div>
  )
}
