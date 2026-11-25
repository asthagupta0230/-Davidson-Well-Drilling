import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ArrowIcon from '../components/common/ArrowIcon.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'
import { workPhotos } from '../data/workPhotos.js'

function WorkGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [filter, setFilter] = useState('all')
  const closeButtonRef = useRef(null)
  const returnFocusRef = useRef(null)
  const visiblePhotos = filter === 'all' ? workPhotos : workPhotos.filter((photo) => photo.category === filter)

  function closeLightbox() {
    setSelectedPhoto(null)
    window.requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  useEffect(() => {
    if (!selectedPhoto) return undefined

    closeButtonRef.current?.focus()

    return undefined
  }, [selectedPhoto])

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filter work photographs">
        {[
          ['all', 'All representative images'],
          ['operations', 'Field operations'],
          ['equipment', 'Rigs & equipment'],
        ].map(([value, label]) => (
          <button
            type="button"
            className={filter === value ? 'is-selected' : ''}
            aria-pressed={filter === value}
            key={value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="work-gallery">
        {visiblePhotos.map((photo) => (
          <figure className={`work-gallery-item ${photo.className}`} key={photo.src}>
            <button
              type="button"
              className="gallery-open"
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget
                setSelectedPhoto(photo)
              }}
              aria-label={`Enlarge: ${photo.caption}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span className="gallery-zoom" aria-hidden="true"><ArrowIcon diagonal /></span>
            </button>
            <figcaption>
              <span>{photo.caption}</span>
              <small>Representative image • not verified as a Davidson project</small>
            </figcaption>
          </figure>
        ))}
      </div>
      {selectedPhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.caption}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeLightbox()
            if (event.key === 'Tab') {
              event.preventDefault()
              closeButtonRef.current?.focus()
            }
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox()
          }}
        >
          <button ref={closeButtonRef} className="lightbox-close" type="button" aria-label="Close photograph" onClick={closeLightbox}>×</button>
          <figure>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption>{selectedPhoto.caption}<span>• Representative image; not verified as a Davidson project</span></figcaption>
          </figure>
        </div>
      )}
    </>
  )
}

export default function OurWork() {
  return (
    <>
      <section className="work-hero" aria-labelledby="work-title">
        <div className="work-hero-index reveal"><span>FIELD NOTES</span><span>DAVIDSON WELL DRILLING</span></div>
        <div className="work-hero-copy reveal">
          <SectionLabel>OUR WORK</SectionLabel>
          <h1 id="work-title">Work in the field.</h1>
          <p>A closer look at drilling equipment and field operations through representative images.</p>
          <span className="work-gallery-count">{workPhotos.length.toString().padStart(2, '0')} PHOTOGRAPHS IN THE COLLECTION</span>
        </div>
        <p className="work-source-note reveal">Images are representative references from the supplied collection. Davidson project attribution, locations and dates are not verified.</p>
      </section>
      <section className="work-gallery-section section-paper" aria-label="Representative drilling photographs">
        <WorkGallery />
      </section>
      <section className="work-contact-strip"><div><SectionLabel light>HAVE A PROJECT IN MIND?</SectionLabel><h2>Let’s talk about the work ahead.</h2></div><Link className="button button-light-outline" to="/contact">Contact Davidson <ArrowIcon diagonal /></Link></section>
    </>
  )
}
