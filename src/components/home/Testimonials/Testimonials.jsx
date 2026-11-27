import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Quote } from "lucide-react";
import { useGsapContext } from "../../../animations/pageAnimations.js";

export default function Testimonials() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) return;

    gsap.from(".testimonial-reveal", {
      opacity: 0,
      y: 22,
      duration: 0.7,
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
      className="bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Verified Heritage & Regional Presence */}
          <div className="testimonial-reveal lg:col-span-3">
            <span className="text-[10px] font-bold tracking-[0.18em] text-[#008FCB] uppercase">
              CLIENT FEEDBACK
            </span>
            <p className="mt-4 font-heading text-4xl font-extrabold tracking-[-0.04em] text-[#102A40]">
              Since 1973
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#142B3D]/75">
              Serving property owners across Northeast Georgia and Upstate
              South Carolina.
            </p>
            <div className="mt-6 h-px w-16 bg-[#03AFF7]" />
          </div>

          {/* Center: Field Photograph */}
          <div className="testimonial-reveal lg:col-span-4">
            <div className="overflow-hidden rounded-[12px] bg-[#F2F8FC]">
              <img
                src="/images/section2.jpg"
                alt="Davidson Well Drilling field service"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right: Editorial Quote Arrangement (Marked placeholder awaiting verified customer review) */}
          <div className="testimonial-reveal lg:col-span-5">
            <Quote size={42} strokeWidth={1.6} className="text-[#03AFF7]" />

            <blockquote className="mt-5 font-heading text-xl font-bold leading-[1.45] text-[#102A40] sm:text-2xl">
              “Verified customer testimonial placeholder — approved homeowner or
              project review from Northeast Georgia or Upstate South Carolina to
              be placed here.”
            </blockquote>

            <div className="mt-6 border-t border-[#102A40]/12 pt-5">
              <p className="text-xs font-extrabold tracking-[0.1em] text-[#102A40] uppercase">
                [Approved Client Attribution Pending]
              </p>
              <p className="mt-1 text-xs text-[#142B3D]/70">
                Davidson Well Drilling, Inc. · Northeast Georgia &amp; Upstate
                South Carolina
              </p>
            </div>

            <div className="mt-7">
              <Link
                to="/request-estimate"
                className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.06em] text-[#008FCB] uppercase transition-colors hover:text-[#03AFF7]"
              >
                Connect With Our Team <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
