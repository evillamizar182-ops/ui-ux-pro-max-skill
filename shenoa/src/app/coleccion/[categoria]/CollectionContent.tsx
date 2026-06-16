"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getByCategory, getAll } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

gsap.registerPlugin(ScrollTrigger);

const categories: { value: Product["categoria"] | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "anillos", label: "Anillos" },
  { value: "collares", label: "Collares" },
  { value: "aretes", label: "Aretes" },
  { value: "pulseras", label: "Pulseras" },
];

export default function CollectionContent({
  categoria,
  title,
}: {
  categoria: Product["categoria"];
  title: string;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const products =
    categoria === ("todas" as Product["categoria"])
      ? getAll()
      : getByCategory(categoria);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        headerRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: headerRef }
  );

  return (
    <main className="pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <span className="text-eyebrow text-esmeralda block mb-4">
            Coleccion
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-20 sticky top-16 md:top-20 z-30 bg-blanco/90 backdrop-blur-sm py-4 -mx-6 px-6">
          {categories.map((cat) => (
            <a
              key={cat.value}
              href={
                cat.value === "todas"
                  ? "/coleccion/anillos"
                  : `/coleccion/${cat.value}`
              }
              className={`text-btn px-5 py-2.5 min-h-[44px] flex items-center border transition-colors duration-300 ${
                cat.value === categoria
                  ? "bg-esmeralda-velo border-esmeralda text-esmeralda"
                  : "border-gris-piedra text-gris-carbon hover:border-esmeralda hover:text-esmeralda"
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gris-carbon py-20">
            No hay piezas disponibles en esta categoria.
          </p>
        )}
      </div>
    </main>
  );
}
