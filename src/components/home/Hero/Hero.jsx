import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Droplets, MapPin } from "lucide-react";
import Navbar from "../../common/Navbar.jsx";
import { useGsapContext } from "../../../animations/pageAnimations.js";

function HeroCopy() {
  return (
    <div className="hero-copy absolute left-[7%] top-[25%] z-20 w-[36%] max-w-[470px] min-w-[320px] text-white max-[760px]:left-[7%] max-[760px]:top-[14%] max-[760px]:w-[86%] max-[760px]:min-w-0">
      <div className="hero-stagger flex items-center gap-2.5 text-[10px] font-bold leading-relaxed tracking-[.14em] max-[760px]:text-[8px]">
        <span className="h-px w-[22px] shrink-0 bg-white" />
        DEPENDABLE WATER. DECADES OF KNOW-HOW.
      </div>
      <h1 className="hero-stagger mt-[22px] mb-[18px] font-heading text-[clamp(42px,4.5vw,68px)] font-extrabold leading-[1.08] tracking-[-.055em] max-[760px]:mt-[18px] max-[760px]:mb-[14px] max-[760px]:text-[clamp(42px,10vw,60px)] max-[760px]:leading-[1.05]">
        ON THE JOB.
        <em className="block not-italic">FOR GENERATIONS.</em>
      </h1>
      <p className="hero-stagger mb-[26px] max-w-[390px] text-sm leading-[1.75] text-white/95 max-[760px]:mb-[18px] max-[760px]:max-w-[320px] max-[760px]:text-xs max-[760px]:leading-[1.65]">
        Serving our communities for over five decades. Reliable well drilling,
        pump services and geothermal solutions backed by generations of
        experience.
      </p>
      <div className="hero-stagger">
        <Link
          to="/request-estimate"
          className="inline-flex min-h-[50px] min-w-[190px] items-center justify-center gap-3 rounded-[5px] border border-white bg-white px-[22px] py-[15px] text-xs font-extrabold text-[#008FCB] transition-all duration-300 hover:-translate-y-1 hover:bg-[#008FCB] hover:text-white hover:shadow-xl hover:shadow-slate-950/20 max-[760px]:min-h-[46px] max-[760px]:min-w-[180px] max-[760px]:px-[17px] max-[760px]:py-[13px] max-[760px]:text-[11px]"
        >
          Request an Estimate <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="hero-stagger mt-7 flex flex-wrap items-center gap-2.5 text-[8px] font-bold tracking-[.15em] text-white max-[760px]:mt-[18px] max-[760px]:text-[7px]">
        <span className="h-px w-[22px] bg-white" />
        ROOTED IN EXPERIENCE
      </div>
    </div>
  );
}

function WorkerVisual() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-[35%] z-10 flex h-[80%] w-[46%] items-end justify-center max-[760px]:left-[5%] max-[760px]:h-[49%] max-[760px]:w-[90%]">
      <div className="absolute bottom-[7%] aspect-square w-[90%] rounded-full bg-[radial-gradient(circle,#9bcfff75,#75b6ff1f_55%,transparent_70%)] max-[760px]:bottom-[5%] max-[760px]:w-[88%]" />
      <div className="absolute -bottom-[3%] h-[12%] w-[85%] rounded-[50%] bg-[#001e5d]/25 blur-[22px]" />
      <img
        src="/images/hero.png"
        alt="Davidson Well Drilling field technician"
        className="hero-worker relative h-full w-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(0,25,77,0.2)]"
      />
      <span className="absolute bottom-[8%] left-[4%] rounded-[3px] border border-white/35 bg-[#008FCB]/50 px-3 py-2.5 text-[8px] font-bold tracking-[.13em] text-white backdrop-blur-md max-[760px]:bottom-[8%] max-[760px]:left-[5%] max-[760px]:text-[7px]">
        <i className="mr-2 inline-block size-1.5 rounded-full bg-[#9de4ff]" />
        ON THE JOB. FOR GENERATIONS.
      </span>
    </div>
  );
}

function ExperienceCard() {
  return (
    <aside className="hero-float absolute bottom-[14%] left-[4%] z-30 min-h-[158px] w-[174px] rounded-lg bg-white px-[18px] py-[19px] text-slate-900 shadow-[0_18px_55px_rgba(0,27,93,0.2)] max-[1050px]:left-[3%] max-[1050px]:w-[155px] max-[760px]:bottom-[34%] max-[760px]:left-[6%] max-[760px]:min-h-[119px] max-[760px]:w-[135px] max-[760px]:p-[13px]">
      <small className="block text-[8px] font-bold tracking-[.12em] text-[#6681a9] max-[760px]:text-[7px]">
        ROOTED IN EXPERIENCE
      </small>
      <strong className="mt-2 mb-[3px] block font-heading text-[45px] font-extrabold leading-none tracking-[-.06em] max-[760px]:text-[34px]">
        1973<span className="align-top text-[25px] text-[#03AFF7]">+</span>
      </strong>
      <p className="text-[9px] leading-[1.5] text-slate-600 max-[760px]:text-[8px]">
        Serving our communities
        <br />
        for over five decades
      </p>
      <Droplets className="absolute right-[13px] bottom-[14px] text-[#dceeff]" size={30} />
    </aside>
  );
}

