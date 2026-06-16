"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function WhatsAppFloat() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.fromTo(
      btnRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: 2,
        ease: "back.out(1.7)",
      }
    );

    if (prefersReduced || !ringRef.current) return;

    gsap.to(ringRef.current, {
      scale: 1.8,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      repeatDelay: 3,
      ease: "power2.out",
    });
  });

  return (
    <a
      ref={btnRef}
      href="https://wa.me/573225518530?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20sus%20piezas."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-esmeralda text-blanco rounded-full shadow-lg hover:bg-esmeralda-luz transition-colors duration-300 opacity-0"
      aria-label="Contactar por WhatsApp"
    >
      <span
        ref={ringRef}
        className="absolute inset-0 rounded-full bg-esmeralda/30 pointer-events-none"
      />
      <MessageCircle size={24} strokeWidth={1.5} />
    </a>
  );
}
