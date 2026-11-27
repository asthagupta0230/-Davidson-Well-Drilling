import { useRef } from "react";
import { howWeWorkSteps } from "../../../data/services.js";
import SectionHeading from "../../common/SectionHeading.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

export default function Process() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 75%",
        once: true,
      },
    });

    tl.from(".process-left", {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
    })
      .fromTo(
        ".process-center-img",
        { clipPath: "inset(0% 0% 100% 0% round 12px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 12px)",
          duration: 0.95,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .from(
        ".process-step",
        {
          opacity: 0,
          y: 22,
          duration: 0.65,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.5"
      );
  });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: Section Heading & Introduction */}
          <div className="process-left lg:col-span-4">
            <SectionHeading
              eyebrow="HOW WE WORK"
              title="A Clear Process."
              highlight="Professional Execution."
              description="Every site has its own subsurface conditions. We keep our approach straightforward—listening carefully, planning the right solution, and executing the work properly."
            />
          </div>

          {/* Center: Large Field Photograph */}
          <div className="lg:col-span-4">
            <div className="process-center-img overflow-hidden rounded-[12px] bg-[#F2F8FC]">
              <img
                src="/images/section2.jpg"
                alt="Davidson Well Drilling technician on site"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Three Vertically Arranged Process Steps */}
          <div className="lg:col-span-4">
            <div className="divide-y divide-[#102A40]/12 border-y border-[#102A40]/12">
              {howWeWorkSteps.map((step) => (
                <div key={step.number} className="process-step py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-[#03AFF7]">
                      {step.number}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[#102A40]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 pl-11 text-sm leading-[1.75] text-[#142B3D]/80">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
