"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeatured } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const featured = getFeatured();

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) return;

      gsap.fromTo(
        titleRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
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
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <span className="text-eyebrow text-esmeralda block mb-4">
            Seleccion exclusiva
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Piezas destacadas
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
