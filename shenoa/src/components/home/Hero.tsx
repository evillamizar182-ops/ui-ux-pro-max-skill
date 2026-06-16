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
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      const tl = gsap.timeline();
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
      );

      const contentEls = contentRef.current?.children;
      if (contentEls) {
        tl.fromTo(
          contentEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      gsap.to(imageRef.current, {
        yPercent: -10,
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
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "80% top",
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
      <div ref={imageRef} className="absolute inset-0 opacity-0">
        <Image
          src="https://placehold.co/1920x1080/1A1A18/F2F2F0?text=SHENOA"
          alt="Shenoa Joyeria"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-negro-tinta/40" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-eyebrow text-esmeralda-luz mb-4 md:mb-6">
          Joyeria de Autor
        </span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[96px] text-blanco mb-6 md:mb-8 max-w-4xl leading-[1.05]">
          El arte de lo
          <br />
          extraordinario
        </h1>
        <Button href="/coleccion/anillos" magnetic className="border-blanco text-blanco hover:text-negro-tinta [&>span:first-child]:bg-blanco">
          Explorar coleccion
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-12 bg-blanco/40 animate-pulse" />
      </div>
    </section>
  );
}
