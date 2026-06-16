"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Truck, Award, Gem } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: Gem, title: "Origen certificado", description: "Cada piedra incluye certificacion gemologica internacional y trazabilidad completa desde la mina." },
  { icon: Award, title: "Garantia de por vida", description: "Mantenimiento gratuito, pulido y ajuste de talla durante toda la vida de la pieza." },
  { icon: ShieldCheck, title: "Artesania registrada", description: "Cada pieza lleva un numero de serie unico y su ficha tecnica detallada." },
  { icon: Truck, title: "Envio asegurado", description: "Entrega en estuche de lujo con seguro completo. Envio discreto a nivel nacional." },
];

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll("[data-trust]");
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 lg:py-40 px-6 md:px-10 bg-gris-niebla">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-eyebrow text-esmeralda block mb-4">Compromiso Shenoa</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6">Su confianza, nuestra prioridad</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {items.map((item) => (
            <div key={item.title} data-trust className="text-center p-6 border border-gris-piedra/30 hover:border-esmeralda/30 transition-colors duration-500">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-gris-piedra/40">
                <item.icon size={24} strokeWidth={1} className="text-esmeralda" />
              </div>
              <h3 className="font-display text-lg md:text-xl mb-3">{item.title}</h3>
              <p className="text-xs text-gris-carbon leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
