import { Link, useLocation } from 'react-router-dom'
import { company } from '../../data/company.js'
import { navigation } from '../../data/navigation.js'
import { scrollToTarget } from '../../motion/lenis.js'
import ArrowIcon from './ArrowIcon.jsx'
import Brand from './Brand.jsx'
import ContactCTA from './ContactCTA.jsx'
import ReturnToSurface from './ReturnToSurface.jsx'

export default function ClassyFooterSystem() {
  const { pathname } = useLocation()
  const hasCta = pathname !== '/contact'

  return (
    <div className={`classy-footer-system${hasCta ? ' has-cta' : ''}`}>
      {hasCta && <ContactCTA />}
      <footer className="site-footer footer-curtain">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Family-owned water well drilling and geothermal ground loop services for our region since 1973.</p>
            <span>{company.serviceArea}</span>
          </div>
          <nav className="footer-nav" aria-label="Company links">
            <strong>EXPLORE</strong>
            {navigation.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
          </nav>
          <div className="footer-contact">
            <strong>CONTACT</strong>
            <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
            <a href={`tel:${company.tollFreeLink}`}>{company.tollFree} toll-free</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <span>{company.street}<br />{company.city}</span>
            <span>Mail: {company.mailing}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Davidson Well Drilling, Inc.</span>
          <span>Turnerville, Georgia · Family-owned since 1973</span>
          <a href="#top" onClick={(event) => {
            event.preventDefault()
            scrollToTarget(0)
          }}>
            Back to top <ArrowIcon diagonal />
          </a>
        </div>
      </footer>
      <ReturnToSurface />
    </div>
  )
}
