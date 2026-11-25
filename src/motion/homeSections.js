import {
  gsap,
  ScrollTrigger,
  DESKTOP_PIN_QUERY,
  MOTION,
  scaledDuration,
  scaledDistance,
} from './gsap.js'
import { createLineReveal, createCounterTween } from './splitLines.js'

/**
 * Helper: animates an eyebrow's leading hairline (`--eyebrow-line`) and label opacity.
 */
function addEyebrowStep(timeline, eyebrow, at = 0) {
  if (!eyebrow) return
  gsap.set(eyebrow, { autoAlpha: 0, '--eyebrow-line': 0 })
  timeline
    .to(eyebrow, { autoAlpha: 1, duration: scaledDuration(0.45), ease: MOTION.ease.out }, at)
    .to(eyebrow, { '--eyebrow-line': 1, duration: scaledDuration(0.75), ease: MOTION.ease.inOut }, at + 0.04)
}

/**
 * Helper: clip-path reveal + slow Ken Burns scale-down + optional scroll parallax
 * on any `PhotoMount` component.
 */
function buildPhotoReveal(mount, { direction = 'left', parallax = MOTION.parallax.photo } = {}) {
  const timeline = gsap.timeline({ paused: true })
  if (!mount) return { timeline, setupParallax: () => {} }

  const inner = mount.querySelector('.photo-mount-inner')
  const img = mount.querySelector('.photo-mount-inner img')
  const caption = mount.querySelector('figcaption')
  const corners = [...mount.querySelectorAll('.blueprint-corners i')]

  const clipFrom = {
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
    top: 'inset(100% 0% 0% 0%)',
    bottom: 'inset(0% 0% 100% 0%)',
  }[direction] || 'inset(0% 100% 0% 0%)'

  if (inner) gsap.set(inner, { clipPath: clipFrom })
  if (img) gsap.set(img, { scale: 1.16 })
  if (caption) gsap.set(caption, { autoAlpha: 0, y: 8 })
  if (corners.length) gsap.set(corners, { scale: 0 })

  if (inner) {
    timeline.to(inner, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: scaledDuration(1.15),
      ease: MOTION.ease.inOut,
    }, 0)
  }

  if (img) {
    timeline.to(img, {
      scale: 1.04,
      duration: scaledDuration(MOTION.duration.kenBurns),
      ease: MOTION.ease.expo,
    }, 0.08)
  }

  if (corners.length) {
    timeline.to(corners, {
      scale: 1,
      duration: scaledDuration(0.6),
      ease: 'back.out(2)',
      stagger: 0.06,
    }, 0.45)
  }

  if (caption) {
    timeline.to(caption, {
      autoAlpha: 1,
      y: 0,
      duration: scaledDuration(0.55),
      ease: MOTION.ease.out,
    }, 0.55)
  }

  const setupParallax = () => {
    if (!img || !parallax) return
    const shift = scaledDistance(parallax)
    gsap.fromTo(img, { yPercent: -shift }, {
      yPercent: shift,
      ease: 'none',
      scrollTrigger: {
        trigger: mount,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  return { timeline, setupParallax }
}

/**
 * ACT 1 – OPENING SCENE (`Hero.jsx`)
 * Title masked rise, Ken Burns clip-path photo entrance, 1973 count-up,
 * and subtle scroll-scrubbed depth separation as the visitor descends.
 */
export function initHeroSection(root) {
  const section = root.querySelector('.home-hero')
  if (!section) return { play: () => {} }

  const copy = section.querySelector('.hero-copy')
  const visual = section.querySelector('.hero-visual')
  const eyebrow = copy?.querySelector('.eyebrow')
  const heading = copy?.querySelector('h1')
  const body = copy?.querySelector(':scope > p:not(.eyebrow)')
  const buttons = [...(copy?.querySelectorAll('.hero-actions > *') || [])]
  const proof = copy?.querySelector('.hero-proof')
  const proofYear = proof?.querySelector('strong')
  const photo = visual?.querySelector('.hero-photo')
  const windowEl = visual?.querySelector('.hero-image-window')
  const caption = visual?.querySelector('figcaption')

  const tl = gsap.timeline({ paused: true, defaults: { ease: MOTION.ease.out } })

  addEyebrowStep(tl, eyebrow, 0)

  if (heading) {
    const lines = createLineReveal(heading, { duration: 1.1, stagger: 0.1 })
    tl.call(() => lines.play(), undefined, 0.12)
  }

  if (body) {
    gsap.set(body, { autoAlpha: 0, y: 20 })
    tl.to(body, { autoAlpha: 1, y: 0, duration: scaledDuration(0.8) }, 0.42)
  }

  if (buttons.length) {
    gsap.set(buttons, { autoAlpha: 0, y: 18 })
    tl.to(buttons, { autoAlpha: 1, y: 0, duration: scaledDuration(0.75), stagger: 0.1 }, 0.56)
  }

  if (proof) {
    gsap.set(proof, { autoAlpha: 0, y: 14 })
    tl.to(proof, { autoAlpha: 1, y: 0, duration: scaledDuration(0.7) }, 0.72)
  }

  if (proofYear) {
    const targetYear = Number.parseInt(proofYear.textContent, 10) || 1973
    const yearCounter = createCounterTween(proofYear, {
      from: Math.max(1900, targetYear - 48),
      to: targetYear,
      duration: 1.15,
    })
    tl.call(() => yearCounter.play(0), undefined, 0.78)
  }

  if (photo && windowEl) {
    gsap.set(photo, { autoAlpha: 0, y: 24 })
    gsap.set(windowEl, { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 })
    tl
      .to(photo, { autoAlpha: 1, y: 0, duration: scaledDuration(0.75) }, 0.2)
      .to(windowEl, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: scaledDuration(1.25),
        ease: MOTION.ease.inOut,
      }, 0.24)
      .to(windowEl, {
        scale: 1,
        duration: scaledDuration(1.75),
        ease: MOTION.ease.expo,
      }, 0.24)
  }

  if (caption) {
    gsap.set(caption, { autoAlpha: 0, y: 8 })
    tl.to(caption, { autoAlpha: 1, y: 0, duration: scaledDuration(0.55) }, 0.88)
  }

  // Scroll-scrubbed depth separation leaving Act 1
  if (visual && copy) {
    const range = { trigger: section, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(visual, { y: scaledDistance(MOTION.parallax.heroVisual), ease: 'none', scrollTrigger: range })
    gsap.to(copy, { y: scaledDistance(MOTION.parallax.heroCopy), ease: 'none', scrollTrigger: { ...range } })
  }

  return {
    play: (delay = 0) => {
      tl.delay(delay)
      tl.play()
    },
  }
}

/**
 * ACT 2 – THE SETUP (`Introduction.jsx` & `BlueprintLine.jsx`)
 * Section counter roll, masked narrative heading, blueprint photo reveal, and line draw.
 */
export function initIntroductionSection(root) {
  const section = root.querySelector('.company-intro')
  if (!section) return

  const indexBox = section.querySelector('.intro-index')
  const indexNum = indexBox?.querySelector('span:first-child')
  const indexLabel = indexBox?.querySelector('span:last-child')
  const copy = section.querySelector('.intro-copy')
  const eyebrow = copy?.querySelector('.eyebrow')
  const heading = copy?.querySelector('h2')
  const body = copy?.querySelector(':scope > p:not(.eyebrow)')
  const link = copy?.querySelector('.text-link')
  const photo = section.querySelector('.intro-photo')

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true,
    },
  })

  if (indexNum) {
    gsap.set(indexNum, { autoAlpha: 0, y: 14 })
    const numCounter = createCounterTween(indexNum, { from: 0, to: 1, pad: 2, duration: 0.7 })
    tl
      .to(indexNum, { autoAlpha: 1, y: 0, duration: scaledDuration(0.6) }, 0)
      .call(() => numCounter.play(0), undefined, 0.05)
  }

  if (indexLabel) {
    gsap.set(indexLabel, { autoAlpha: 0, y: 10 })
    tl.to(indexLabel, { autoAlpha: 1, y: 0, duration: scaledDuration(0.55) }, 0.12)
  }

  addEyebrowStep(tl, eyebrow, 0.08)

  if (heading) {
    const lines = createLineReveal(heading)
    tl.call(() => lines.play(), undefined, 0.18)
  }

  if (body) {
    gsap.set(body, { autoAlpha: 0, y: 20 })
    tl.to(body, { autoAlpha: 1, y: 0, duration: scaledDuration(0.8) }, 0.42)
  }

  if (link) {
    gsap.set(link, { autoAlpha: 0, y: 14 })
    tl.to(link, { autoAlpha: 1, y: 0, duration: scaledDuration(0.65) }, 0.56)
  }

  if (photo) {
    const { timeline: photoTl, setupParallax } = buildPhotoReveal(photo, { direction: 'right' })
    tl.add(photoTl.paused(false), 0.2)
    setupParallax()
  }

  // Blueprint horizontal rule between Act 2 and Act 3
  root.querySelectorAll('.blueprint-line').forEach((line) => {
    gsap.set(line, { scaleX: 0 })
    gsap.to(line, {
      scaleX: 1,
      duration: scaledDuration(1.2),
      ease: MOTION.ease.inOut,
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
        once: true,
      },
    })
  })
}

