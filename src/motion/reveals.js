import { gsap, ScrollTrigger, EASE } from './gsap.js'
import { createLineReveal, createDigitReveal } from './splitLines.js'

/** Lists whose children should be revealed as a group rather than as one block. */
const FLATTEN = [
  '.hero-actions',
  '.services-hero-actions',
  '.classy-footer-cta-actions',
  '.faq-group-items',
  '.service-explanation-grid',
  '.footer-main',
].join(', ')

/** Rows that draw their own rule line as they appear. */
export const LINED_ROWS = '.capability-item, .value-row, .approach-step, .faq-preview-item, .faq-item, .contact-detail-group'

const ROW_CHILD = '.contact-detail-group, .faq-item'
const HEADING = 'h1, h2, h3'

/** Reads the `--reveal-delay` custom property as a number of seconds. */
export function readDelay(element) {
  const value = getComputedStyle(element).getPropertyValue('--reveal-delay').trim()
  const amount = Number.parseFloat(value)
  if (!Number.isFinite(amount)) return 0
  return value.endsWith('ms') ? amount / 1000 : amount
}

function playLater(timeline, delay) {
  timeline.delay(delay)
  timeline.play()
}

function flattenChildren(container) {
  const items = []
  for (const child of container.children) {
    // Plain, class-less wrappers that only hold a heading are transparent.
    const isHeadingWrapper = child.tagName === 'DIV' && !child.className
      && [...child.children].some((grandchild) => grandchild.matches(HEADING))
    if (child.matches(FLATTEN) || isHeadingWrapper) items.push(...child.children)
    else items.push(child)
  }
  return items
}

function hideRows(rows) {
  gsap.set(rows, { autoAlpha: 0, y: 26 })
  const lined = rows.filter((row) => row.matches(LINED_ROWS))
  if (lined.length) gsap.set(lined, { '--line-scale': 0 })
  return lined
}

function drawRows(timeline, rows, lined, at) {
  timeline.to(rows, { autoAlpha: 1, y: 0, stagger: 0.09 }, at)
  if (lined.length) {
    timeline.to(lined, { '--line-scale': 1, duration: 1, ease: EASE.inOut, stagger: 0.09 }, at + 0.1)
  }
}

/** Eyebrow label: the dash grows while the text fades in. */
function addEyebrow(timeline, eyebrow, at) {
  gsap.set(eyebrow, { autoAlpha: 0, '--eyebrow-line': 0 })
  timeline
    .to(eyebrow, { autoAlpha: 1, duration: 0.5 }, at)
    .to(eyebrow, { '--eyebrow-line': 1, duration: 0.9, ease: EASE.inOut }, at + 0.05)
}

/**
 * A copy block revealed piece by piece: eyebrow, headline lines rising through
 * masks, then paragraphs, links and list rows in reading order.
 */
export function buildSequence(container) {
  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE.out, duration: 0.9 } })
  const items = flattenChildren(container)
  let at = 0

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index]

    if (item.matches(ROW_CHILD)) {
      const run = [item]
      while (items[index + 1]?.matches(ROW_CHILD)) run.push(items[++index])
      drawRows(timeline, run, hideRows(run), at)
      at += 0.2
    } else if (item.matches('.eyebrow')) {
      addEyebrow(timeline, item, at)
      at += 0.08
    } else if (item.matches(HEADING)) {
      const lines = createLineReveal(item)
      timeline.call(() => lines.play(), undefined, at)
      at += 0.2 + Math.max(lines.count - 1, 0) * 0.09
    } else if (item.matches('.hero-actions, .services-hero-actions, .classy-footer-cta-actions')) {
      const buttons = [...item.children]
      gsap.set(buttons, { autoAlpha: 0, y: 22 })
      timeline.to(buttons, { autoAlpha: 1, y: 0, stagger: 0.1 }, at)
      at += 0.2
    } else {
      gsap.set(item, { autoAlpha: 0, y: 26 })
      timeline.to(item, { autoAlpha: 1, y: 0 }, at)
      at += 0.12
    }
  }

  return { el: container, delay: readDelay(container), play: (delay = 0) => playLater(timeline, delay) }
}

/** Same as `buildSequence`, but every child rises as a block (no headline splitting). */
export function buildStagger(container) {
  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE.out, duration: 0.9 } })
  const items = flattenChildren(container)
  gsap.set(items, { autoAlpha: 0, y: 30 })
  timeline.to(items, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0)
  return { el: container, delay: readDelay(container), play: (delay = 0) => playLater(timeline, delay) }
}

export function buildFade(element) {
  gsap.set(element, { autoAlpha: 0, y: 28 })
  const timeline = gsap.timeline({ paused: true })
    .to(element, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out })
  return { el: element, delay: readDelay(element), play: (delay = 0) => playLater(timeline, delay) }
}

