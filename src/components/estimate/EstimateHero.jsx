import { useRef } from "react";
import {
  animatePageEntrance,
  useGsapContext,
} from "../../animations/pageAnimations.js";

export default function EstimateHero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ prefersReducedMotion, scope }) => {
    animatePageEntrance(scope, prefersReducedMotion);
  });

  return (
    <section
      ref={heroRef}
      className="bg-[#F2F8FC] pt-16 pb-16 sm:pt-20 sm:pb-20"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="page-hero-stagger inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase sm:text-[11px]">
              <span className="h-px w-6 bg-[#03AFF7]" />
              PROJECT INQUIRY · EST. 1973
            </div>
            <h1 className="page-hero-stagger mt-4 font-heading text-[clamp(38px,4.8vw,64px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#102A40]">
              Let&apos;s Get Your{" "}
              <span className="text-[#03AFF7]">Project Moving.</span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="page-hero-stagger text-[15px] leading-[1.8] text-[#142B3D]/80 sm:text-base">
              Tell us a little about your water well or geothermal project across
              Northeast Georgia or Upstate South Carolina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
