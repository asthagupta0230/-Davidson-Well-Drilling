import { useEffect, useRef } from 'react'
import PhotoMount from './PhotoMount.jsx'

export default function BlueprintHeroMedia(props) {
  const mediaRef = useRef(null)

  useEffect(() => {
    const media = mediaRef.current
    if (!media || media.closest('.home-page')) return undefined

    let frame = 0

    function updateParallax() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const disabled = window.matchMedia(
          '(prefers-reduced-motion: reduce), (max-width: 700px)',
        ).matches

        if (disabled) {
          media.style.setProperty('--media-parallax-y', '0px')
          return
        }

        const bounds = media.getBoundingClientRect()
        const distance = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight
        const offset = Math.max(-8, Math.min(8, distance * 10))
        media.style.setProperty('--media-parallax-y', `${offset}px`)
      })
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)

    return () => {
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <PhotoMount {...props} blueprint mediaRef={mediaRef} />
}
