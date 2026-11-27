import { useRef } from "react";
import {
  Award,
  Briefcase,
  Droplets,
  Layers,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { whyDavidsonStandards } from "../../../data/services.js";
import SectionHeading from "../../common/SectionHeading.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

const iconComponents = {
  Award,
  Briefcase,
  Droplets,
  Layers,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Users,
};

export default function WhyDavidson() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".standard-cell", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
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
      className="relative overflow-hidden bg-[linear-gradient(135deg,#008FCB_0%,#03AFF7_48%,#0078AC_100%)] py-24 text-white sm:py-28 lg:py-32"
    >
      {/* Decorative Geological Contour Patterns */}
      <svg
        viewBox="0 0 1440 620"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 120 C 300 40, 620 220, 1020 110 C 1240 50, 1380 140, 1520 90"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <path
          d="M-80 340 C 320 260, 640 430, 1040 310 C 1260 245, 1390 350, 1520 300"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        <path
          d="M-80 540 C 340 460, 660 610, 1060 500 C 1260 445, 1390 540, 1520 490"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="max-w-[660px]">
          <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-white/90 uppercase sm:text-[11px]">
            <span className="h-px w-6 bg-white" />
            WHY DAVIDSON · OUR STANDARDS
          </div>
          <h2 className="mt-4 font-heading text-[clamp(34px,4vw,54px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
            Experience Built on Trust.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.8] text-white/90 sm:text-base">
            Professional service and dependable solutions, grounded in decades
            of experience.
          </p>
        </div>

        {/* Cohesive 2-Row x 4-Column Architectural Grid with Fine Separators */}
        <div className="mt-14 grid grid-cols-1 border-t border-l border-white/25 sm:grid-cols-2 lg:grid-cols-4">
          {whyDavidsonStandards.map((item) => {
            const Icon = iconComponents[item.icon] || ShieldCheck;
            return (
              <div
                key={item.title}
                className="standard-cell border-r border-b border-white/25 p-7 transition-colors duration-200 hover:bg-white/8 sm:p-8"
              >
                <Icon size={22} strokeWidth={1.8} className="text-white" />
                <h3 className="mt-5 font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
