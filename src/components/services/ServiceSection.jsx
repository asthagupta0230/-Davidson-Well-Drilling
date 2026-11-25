import { servicePhotos } from '../../assets/images/index.js'
import PhotoMount from '../common/PhotoMount.jsx'
import RevealBlock from '../common/RevealBlock.jsx'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'

export default function ServiceSection({ service, index }) {
  const photo = servicePhotos[service.id]

  return (
    <RevealBlock
      as="article"
      className={`service-editorial-row service-editorial-layout-${index + 1}${photo ? ' has-photo' : ' has-scope-note'}`}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      delay={Math.min(index * 45, 180)}
    >
      <div className="service-editorial-media" data-service-number={`0${index + 1}`}>
        {photo ? (
          <PhotoMount
            src={photo.src}
            alt={photo.alt}
            caption={photo.caption}
            objectPosition={photo.objectPosition}
            variant="service-photo"
          />
        ) : (
          <aside className="service-scope-note" aria-label={service.highlightLabel}>
            <SectionLabel>{service.highlightLabel}</SectionLabel>
            <strong>{service.highlight}</strong>
            <p>{service.highlightDetail}</p>
          </aside>
        )}
      </div>
      <div className="service-editorial-copy">
        <div className="service-editorial-kicker">
          <span className="service-editorial-number">0{index + 1}</span>
          <SectionLabel>{service.category}</SectionLabel>
        </div>
        <h2 id={`${service.id}-title`}>{service.title}</h2>
        <p className="service-introduction">{service.introduction}</p>
        <div className="service-explanation-grid">
          <div>
            <h3>HOW IT WORKS</h3>
            <p>{service.howItWorks}</p>
          </div>
          <div>
            <h3>WHERE IT MAY BE USEFUL</h3>
            <p>{service.whereUseful}</p>
          </div>
        </div>
        <TextLink to="/contact">Discuss this service</TextLink>
      </div>
    </RevealBlock>
  )
}
