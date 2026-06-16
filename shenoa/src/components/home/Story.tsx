"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 lg:py-40 px-6 md:px-10"
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-eyebrow text-esmeralda block mb-8">
          Nuestra historia
        </span>
        <p
          ref={textRef}
          className="font-display text-2xl sm:text-3xl md:text-4xl italic leading-snug text-negro-tinta opacity-0"
          style={{ maxWidth: "60ch", margin: "0 auto" }}
        >
          Desde las minas de Muzo hasta las manos de nuestros maestros
          orfebres, cada pieza de Shenoa nace de la tierra colombiana y cobra
          vida a traves de generaciones de conocimiento artesanal. No creamos
          joyas — preservamos momentos eternos.
        </p>
      </div>
    </section>
  );
}
