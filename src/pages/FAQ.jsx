import BlueprintLine from '../components/common/BlueprintLine.jsx'
import RevealBlock from '../components/common/RevealBlock.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'
import { faqGroups } from '../data/faqs.js'

export default function FAQ() {
  return (
    <>
      <section className="faq-hero" aria-labelledby="faq-title">
        <div className="faq-hero-copy reveal">
          <SectionLabel>FREQUENTLY ASKED QUESTIONS</SectionLabel>
          <h1 id="faq-title">Questions before you begin?</h1>
          <p>Clear answers about Davidson’s services, service area and how to get in touch.</p>
        </div>
      </section>
      <BlueprintLine />
      <section className="faq-page section-paper">
        {faqGroups.map((group, groupIndex) => (
          <RevealBlock as="div" className="faq-group" delay={groupIndex * 60} key={group.title}>
            <div className="faq-group-heading"><span>0{groupIndex + 1}</span><h2>{group.title}</h2></div>
            <div className="faq-group-items">
              {group.items.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}<i aria-hidden="true" /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </RevealBlock>
        ))}
      </section>
    </>
  )
}
