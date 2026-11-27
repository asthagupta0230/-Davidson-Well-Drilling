import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { homeExpertisePanels } from "../../../data/services.js";
import SectionHeading from "../../common/SectionHeading.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

export default function ServicesShowcase() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".expertise-panel", {
      opacity: 0,
      y: 30,
      duration: 0.75,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 75%",
        once: true,
      },
    });
  });

  const [panel1, panel2, panel3, panel4] = homeExpertisePanels;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F2F8FC] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="OUR EXPERTISE"
            title="Solutions"
            highlight="Beneath the Surface."
            description="Explore the expertise and services that help bring dependable water and geothermal solutions to the region."
          />

          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-2 border-b border-[#03AFF7] pb-2 text-xs font-extrabold tracking-[0.08em] text-[#008FCB] uppercase transition-colors hover:text-[#03AFF7]"
          >
            View All Services <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Asymmetrical 4-Panel Editorial Composition */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Panel 01: Dominant Left Feature */}
          <Link
            to={panel1.to}
            className="expertise-panel group relative overflow-hidden rounded-[14px] bg-[#102A40] text-white lg:col-span-7"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden lg:h-[460px] lg:aspect-auto">
              <img
                src={panel1.image}
                alt={panel1.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-70 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A40] via-[#102A40]/45 to-transparent" />
            </div>

            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="rounded-full bg-[#03AFF7] px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-white uppercase">
                {panel1.number} · {panel1.eyebrow}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 sm:p-9">
              <div className="max-w-[460px]">
                <h3 className="font-heading text-2xl font-extrabold text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                  {panel1.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85">
                  {panel1.description}
                </p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#008FCB] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#03AFF7] group-hover:text-white">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>

          {/* Panel 02: Deep Davidson Blue Architectural Offset Block */}
          <Link
            to={panel2.to}
            className="expertise-panel group relative flex flex-col justify-between overflow-hidden rounded-[14px] bg-[#008FCB] p-7 text-white sm:p-9 lg:col-span-5 lg:mt-10"
          >
            <div className="pointer-events-none absolute -right-14 -bottom-14 size-56 rounded-full border border-white/15" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] text-white/80 uppercase">
                  {panel2.eyebrow}
                </span>
                <span className="font-heading text-4xl font-extrabold text-white/30">
                  {panel2.number}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-2xl font-extrabold text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-[28px]">
                {panel2.title}
              </h3>

              <p className="mt-3 text-sm leading-[1.75] text-white/90">
                {panel2.description}
              </p>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div className="w-[68%] overflow-hidden rounded-[10px] border border-white/25">
                <img
                  src={panel2.image}
                  alt={panel2.imageAlt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-left transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#008FCB] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </Link>

          {/* Panel 03: Clean White Technical Split Block */}
          <Link
            to={panel3.to}
            className="expertise-panel group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-[#102A40]/10 bg-white p-7 sm:p-9 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
                  {panel3.eyebrow}
                </span>
                <span className="font-heading text-4xl font-extrabold text-[#03AFF7]/25">
                  {panel3.number}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-2xl font-extrabold text-[#102A40] transition-transform duration-300 group-hover:translate-x-1 sm:text-[28px]">
                {panel3.title}
              </h3>

              <p className="mt-3 text-sm leading-[1.75] text-[#142B3D]/80">
                {panel3.description}
              </p>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <div className="w-[70%] overflow-hidden rounded-[10px]">
                <img
                  src={panel3.image}
                  alt={panel3.imageAlt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#03AFF7] text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-[#008FCB]">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </Link>

          {/* Panel 04: Wide Editorial Image + Overlapping Label Bar */}
          <Link
            to={panel4.to}
            className="expertise-panel group relative overflow-hidden rounded-[14px] border border-[#102A40]/10 bg-white lg:col-span-7 lg:-mt-6"
          >
            <div className="grid h-full grid-cols-1 sm:grid-cols-12">
              <div className="relative overflow-hidden sm:col-span-6">
                <img
                  src={panel4.image}
                  alt={panel4.imageAlt}
                  loading="lazy"
                  className="h-full min-h-[240px] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between p-7 sm:col-span-6 sm:p-9">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
                      {panel4.eyebrow}
                    </span>
                    <span className="font-heading text-3xl font-extrabold text-[#102A40]/15">
                      {panel4.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-2xl font-extrabold text-[#102A40] transition-transform duration-300 group-hover:translate-x-1">
                    {panel4.title}
                  </h3>

                  <p className="mt-3 text-sm leading-[1.75] text-[#142B3D]/80">
                    {panel4.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#102A40]/10 pt-4">
                  <span className="text-xs font-extrabold tracking-[0.06em] text-[#008FCB] uppercase">
                    Explore Service
                  </span>
                  <span className="grid size-10 place-items-center rounded-full bg-[#F2F8FC] text-[#008FCB] transition-colors duration-300 group-hover:bg-[#03AFF7] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
