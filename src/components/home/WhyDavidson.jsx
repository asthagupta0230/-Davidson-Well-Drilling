import { company } from '../../data/company.js'
import SectionLabel from '../common/SectionLabel.jsx'

const reasons = [
  ['01', 'Family-owned since 1973', 'A family-operated business serving the region for decades.'],
  ['02', 'Rooted in the region', `Based in Turnerville and serving ${company.serviceArea}.`],
  ['03', 'Focused drilling capabilities', 'Water wells, hydrofracturing and geothermal ground loop drilling and installation.'],
]

export default function WhyDavidson() {
  return (
    <section className="values-section" aria-labelledby="why-davidson-title">
      <div className="values-heading reveal">
        <SectionLabel light>WHY DAVIDSON</SectionLabel>
        <h2 id="why-davidson-title">Local roots.<em>Practical drilling experience.</em></h2>
      </div>
      <div className="values-list">
        {reasons.map(([number, title, detail]) => (
          <div className="value-row reveal" key={number}>
            <span>{number}</span><h3>{title}</h3><p>{detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
