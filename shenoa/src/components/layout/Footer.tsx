"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const colecciones = [
  { label: "Anillos", href: "/coleccion/anillos" },
  { label: "Collares", href: "/coleccion/collares" },
  { label: "Aretes", href: "/coleccion/aretes" },
  { label: "Pulseras", href: "/coleccion/pulseras" },
];

const ayuda = [
  { label: "Guia de tallas", href: "#" },
  { label: "Cuidado de joyas", href: "#" },
  { label: "Envios", href: "#" },
  { label: "Devoluciones", href: "#" },
];

const legales = [
  { label: "Politica de privacidad", href: "#" },
  { label: "Terminos y condiciones", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="bg-negro-tinta text-gris-piedra py-16 md:py-24 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <Link
              href="/"
              className="font-display text-3xl text-blanco tracking-wide block mb-6"
              style={{ fontWeight: 300 }}
            >
              Shenoa
            </Link>
            <p className="text-sm leading-relaxed max-w-[280px]">
              Joyeria de autor con esmeraldas colombianas y piedras preciosas.
              Cada pieza es unica.
            </p>
          </div>

          <div>
            <h4 className="text-eyebrow text-blanco mb-6">Colecciones</h4>
            <ul className="space-y-3">
              {colecciones.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-esmeralda-luz transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-blanco mb-6">Ayuda</h4>
            <ul className="space-y-3">
              {ayuda.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-esmeralda-luz transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-eyebrow text-blanco mb-6">Newsletter</h4>
            <p className="text-sm mb-4">
              Nuevas colecciones y piezas exclusivas.
            </p>
            <form
              className="flex border-b border-gris-piedra"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-transparent text-sm text-blanco py-3 outline-none placeholder:text-gris-piedra/60"
                aria-label="Correo electronico"
              />
              <button
                type="submit"
                className="w-11 h-11 flex items-center justify-center text-esmeralda-luz hover:text-esmeralda transition-colors"
                aria-label="Suscribirse"
              >
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gris-piedra/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gris-piedra/60">
            &copy; {new Date().getFullYear()} Shenoa. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            {legales.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-gris-piedra/60 hover:text-gris-piedra transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
