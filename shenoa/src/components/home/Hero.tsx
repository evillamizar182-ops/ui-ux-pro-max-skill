"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { HeroVisual } from "@/components/ui/ProductVisual";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        if (contentRef.current) gsap.set(contentRef.current.children, { opacity: 1 });
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        diamondRef.current?.children ?? [],
        { scale: 0.8, opacity: 0, rotation: 45 },
        { scale: 1, opacity: 1, rotation: 45, duration: 1.4, stagger: 0.15, ease: "power2.out" },
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.out" },
        "-=0.8"
      );

      const els = contentRef.current?.children;
      if (els) {
        tl.fromTo(
          els,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5"
        );
      }

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "25% top",
          end: "75% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[600px] w-full overflow-hidden"
    >
      <HeroVisual />

      {/* Animated diamonds */}
      <div
        ref={diamondRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border border-white/[0.04] rotate-45 opacity-0" />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] border border-white/[0.03] rotate-45 opacity-0" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-eyebrow text-esmeralda-luz mb-4 md:mb-6 tracking-[0.3em]">
          Joyeria de Autor
        </span>

        <span
          ref={lineRef}
          className="block w-12 h-[1px] bg-esmeralda-luz/60 mb-6 md:mb-8 origin-center scale-x-0"
        />

        <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-blanco/95 mb-2 max-w-5xl leading-[1.08]">
          El arte de lo
        </h1>
        <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-blanco/95 mb-8 md:mb-10 max-w-5xl leading-[1.08] italic">
          extraordinario
        </h1>

        <Button
          href="/coleccion/anillos"
          magnetic
          className="border-blanco/40 text-blanco/90 hover:text-negro-tinta [&>span:first-child]:bg-blanco/90"
        >
          Explorar coleccion
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-eyebrow text-blanco/30 text-[9px] tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-blanco/30 to-transparent" />
      </div>
    </section>
  );
}
