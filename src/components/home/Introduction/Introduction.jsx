import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Waves } from "lucide-react";
import DrillingRigArtwork from "./DrillingRigArtwork.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

const facts = [
  {
    number: "01",
    title: "Established Experience",
    description: "Serving our communities since 1973.",
  },
  {
    number: "02",
    title: "Service Area",
    description: "Northeast Georgia and Upstate South Carolina.",
  },
  {
    number: "03",
    title: "Expertise",
    description: "Water Well Drilling, Pump Services and Geothermal Systems.",
  },
];

function IntroductionVisual() {
  return (
    <div className="intro-visual relative aspect-[4/5] min-h-[520px] w-full overflow-hidden rounded-[10px] bg-[#087FB5] sm:min-h-[600px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_36%,rgba(141,220,255,0.55),transparent_56%),linear-gradient(150deg,#0A9ED8_0%,#006C9F_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute -top-16 -right-20 size-[370px] rounded-full border border-white/20 shadow-[0_0_0_35px_rgba(255,255,255,0.04),0_0_0_75px_rgba(255,255,255,0.03)]" />
      <DrillingRigArtwork />

      <div className="absolute top-7 left-7 z-20 flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-[9px] font-semibold tracking-[.15em] text-white backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-[#B9F0FF]" />
        WATER · EARTH · ENGINEERING
      </div>

      <img 
        src="/images/hero2.png"
        alt="Well drilling field technician wearing protective equipment"
        loading="lazy"
        className="intro-technician absolute bottom-0 left-1/2 z-10 h-[83%] max-w-none -translate-x-1/2 object-contain object-bottom drop-shadow-[0_16px_24px_rgba(0,28,60,.28)]"
      />

      <div className="absolute right-5 bottom-5 z-20 flex items-center gap-2 rounded-md border border-white/35 bg-[#005F8C]/60 px-3 py-2 text-[9px] font-semibold tracking-[.12em] text-white backdrop-blur-md">
        <Waves size={14} />
        GROUNDWATER EXPERTISE
      </div>
    </div>
  );
}

function CompanyFacts() {
  return (
    <aside className="intro-facts flex flex-col">
      <div className="mb-7">
        <span className="mb-2 block text-[10px] font-bold tracking-[.16em] text-[#008FCB]">
          ESTABLISHED
        </span>
        <strong className="block font-heading text-[54px] font-extrabold leading-none tracking-[-.065em] text-[#008FCB]">
          1973
        </strong>
        <p className="mt-2 text-sm leading-relaxed text-[#142B3D]/75">
          A history of serving our communities.
        </p>
      </div>

      {facts.slice(1).map((fact) => (
        <div
          key={fact.number}
          className="intro-fact-item border-t border-[#A9D3E8]/70 py-6"
        >
          <span className="mb-2 block text-[10px] font-bold tracking-[.15em] text-[#03AFF7]">
            {fact.number}
          </span>
          <h3 className="font-heading text-[15px] font-bold text-[#102A40]">
            {fact.title}
          </h3>
          <p className="mt-2 text-[13px] leading-[1.7] text-[#142B3D]/80">
            {fact.description}
          </p>
        </div>
      ))}

      <div className="mt-auto flex items-center gap-2 pt-3 text-[10px] font-bold tracking-[.12em] text-[#008FCB]">
        <MapPin size={14} /> SERVING OUR REGION
      </div>
    </aside>
  );
}

export default function Introduction() {
  const sectionRef = useRef(null);

  useGsapContext(sectionRef, ({ gsap, prefersReducedMotion, scope }) => {
    if (prefersReducedMotion) {
      gsap.set(".intro-reveal, .intro-fact-item", { opacity: 1, y: 0 });
      gsap.set(".intro-visual", { clipPath: "inset(0 0 0 0)" });
      gsap.set(".intro-contour", { opacity: 0.55 });
      return;
    }

    gsap.set(".intro-reveal", { opacity: 0, y: 24 });
    gsap.set(".intro-fact-item", { opacity: 0, y: 18 });
    gsap.set(".intro-visual", { clipPath: "inset(0 0 100% 0)" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 72%",
        once: true,
      },
    });

    timeline
      .to(".intro-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
      })
      .to(
        ".intro-visual",
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          ease: "power3.inOut",
        },
        "-=0.7"
      )
      .to(
        ".intro-fact-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        ".intro-contour",
        { opacity: 0 },
        { opacity: 0.55, duration: 1.1, ease: "power1.out" },
        "-=0.55"
      );
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-24 sm:px-10 lg:px-12 lg:py-[120px]"
    >
      <div className="pointer-events-none intro-contour absolute -top-20 right-[-100px] h-[520px] w-[520px] rounded-full border border-[#03AFF7]/10 opacity-0 shadow-[0_0_0_35px_rgba(3,175,247,.025),0_0_0_75px_rgba(3,175,247,.02),0_0_0_115px_rgba(3,175,247,.015)]" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-9 flex items-center justify-between">
          <span className="intro-reveal text-[10px] font-bold tracking-[.18em] text-[#008FCB]">
            DAVIDSON WELL DRILLING · EST. 1973
          </span>
          <span className="hidden text-[10px] font-semibold tracking-[.15em] text-[#102A40]/45 sm:block">
            01 / OUR STORY
          </span>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="order-1 flex flex-col items-start lg:col-span-3">
            <span className="intro-reveal mb-4 text-[10px] font-bold tracking-[.16em] text-[#03AFF7]">
              ROOTED IN EXPERIENCE
            </span>
            <h2 className="intro-reveal max-w-[390px] font-heading text-[clamp(38px,4vw,56px)] font-extrabold leading-[1.06] tracking-[-.06em] text-[#102A40]">
              Built on Experience. Driven by What Lies Beneath.
            </h2>
            <p className="intro-reveal mt-6 max-w-[350px] text-[15px] leading-[1.85] text-[#142B3D]/80">
              Davidson Well Drilling provides water well drilling, pump services
              and geothermal ground loop installation across Northeast Georgia
              and Upstate South Carolina.
            </p>
            <Link
              to="/about-us"
              className="intro-reveal mt-7 inline-flex items-center gap-3 border-b border-[#03AFF7] pb-2 text-[11px] font-bold tracking-[.08em] text-[#008FCB] transition-colors duration-200 hover:text-[#03AFF7]"
            >
              DISCOVER OUR STORY <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="order-2 lg:col-span-6">
            <IntroductionVisual />
          </div>

          <div className="order-3 lg:col-span-3">
            <CompanyFacts />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[#A9D3E8]/60 pt-5">
          <span className="text-[9px] font-bold tracking-[.15em] text-[#008FCB]">
            ROOTED IN THE GROUND. BUILT ON TRUST.
          </span>
          <span className="text-[9px] font-medium tracking-[.12em] text-[#102A40]/45">
            DAVIDSON / 01
          </span>
        </div>
      </div>
    </section>
  );
}