function RegionCard() {
  return (
    <aside className="hero-float absolute top-[39%] right-[4.5%] z-30 w-[190px] rounded-lg bg-white p-[17px] text-slate-900 shadow-[0_18px_55px_rgba(0,27,93,0.2)] max-[1050px]:right-[3%] max-[1050px]:w-[155px] max-[760px]:top-[43%] max-[760px]:right-[5%] max-[760px]:w-[145px] max-[760px]:p-3">
      <span className="mb-[13px] grid size-8 place-items-center rounded-full bg-[#F5F9FC] text-[#008FCB] max-[760px]:mb-2 max-[760px]:size-[27px]">
        <MapPin size={17} />
      </span>
      <small className="block text-[8px] font-bold tracking-[.12em] text-[#6681a9]">
        PROUDLY SERVING
      </small>
      <strong className="mt-2 mb-3 block font-heading text-base font-extrabold leading-[1.3] tracking-[-.03em] max-[760px]:mt-1.5 max-[760px]:mb-[9px] max-[760px]:text-xs">
        Northeast Georgia
        <br />
        &amp; Upstate SC
      </strong>
      <hr className="mb-2.5 border-0 border-t border-slate-200" />
      <p className="text-[9px] leading-[1.5] text-slate-600 max-[760px]:text-[8px]">
        Local knowledge.
        <br />
        Dependable service.
      </p>
    </aside>
  );
}

function HeroFooter() {
  return (
    <div className="absolute right-[5%] bottom-[27px] left-[5%] z-30 flex items-center gap-3.5 text-[8px] font-bold tracking-[.13em] text-white/75 max-[760px]:right-[6%] max-[760px]:bottom-[17px] max-[760px]:left-[6%] max-[760px]:flex-wrap max-[760px]:gap-2 max-[760px]:text-[6px]">
      <span>WATER WELL DRILLING</span>
      <i className="size-[3px] rounded-full bg-[#9de4ff]" />
      <span>HYDROFRACTURING</span>
      <i className="size-[3px] rounded-full bg-[#9de4ff]" />
      <span>GEOTHERMAL SOLUTIONS</span>
      <span className="ml-auto text-white/60 max-[760px]:hidden">SCROLL TO EXPLORE ↓</span>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  useGsapContext(heroRef, ({ gsap, prefersReducedMotion }) => {
    if (prefersReducedMotion) return;

    gsap.from(".hero-stagger", {
      opacity: 0,
      y: 22,
      duration: 0.75,
      stagger: 0.11,
      ease: "power3.out",
    });

    gsap.from(".hero-worker", {
      opacity: 0,
      y: 28,
      scale: 0.97,
      duration: 0.95,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".hero-float", {
      opacity: 0,
      y: 20,
      duration: 0.75,
      stagger: 0.15,
      delay: 0.4,
      ease: "power2.out",
    });
  });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate mx-[22px] mt-[22px] h-[min(850px,calc(100svh-44px))] min-h-[680px] overflow-hidden rounded-[25px] bg-[radial-gradient(ellipse_at_55%_43%,#8bdcff_0%,transparent_40%),linear-gradient(115deg,#008FCB_0%,#03AFF7_54%,#008FCB_100%)] text-white max-[760px]:mx-[10px] max-[760px]:mt-[10px] max-[760px]:h-[880px] max-[760px]:min-h-[880px] max-[760px]:rounded-[18px]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.14] [background-image:linear-gradient(#fff2_1px,transparent_1px),linear-gradient(90deg,#fff2_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(90deg,transparent,#000_40%,#000_85%,transparent)]" />
      <div className="pointer-events-none absolute top-[8%] right-[17%] size-[620px] rounded-full border border-white/15 shadow-[0_0_0_65px_rgba(255,255,255,0.03),0_0_0_130px_rgba(255,255,255,0.02)]" />
      <Navbar variant="hero" />
      <HeroCopy />
      <WorkerVisual />
      <ExperienceCard />
      <RegionCard />
      <HeroFooter />
    </section>
  );
}
