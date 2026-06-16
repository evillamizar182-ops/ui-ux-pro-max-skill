"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";

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
      <div className="relative aspect-[4/5] overflow-hidden bg-gris-niebla mb-4">
        <Image
          src={product.imagenes[0]}
          alt={product.nombre}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-negro-tinta/0 group-hover:bg-negro-tinta/10 transition-colors duration-500" />

        {product.nuevo && (
          <span className="absolute top-4 left-4 text-eyebrow text-esmeralda bg-blanco/90 backdrop-blur-sm px-3 py-1">
            Nuevo
          </span>
        )}

        <span className="absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center bg-blanco/0 group-hover:bg-blanco/90 backdrop-blur-sm text-negro-tinta opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-eyebrow text-gris-carbon">{product.categoria}</p>
        <h3 className="font-display text-xl group-hover:text-esmeralda transition-colors duration-300">
          {product.nombre}
        </h3>
        <p className="font-body text-sm font-normal text-gris-carbon">
          {formatPrice(product.precio)}
        </p>
      </div>

      <span className="block w-0 group-hover:w-full h-[1px] bg-esmeralda/40 mt-3 transition-all duration-500 ease-out" />
    </Link>
  );
}
