import { useEffect, useState } from 'react'
import { photos } from '../../assets/images/index.js'
import ArrowIcon from '../common/ArrowIcon.jsx'
import Button from '../common/Button.jsx'
import SectionLabel from '../common/SectionLabel.jsx'

const heroSlides = [
  {
    src: photos.hero,
    alt: 'Representative vintage truck-mounted drilling rig; not a Davidson Well Drilling photo.',
    caption: 'Representative archival drilling rig • not a Davidson project',
    position: 'center',
  },
  {
    src: photos.field,
    alt: 'Representative truck-mounted drilling rig at a field site; not a Davidson project.',
    caption: 'Representative drilling equipment • not a Davidson project',
    position: 'center',
  },
  {
    src: photos.driller,
    alt: 'Representative driller working beside drilling machinery; not a Davidson project.',
    caption: 'Representative drilling crew • not a Davidson project',
    position: 'center',
  },
  {
    src: photos.borehole,
    alt: 'Representative borehole drilling operation with water discharge; not a Davidson project.',
    caption: 'Representative borehole operation • not a Davidson project',
    position: 'center',
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(motionPreference.matches)

    updatePreference()
    motionPreference.addEventListener('change', updatePreference)
    return () => motionPreference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (reducedMotion || isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6800)

    return () => window.clearInterval(timer)
  }, [reducedMotion, isPaused])

  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="hero-copy reveal">
        <SectionLabel>FAMILY-OWNED • NORTHEAST GEORGIA &amp; WESTERN SOUTH CAROLINA</SectionLabel>
        <h1 id="home-title">Grounded in experience.<em>Built on dependable work.</em></h1>
        <p>
          Family-owned and serving the region since 1973, Davidson Well Drilling
          provides water well drilling, hydrofracturing and geothermal ground loop solutions.
        </p>
        <div className="hero-actions">
          <Button to="/services" variant="button-dark">Explore Our Services <ArrowIcon diagonal /></Button>
          <Button to="/contact" variant="button-outline">Contact Our Team</Button>
        </div>
        <div className="hero-proof"><span>EST.</span><strong>1973</strong><span>TURNERVILLE, GEORGIA</span></div>
      </div>
      <div className="hero-visual reveal">
        <figure className="photo-mount hero-photo" aria-label={heroSlides[activeSlide].alt}>
          <div className="photo-mount-inner hero-image-window">
            {heroSlides.map((slide, index) => (
              <div
                className={`hero-slide${index === activeSlide ? ' is-active' : ''}`}
                key={slide.src}
                aria-hidden="true"
              >
                <img
                  src={slide.src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  style={{ objectPosition: slide.position }}
                />
              </div>
            ))}
            <div className="hero-slide-controls" role="group" aria-label="Hero photographs">
              {!reducedMotion && (
                <button
                  type="button"
                  className="hero-autoplay-toggle"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={isPaused ? 'Resume automatic photographs' : 'Pause automatic photographs'}
                  aria-pressed={isPaused}
                >
                  {isPaused ? 'Play' : 'Pause'}
                </button>
              )}
              {heroSlides.map((slide, index) => (
                <button
                  type="button"
                  className={index === activeSlide ? 'is-active' : ''}
                  key={slide.src}
                  aria-label={`Show photograph ${index + 1}: ${slide.caption}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
          <figcaption>{heroSlides[activeSlide].caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
