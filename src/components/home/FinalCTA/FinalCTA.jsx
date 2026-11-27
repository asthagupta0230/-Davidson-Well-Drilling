import { useRef } from "react";
import { Phone } from "lucide-react";
import Button from "../../common/Button.jsx";
import { companyInfo } from "../../../data/navigation.js";
import { useGsapContext } from "../../../animations/pageAnimations.js";

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".final-cta-reveal", {
      opacity: 0,
      y: 24,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[linear-gradient(125deg,#008FCB_0%,#03AFF7_58%,#008FCB_100%)] py-24 text-white sm:py-28"
    >
      {/* Technical Line Graphics */}
      <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 size-[420px] rounded-full border border-white/20" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-[660px]">
            <span className="final-cta-reveal inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] text-white/90 uppercase sm:text-[11px]">
              <span className="h-px w-6 bg-white" />
              DAVIDSON WELL DRILLING, INC. · EST. 1973
            </span>

            <h2 className="final-cta-reveal mt-4 font-heading text-[clamp(38px,4.8vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white">
              Let&apos;s Get to the Source.
            </h2>

            <p className="final-cta-reveal mt-5 max-w-[540px] text-[15px] leading-[1.8] text-white/95 sm:text-base">
              Have a water well or geothermal project in mind? Connect with
              Davidson Well Drilling to discuss your requirements.
            </p>
          </div>

          <div className="final-cta-reveal flex flex-wrap items-center gap-4">
            <Button to="/request-estimate" variant="white">
              Request an Estimate
            </Button>

            <a
              href={companyInfo.phoneHref}
              className="inline-flex items-center gap-2 rounded-[6px] border border-white/40 px-5 py-3.5 text-xs font-extrabold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone size={15} />
              {companyInfo.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
