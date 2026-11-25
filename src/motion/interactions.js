import { gsap, HOVER_QUERY, MOTION, prefersReducedMotion, scaledDistance } from './gsap.js'

const MAGNET_SELECTOR = '.button, .estimate-button, .mobile-estimate'

/**
 * Adds a subtle, spring-like magnetic pull to primary buttons on fine-pointer desktops.
 * Animates only `transform` via GSAP `quickTo` for 60fps responsiveness.
 */
export function initMagneticButtons(root = document) {
  if (prefersReducedMotion() || !window.matchMedia(HOVER_QUERY).matches) {
    return () => {}
  }

  const buttons = [...root.querySelectorAll(MAGNET_SELECTOR)]
  const cleanups = []

  buttons.forEach((button) => {
    if (button.dataset.magneticBound === 'true') return
    button.dataset.magneticBound = 'true'

    const moveX = gsap.quickTo(button, 'x', { duration: 0.4, ease: MOTION.ease.out })
    const moveY = gsap.quickTo(button, 'y', { duration: 0.4, ease: MOTION.ease.out })
    const strength = scaledDistance(0.22)

    const onMove = (event) => {
      const rect = button.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)
      moveX(Math.max(-10, Math.min(10, relX * strength)))
      moveY(Math.max(-8, Math.min(8, relY * strength)))
    }

    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    button.addEventListener('pointermove', onMove)
    button.addEventListener('pointerleave', onLeave)

    cleanups.push(() => {
      button.removeEventListener('pointermove', onMove)
      button.removeEventListener('pointerleave', onLeave)
      delete button.dataset.magneticBound
      gsap.set(button, { clearProps: 'x,y' })
    })
  })

  return () => {
    cleanups.forEach((fn) => fn())
  }
}

/**
 * Drives the subtle precision crosshair/ring cursor on fine-pointer desktops.
 * Uses GPU-only `x`/`y` transforms and class toggles for interactive targets.
 */
export function initCustomCursor(cursorEl) {
  if (!cursorEl || prefersReducedMotion() || !window.matchMedia(HOVER_QUERY).matches) {
    return () => {}
  }

  const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.24, ease: MOTION.ease.out })
  const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.24, ease: MOTION.ease.out })
  let visible = false

  const onMove = (event) => {
    if (!visible) {
      visible = true
      cursorEl.classList.add('is-visible')
    }
    xTo(event.clientX)
    yTo(event.clientY)

    const target = event.target instanceof Element ? event.target : null
    const interactive = target?.closest('a, button, summary, input, select, textarea, .location-map')
    const media = target?.closest('.photo-mount, .gallery-open')
    const darkSurface = target?.closest('.capability-index, .site-footer, .return-to-surface, .lightbox')

    cursorEl.classList.toggle('is-hovering', Boolean(interactive))
    cursorEl.classList.toggle('is-media', Boolean(media && !interactive))
    cursorEl.classList.toggle('is-on-dark', Boolean(darkSurface))
  }

  const onDown = () => cursorEl.classList.add('is-pressed')
  const onUp = () => cursorEl.classList.remove('is-pressed')
  const onLeave = () => {
    visible = false
    cursorEl.classList.remove('is-visible', 'is-hovering', 'is-media', 'is-pressed')
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('pointerup', onUp, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)

  return () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerdown', onDown)
    window.removeEventListener('pointerup', onUp)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
}
