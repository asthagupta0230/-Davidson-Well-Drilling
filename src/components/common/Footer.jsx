import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Droplets, MapPin, Phone } from "lucide-react";
import {
  companyInfo,
  primaryNavLinks,
  serviceDropdownItems,
} from "../../data/navigation.js";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#102A40] text-white">
      {/* Subtle Underground Contour Lines */}
      <svg
        viewBox="0 0 1440 280"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[240px] w-full opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M-60 220 C 260 150, 520 270, 840 190 C 1120 120, 1290 230, 1500 175"
          stroke="#03AFF7"
          strokeWidth="1.5"
        />
        <path
          d="M-60 255 C 280 185, 540 295, 860 220 C 1140 150, 1300 255, 1500 205"
          stroke="#008FCB"
          strokeWidth="1.2"
        />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-6 pt-16 pb-12 sm:px-10 lg:px-12 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              aria-label="Davidson Well Drilling, Inc. home"
              className="inline-flex items-center gap-3 text-white"
            >
              <span className="grid size-10 place-items-center rounded-full border border-[#03AFF7]/60 bg-[#03AFF7]/10 text-[#03AFF7]">
                <Droplets size={21} strokeWidth={1.9} />
              </span>
              <span className="font-heading text-base font-extrabold tracking-[0.09em]">
                {companyInfo.shortName}
                <small className="mt-0.5 block font-sans text-[9px] font-semibold tracking-[0.23em] text-white/75">
                  WELL DRILLING, INC.
                </small>
              </span>
            </Link>

            <p className="mt-5 max-w-[340px] text-sm leading-[1.8] text-white/75">
              Established in 1973, Davidson Well Drilling, Inc. delivers fresh
              water well drilling, water pumps, pump service, hydrofracturing,
              and geothermal ground loop installation.
            </p>

            <div className="mt-6">
              <Link
                to="/request-estimate"
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#03AFF7] px-4 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-[#008FCB]"
              >
                Request an Estimate <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Column 2: Site Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {primaryNavLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-[#03AFF7]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/request-estimate"
                  className="transition-colors hover:text-[#03AFF7]"
                >
                  Request an Estimate
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {serviceDropdownItems.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={service.to}
                    className="transition-colors hover:text-[#03AFF7]"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Verified Contact & Service Area */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
              Contact &amp; Service Area
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-white/85">
              <li>
                <a
                  href={companyInfo.phoneHref}
                  className="inline-flex items-center gap-2.5 font-heading text-base font-extrabold text-white transition-colors hover:text-[#03AFF7]"
                >
                  <Phone size={16} className="text-[#03AFF7]" />
                  {companyInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/75">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#03AFF7]" />
                <span>
                  Northeast Georgia
                  <br />
                  Upstate South Carolina
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-7 text-xs text-white/65 sm:flex-row sm:items-center">
          <p>
            © {year} Davidson Well Drilling, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Established 1973 · NE Georgia &amp; Upstate SC</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:border-[#03AFF7] hover:text-[#03AFF7]"
            >
              Top <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
