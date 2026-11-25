import { photos } from '../../assets/images/index.js'
import PhotoMount from '../common/PhotoMount.jsx'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'

export default function WorkPreview() {
  return (
    <section className="work-preview" aria-labelledby="work-preview-title">
      <div className="work-preview-heading reveal">
        <div>
          <SectionLabel>FIELD NOTES</SectionLabel>
          <h2 id="work-preview-title">A closer look at the work.</h2>
        </div>
        <TextLink to="/our-work">View Our Work</TextLink>
      </div>
      <div className="preview-gallery">
        <PhotoMount
          src={photos.driller}
          alt="Representative driller working beside drilling machinery; not a Davidson project."
          caption="Representative drilling equipment • not a Davidson project"
          variant="preview-photo preview-photo-tall reveal"
        />
        <PhotoMount
          src={photos.crew}
          alt="Representative drilling crew working around rig equipment; not a Davidson project."
          caption="Representative drilling crew • not a Davidson project"
          variant="preview-photo preview-photo-wide reveal"
        />
        <p className="image-note reveal">These supplied images are representative only; none are verified Davidson projects or show identified clients or locations.</p>
      </div>
    </section>
  )
}
