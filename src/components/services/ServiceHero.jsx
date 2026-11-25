import { photos } from '../../assets/images/index.js'
import BlueprintHeroMedia from '../common/BlueprintHeroMedia.jsx'
import Button from '../common/Button.jsx'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'
import ArrowIcon from '../common/ArrowIcon.jsx'

export default function ServiceHero() {
  return (
    <section className="services-hero" aria-labelledby="services-page-title">
      <div className="services-hero-copy reveal">
        <SectionLabel>DRILLING &amp; INSTALLATION</SectionLabel>
        <h1 id="services-page-title">Grounded in experience.<em>Built on reliable work.</em></h1>
        <p>Davidson Well Drilling provides water well drilling and geothermal ground loop drilling and installation for properties across its region.</p>
        <div className="services-hero-actions">
          <Button to="/contact" variant="button-dark">Request an Estimate <ArrowIcon diagonal /></Button>
          <TextLink to="#service-list">Explore the services</TextLink>
        </div>
      </div>
      <BlueprintHeroMedia
        src={photos.servicesHero}
        alt="Historic truck-mounted drilling rig at a field site; not verified as Davidson equipment."
        caption="Historic drilling rig • not verified as Davidson equipment"
        variant="services-hero-photo reveal"
        loading="eager"
      />
    </section>
  )
}
