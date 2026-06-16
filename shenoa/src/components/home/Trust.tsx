"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Truck, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icon: ShieldCheck,
    title: "Certificado de autenticidad",
    description:
      "Cada piedra incluye certificacion gemologica internacional y garantia de origen.",
  },
  {
    icon: Award,
    title: "Garantia de por vida",
    description:
      "Mantenimiento gratuito, pulido y ajuste de talla durante toda la vida de la pieza.",
  },
  {
    icon: Truck,
    title: "Envio asegurado",
    description:
      "Entrega en caja de lujo con seguro completo. Envio discreto a todo el pais.",
  },
];

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const cards = sectionRef.current?.querySelectorAll("[data-trust]");
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="py-20 md:py-32 lg:py-40 px-6 md:px-10 bg-gris-niebla"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {items.map((item) => (
          <div
            key={item.title}
            data-trust
            className="text-center opacity-0 px-4"
          >
            <item.icon
              size={32}
              strokeWidth={1}
              className="mx-auto mb-6 text-esmeralda"
            />
            <h3 className="font-display text-xl md:text-2xl mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-gris-carbon leading-relaxed max-w-sm mx-auto">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
