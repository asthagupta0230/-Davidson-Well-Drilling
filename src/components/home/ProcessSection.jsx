import SectionLabel from '../common/SectionLabel.jsx'

const steps = [
  ['Understand the project', 'Talk through the water well or geothermal need.'],
  ['Review the requirements', 'Discuss site context, location and the work requested.'],
  ['Drilling and installation', 'Confirm scope for the well or down-hole loop work.'],
  ['Coordinate the team', 'For geothermal projects, work with the HVAC contractor.'],
]

export default function ProcessSection() {
  return (
    <section className="approach-section section-paper" aria-labelledby="approach-title">
      <div className="approach-intro reveal">
        <SectionLabel>OUR APPROACH</SectionLabel>
        <h2 id="approach-title">Good work begins with a clear conversation.</h2>
        <p>This overview is a general way to think about a project, not a fixed company procedure. Every site and scope is different.</p>
      </div>
      <ol className="approach-steps">
        {steps.map(([title, detail], index) => (
          <li className="approach-step reveal" key={title}>
            <span>0{index + 1}</span>
            <div><h3>{title}</h3><p>{detail}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}
