import { useEffect, useRef } from 'react'
import { initCustomCursor } from '../../motion/interactions.js'

/**
 * Subtle precision crosshair/ring cursor rendered only on fine-pointer desktops.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => initCustomCursor(cursorRef.current), [])

  return (
    <div className="cinematic-cursor" ref={cursorRef} aria-hidden="true">
      <span className="cursor-dot" />
      <span className="cursor-ring" />
    </div>
  )
}
