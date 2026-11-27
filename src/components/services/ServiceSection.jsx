import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "../common/Button.jsx";
import { useGsapContext } from "../../animations/pageAnimations.js";

function GeothermalCrossSectionDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[14px] bg-[#102A40] p-7 text-white sm:p-9">
      <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-[#8CE0FF] uppercase">
        <span>SUBSURFACE THERMAL EXCHANGE</span>
        <span>CLOSED-LOOP DIAGRAM</span>
      </div>

      <svg
        viewBox="0 0 520 340"
        fill="none"
        className="mt-5 w-full"
        aria-label="Geothermal vertical ground loop subsurface cross section"
      >
        {/* Surface Line */}
        <line x1="20" y1="68" x2="500" y2="68" stroke="#FFFFFF" strokeWidth="2" />
        <text x="24" y="56" fill="#8CE0FF" fontSize="11" fontWeight="700">
          SURFACE GRADE
        </text>

        {/* Subsurface Geological Strata */}
        <path
          d="M20 135 Q 180 120, 320 140 T 500 132"
          stroke="#03AFF7"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M20 215 Q 200 230, 340 205 T 500 220"
          stroke="#03AFF7"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Manifold Header */}
        <rect x="85" y="42" width="350" height="16" rx="4" fill="#008FCB" />

        {/* Three Vertical U-Bend Ground Loops */}
        {[150, 260, 370].map((cx) => (
          <g key={cx}>
            <rect
              x={cx - 16}
              y="68"
              width="32"
              height="245"
              rx="14"
              fill="#03AFF7"
              fillOpacity="0.12"
              stroke="#03AFF7"
              strokeOpacity="0.4"
            />
            <path
              d={`M ${cx - 7} 58 V 296 C ${cx - 7} 304, ${cx + 7} 304, ${cx + 7} 296 V 58`}
              stroke="#03AFF7"
              strokeWidth="2.8"
            />
          </g>
        ))}

        <text x="24" y="328" fill="#FFFFFF" fillOpacity="0.7" fontSize="10" fontWeight="600">
          VERTICAL BOREHOLES · DOWNHOLE LOOP INSTALLATION &amp; GROUTING
        </text>
      </svg>
    </div>
  );
}

