import BlueprintLine from '../components/common/BlueprintLine.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'
import ServiceHero from '../components/services/ServiceHero.jsx'
import ServiceSection from '../components/services/ServiceSection.jsx'
import { company } from '../data/company.js'
import { capabilities } from '../data/services.js'
import './Services.css'

export default function Services() {
  return (
    <div className="services-page">
      <ServiceHero />
      <section className="services-introduction" aria-labelledby="services-introduction-title">
        <div className="services-introduction-index" aria-hidden="true">
          <span>EST.</span>
          <strong>1973</strong>
        </div>
        <div className="services-introduction-copy">
          <SectionLabel>DAVIDSON WELL DRILLING, INC.</SectionLabel>
          <h2 id="services-introduction-title">Family-owned.<br /><em>Grounded in experience.</em></h2>
          <p>
            Family-owned and serving {company.serviceArea} since 1973, Davidson
            Well Drilling focuses on water well drilling and geothermal ground
            loop drilling and installation. The five capabilities below reflect
            the company’s published service scope.
          </p>
        </div>
        <div className="services-introduction-aside">
          <span>FIVE CORE SERVICES</span>
          <strong>Drilling<br />&amp; installation</strong>
          <small>From groundwater wells to geothermal borehole work.</small>
        </div>
      </section>
      <BlueprintLine />
      <section className="service-list" id="service-list" aria-label="Five drilling and geothermal services">
        {capabilities.map((service, index) => (
          <ServiceSection service={service} index={index} key={service.id} />
        ))}
      </section>
      <section className="service-area-section" aria-labelledby="service-area-title">
        <div>
          <SectionLabel light>SERVICE AREA</SectionLabel>
          <h2 id="service-area-title">Local roots.<br /><em>Regional service.</em></h2>
        </div>
        <div className="service-area-detail">
          <p>Based in Turnerville, Georgia, Davidson Well Drilling serves properties throughout</p>
          <strong>{company.serviceArea}.</strong>
          <a href="tel:+17067540633">Call (706) 754-6033</a>
        </div>
      </section>
    </div>
  )
}
