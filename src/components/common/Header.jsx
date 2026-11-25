import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company } from '../../data/company.js'
import { navigation } from '../../data/navigation.js'
import { capabilities } from '../../data/services.js'
import { prefersReducedMotion } from '../../motion/gsap.js'
import ArrowIcon from './ArrowIcon.jsx'
import Brand from './Brand.jsx'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuToggleRef = useRef(null)
  const mobileNavRef = useRef(null)
  const firstNavLinkRef = useRef(null)
  const desktopServicesRef = useRef(null)
  const desktopServicesToggleRef = useRef(null)
  const desktopServicesPinnedRef = useRef(false)
  const desktopServicesCloseTimerRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const location = useLocation()

  useEffect(() => {
    if (desktopServicesCloseTimerRef.current) {
      window.clearTimeout(desktopServicesCloseTimerRef.current)
      desktopServicesCloseTimerRef.current = null
    }
    setMobileOpen(false)
    setMobileServicesOpen(false)
    desktopServicesPinnedRef.current = false
    setDesktopServicesOpen(false)
  }, [location.pathname, location.search, location.hash])

  useEffect(() => () => {
    if (desktopServicesCloseTimerRef.current) {
      window.clearTimeout(desktopServicesCloseTimerRef.current)
    }
  }, [])

  useEffect(() => {
    function updateScrollState() {
      const y = window.scrollY
      const shouldShrink = y > 24
      setIsScrolled((current) => current === shouldShrink ? current : shouldShrink)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? Math.max(0, Math.min(1, y / maxScroll)) : 0
      setScrollProgress(ratio)

      if (prefersReducedMotion() || mobileOpen || desktopServicesOpen || y < 120) {
        setIsHidden(false)
      } else {
        const delta = y - lastScrollYRef.current
        if (delta > 8) setIsHidden(true)
        else if (delta < -6) setIsHidden(false)
      }
      lastScrollYRef.current = y

    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [location.pathname, mobileOpen, desktopServicesOpen])

  useEffect(() => {
    if (!mobileOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    const focusTimer = window.setTimeout(() => firstNavLinkRef.current?.focus(), 50)

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMobileServicesOpen(false)
        setMobileOpen(false)
        menuToggleRef.current?.focus()
        return
      }

      if (event.key === 'Tab') {
        const focusable = Array.from(
          mobileNavRef.current?.querySelectorAll('a[href], button:not([disabled])') || [],
        ).filter((element) => !element.closest('[hidden]'))
        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (event.shiftKey && (
          document.activeElement === firstElement
          || document.activeElement === menuToggleRef.current
        )) {
          event.preventDefault()
          lastElement?.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!desktopServicesOpen) return undefined

    function handlePointerDown(event) {
      if (!desktopServicesRef.current?.contains(event.target)) {
        if (desktopServicesCloseTimerRef.current) {
          window.clearTimeout(desktopServicesCloseTimerRef.current)
          desktopServicesCloseTimerRef.current = null
        }
        desktopServicesPinnedRef.current = false
        setDesktopServicesOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return
      if (desktopServicesCloseTimerRef.current) {
        window.clearTimeout(desktopServicesCloseTimerRef.current)
        desktopServicesCloseTimerRef.current = null
      }
      desktopServicesPinnedRef.current = false
      setDesktopServicesOpen(false)
      desktopServicesToggleRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [desktopServicesOpen])

  function openDesktopServices() {
    if (desktopServicesCloseTimerRef.current) {
      window.clearTimeout(desktopServicesCloseTimerRef.current)
      desktopServicesCloseTimerRef.current = null
    }
    setDesktopServicesOpen(true)
  }

  function scheduleDesktopServicesClose() {
    if (desktopServicesPinnedRef.current) return
    if (desktopServicesCloseTimerRef.current) {
      window.clearTimeout(desktopServicesCloseTimerRef.current)
    }
    desktopServicesCloseTimerRef.current = window.setTimeout(() => {
      desktopServicesCloseTimerRef.current = null
      setDesktopServicesOpen(false)
    }, 180)
  }

  function closeMobileNavigation() {
    setMobileServicesOpen(false)
    setMobileOpen(false)
    menuToggleRef.current?.focus()
  }


  return (
    <div className={`header-shell${isHidden ? ' is-hidden' : ''}`} id="top">
      <div className="utility-bar">
        <div className="utility-message">
          <span>Family-owned and serving our region since 1973</span>
          <span className="utility-area">{company.serviceArea}</span>
        </div>
        <div className="utility-contact">
          <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
          <span aria-hidden="true">/</span>
          <a href={`tel:${company.tollFreeLink}`}>{company.tollFree}</a>
        </div>
      </div>
      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, path]) => (
            label === 'Services' ? (
              <div
                className="desktop-nav-services"
                key={path}
                ref={desktopServicesRef}
                onMouseEnter={openDesktopServices}
                onMouseLeave={scheduleDesktopServicesClose}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    if (desktopServicesCloseTimerRef.current) {
                      window.clearTimeout(desktopServicesCloseTimerRef.current)
                      desktopServicesCloseTimerRef.current = null
                    }
                    desktopServicesPinnedRef.current = false
                    setDesktopServicesOpen(false)
                  }
                }}
              >
                <NavLink
                  to={path}
                  end
                  className={({ isActive }) =>
                    `desktop-services-link${isActive ? ' active' : ''}`
                  }
                >
                  {label}
                </NavLink>
                <button
                  ref={desktopServicesToggleRef}
                  className="desktop-services-toggle"
                  type="button"
                  aria-label={desktopServicesOpen ? 'Close Services menu' : 'Open Services menu'}
                  aria-expanded={desktopServicesOpen}
                  aria-controls="desktop-services-menu"
                  onClick={() => {
                    if (desktopServicesCloseTimerRef.current) {
                      window.clearTimeout(desktopServicesCloseTimerRef.current)
                      desktopServicesCloseTimerRef.current = null
                    }
                    const pinned = !desktopServicesPinnedRef.current
                    desktopServicesPinnedRef.current = pinned
                    setDesktopServicesOpen(pinned)
                  }}
                >
                  <span aria-hidden="true" />
                </button>
                <div
                  className={`services-dropdown${desktopServicesOpen ? ' is-open' : ''}`}
                  id="desktop-services-menu"
                  aria-label="Services"
                  aria-hidden={!desktopServicesOpen}
                  inert={!desktopServicesOpen}
                  onMouseEnter={openDesktopServices}
                  onMouseLeave={scheduleDesktopServicesClose}
                >
                  <ul>
                    {capabilities.map((service) => (
                      <li key={service.id}>
                        <Link
                          to={`/services#${service.id}`}
                          onClick={() => {
                            if (desktopServicesCloseTimerRef.current) {
                              window.clearTimeout(desktopServicesCloseTimerRef.current)
                              desktopServicesCloseTimerRef.current = null
                            }
                            desktopServicesPinnedRef.current = false
                            setDesktopServicesOpen(false)
                          }}
                        >
                          <span>{service.title}</span>
                          <small>{service.summary}</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {label}
              </NavLink>
            )
          ))}
        </nav>
        <Link className="estimate-button" to="/contact">Request an Estimate <ArrowIcon diagonal /></Link>
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            if (mobileOpen) setMobileServicesOpen(false)
            setMobileOpen(!mobileOpen)
          }}
        >
          <span />
          <span />
        </button>
        <nav
          ref={mobileNavRef}
          className={`mobile-nav${mobileOpen ? ' is-open' : ''}`}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen}
        >
          {navigation.map(([label, path], index) => (
            label === 'Services' ? (
              <div className="mobile-services-item" key={path} style={{ '--nav-index': index }}>
                <div className="mobile-services-heading">
                  <NavLink to={path} onClick={closeMobileNavigation}>{label}</NavLink>
                  <button
                    className="mobile-services-toggle"
                    type="button"
                    aria-label={mobileServicesOpen ? 'Collapse Services' : 'Expand Services'}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-links"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    <span aria-hidden="true" />
                  </button>
                </div>
                <ul
                  className="mobile-services-links"
                  id="mobile-services-links"
                  hidden={!mobileServicesOpen}
                >
                  {capabilities.map((service) => (
                    <li key={service.id}>
                      <Link to={`/services#${service.id}`} onClick={closeMobileNavigation}>
                        <span>{service.title}</span>
                        <small>{service.summary}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <NavLink
                key={path}
                ref={index === 0 ? firstNavLinkRef : undefined}
                to={path}
                end={path === '/'}
                onClick={closeMobileNavigation}
                style={{ '--nav-index': index }}
              >
                {label}
              </NavLink>
            )
          ))}
          <Link className="mobile-estimate" to="/contact" onClick={closeMobileNavigation}>
            Request an Estimate <ArrowIcon diagonal />
          </Link>
        </nav>
        <span
          className="header-scroll-progress"
          aria-hidden="true"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </header>
    </div>
  )
}
