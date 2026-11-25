import { Link } from 'react-router-dom'
import ArrowIcon from '../components/common/ArrowIcon.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'

export default function NotFound() {
  return (
    <section className="not-found">
      <SectionLabel>PAGE NOT FOUND</SectionLabel>
      <h1>Let’s get back on the right road.</h1>
      <Link className="button button-dark" to="/">Return to Home <ArrowIcon diagonal /></Link>
    </section>
  )
}
