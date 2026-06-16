"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

      if (prefersReduced) return;

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
          start: "bottom 20%",
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
        {product.nuevo && (
          <span className="absolute top-4 left-4 text-eyebrow text-esmeralda bg-esmeralda-velo px-3 py-1">
            Nuevo
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-eyebrow text-gris-carbon">{product.categoria}</p>
        <h3 className="font-display text-xl">{product.nombre}</h3>
        <p className="font-body text-sm font-normal">{formatPrice(product.precio)}</p>
      </div>
    </Link>
  );
}
