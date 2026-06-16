"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeatured, formatPrice } from "@/lib/products";
import Button from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function StarProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const star = getFeatured()[0];

  useEffect(() => {
    if (!star) return;
    const ctx = gsap.context(() => {
      const img = sectionRef.current?.querySelector("[data-img]");
      if (img) {
        gsap.fromTo(img, { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 80%" },
        });
      }

      const items = sectionRef.current?.querySelectorAll("[data-text]");
      if (items) {
        gsap.fromTo(items, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: items[0], start: "top 80%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [star]);

  if (!star) return null;

  return (
    <section ref={sectionRef} className="py-20 md:py-32 lg:py-40 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div data-img className="relative aspect-[4/5] overflow-hidden bg-gris-niebla">
          <Image src={star.imagenes[0]} alt={star.nombre} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" />
        </div>

        <div>
          <span data-text className="text-eyebrow text-esmeralda block mb-4">Pieza estrella</span>
          <h2 data-text className="font-display text-4xl sm:text-5xl md:text-6xl mb-4">{star.nombre}</h2>
          <p data-text className="font-display text-2xl text-esmeralda mb-6">{formatPrice(star.precio)}</p>
          <p data-text className="text-gris-carbon leading-relaxed mb-8 max-w-lg">{star.descripcion}</p>

          <ul data-text className="space-y-3 mb-10 border-t border-gris-piedra pt-6">
            {star.materiales.map((mat) => (
              <li key={mat} className="flex items-center justify-between text-sm border-b border-gris-piedra/30 pb-3">
                <span className="text-gris-carbon">Material</span>
                <span className="font-body font-normal">{mat}</span>
              </li>
            ))}
          </ul>

          <div data-text className="flex flex-col sm:flex-row gap-4">
            <Button href={`https://wa.me/573225518530?text=${encodeURIComponent(`Hola, me interesa la pieza "${star.nombre}" (${formatPrice(star.precio)})`)}`} magnetic>
              Consultar por WhatsApp
            </Button>
            <Button variant="ghost" href={`/producto/${star.slug}`}>Ver detalles</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