/**
 * ACT 3A – THE JOURNEY: CAPABILITIES INDEX (`ServicesOverview.jsx`)
 * Editorial heading reveal + staggered service index rows with hairline rule draws.
 */
export function initCapabilitiesSection(root) {
  const section = root.querySelector('.capability-index')
  if (!section) return

  const headingWrap = section.querySelector('.capability-heading')
  const eyebrow = headingWrap?.querySelector('.eyebrow')
  const heading = headingWrap?.querySelector('h2')
  const lead = headingWrap?.querySelector(':scope > p:not(.eyebrow)')
  const list = section.querySelector('.capability-list')
  const items = [...section.querySelectorAll('.capability-item')]

  const headingTl = gsap.timeline({
    paused: true,
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: section, start: 'top 80%', once: true },
  })

  addEyebrowStep(headingTl, eyebrow, 0)
  if (heading) {
    const lines = createLineReveal(heading)
    headingTl.call(() => lines.play(), undefined, 0.1)
  }
  if (lead) {
    gsap.set(lead, { autoAlpha: 0, y: 18 })
    headingTl.to(lead, { autoAlpha: 1, y: 0, duration: scaledDuration(0.75) }, 0.35)
  }

  if (list) {
    gsap.set(list, { '--list-rule-scale': 0 })
    gsap.to(list, {
      '--list-rule-scale': 1,
      duration: scaledDuration(1),
      ease: MOTION.ease.inOut,
      scrollTrigger: { trigger: list, start: 'top 86%', once: true },
    })
  }

  if (items.length) {
    gsap.set(items, { autoAlpha: 0, y: 24, '--line-scale': 0 })
    const listTl = gsap.timeline({
      scrollTrigger: { trigger: list || items[0], start: 'top 84%', once: true },
    })
    listTl
      .to(items, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.75),
        ease: MOTION.ease.out,
        stagger: MOTION.stagger.base,
      }, 0)
      .to(items, {
        '--line-scale': 1,
        duration: scaledDuration(0.85),
        ease: MOTION.ease.inOut,
        stagger: MOTION.stagger.base,
      }, 0.08)
  }
}

