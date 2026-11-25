import { Link } from 'react-router-dom'
import { photos } from '../../assets/images/index.js'
import { capabilities } from '../../data/services.js'
import ArrowIcon from '../common/ArrowIcon.jsx'
import PhotoMount from '../common/PhotoMount.jsx'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'

export default function ServicesOverview() {
  return (
    <>
      <section className="capability-index" id="capabilities" aria-labelledby="capabilities-title">
        <div className="capability-heading reveal">
          <SectionLabel light>WHAT WE DO</SectionLabel>
          <h2 id="capabilities-title">Practical capability.<br /><em>Thoughtfully applied.</em></h2>
          <p>Explore the company’s core drilling and installation capabilities.</p>
        </div>
        <ol className="capability-list">
          {capabilities.map((item, index) => (
            <li className="capability-item reveal" key={item.id}>
              <span className="capability-number">0{index + 1}</span>
              <Link to={`/services#${item.id}`} className="capability-title">{item.title}</Link>
              <span className="capability-summary">{item.summary}</span>
              <Link to={`/services#${item.id}`} className="capability-arrow" aria-label={`Learn about ${item.title}`}>
                <ArrowIcon diagonal />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="well-feature section-paper" aria-labelledby="well-feature-title">
        <div className="feature-image-wrap reveal">
          <PhotoMount
            src={photos.borehole}
            alt="Representative borehole drilling operation with water discharge; not a Davidson project."
            caption="Representative borehole operation • not a Davidson project"
            variant="feature-photo"
          />
        </div>
        <div className="feature-copy reveal">
          <SectionLabel>WATER WELL DRILLING</SectionLabel>
          <h2 id="well-feature-title">A dependable water source starts with the right work.</h2>
          <p>
            Davidson drills water wells to reach underground water-bearing
            formations. Actual well depth and site conditions vary by location.
          </p>
          <TextLink to="/services#water-well-drilling">Explore water well services</TextLink>
        </div>
      </section>

      <section className="geothermal-feature" aria-labelledby="geothermal-feature-title">
        <div className="geo-feature-mark reveal" aria-hidden="true">
          <span>GROUND</span>
          <strong>↕</strong>
          <span>LOOP</span>
          <i />
        </div>
        <div className="geo-feature-copy reveal">
          <SectionLabel>GEOTHERMAL GROUND LOOPS</SectionLabel>
          <h2 id="geothermal-feature-title">Make the ground part of the solution.</h2>
          <p>
            Davidson drills and installs vertical ground loops and transfer medium,
            working alongside geothermal and heating-and-air contractors on the
            larger system.
          </p>
          <TextLink to="/services#geothermal-ground-loop-systems">Explore geothermal capabilities</TextLink>
        </div>
        <div className="geo-feature-note reveal">
          <span>PROJECT COORDINATION</span>
          <strong>Drilling &amp;<br />down-hole installation</strong>
          <p>Davidson’s published geothermal scope; HVAC system work is coordinated with your contractor.</p>
        </div>
      </section>
    </>
  )
}
