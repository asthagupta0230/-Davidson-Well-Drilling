import { useLocation } from 'react-router-dom'
import { company } from '../../data/company.js'
import ArrowIcon from './ArrowIcon.jsx'
import Button from './Button.jsx'
import SectionLabel from './SectionLabel.jsx'

const pageCopy = {
  '/services': {
    label: 'DAVIDSON WELL DRILLING, INC.',
    title: 'Let’s discuss your next drilling project.',
    message: 'Family-owned and serving the region since 1973. Call Davidson Well Drilling to discuss a water well or geothermal drilling and installation project.',
  },
  '/our-work': {
    label: 'YOUR PROJECT',
    title: 'Have a drilling project to discuss?',
    message: 'Share your water well or geothermal ground loop requirements with the Davidson team.',
  },
  '/faqs': {
    label: 'MORE INFORMATION',
    title: 'Still have a question?',
    message: 'Contact Davidson directly about services, project fit, or the area served.',
  },
}

export default function ContactCTA() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  const copy = pageCopy[pathname] || {
    label: 'LET’S TALK THROUGH THE DETAILS',
    title: 'Planning a drilling project?',
    message: 'Connect with Davidson to discuss water well drilling or geothermal ground loop services.',
  }

  return (
    <section className="classy-footer-cta reveal-block" aria-label="Contact Davidson Well Drilling">
      <div className="classy-footer-cta-copy">
        <SectionLabel>{copy.label}</SectionLabel>
        <h2>{copy.title}</h2>
        <p>{copy.message}</p>
      </div>
      <div className="classy-footer-cta-actions">
        <Button to="/contact" variant="button-dark">{pathname === '/services' ? 'Contact Us' : 'Contact Davidson'} <ArrowIcon diagonal /></Button>
        <Button href={`tel:${company.phoneLink}`} variant="button-outline">Call {company.phone}</Button>
        {pathname === '/services' && (
          <Button href={`tel:${company.tollFreeLink}`} variant="button-outline">Toll-Free {company.tollFree}</Button>
        )}
      </div>
    </section>
  )
}
