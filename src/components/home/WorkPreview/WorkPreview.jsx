import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../common/SectionHeading.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

export default function WorkPreview() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".work-preview-item", {
      opacity: 0,
      y: 26,
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

  return (
    <section
      ref={sectionRef}
      className="bg-[#F2F8FC] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="OUR WORK"
            title="Work That Goes"
            highlight="Beyond the Surface."
            description="Field operations across Northeast Georgia and Upstate South Carolina—from fresh water well drilling to pump service and vertical geothermal loops."
          />

          <Link
            to="/our-work"
            className="inline-flex shrink-0 items-center gap-2 rounded-[6px] bg-[#03AFF7] px-5 py-3.5 text-xs font-extrabold tracking-[0.04em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#008FCB]"
          >
            Explore Our Work <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Asymmetrical Editorial Gallery: 1 Dominant Featured Photo + 2 Smaller Supporting Images */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Dominant Featured Image */}
          <Link
            to="/our-work"
            className="work-preview-item group relative overflow-hidden rounded-[14px] bg-[#102A40] lg:col-span-7"
          >
            <img
              src="/images/section2.jpg"
              alt="Davidson Well Drilling field operations"
              loading="lazy"
              className="aspect-[16/11] w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 lg:h-[490px] lg:aspect-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102A40]/85 via-[#102A40]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white sm:p-8">
              <div>
                <span className="inline-block rounded-[4px] bg-[#03AFF7] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] uppercase">
                  WATER WELL DRILLING
                </span>
                <h3 className="mt-3 font-heading text-xl font-extrabold sm:text-2xl">
                  Fresh Water Well Installation &amp; Field Execution
                </h3>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#008FCB] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>

          {/* Two Smaller Supporting Images Stacked Asymmetrically */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <Link
              to="/our-work"
              className="work-preview-item group relative overflow-hidden rounded-[14px] bg-[#102A40]"
            >
              <img
                src="/images/section2.jpg"
                alt="Hydrofracturing and downhole water well service"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover object-left transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A40]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[#8CE0FF] uppercase">
                    HYDROFRACTURING &amp; PUMPS
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold">
                    Well Yield &amp; Pump Service
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>

            <Link
              to="/our-work"
              className="work-preview-item group relative overflow-hidden rounded-[14px] bg-[#102A40] lg:ml-8"
            >
              <img
                src="/images/section2.jpg"
                alt="Vertical geothermal ground loop installation"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A40]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-[#8CE0FF] uppercase">
                    GEOTHERMAL SYSTEMS
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold">
                    Vertical Ground Loop Drilling
                  </h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
