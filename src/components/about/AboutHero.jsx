import { useRef } from "react";
import {
  animatePageEntrance,
  useGsapContext,
} from "../../animations/pageAnimations.js";

export default function AboutHero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ prefersReducedMotion, scope }) => {
    animatePageEntrance(scope, prefersReducedMotion);
  });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="page-hero-stagger inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase sm:text-[11px]">
              <span className="h-px w-6 bg-[#03AFF7]" />
              ESTABLISHED 1973 · ABOUT US
            </div>

            <h1 className="page-hero-stagger mt-4 font-heading text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#102A40]">
              Experience That{" "}
              <span className="text-[#03AFF7]">Runs Deep.</span>
            </h1>

            <p className="page-hero-stagger mt-6 max-w-[500px] text-[15px] leading-[1.85] text-[#142B3D]/80 sm:text-base">
              Since 1973, Davidson Well Drilling, Inc. has provided fresh water
              well drilling, water pumps, pump service, hydrofracturing, and
              geothermal ground loop installation across Northeast Georgia and
              Upstate South Carolina.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="page-hero-mask overflow-hidden rounded-[14px] bg-[#F2F8FC]">
              <img
                src="/images/section2.jpg"
                alt="Davidson Well Drilling field operations"
                className="aspect-[16/11] w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
