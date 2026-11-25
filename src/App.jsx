import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import CustomCursor from './components/common/CustomCursor.jsx'
import Footer from './components/common/Footer.jsx'
import Header from './components/common/Header.jsx'
import PageTransition from './components/common/PageTransition.jsx'
import Preloader from './components/common/Preloader.jsx'
import usePageMeta from './hooks/usePageMeta.js'
import useScrollReveals from './hooks/useScrollReveals.js'
import { MOTION_QUERY } from './motion/gsap.js'
import { initLenis } from './motion/lenis.js'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import FAQ from './pages/FAQ.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import OurWork from './pages/OurWork.jsx'
import Services from './pages/Services.jsx'

export default function App() {
  const siteRef = useRef(null)
  const { pathname, hash } = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const cleanupLenis = initLenis()
    const motionMedia = window.matchMedia(MOTION_QUERY)
    const syncMotionClass = () => {
      document.documentElement.classList.toggle('has-gsap-motion', motionMedia.matches)
    }

    syncMotionClass()
    motionMedia.addEventListener('change', syncMotionClass)
    return () => {
      motionMedia.removeEventListener('change', syncMotionClass)
      document.documentElement.classList.remove('has-gsap-motion')
      cleanupLenis()
    }
  }, [])

  usePageMeta(pathname, hash)
  useScrollReveals(siteRef, pathname, ready)

  return (
    <div className="site-shell" ref={siteRef}>
      <Preloader onReady={() => setReady(true)} />
      <PageTransition pathname={pathname} enabled={ready} />
      <CustomCursor />
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/hydro-fracturing" element={<Navigate to="/services#hydrofracturing" replace />} />
          <Route path="/services/geothermal-vertical-loop-systems" element={<Navigate to="/services#geothermal-ground-loop-systems" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
