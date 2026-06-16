"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import ProductVisual from "@/components/ui/ProductVisual";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(cardRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(cardRef.current, {
        opacity: 0.3,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "bottom 15%",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <Link
      ref={cardRef}
      href={`/producto/${product.slug}`}
      className="group block opacity-0"
    >
      <ProductVisual
        product={product}
        className="aspect-[4/5] mb-4 transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="space-y-1.5">
        <p className="text-eyebrow text-gris-carbon">{product.categoria}</p>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl group-hover:text-esmeralda transition-colors duration-300">
            {product.nombre}
          </h3>
          <span className="w-7 h-7 shrink-0 flex items-center justify-center text-gris-piedra opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </span>
        </div>
        <p className="font-body text-sm font-normal text-gris-carbon">
          {formatPrice(product.precio)}
        </p>
      </div>

      <span className="block w-0 group-hover:w-full h-[1px] bg-esmeralda/30 mt-3 transition-all duration-500 ease-out" />
    </Link>
  );
}
