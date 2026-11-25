import { buildHomeHero } from './homeHero.js'
import { initFinaleAct5 } from './footerAct5.js'
import {
  buildDigits,
  buildEditorial,
  buildFade,
  buildGalleryGroup,
  buildLine,
  buildMark,
  buildMedia,
  buildRowGroup,
  buildSequence,
  buildStagger,
  createScheduler,
} from './reveals.js'

const REVEAL = '.reveal, .reveal-block'
/** Standalone list rows; they are grouped by parent and revealed in batches. */
const ROWS = '.capability-item, .value-row, .approach-step, .faq-preview-item'

const BUILDERS = {
  sequence: buildSequence,
  stagger: buildStagger,
  fade: buildFade,
  digits: buildDigits,
  media: buildMedia,
  line: buildLine,
  mark: buildMark,
  editorial: buildEditorial,
}

/** `data-motion` picks the choreography; anything unmarked rises as one block. */
function buildContainer(element) {
  const builder = BUILDERS[element.dataset.motion] || buildFade
  return builder(element)
}

const precedes = (a, b) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)

/**
 * Builds scroll reveals for shared chrome (Act 5 Footer CTA + Footer) and inner pages.
 * Sections inside `.home-page` are orchestrated separately by `useHomeAnimations` so the
 * two engines never double-bind or conflict.
 */
export function buildPage(root) {
  const scheduler = createScheduler()
  const units = []

  // Act 5 shared closing sequence across routes
  initFinaleAct5(root)

  const homePage = root.querySelector('.home-page')

  // Only handle non-Home pages with generic reveal builders
  if (!homePage) {
    const homeHero = root.querySelector('.home-hero')
    if (homeHero) units.push(buildHomeHero(homeHero))

    const outermost = [...root.querySelectorAll(REVEAL)].filter((element) => {
      if (element.closest('.classy-footer-system')) return false
      if (homeHero && element.closest('.home-hero')) return false
      return !element.parentElement.closest(REVEAL)
    })

    const rowGroups = new Map()
    outermost.forEach((element) => {
      if (element.matches(ROWS)) {
        const siblings = rowGroups.get(element.parentElement) || []
        siblings.push(element)
        rowGroups.set(element.parentElement, siblings)
      } else {
        units.push(buildContainer(element))
      }
    })
    rowGroups.forEach((rows) => units.push(buildRowGroup(rows)))

    root.querySelectorAll('main > .blueprint-line, .blueprint-line:not(.home-page *)').forEach((line) => {
      if (!line.closest('.home-page')) units.push(buildLine(line))
    })

    const gallery = root.querySelector('.work-gallery')
    if (gallery) units.push(buildGalleryGroup([...gallery.querySelectorAll('.work-gallery-item')]))

    units.sort((a, b) => (precedes(a.el, b.el) ? -1 : 1))

    units.forEach((unit, index) => {
      scheduler.schedule(unit, { start: unit.rows ? 0.9 : 0.88, delay: 0.14 + Math.min(index, 6) * 0.1 })
    })
  }

  return () => scheduler.dispose()
}
