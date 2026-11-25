import { photos } from '../../assets/images/index.js'
import { company } from '../../data/company.js'
import BlueprintHeroMedia from '../common/BlueprintHeroMedia.jsx'
import RevealBlock from '../common/RevealBlock.jsx'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'

export default function Introduction() {
  return (
    <section className="company-intro section-paper" aria-labelledby="intro-title">
      <div className="intro-index reveal">
        <span>01</span>
        <span>THE COMPANY</span>
      </div>
      <RevealBlock className="intro-copy">
        <SectionLabel>EXPERIENCE THAT RUNS DEEP</SectionLabel>
        <h2 id="intro-title">A family business, grounded in its community.</h2>
        <p>
          Davidson Well Drilling is family-owned and operated, serving {company.serviceArea}
          {' '}since 1973. The company’s work has grown through local relationships and word of mouth.
        </p>
        <TextLink to="/about-us">Get to know Davidson</TextLink>
      </RevealBlock>
      <BlueprintHeroMedia
        src={photos.field}
        alt="Representative truck-mounted drilling rig at a field site; not a Davidson project."
        caption="Representative drilling equipment • not a Davidson project"
        variant="intro-photo"
      />
    </section>
  )
}
