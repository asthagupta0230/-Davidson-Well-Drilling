import { useEffect, useState } from 'react'
import { scrollToTarget } from '../../motion/lenis.js'
import ArrowIcon from './ArrowIcon.jsx'

export default function ReturnToSurface() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    function updateProgress() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
        const nextProgress = scrollableHeight > 0
          ? Math.round((window.scrollY / scrollableHeight) * 100)
          : 0
        const nextValue = Math.max(0, Math.min(100, nextProgress))
        setProgress((current) => current === nextValue ? current : nextValue)
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  function returnToTop() {
    scrollToTarget(0)
  }

  return (
    <button
      className={`return-to-surface${progress > 0 ? ' is-visible' : ''}`}
      type="button"
      aria-label="Return to top"
      title={`Page scroll progress: ${progress}%`}
      onClick={returnToTop}
    >
      <span className="surface-gauge-track" aria-hidden="true">
        <span style={{ height: `${progress}%` }} />
      </span>
      <span className="surface-gauge-copy">
        <span>RETURN<br />TO<br />SURFACE</span>
        <strong>{progress}%</strong>
      </span>
      <ArrowIcon diagonal />
    </button>
  )
}
