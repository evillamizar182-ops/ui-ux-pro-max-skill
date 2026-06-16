"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  const text = "SHENOA";
  const separator = "   •   ";
  const repeated = Array(10)
    .fill(`${text}${separator}`)
    .join("");

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !trackRef.current) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <div className="py-10 md:py-14 overflow-hidden border-y border-gris-piedra/40">
      <div
        ref={trackRef}
        className="whitespace-nowrap font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gris-piedra/20 select-none"
        style={{ fontWeight: 300, width: "max-content" }}
        aria-hidden="true"
      >
        {repeated}
      </div>
    </div>
  );
}
