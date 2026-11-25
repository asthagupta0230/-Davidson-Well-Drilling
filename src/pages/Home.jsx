import { useRef } from 'react'
import BlueprintLine from '../components/common/BlueprintLine.jsx'
import FAQPreview from '../components/home/FAQPreview.jsx'
import Hero from '../components/home/Hero.jsx'
import Introduction from '../components/home/Introduction.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import ServicesOverview from '../components/home/ServicesOverview.jsx'
import WhyDavidson from '../components/home/WhyDavidson.jsx'
import WorkPreview from '../components/home/WorkPreview.jsx'
import useHomeAnimations from '../hooks/useHomeAnimations.js'

export default function Home({ ready = true }) {
  const homeRef = useRef(null)
  useHomeAnimations(homeRef, ready)

  return (
    <div className="home-page" ref={homeRef}>
      <Hero />
      <Introduction />
      <BlueprintLine />
      <ServicesOverview />
      <WhyDavidson />
      <ProcessSection />
      <WorkPreview />
      <FAQPreview />
    </div>
  )
}