/**
 * ACT 3B – THE JOURNEY: WATER WELL FEATURE (`ServicesOverview.jsx`)
 */
export function initWellFeatureSection(root) {
  const section = root.querySelector('.well-feature')
  if (!section) return

  const photo = section.querySelector('.feature-photo')
  const copy = section.querySelector('.feature-copy')
  const eyebrow = copy?.querySelector('.eyebrow')
  const heading = copy?.querySelector('h2')
  const body = copy?.querySelector(':scope > p:not(.eyebrow)')
  const link = copy?.querySelector('.text-link')

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: section, start: 'top 80%', once: true },
  })

  if (photo) {
    const { timeline: photoTl, setupParallax } = buildPhotoReveal(photo, { direction: 'left' })
    tl.add(photoTl.paused(false), 0)
    setupParallax()
  }

  addEyebrowStep(tl, eyebrow, 0.14)
  if (heading) {
    const lines = createLineReveal(heading)
    tl.call(() => lines.play(), undefined, 0.24)
  }
  if (body) {
    gsap.set(body, { autoAlpha: 0, y: 20 })
    tl.to(body, { autoAlpha: 1, y: 0, duration: scaledDuration(0.8) }, 0.48)
  }
  if (link) {
    gsap.set(link, { autoAlpha: 0, y: 14 })
    tl.to(link, { autoAlpha: 1, y: 0, duration: scaledDuration(0.65) }, 0.62)
  }
}

