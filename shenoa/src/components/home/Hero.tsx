"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const els = contentRef.current?.children;
      if (els) {
        gsap.fromTo(
          els,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.3 }
        );
      }

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.out", delay: 0.5 }
      );

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
      <Image
        src="https://images.pexels.com/photos/15491851/pexels-photo-15491851.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt="Shenoa Joyeria de Autor"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-eyebrow text-esmeralda-luz mb-4 md:mb-6 tracking-[0.3em]">
          Joyeria de Autor
        </span>

        <span
          ref={lineRef}
          className="block w-12 h-[1px] bg-esmeralda-luz/60 mb-6 md:mb-8 origin-center"
        />

        <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-white mb-2 max-w-5xl leading-[1.08]">
          El arte de lo
        </h1>
        <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-white mb-8 md:mb-10 max-w-5xl leading-[1.08] italic">
          extraordinario
        </h1>

        <Button
          href="/coleccion/anillos"
          magnetic
          className="border-white/50 text-white hover:text-black [&>span:first-child]:bg-white"
        >
          Explorar coleccion
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-eyebrow text-white/30 text-[9px] tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
