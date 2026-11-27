import { useRef } from "react";
import {
  animatePageEntrance,
  useGsapContext,
} from "../../animations/pageAnimations.js";

export default function WorkHero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ prefersReducedMotion, scope }) => {
    animatePageEntrance(scope, prefersReducedMotion);
  });

  return (
    <section
      ref={heroRef}
      className="bg-[#102A40] pt-16 pb-20 text-white sm:pt-20 sm:pb-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="page-hero-stagger inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-[#03AFF7] uppercase sm:text-[11px]">
              <span className="h-px w-6 bg-[#03AFF7]" />
              OUR WORK · FIELD CAPABILITIES
            </div>
            <h1 className="page-hero-stagger mt-4 font-heading text-[clamp(38px,4.8vw,66px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-white">
              Built Below the Surface.{" "}
              <span className="text-[#03AFF7]">Proven in the Field.</span>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="page-hero-stagger text-[15px] leading-[1.8] text-white/80 sm:text-base">
              Explore the work and expertise behind Davidson Well Drilling across
              Northeast Georgia and Upstate South Carolina.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
