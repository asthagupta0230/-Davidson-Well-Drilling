import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapContext(scopeRef, callback, deps = []) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      callback({ gsap, ScrollTrigger, prefersReducedMotion, scope });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function animatePageEntrance(scope, prefersReducedMotion) {
  if (prefersReducedMotion) {
    gsap.set(scope.querySelectorAll(".page-hero-stagger"), {
      opacity: 1,
      y: 0,
    });
    gsap.set(scope.querySelectorAll(".page-hero-mask"), {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
    });
    return;
  }

  const staggerItems = scope.querySelectorAll(".page-hero-stagger");
  const maskItems = scope.querySelectorAll(".page-hero-mask");

  if (staggerItems.length) {
    gsap.fromTo(
      staggerItems,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      }
    );
  }

  if (maskItems.length) {
    gsap.fromTo(
      maskItems,
      { clipPath: "inset(0% 0% 100% 0% round 14px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 14px)",
        duration: 1.0,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }
}