export default function ServiceSection({ service }) {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".srv-animate", {
      opacity: 0,
      y: 26,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 78%",
        once: true,
      },
    });
  });

  // Layout 01: Depth-Split Composition
  if (service.layoutType === "depth-split") {
    return (
      <section
        id={service.id}
        ref={sectionRef}
        className="scroll-mt-24 border-b border-[#102A40]/10 bg-white py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="srv-animate relative lg:col-span-7">
              <div className="overflow-hidden rounded-[14px] bg-[#F2F8FC]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#03AFF7]/40 pt-3 text-[11px] font-bold tracking-[0.14em] text-[#008FCB] uppercase">
                <span>SUBSURFACE BOREHOLE &amp; CASING</span>
                <span>SERVICE {service.number}</span>
              </div>
            </div>

            <div className="srv-animate lg:col-span-5">
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
                {service.eyebrow}
              </span>
              <h2 className="mt-3 font-heading text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
                {service.title}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#008FCB]">
                {service.subtitle}
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-[#142B3D]/80">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-[#102A40]/10 pt-5">
                {service.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#102A40]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#03AFF7]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/request-estimate">Request an Estimate</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 02: Overlapping Editorial Composition (Hydrofracturing)
  if (service.layoutType === "overlap-editorial") {
    return (
      <section
        id={service.id}
        ref={sectionRef}
        className="scroll-mt-24 bg-[#F2F8FC] py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="srv-animate order-2 lg:order-1 lg:col-span-5">
              <span className="font-heading text-6xl font-extrabold text-[#03AFF7]/25">
                {service.number}
              </span>
              <h2 className="mt-2 font-heading text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
                {service.title}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#008FCB]">
                {service.subtitle}
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-[#142B3D]/80">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3">
                {service.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#102A40]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#03AFF7]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/request-estimate">Discuss Hydrofracturing</Button>
              </div>
            </div>

            <div className="srv-animate relative order-1 lg:order-2 lg:col-span-7">
              <div className="overflow-hidden rounded-[14px] lg:ml-10">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover object-left"
                />
              </div>
              <div className="mt-4 rounded-[10px] bg-[#008FCB] p-6 text-white sm:max-w-[340px] lg:-mt-16 lg:relative lg:z-10">
                <span className="text-[10px] font-bold tracking-[0.16em] text-white/80 uppercase">
                  BEDROCK FRACTURE FLOW
                </span>
                <p className="mt-2 text-xs leading-relaxed text-white/95">
                  Controlled downhole water pressure expands natural rock
                  fissures to improve well water inflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 03: Geological Cross-Section Composition (Geothermal Ground Loop System)
  if (service.layoutType === "cross-section") {
    return (
      <section
        id={service.id}
        ref={sectionRef}
        className="scroll-mt-24 border-b border-[#102A40]/10 bg-white py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="srv-animate lg:col-span-6">
              <GeothermalCrossSectionDiagram />
            </div>

            <div className="srv-animate lg:col-span-6">
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
                {service.eyebrow}
              </span>
              <h2 className="mt-3 font-heading text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
                {service.title}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#008FCB]">
                {service.subtitle}
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-[#142B3D]/80">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-[#102A40]/10 pt-5">
                {service.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#102A40]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#03AFF7]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/request-estimate">Plan a Geothermal Loop</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 04: Elongated Vertical Borehole Composition (Vertical Ground Loop Drilling)
  if (service.layoutType === "vertical-shaft") {
    return (
      <section
        id={service.id}
        ref={sectionRef}
        className="scroll-mt-24 bg-[#F2F8FC] py-24"
      >
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="srv-animate lg:col-span-6">
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
                {service.eyebrow}
              </span>
              <h2 className="mt-3 font-heading text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.1] text-[#102A40]">
                {service.title}
              </h2>
              <p className="mt-2 text-sm font-bold text-[#03AFF7]">
                {service.subtitle}
              </p>
              <p className="mt-5 text-[15px] leading-[1.8] text-[#142B3D]/80">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3">
                {service.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-medium text-[#102A40]"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#03AFF7]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/request-estimate">Request Vertical Drilling Quote</Button>
              </div>
            </div>

            <div className="srv-animate flex items-stretch gap-5 lg:col-span-6">
              {/* Vertical Depth Scale Graphic */}
              <div className="hidden w-14 shrink-0 flex-col items-center justify-between border-r border-[#03AFF7]/40 py-4 text-[10px] font-extrabold tracking-[0.14em] text-[#008FCB] sm:flex">
                <span>00M</span>
                <span className="h-24 w-px bg-[#03AFF7]" />
                <span>DEPTH</span>
                <span className="h-24 w-px bg-[#03AFF7]" />
                <span>LOOP</span>
              </div>

              <div className="w-full overflow-hidden rounded-[14px] bg-[#102A40]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  className="aspect-[4/5] max-h-[520px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Layout 05: Full-Width Deep Navy Technical Band (Downhole Installation & Pump Service)
  return (
    <section
      id={service.id}
      ref={sectionRef}
      className="scroll-mt-24 bg-[#102A40] py-24 text-white"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="srv-animate lg:col-span-6">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase">
              {service.eyebrow}
            </span>
            <h2 className="mt-3 font-heading text-[clamp(30px,3.4vw,46px)] font-extrabold leading-[1.1] text-white">
              {service.title}
            </h2>
            <p className="mt-2 text-sm font-bold text-[#8CE0FF]">
              {service.subtitle}
            </p>
            <p className="mt-5 text-[15px] leading-[1.8] text-white/85">
              {service.description}
            </p>
            <ul className="mt-6 space-y-3 border-t border-white/15 pt-5">
              {service.capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm font-medium text-white/95"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#03AFF7]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button to="/request-estimate">Schedule Pump or Downhole Service</Button>
            </div>
          </div>

          <div className="srv-animate lg:col-span-6">
            <div className="overflow-hidden rounded-[14px] border border-white/15">
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                className="aspect-[16/11] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
