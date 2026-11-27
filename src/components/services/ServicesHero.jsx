import { useRef } from "react";
import { detailedServices } from "../../data/services.js";
import {
  animatePageEntrance,
  useGsapContext,
} from "../../animations/pageAnimations.js";

export default function ServicesHero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ prefersReducedMotion, scope }) => {
    animatePageEntrance(scope, prefersReducedMotion);
  });

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#F2F8FC] pt-16 pb-20 sm:pt-20 sm:pb-24"
    >
      {/* Subtle Technical Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(3,175,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(3,175,247,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="page-hero-stagger inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase sm:text-[11px]">
              <span className="h-px w-6 bg-[#03AFF7]" />
              OUR SERVICES · EST. 1973
            </div>

            <h1 className="page-hero-stagger mt-4 font-heading text-[clamp(38px,4.8vw,66px)] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#102A40]">
              Professional Solutions.{" "}
              <span className="text-[#03AFF7]">Grounded in Experience.</span>
            </h1>
          </div>

          <div className="lg:col-span-5">
            <p className="page-hero-stagger text-[15px] leading-[1.8] text-[#142B3D]/85 sm:text-base">
              Explore Davidson Well Drilling&apos;s water well, pump and
              geothermal services across Northeast Georgia and Upstate South
              Carolina.
            </p>
          </div>
        </div>

        {/* Wide Drilling Photograph + Jump Navigation Strip */}
        <div className="page-hero-mask mt-12 overflow-hidden rounded-[14px] bg-[#102A40]">
          <img
            src="/images/section2.jpg"
            alt="Davidson Well Drilling field operations"
            className="aspect-[21/9] min-h-[260px] w-full object-cover object-center"
          />
        </div>

        {/* Service Quick-Jump Anchor Bar */}
        <div className="page-hero-stagger mt-8 flex flex-wrap items-center gap-2.5">
          {detailedServices.map((srv) => (
            <a
              key={srv.id}
              href={`#${srv.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#102A40]/12 bg-white px-4 py-2 text-xs font-bold text-[#102A40] transition-colors hover:border-[#03AFF7] hover:text-[#008FCB]"
            >
              <span className="text-[#03AFF7]">{srv.number}</span>
              <span>{srv.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