/** "EST." + a year: the label fades in and the digits roll up into place. */
export function buildDigits(container) {
  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE.out } })
  let at = 0
  for (const child of container.children) {
    if (child.matches('[data-digits]')) {
      const digits = createDigitReveal(child)
      timeline.call(() => digits.play(), undefined, at)
      at += 0.2
    } else {
      gsap.set(child, { autoAlpha: 0, y: 12 })
      timeline.to(child, { autoAlpha: 1, y: 0, duration: 0.7 }, at)
      at += 0.1
    }
  }
  return { el: container, delay: readDelay(container), play: (delay = 0) => playLater(timeline, delay) }
}

/** A photograph: the frame stays put while the picture wipes in and settles. */
function addMedia(timeline, mount, at = 0) {
  const inner = mount.querySelector('.photo-mount-inner')
  const para = mount.querySelector('.photo-para')
  const caption = mount.querySelector('figcaption')
  const corners = [...mount.querySelectorAll('.blueprint-corners i')]
  const fromRight = mount.closest('[data-wipe="right"]')
  const hidden = fromRight ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)'

  gsap.set(inner, { clipPath: hidden })
  gsap.set(para, { scale: 1.22 })
  if (caption) gsap.set(caption, { autoAlpha: 0, y: 8 })
  if (corners.length) gsap.set(corners, { scale: 0 })

  timeline
    .to(inner, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: EASE.inOut }, at)
    .to(para, { scale: 1, duration: 1.7, ease: EASE.out }, at + 0.1)
  if (caption) timeline.to(caption, { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.55)
  if (corners.length) {
    timeline.to(corners, { scale: 1, duration: 0.7, ease: 'back.out(2.2)', stagger: 0.07 }, at + 0.5)
  }
  addPhotoParallax(mount)
}

export function buildMedia(element) {
  const mount = element.classList.contains('photo-mount') ? element : element.querySelector('.photo-mount')
  if (!mount?.querySelector('.photo-para')) return buildFade(element)
  const timeline = gsap.timeline({ paused: true })
  addMedia(timeline, mount)
  return { el: element, delay: readDelay(element), play: (delay = 0) => playLater(timeline, delay) }
}

/** Blueprint divider: the rule draws from the left. */
export function buildLine(element) {
  gsap.set(element, { scaleX: 0 })
  const timeline = gsap.timeline({ paused: true })
    .to(element, { scaleX: 1, duration: 1.3, ease: EASE.inOut })
  return { el: element, delay: readDelay(element), play: (delay = 0) => playLater(timeline, delay) }
}

/** A standalone list whose rows reveal in small batches as they enter. */
export function buildRowGroup(rows) {
  const lined = hideRows(rows)
  const play = (batch = rows, delay = 0) => {
    const batchLines = batch.filter((row) => row.matches(LINED_ROWS))
    gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE.out, stagger: 0.09, delay })
    if (batchLines.length) {
      gsap.to(batchLines, { '--line-scale': 1, duration: 1, ease: EASE.inOut, stagger: 0.09, delay: delay + 0.1 })
    }
  }
  return { el: rows[0], rows, delay: 0, play }
}

/** The ground-loop diagram: frame in, bore line drops, loop pipe draws, flow starts. */
export function buildMark(element) {
  const labels = [...element.querySelectorAll('span')]
  const bore = element.querySelector('i')
  const pipe = element.querySelector('.loop-pipe')
  const flow = element.querySelector('.loop-flow')

  gsap.set(element, { autoAlpha: 0, scale: 0.92 })
  gsap.set(labels, { autoAlpha: 0 })
  if (bore) gsap.set(bore, { scaleY: 0 })
  if (flow) gsap.set(flow, { autoAlpha: 0 })

  const timeline = gsap.timeline({ paused: true })
    .to(element, { autoAlpha: 1, scale: 1, duration: 0.9, ease: EASE.out }, 0)
    .to(labels, { autoAlpha: 1, duration: 0.6, stagger: 0.2 }, 0.4)
  if (bore) timeline.to(bore, { scaleY: 1, duration: 0.9, ease: EASE.inOut }, 0.1)
  if (pipe) timeline.fromTo(pipe, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.5, ease: 'power2.inOut' }, 0.25)
  if (flow) timeline.to(flow, { autoAlpha: 1, duration: 0.6 }, 1.2)

  return { el: element, delay: readDelay(element), play: (delay = 0) => playLater(timeline, delay) }
}