/**
 * ACT 3C – THE JOURNEY: GEOTHERMAL FEATURE (`ServicesOverview.jsx`)
 * Scrubbed vertical bore line descending with scroll + staggered coordination callout.
 */
export function initGeothermalSection(root) {
  const section = root.querySelector('.geothermal-feature')
  if (!section) return

  const mark = section.querySelector('.geo-feature-mark')
  const boreLine = mark?.querySelector('i')
  const arrow = mark?.querySelector('strong')
  const copy = section.querySelector('.geo-feature-copy')
  const eyebrow = copy?.querySelector('.eyebrow')
  const heading = copy?.querySelector('h2')
  const body = copy?.querySelector(':scope > p:not(.eyebrow)')
  const link = copy?.querySelector('.text-link')
  const note = section.querySelector('.geo-feature-note')

  if (mark) {
    gsap.set(mark, { autoAlpha: 0, scale: 0.94 })
    gsap.to(mark, {
      autoAlpha: 1,
      scale: 1,
      duration: scaledDuration(0.85),
      ease: MOTION.ease.out,
      scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    })
  }

  if (boreLine) {
    gsap.fromTo(boreLine, { scaleY: 0, transformOrigin: 'top center' }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: 0.5,
      },
    })
  }

  if (arrow) {
    gsap.fromTo(arrow, { y: -10 }, {
      y: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  const copyTl = gsap.timeline({
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: section, start: 'top 78%', once: true },
  })

  addEyebrowStep(copyTl, eyebrow, 0.05)
  if (heading) {
    const lines = createLineReveal(heading)
    copyTl.call(() => lines.play(), undefined, 0.14)
  }
  if (body) {
    gsap.set(body, { autoAlpha: 0, y: 20 })
    copyTl.to(body, { autoAlpha: 1, y: 0, duration: scaledDuration(0.8) }, 0.36)
  }
  if (link) {
    gsap.set(link, { autoAlpha: 0, y: 14 })
    copyTl.to(link, { autoAlpha: 1, y: 0, duration: scaledDuration(0.65) }, 0.48)
  }

  if (note) {
    gsap.set(note, { autoAlpha: 0, y: 24 })
    copyTl.to(note, { autoAlpha: 1, y: 0, duration: scaledDuration(0.85) }, 0.32)
  }
}

/**
 * ACT 3D – THE JOURNEY: WHY DAVIDSON & PROCESS (`WhyDavidson.jsx` & `ProcessSection.jsx`)
 * Why Davidson rows stagger with rule draws; ProcessSection pins on desktop to walk
 * step-by-step through stages 01–04 as the visitor scrolls.
 */
export function initWhyAndProcessSections(root) {
  // Why Davidson
  const valuesSection = root.querySelector('.values-section')
  if (valuesSection) {
    const eyebrow = valuesSection.querySelector('.values-heading .eyebrow')
    const heading = valuesSection.querySelector('.values-heading h2')
    const rows = [...valuesSection.querySelectorAll('.value-row')]

    const headTl = gsap.timeline({
      defaults: { ease: MOTION.ease.out },
      scrollTrigger: { trigger: valuesSection, start: 'top 80%', once: true },
    })
    addEyebrowStep(headTl, eyebrow, 0)
    if (heading) {
      const lines = createLineReveal(heading)
      headTl.call(() => lines.play(), undefined, 0.1)
    }

    if (rows.length) {
      gsap.set(rows, { autoAlpha: 0, y: 22, '--line-scale': 0 })
      const rowTl = gsap.timeline({
        scrollTrigger: { trigger: valuesSection.querySelector('.values-list') || rows[0], start: 'top 84%', once: true },
      })
      rowTl
        .to(rows, {
          autoAlpha: 1,
          y: 0,
          duration: scaledDuration(0.75),
          ease: MOTION.ease.out,
          stagger: 0.1,
        }, 0)
        .to(rows, {
          '--line-scale': 1,
          duration: scaledDuration(0.85),
          ease: MOTION.ease.inOut,
          stagger: 0.1,
        }, 0.08)
    }
  }

  // Process Section ("Our Approach")
  const processSection = root.querySelector('.approach-section')
  if (!processSection) return

  const intro = processSection.querySelector('.approach-intro')
  const introEyebrow = intro?.querySelector('.eyebrow')
  const introHeading = intro?.querySelector('h2')
  const introBody = intro?.querySelector(':scope > p:not(.eyebrow)')
  const stepsWrap = processSection.querySelector('.approach-steps')
  const steps = [...processSection.querySelectorAll('.approach-step')]

  const introTl = gsap.timeline({
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: processSection, start: 'top 80%', once: true },
  })
  addEyebrowStep(introTl, introEyebrow, 0)
  if (introHeading) {
    const lines = createLineReveal(introHeading)
    introTl.call(() => lines.play(), undefined, 0.1)
  }
  if (introBody) {
    gsap.set(introBody, { autoAlpha: 0, y: 18 })
    introTl.to(introBody, { autoAlpha: 1, y: 0, duration: scaledDuration(0.75) }, 0.35)
  }

  if (!steps.length) return

  const mm = gsap.matchMedia(root)

  // Desktop: Pinned storytelling sequence stepping through 01 -> 04 on scroll
  mm.add(DESKTOP_PIN_QUERY, () => {
    gsap.set(steps, { autoAlpha: 0.25, x: 18, '--line-scale': 0.25 })
    if (stepsWrap) gsap.set(stepsWrap, { '--approach-progress': 0 })

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: processSection,
        start: 'center center',
        end: () => `+=${Math.max(480, steps.length * 165)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    steps.forEach((step, index) => {
      const at = index * 0.45
      pinTl.to(step, {
        autoAlpha: 1,
        x: 0,
        '--line-scale': 1,
        duration: 0.45,
        ease: MOTION.ease.out,
        onStart: () => step.classList.add('is-active'),
        onReverseComplete: () => {
          if (index > 0) step.classList.remove('is-active')
        },
      }, at)
    })

    if (stepsWrap) {
      pinTl.to(stepsWrap, {
        '--approach-progress': 1,
        duration: pinTl.duration(),
        ease: 'none',
      }, 0)
    }

    return () => {
      steps.forEach((step) => step.classList.remove('is-active'))
    }
  })

  // Mobile / Tablet: Clean staggered reveal without pinning
  mm.add('(prefers-reduced-motion: no-preference) and ((max-width: 980px) or (max-height: 639px))', () => {
    gsap.set(steps, { autoAlpha: 0, y: 22, '--line-scale': 0 })
    const mobileTl = gsap.timeline({
      scrollTrigger: { trigger: stepsWrap || steps[0], start: 'top 85%', once: true },
    })
    mobileTl
      .to(steps, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.7),
        ease: MOTION.ease.out,
        stagger: 0.1,
      }, 0)
      .to(steps, {
        '--line-scale': 1,
        duration: scaledDuration(0.8),
        ease: MOTION.ease.inOut,
        stagger: 0.1,
      }, 0.08)
  })
}

/**
 * ACT 4A – THE PROOF: FIELD WORK PREVIEW (`WorkPreview.jsx`)
 * Masked heading, asymmetric dual clip-path image reveals, and opposing horizontal/vertical
 * scroll-scrubbed drift within the existing 2-column gallery.
 */
export function initWorkPreviewSection(root) {
  const section = root.querySelector('.work-preview')
  if (!section) return

  const headingWrap = section.querySelector('.work-preview-heading')
  const eyebrow = headingWrap?.querySelector('.eyebrow')
  const heading = headingWrap?.querySelector('h2')
  const link = headingWrap?.querySelector('.text-link')
  const tallPhoto = section.querySelector('.preview-photo-tall')
  const widePhoto = section.querySelector('.preview-photo-wide')
  const note = section.querySelector('.image-note')

  const headTl = gsap.timeline({
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: section, start: 'top 80%', once: true },
  })

  addEyebrowStep(headTl, eyebrow, 0)
  if (heading) {
    const lines = createLineReveal(heading)
    headTl.call(() => lines.play(), undefined, 0.1)
  }
  if (link) {
    gsap.set(link, { autoAlpha: 0, y: 14 })
    headTl.to(link, { autoAlpha: 1, y: 0, duration: scaledDuration(0.65) }, 0.32)
  }

  if (tallPhoto) {
    const { timeline: tallTl, setupParallax } = buildPhotoReveal(tallPhoto, { direction: 'top', parallax: 5 })
    ScrollTrigger.create({
      trigger: tallPhoto,
      start: 'top 84%',
      once: true,
      onEnter: () => tallTl.play(),
    })
    setupParallax()

    // Subtle horizontal drift on desktop without touching layout or causing overflow
    gsap.matchMedia(root).add('(prefers-reduced-motion: no-preference) and (min-width: 821px)', () => {
      gsap.fromTo(tallPhoto, { x: scaledDistance(-16) }, {
        x: scaledDistance(14),
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.preview-gallery') || tallPhoto,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }

  if (widePhoto) {
    const { timeline: wideTl, setupParallax } = buildPhotoReveal(widePhoto, { direction: 'left', parallax: 7 })
    ScrollTrigger.create({
      trigger: widePhoto,
      start: 'top 84%',
      once: true,
      onEnter: () => wideTl.play(0.12),
    })
    setupParallax()

    gsap.matchMedia(root).add('(prefers-reduced-motion: no-preference) and (min-width: 821px)', () => {
      gsap.fromTo(widePhoto, { x: scaledDistance(MOTION.parallax.workHorizontal) }, {
        x: scaledDistance(-16),
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.preview-gallery') || widePhoto,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }

  if (note) {
    gsap.set(note, { autoAlpha: 0, y: 14 })
    gsap.to(note, {
      autoAlpha: 1,
      y: 0,
      duration: scaledDuration(0.65),
      ease: MOTION.ease.out,
      scrollTrigger: { trigger: note, start: 'top 92%', once: true },
    })
  }
}

/**
 * ACT 4B – THE PROOF: FAQ PREVIEW (`FAQPreview.jsx`)
 */
export function initFaqPreviewSection(root) {
  const section = root.querySelector('.faq-preview')
  if (!section) return

  const intro = section.querySelector('.faq-preview-intro')
  const eyebrow = intro?.querySelector('.eyebrow')
  const heading = intro?.querySelector('h2')
  const link = intro?.querySelector('.text-link')
  const list = section.querySelector('.faq-preview-list')
  const items = [...section.querySelectorAll('.faq-preview-item')]

  const introTl = gsap.timeline({
    defaults: { ease: MOTION.ease.out },
    scrollTrigger: { trigger: section, start: 'top 82%', once: true },
  })
  addEyebrowStep(introTl, eyebrow, 0)
  if (heading) {
    const lines = createLineReveal(heading)
    introTl.call(() => lines.play(), undefined, 0.1)
  }
  if (link) {
    gsap.set(link, { autoAlpha: 0, y: 14 })
    introTl.to(link, { autoAlpha: 1, y: 0, duration: scaledDuration(0.65) }, 0.34)
  }

  if (items.length) {
    gsap.set(items, { autoAlpha: 0, y: 20, '--line-scale': 0 })
    const itemsTl = gsap.timeline({
      scrollTrigger: { trigger: list || items[0], start: 'top 85%', once: true },
    })
    itemsTl
      .to(items, {
        autoAlpha: 1,
        y: 0,
        duration: scaledDuration(0.7),
        ease: MOTION.ease.out,
        stagger: 0.1,
      }, 0)
      .to(items, {
        '--line-scale': 1,
        duration: scaledDuration(0.8),
        ease: MOTION.ease.inOut,
        stagger: 0.1,
      }, 0.08)
  }
}
