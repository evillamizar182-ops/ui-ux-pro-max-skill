"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = quoteRef.current?.querySelectorAll("[data-word]");
      if (words) {
        gsap.fromTo(words, { opacity: 0.15 }, {
          opacity: 1, duration: 0.3, stagger: 0.04, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 80%", end: "bottom 60%", scrub: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const words = "Desde las minas de Muzo hasta las manos de nuestros maestros orfebres, cada pieza de Shenoa nace de la tierra colombiana y cobra vida a traves de generaciones de conocimiento artesanal. No creamos joyas — preservamos momentos eternos.".split(" ");

  return (
    <section ref={sectionRef} className="py-24 md:py-40 lg:py-48 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-eyebrow text-esmeralda block mb-10">Nuestra historia</span>
        <div ref={quoteRef}>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] italic leading-snug" style={{ lineHeight: 1.4 }}>
            {words.map((word, i) => (
              <span key={i} data-word className="inline-block mr-[0.3em]">{word}</span>
            ))}
          </p>
        </div>
        <span className="block w-12 h-[1px] bg-gris-piedra mx-auto mt-12" />
      </div>
    </section>
  );
}