/** A service row: the photo (or scope note) leads, the copy follows in reading order. */
export function buildEditorial(row) {
  const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE.out, duration: 0.9 } })
  const media = row.querySelector('.service-editorial-media')
  const copy = row.querySelector('.service-editorial-copy')
  const note = media?.querySelector('.service-scope-note')

  if (media?.querySelector('.photo-para')) addMedia(timeline, media.querySelector('.photo-mount'))
  else if (note) {
    gsap.set(note, { autoAlpha: 0, y: 30 })
    timeline.to(note, { autoAlpha: 1, y: 0, duration: 1 }, 0)
  }

  if (copy) {
    let at = 0.2
    for (const child of flattenChildren(copy)) {
      if (child.matches('.eyebrow')) {
        addEyebrow(timeline, child, at)
        at += 0.08
      } else if (child.matches(HEADING)) {
        const lines = createLineReveal(child)
        timeline.call(() => lines.play(), undefined, at)
        at += 0.2 + Math.max(lines.count - 1, 0) * 0.09
      } else {
        gsap.set(child, { autoAlpha: 0, y: 24 })
        timeline.to(child, { autoAlpha: 1, y: 0, stagger: 0.07 }, at)
        at += 0.14
      }
    }
  }

  return { el: row, delay: readDelay(row), play: (delay = 0) => playLater(timeline, delay) }
}

/** Gallery tiles: each rises while its picture is unveiled from the top. */
export function buildGalleryGroup(items) {
  const frames = items.map((item) => item.querySelector('img'))
  gsap.set(items, { autoAlpha: 0, y: 44 })
  gsap.set(frames, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.18 })
  const play = (batch = items, delay = 0) => {
    const images = batch.map((item) => item.querySelector('img'))
    gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out, stagger: 0.08, delay })
    gsap.to(images, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: EASE.inOut, stagger: 0.08, delay })
    gsap.to(images, { scale: 1, duration: 1.6, ease: EASE.out, stagger: 0.08, delay: delay + 0.1 })
  }
  return { el: items[0], rows: items, delay: 0, play }
}

/** Keeps a picture slightly taller than its window and slides it as you scroll. */
export function addPhotoParallax(mount, strength = 5.5) {
  const img = mount.querySelector('.photo-para img')
  if (!img) return
  gsap.fromTo(img, { yPercent: -strength }, {
    yPercent: strength,
    ease: 'none',
    scrollTrigger: {
      trigger: mount,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Reveals a unit when it scrolls into view. Units already on screen (or ones the
 * page can never scroll far enough to reach) play straight away, before first paint.
 */
export function createScheduler() {
  /** Triggers still waiting to fire: `{ trigger, reveal }`. */
  const pending = new Set()
  const timers = new Set()
  const batches = []

  function schedule(unit, { start = 0.88, delay = 0 } = {}) {
    const limit = window.innerHeight * start
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const onScreen = (element) => element.getBoundingClientRect().top <= limit
    const reachable = (element) => element.getBoundingClientRect().top <= maxScroll + limit

    function watch(element, reveal) {
      const entry = {
        trigger: ScrollTrigger.create({
          trigger: element,
          start: `top ${start * 100}%`,
          once: true,
          onEnter: () => {
            pending.delete(entry)
            reveal()
          },
        }),
        reveal,
      }
      pending.add(entry)
    }

    if (unit.rows) {
      const now = []
      unit.rows.forEach((row) => {
        if (onScreen(row) || !reachable(row)) now.push(row)
        else {
          watch(row, () => {
            // Rows that enter together share one staggered reveal.
            let batch = batches.find((item) => item.unit === unit)
            if (!batch) {
              batch = { unit, rows: [], timer: 0 }
              batches.push(batch)
            }
            batch.rows.push(row)
            const timer = window.setTimeout(() => {
              timers.delete(timer)
              batches.splice(batches.indexOf(batch), 1)
              unit.play(batch.rows, 0)
            }, 70)
            timers.add(timer)
          })
        }
      })
      if (now.length) unit.play(now, delay + unit.delay)
      return
    }

    if (onScreen(unit.el) || !reachable(unit.el)) {
      unit.play(delay + unit.delay)
      return
    }
    watch(unit.el, () => unit.play(unit.delay))
  }

  // A rule at the very foot of a short page may never scroll into view; show it anyway.
  function onRefresh() {
    const maxScroll = ScrollTrigger.maxScroll(window)
    pending.forEach((entry) => {
      if (entry.trigger.start > maxScroll + 1) {
        entry.trigger.kill()
        pending.delete(entry)
        entry.reveal()
      }
    })
  }
  ScrollTrigger.addEventListener('refresh', onRefresh)

  return {
    schedule,
    dispose() {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      timers.forEach((timer) => window.clearTimeout(timer))
      pending.clear()
    },
  }
}
