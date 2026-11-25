import { faqGroups } from '../../data/faqs.js'
import SectionLabel from '../common/SectionLabel.jsx'
import TextLink from '../common/TextLink.jsx'

export default function FAQPreview() {
  return (
    <section className="faq-preview section-paper" aria-labelledby="faq-preview-title">
      <div className="faq-preview-intro reveal">
        <SectionLabel>GOOD TO KNOW</SectionLabel>
        <h2 id="faq-preview-title">Questions before you begin?</h2>
        <TextLink to="/faqs">Browse all FAQs</TextLink>
      </div>
      <div className="faq-preview-list">
        {faqGroups[1].items.map((item, index) => (
          <details className="faq-preview-item reveal" key={item.question}>
            <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true" /></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
