import { gsap, MOTION, scaledDuration } from './gsap.js'
import { createLineReveal } from './splitLines.js'

/**
 * ACT 5 – THE FINALE (`ContactCTA.jsx` + `ClassyFooterSystem.jsx`)
 * Elevates the closing CTA card with masked typography and staggered actions,
 * followed by a composed curtain entrance for the footer columns.
 */
export function initFinaleAct5(root) {
  const footerSystem = root.querySelector('.classy-footer-system')
  if (!footerSystem) return

  const cta = footerSystem.querySelector('.classy-footer-cta')
  if (cta) {
    const eyebrow = cta.querySelector('.eyebrow')
    const heading = cta.querySelector('h2')
    const body = cta.querySelector('.classy-footer-cta-copy > p:not(.eyebrow)')
    const actions = [...cta.querySelectorAll('.classy-footer-cta-actions > *')]

    gsap.set(cta, { autoAlpha: 0, y: 34 })

    const ctaTl = gsap.timeline({
      defaults: { ease: MOTION.ease.out },
      scrollTrigger: {
        trigger: cta,
        start: 'top 88%',
        once: true,
      },
    })

    ctaTl.to(cta, { autoAlpha: 1, y: 0, duration: scaledDuration(0.85), ease: MOTION.ease.expo }, 0)

    if (eyebrow) {
      gsap.set(eyebrow, { autoAlpha: 0, '--eyebrow-line': 0 })
      ctaTl
        .to(eyebrow, { autoAlpha: 1, duration: scaledDuration(0.45) }, 0.12)
        .to(eyebrow, { '--eyebrow-line': 1, duration: scaledDuration(0.75), ease: MOTION.ease.inOut }, 0.16)
    }

    if (heading) {
      const lines = createLineReveal(heading)
      ctaTl.call(() => lines.play(), undefined, 0.18)
    }

    if (body) {
      gsap.set(body, { autoAlpha: 0, y: 16 })
      ctaTl.to(body, { autoAlpha: 1, y: 0, duration: scaledDuration(0.7) }, 0.36)
    }

    if (actions.length) {
      gsap.set(actions, { autoAlpha: 0, y: 16 })
      ctaTl.to(actions, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.65),
        stagger: 0.09,
      }, 0.44)
    }
  }

  const footer = footerSystem.querySelector('.site-footer')
  if (footer) {
    const columns = [...footer.querySelectorAll('.footer-main > *')]
    const bottom = footer.querySelector('.footer-bottom')

    if (columns.length) {
      gsap.set(columns, { autoAlpha: 0, y: 24 })
    }
    if (bottom) {
      gsap.set(bottom, { autoAlpha: 0, y: 12 })
    }

    const footerTl = gsap.timeline({
      defaults: { ease: MOTION.ease.out },
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        once: true,
      },
    })

    if (columns.length) {
      footerTl.to(columns, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.8),
        stagger: 0.1,
      }, 0)
    }

    if (bottom) {
      footerTl.to(bottom, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.65),
      }, 0.28)
    }
  }
}
