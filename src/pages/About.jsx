import BlueprintHeroMedia from '../components/common/BlueprintHeroMedia.jsx'
import BlueprintLine from '../components/common/BlueprintLine.jsx'
import RevealBlock from '../components/common/RevealBlock.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'
import { photos } from '../assets/images/index.js'
import { company } from '../data/company.js'

export default function About() {
  const values = [
    ['01', 'Regional knowledge', `Serving ${company.serviceArea} from Turnerville, Georgia.`],
    ['02', 'Professional workmanship', 'The company describes its drilling technicians as experienced and highly trained.'],
    ['03', 'Established relationships', 'A family-owned business that attributes its reputation to word of mouth.'],
    ['04', 'Qualified and insured', 'The original website lists Georgia and South Carolina licensing and full insurance.'],
  ]

  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy reveal">
          <SectionLabel>THE DAVIDSON STORY</SectionLabel>
          <h1 id="about-title">Family-owned.<em>Serving our region since 1973.</em></h1>
          <p>Rooted in Turnerville, Georgia, Davidson Well Drilling has served Northeast Georgia and Western South Carolina for generations.</p>
        </div>
        <BlueprintHeroMedia
          src={photos.driller}
          alt="Representative driller working beside drilling machinery; not a Davidson project."
          caption="Representative drilling crew • not a Davidson project"
          variant="about-hero-photo reveal"
          loading="eager"
        />
        <div className="about-year-seal reveal"><span>ESTABLISHED</span><strong>1973</strong><span>FAMILY OPERATED</span></div>
      </section>

      <section className="story-section section-paper">
        <div className="story-kicker reveal"><SectionLabel>OUR STORY</SectionLabel><span>01 / 03</span></div>
        <RevealBlock className="story-copy" as="div">
          <h2>Built on neighbors, good work and word of mouth.</h2>
          <p>
            Davidson Well Drilling is a family-owned and operated business. The
            company says its reputation has been built through word of mouth from
            satisfied customers, with experienced drilling technicians serving
            the region since 1973.
          </p>
          <p>
            Customers are neighbors, friends and family. That local connection
            shapes the company’s stated commitment to doing its best to provide
            customers with the service they need.
          </p>
        </RevealBlock>
      </section>
      <BlueprintLine />

      <section className="values-section">
        <div className="values-heading reveal">
          <SectionLabel light>HOW WE SHOW UP</SectionLabel>
          <h2>Experience matters.<em>So does the way you work.</em></h2>
        </div>
        <div className="values-list">
          {values.map(([number, title, detail]) => (
            <div className="value-row reveal" key={title}>
              <span>{number}</span><h3>{title}</h3><p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-credentials section-paper">
        <div className="credential-title reveal">
          <SectionLabel>EXPERIENCE &amp; CREDENTIALS</SectionLabel>
          <h2>Grounded in practice.<br /><em>Connected to the trade.</em></h2>
        </div>
        <div className="credential-copy reveal">
          <p>The company’s original website notes membership in local Home Builders Associations and certification related to Franklin Electric submersible pumps.</p>
          <p>It also identifies Baroid Industrial Drilling Products training for geothermal ground loop applications. Contact Davidson to confirm current credentials and project fit.</p>
        </div>
      </section>
    </>
  )
}
