import { useState } from 'react'
import ArrowIcon from '../components/common/ArrowIcon.jsx'
import SectionLabel from '../components/common/SectionLabel.jsx'
import { capabilities } from '../data/services.js'
import { company } from '../data/company.js'

function ContactForm() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setStatus('Your browser validated the form, but no message was sent. Please call or email Davidson directly.')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <p className="form-notice" id="form-notice">
        This form is a front-end preview. No submission service is configured, so your information will not be transmitted.
      </p>
      <div className="form-row">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Service interested in
          <select name="service" defaultValue="">
            <option value="">Select a service</option>
            {capabilities.map((service) => <option key={service.id} value={service.id}>{service.title}</option>)}
          </select>
        </label>
      </div>
      <label>
        Project location
        <input name="location" autoComplete="address-level2" />
      </label>
      <label>
        Message <span aria-hidden="true">*</span>
        <textarea name="message" rows="5" required />
      </label>
      <button className="button button-dark form-submit" type="submit">Check inquiry details <ArrowIcon diagonal /></button>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      <section className="contact-hero" aria-labelledby="contact-title">
        <SectionLabel light>CONTACT DAVIDSON</SectionLabel>
        <h1 id="contact-title">Let’s discuss your project.</h1>
        <p>Have questions about water well drilling or geothermal ground loops? Call, email or use the inquiry form below.</p>
        <div className="contact-hero-actions"><a href={`tel:${company.phoneLink}`}>Call {company.phone}</a><a href={`mailto:${company.email}`}>Email Davidson</a></div>
      </section>
      <section className="contact-layout section-paper">
        <div className="contact-details reveal">
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <h2>Talk with our team.</h2>
          <div className="contact-detail-group">
            <span>PHONE</span>
            <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
            <a href={`tel:${company.tollFreeLink}`}>{company.tollFree} <small>Toll-free</small></a>
          </div>
          <div className="contact-detail-group">
            <span>EMAIL</span>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="contact-detail-group">
            <span>PHYSICAL ADDRESS</span>
            <p>{company.street}<br />{company.city}</p>
          </div>
          <div className="contact-detail-group">
            <span>MAILING ADDRESS</span>
            <p>{company.mailing}</p>
          </div>
          <div className="contact-detail-group">
            <span>SERVICE AREA</span>
            <p>{company.serviceArea}</p>
          </div>
        </div>
        <div className="contact-form-panel reveal">
          <SectionLabel>PROJECT INQUIRY</SectionLabel>
          <h2>Tell us what you’re planning.</h2>
          <ContactForm />
        </div>
      </section>
      <section className="location-band">
        <div className="location-copy reveal">
          <SectionLabel light>TURNERVILLE, GEORGIA</SectionLabel>
          <h2>Serving our neighbors across the region.</h2>
          <p>{company.serviceArea}</p>
        </div>
        <a
          className="location-map reveal"
          href="https://maps.google.com/?q=3454+Old+Historic+441+Turnerville+GA+30580"
          target="_blank"
          rel="noreferrer"
        >
          <span className="map-coordinate">TURNERVILLE • GEORGIA</span>
          <strong>{company.street}<br />{company.city}</strong>
          <span className="map-link">Open map <ArrowIcon diagonal /></span>
        </a>
      </section>
    </>
  )
}
