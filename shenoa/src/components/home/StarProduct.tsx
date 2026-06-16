"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeatured, formatPrice } from "@/lib/products";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function StarProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const star = getFeatured()[0];
  if (!star) return null;

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        revealRef.current,
        { scaleX: 1 },
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.to(imageRef.current?.querySelector("img") ?? [], {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        textRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
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
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div
          ref={imageRef}
          className="relative aspect-[4/5] overflow-hidden bg-gris-niebla"
        >
          <Image
            src={star.imagenes[0]}
            alt={star.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
          <div
            ref={revealRef}
            className="absolute inset-0 bg-gris-niebla origin-right z-10"
          />
        </div>

        <div ref={textRef}>
          <span className="text-eyebrow text-esmeralda block mb-4 opacity-0">
            Pieza estrella
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-4 opacity-0">
            {star.nombre}
          </h2>
          <p className="font-display text-2xl text-esmeralda mb-6 opacity-0">
            {formatPrice(star.precio)}
          </p>
          <p className="text-gris-carbon leading-relaxed mb-8 max-w-lg opacity-0">
            {star.descripcion}
          </p>

          <ul className="space-y-3 mb-10 border-t border-gris-piedra pt-6 opacity-0">
            {star.materiales.map((mat) => (
              <li
                key={mat}
                className="flex items-center justify-between text-sm border-b border-gris-piedra/30 pb-3"
              >
                <span className="text-gris-carbon">Material</span>
                <span className="font-body font-normal">{mat}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0">
            <Button
              href={`https://wa.me/573225518530?text=${encodeURIComponent(
                `Hola, me interesa la pieza "${star.nombre}" (${formatPrice(star.precio)})`
              )}`}
              magnetic
            >
              Consultar por WhatsApp
            </Button>
            <Button variant="ghost" href={`/producto/${star.slug}`}>
              Ver detalles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
