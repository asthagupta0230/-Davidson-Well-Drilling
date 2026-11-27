import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../common/SectionHeading.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

function WellDrillingBadge() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="size-36" aria-hidden="true">
      <circle cx="90" cy="90" r="82" stroke="#03AFF7" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="90" cy="90" r="70" stroke="#102A40" strokeWidth="1.5" />
      {/* Derrick Mast Illustration */}
      <path d="M62 128 L82 46 H98 L118 128" stroke="#102A40" strokeWidth="2.2" />
      <path d="M72 88 H108 M67 108 H113 M90 36 V142" stroke="#03AFF7" strokeWidth="2" />
      <path d="M84 134 L90 144 L96 134" stroke="#008FCB" strokeWidth="2.2" />
      <path d="M46 128 H134" stroke="#102A40" strokeWidth="2" />
    </svg>
  );
}

function HydrofracturingBadge() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="size-36" aria-hidden="true">
      <rect
        x="16"
        y="16"
        width="148"
        height="148"
        rx="74"
        stroke="#008FCB"
        strokeWidth="1.5"
      />
      <circle cx="90" cy="90" r="64" stroke="#03AFF7" strokeWidth="1.2" strokeDasharray="3 5" />
      {/* Subsurface Borehole & Fracture Pathways */}
      <path d="M90 36 V144" stroke="#102A40" strokeWidth="3" />
      <path d="M90 74 L54 62 M90 92 L48 96 M90 110 L58 122" stroke="#03AFF7" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M90 74 L126 62 M90 92 L132 96 M90 110 L122 122" stroke="#03AFF7" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="90" cy="92" r="7" fill="#03AFF7" />
    </svg>
  );
}

function GeothermalBadge() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="size-36" aria-hidden="true">
      <circle cx="90" cy="90" r="82" stroke="#102A40" strokeWidth="1.5" />
      <circle cx="90" cy="90" r="72" stroke="#03AFF7" strokeWidth="1.5" />
      {/* Closed-Loop U-Bend Geothermal Shaft */}
      <path d="M52 54 H128" stroke="#102A40" strokeWidth="2" />
      <path
        d="M80 54 V126 C80 134 100 134 100 126 V54"
        stroke="#03AFF7"
        strokeWidth="2.8"
      />
      <path d="M72 78 L80 86 L88 78" stroke="#008FCB" strokeWidth="2" />
      <path d="M92 96 L100 88 L108 96" stroke="#102A40" strokeWidth="2" />
    </svg>
  );
}

const badges = [
  {
    code: "SPEC // 01",
    title: "Water Well Drilling",
    subtitle: "FRESH WATER WELLS",
    description:
      "Engineered borehole drilling and casing installation built to access dependable groundwater reserves.",
    to: "/services#water-well-drilling",
    Graphic: WellDrillingBadge,
  },
  {
    code: "SPEC // 02",
    title: "Hydrofracturing",
    subtitle: "BEDROCK FLOW STIMULATION",
    description:
      "Downhole pressure stimulation designed to open natural rock fractures and enhance well recovery.",
    to: "/services#hydrofracturing",
    Graphic: HydrofracturingBadge,
  },
  {
    code: "SPEC // 03",
    title: "Geothermal Systems",
    subtitle: "VERTICAL GROUND LOOPS",
    description:
      "Vertical ground loop drilling and downhole installation for steady subsurface thermal exchange.",
    to: "/services#geothermal-ground-loop-system",
    Graphic: GeothermalBadge,
  },
];

export default function FeaturedHighlights() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".badge-plate", {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 75%",
        once: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="border-b border-[#102A40]/10 bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <SectionHeading
          align="center"
          eyebrow="TECHNICAL DISCIPLINES"
          title="Engineered for"
          highlight="Subsurface Performance."
          description="Core drilling and downhole specialties delivered across Northeast Georgia and Upstate South Carolina."
        />

        <div className="mt-16 grid grid-cols-1 divide-y divide-[#102A40]/12 border-y border-[#102A40]/12 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {badges.map(({ code, title, subtitle, description, to, Graphic }) => (
            <div
              key={code}
              className="badge-plate flex flex-col items-center px-6 py-12 text-center sm:px-10"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#008FCB] uppercase">
                {code}
              </span>

              <div className="my-7 transition-transform duration-500 hover:scale-105">
                <Graphic />
              </div>

              <span className="text-[10px] font-bold tracking-[0.16em] text-[#102A40]/55 uppercase">
                {subtitle}
              </span>
              <h3 className="mt-2 font-heading text-2xl font-extrabold text-[#102A40]">
                {title}
              </h3>
              <p className="mt-3 max-w-[300px] text-sm leading-[1.75] text-[#142B3D]/80">
                {description}
              </p>

              <Link
                to={to}
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.06em] text-[#008FCB] uppercase transition-colors hover:text-[#03AFF7]"
              >
                Technical Details <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
