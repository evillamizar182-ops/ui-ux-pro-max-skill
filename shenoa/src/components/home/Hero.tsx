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
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set([imageRef.current, contentRef.current], { opacity: 1 });
        if (contentRef.current) {
          gsap.set(contentRef.current.children, { opacity: 1 });
        }
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
      );

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.8"
      );

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.out" },
        "-=0.3"
      );

      const els = contentRef.current?.children;
      if (els) {
        tl.fromTo(
          els,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.5"
        );
      }

      gsap.to(imageRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

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
      <div ref={imageRef} className="absolute inset-[-10%] opacity-0">
        <Image
          src="https://placehold.co/1920x1080/1A1A18/F2F2F0?text=SHENOA&font=playfair-display"
          alt="Shenoa Joyeria de Autor"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-negro-tinta/50 via-negro-tinta/30 to-negro-tinta/60 opacity-0"
      />

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-eyebrow text-esmeralda-luz mb-4 md:mb-6 tracking-[0.3em]">
          Joyeria de Autor
        </span>

        <span
          ref={lineRef}
          className="block w-12 h-[1px] bg-esmeralda-luz mb-6 md:mb-8 origin-center scale-x-0"
        />

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-blanco mb-3 max-w-5xl leading-[1.05]">
          El arte de lo
        </h1>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] text-blanco mb-8 md:mb-10 max-w-5xl leading-[1.05] italic">
          extraordinario
        </h1>

        <Button
          href="/coleccion/anillos"
          magnetic
          className="border-blanco/80 text-blanco hover:text-negro-tinta [&>span:first-child]:bg-blanco"
        >
          Explorar coleccion
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-eyebrow text-blanco/40 text-[9px] tracking-[0.3em]">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-blanco/50 to-transparent" />
      </div>
    </section>
  );
}
