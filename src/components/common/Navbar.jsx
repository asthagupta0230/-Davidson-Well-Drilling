import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Droplets, Menu, Phone, X } from "lucide-react";
import {
  companyInfo,
  primaryNavLinks,
  serviceDropdownItems,
} from "../../data/navigation.js";

export default function Navbar({ variant = "solid" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const isHeroOverlay = variant === "hero";

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <header
      className={
        isHeroOverlay
          ? "absolute inset-x-0 top-0 z-50"
          : "sticky top-0 z-50 border-b border-[#102A40]/10 bg-white/95 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:h-[92px] lg:px-[5%]">
        {/* Left Brand Mark */}
        <Link
          to="/"
          aria-label="Davidson Well Drilling, Inc. home"
          className={`flex items-center gap-2.5 ${
            isHeroOverlay ? "text-white" : "text-[#102A40]"
          }`}
        >
          <span
            className={`grid size-[38px] place-items-center rounded-full border ${
              isHeroOverlay
                ? "border-white/65 text-white"
                : "border-[#03AFF7]/50 bg-[#F2F8FC] text-[#008FCB]"
            }`}
          >
            <Droplets size={21} strokeWidth={1.8} />
          </span>
          <span className="font-heading text-[14px] font-extrabold tracking-[.09em]">
            {companyInfo.shortName}
            <small
              className={`mt-[3px] block font-sans text-[8px] font-semibold tracking-[.23em] ${
                isHeroOverlay ? "opacity-85" : "text-[#008FCB]"
              }`}
            >
              {companyInfo.subtitle}
            </small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className={
            isHeroOverlay
              ? "hidden items-center gap-1 rounded-full border border-white/25 bg-[#008FCB]/20 p-1 backdrop-blur-md lg:flex"
              : "hidden items-center gap-1 rounded-full border border-[#102A40]/10 bg-[#F2F8FC] p-1 lg:flex"
          }
        >
          {primaryNavLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center">
                  <Link
                    to={link.to}
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 text-[11px] font-semibold transition-colors duration-200 ${
                      isHeroOverlay
                        ? isServicesActive
                          ? "bg-white text-[#008FCB]"
                          : "text-white/95 hover:bg-white hover:text-[#008FCB]"
                        : isServicesActive
                          ? "bg-[#03AFF7] text-white"
                          : "text-[#102A40]/85 hover:bg-white hover:text-[#008FCB]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                </div>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2.5">
                    <div className="w-[290px] rounded-xl border border-[#102A40]/10 bg-white p-2 text-[#102A40] shadow-[0_22px_50px_rgba(16,42,64,0.16)]">
                      <div className="flex items-center justify-between px-3 py-1.5">
                        <span className="text-[9px] font-bold tracking-[0.16em] text-[#008FCB] uppercase">
                          Core Capabilities
                        </span>
                        <Link
                          to="/services"
                          className="text-[10px] font-bold text-[#102A40]/60 hover:text-[#03AFF7]"
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {serviceDropdownItems.map((item) => (
                          <Link
                            key={item.slug}
                            to={item.to}
                            onClick={() => setServicesOpen(false)}
                            className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold text-[#102A40] transition-colors hover:bg-[#F2F8FC] hover:text-[#008FCB]"
                          >
                            <span>{item.label}</span>
                            <span className="text-[10px] font-extrabold text-[#03AFF7]">
                              {item.number}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2.5 text-[11px] font-semibold transition-colors duration-200 ${
                    isHeroOverlay
                      ? isActive
                        ? "bg-white text-[#008FCB]"
                        : "text-white/95 hover:bg-white hover:text-[#008FCB]"
                      : isActive
                        ? "bg-[#03AFF7] text-white"
                        : "text-[#102A40]/85 hover:bg-white hover:text-[#008FCB]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Prominent Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isHeroOverlay && (
            <a
              href={companyInfo.phoneHref}
              className="hidden items-center gap-1.5 text-xs font-bold text-[#102A40] transition-colors hover:text-[#008FCB] xl:inline-flex"
            >
              <Phone size={14} className="text-[#03AFF7]" />
              {companyInfo.phoneDisplay}
            </a>
          )}
          <Link
            to="/request-estimate"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-[11px] font-extrabold transition duration-300 hover:-translate-y-0.5 ${
              isHeroOverlay
                ? "bg-white text-[#008FCB] hover:shadow-xl hover:shadow-slate-950/20"
                : "bg-[#03AFF7] text-white hover:bg-[#008FCB] hover:shadow-[0_12px_28px_rgba(3,175,247,0.3)]"
            }`}
          >
            Request an Estimate <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`grid size-11 place-items-center rounded-full border transition lg:hidden ${
            isHeroOverlay
              ? "border-white/50 text-white hover:bg-white/15"
              : "border-[#102A40]/15 bg-[#F2F8FC] text-[#102A40] hover:border-[#03AFF7]"
          }`}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="mx-4 mb-4 rounded-2xl border border-[#102A40]/15 bg-[#102A40] p-4 text-white shadow-2xl lg:hidden"
        >
          <div className="space-y-1">
            {primaryNavLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <div className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-white/10">
                    <Link
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle service submenu"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="grid size-7 place-items-center rounded-lg bg-white/10 text-white"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <div className="mt-1 mb-2 space-y-1 rounded-xl bg-white/5 p-2">
                      {serviceDropdownItems.map((item) => (
                        <Link
                          key={item.slug}
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-white/90 hover:bg-white/10"
                        >
                          <span>{item.label}</span>
                          <span className="text-[10px] font-bold text-[#03AFF7]">
                            {item.number}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#03AFF7] text-white"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          <div className="mt-4 space-y-2 border-t border-white/15 pt-4">
            <Link
              to="/request-estimate"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#03AFF7] px-4 py-3 text-sm font-extrabold text-white"
            >
              Request an Estimate <ArrowUpRight size={16} />
            </Link>
            <a
              href={companyInfo.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white/90"
            >
              <Phone size={14} className="text-[#03AFF7]" />
              {companyInfo.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
