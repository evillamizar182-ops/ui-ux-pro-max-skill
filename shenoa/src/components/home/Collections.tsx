"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    title: "Anillos",
    subtitle: "Compromiso y eternidad",
    href: "/coleccion/anillos",
    image: "https://images.pexels.com/photos/2735981/pexels-photo-2735981.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Collares",
    subtitle: "Elegancia al cuello",
    href: "/coleccion/collares",
    image: "https://images.pexels.com/photos/17298688/pexels-photo-17298688.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop",
    span: "",
  },
  {
    title: "Aretes",
    subtitle: "Luz en movimiento",
    href: "/coleccion/aretes",
    image: "https://images.pexels.com/photos/1395306/pexels-photo-1395306.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop",
    span: "",
  },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const title = sectionRef.current?.querySelector("[data-title]");
      if (title) {
        gsap.fromTo(title.children, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });
      }

      sectionRef.current?.querySelectorAll("[data-col]").forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-32 lg:py-40 px-6 md:px-10 bg-gris-niebla">
      <div className="max-w-[1400px] mx-auto">
        <div data-title className="text-center mb-16 md:mb-24">
          <span className="text-eyebrow text-esmeralda block mb-4">Nuestras colecciones</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Explorar por categoria</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5 auto-rows-[320px] md:auto-rows-[280px]">
          {collections.map((col) => (
            <Link key={col.title} href={col.href} data-col className={`group relative overflow-hidden ${col.span}`}>
              <Image src={col.image} alt={col.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                <p className="text-eyebrow text-white/40 mb-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">{col.subtitle}</p>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-3xl md:text-4xl text-white">{col.title}</h3>
                  <span className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/40 group-hover:border-white/60 group-hover:text-white/80 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={16} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
