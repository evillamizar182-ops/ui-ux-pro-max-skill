"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    title: "Anillos",
    href: "/coleccion/anillos",
    image: "https://placehold.co/800x1000/1A1A18/F2F2F0?text=Anillos",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Collares",
    href: "/coleccion/collares",
    image: "https://placehold.co/600x600/0E5E4A/F2F2F0?text=Collares",
    span: "",
  },
  {
    title: "Aretes",
    href: "/coleccion/aretes",
    image: "https://placehold.co/600x600/3A3A38/F2F2F0?text=Aretes",
    span: "",
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const cards = sectionRef.current?.querySelectorAll("[data-card]");
      if (!cards) return;

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 lg:py-40 px-6 md:px-10 bg-gris-niebla"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-eyebrow text-esmeralda block mb-4">
            Nuestras colecciones
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Explorar por categoria
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[260px]">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              data-card
              className={`group relative overflow-hidden opacity-0 ${col.span}`}
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-negro-tinta/30 group-hover:bg-negro-tinta/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <h3 className="font-display text-3xl md:text-4xl text-blanco">
                  {col.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
