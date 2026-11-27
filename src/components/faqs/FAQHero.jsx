import { useRef } from "react";
import {
  animatePageEntrance,
  useGsapContext,
} from "../../animations/pageAnimations.js";

export default function FAQHero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ prefersReducedMotion, scope }) => {
    animatePageEntrance(scope, prefersReducedMotion);
  });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b border-[#102A40]/10 bg-white pt-16 pb-16 sm:pt-20 sm:pb-20"
    >
      <div className="pointer-events-none absolute -top-24 right-[-80px] size-[420px] rounded-full border border-[#03AFF7]/15" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="max-w-[740px]">
          <div className="page-hero-stagger inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase sm:text-[11px]">
            <span className="h-px w-6 bg-[#03AFF7]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h1 className="page-hero-stagger mt-4 font-heading text-[clamp(36px,4.5vw,60px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#102A40]">
            Questions About What&apos;s{" "}
            <span className="text-[#03AFF7]">Beneath the Surface?</span>
          </h1>
          <p className="page-hero-stagger mt-5 max-w-[560px] text-[15px] leading-[1.8] text-[#142B3D]/80 sm:text-base">
            Find helpful information about our drilling, pump service,
            hydrofracturing, and geothermal solutions across Northeast Georgia
            and Upstate South Carolina.
          </p>
        </div>
      </div>
    </section>
  );
}
