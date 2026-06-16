"use client";

import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAll } from "@/lib/products";
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

const priceRanges = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "< $3M", min: 0, max: 3000000 },
  { label: "$3M–$5M", min: 3000000, max: 5000000 },
  { label: "$5M–$8M", min: 5000000, max: 8000000 },
  { label: "> $8M", min: 8000000, max: Infinity },
];

function getAllMaterials(): string[] {
  const mats = new Set<string>();
  getAll().forEach((p) => p.materiales.forEach((m) => {
    const base = m.split(" ")[0] + " " + (m.split(" ")[1] || "");
    mats.add(base.trim());
  }));
  return Array.from(mats).slice(0, 6);
}

export default function CollectionContent({
  categoria,
  title,
}: {
  categoria: Product["categoria"];
  title: string;
}) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const allProducts = useMemo(() => getAll(), []);
  const materials = useMemo(() => getAllMaterials(), []);

  const [activeCat, setActiveCat] = useState<Product["categoria"] | "todas">(categoria);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [activePriceIdx, setActivePriceIdx] = useState(0);

  const filtered = useMemo(() => {
    let result = allProducts;
    if (activeCat !== "todas") {
      result = result.filter((p) => p.categoria === activeCat);
    }
    if (activeMaterial) {
      result = result.filter((p) =>
        p.materiales.some((m) => m.toLowerCase().includes(activeMaterial.toLowerCase()))
      );
    }
    const range = priceRanges[activePriceIdx];
    result = result.filter((p) => p.precio >= range.min && p.precio < range.max);
    return result;
  }, [allProducts, activeCat, activeMaterial, activePriceIdx]);

  const animateGrid = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, []);

  const handleCategoryChange = useCallback(
    (cat: Product["categoria"] | "todas") => {
      if (cat === activeCat) return;

      const cards = gridRef.current?.querySelectorAll("[data-card]");

      if (!cards?.length) {
        setActiveCat(cat);
        if (cat !== "todas") router.replace(`/coleccion/${cat}`, { scroll: false });
        return;
      }

      gsap.to(cards, {
        opacity: 0,
        scale: 0.96,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          setActiveCat(cat);
          if (cat !== "todas") router.replace(`/coleccion/${cat}`, { scroll: false });
          requestAnimationFrame(() => animateGrid());
        },
      });
    },
    [activeCat, animateGrid, router]
  );

  const handleFilterChange = useCallback(
    (setter: () => void) => {
      const cards = gridRef.current?.querySelectorAll("[data-card]");

      if (!cards?.length) {
        setter();
        return;
      }

      gsap.to(cards, {
        opacity: 0,
        scale: 0.96,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => {
          setter();
          requestAnimationFrame(() => animateGrid());
        },
      });
    },
    [animateGrid]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, headerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span className="text-eyebrow text-esmeralda block mb-4">
            Coleccion
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </div>

        {/* Filters */}
        <div className="sticky top-16 md:top-20 z-30 bg-blanco/95 backdrop-blur-sm -mx-6 px-6 py-4 mb-10 md:mb-16 space-y-4 border-b border-gris-piedra/30">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`text-btn px-4 py-2.5 min-h-[44px] border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-1 ${
                  cat.value === activeCat
                    ? "bg-esmeralda-velo border-esmeralda text-esmeralda"
                    : "border-gris-piedra text-gris-carbon hover:border-esmeralda hover:text-esmeralda"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Material + Price */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-eyebrow text-gris-carbon shrink-0">
                Material:
              </span>
              <button
                onClick={() =>
                  handleFilterChange(() => setActiveMaterial(null))
                }
                className={`text-btn text-xs px-3 py-1.5 min-h-[36px] border transition-colors duration-300 shrink-0 ${
                  !activeMaterial
                    ? "border-esmeralda text-esmeralda bg-esmeralda-velo"
                    : "border-gris-piedra/50 text-gris-carbon"
                }`}
              >
                Todos
              </button>
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() =>
                    handleFilterChange(() =>
                      setActiveMaterial(activeMaterial === mat ? null : mat)
                    )
                  }
                  className={`text-btn text-xs px-3 py-1.5 min-h-[36px] border transition-colors duration-300 shrink-0 ${
                    activeMaterial === mat
                      ? "border-esmeralda text-esmeralda bg-esmeralda-velo"
                      : "border-gris-piedra/50 text-gris-carbon"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-eyebrow text-gris-carbon shrink-0">
                Precio:
              </span>
              {priceRanges.map((range, i) => (
                <button
                  key={range.label}
                  onClick={() =>
                    handleFilterChange(() => setActivePriceIdx(i))
                  }
                  className={`text-btn text-xs px-3 py-1.5 min-h-[36px] border transition-colors duration-300 shrink-0 ${
                    activePriceIdx === i
                      ? "border-esmeralda text-esmeralda bg-esmeralda-velo"
                      : "border-gris-piedra/50 text-gris-carbon"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {filtered.map((product, i) => (
            <div key={product.id} data-card>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-gris-carbon mb-4">
              Sin resultados
            </p>
            <p className="text-sm text-gris-piedra">
              Prueba ajustando los filtros para encontrar la pieza perfecta.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
