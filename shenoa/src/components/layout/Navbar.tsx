"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Colecciones", href: "/coleccion/anillos" },
  { label: "Anillos", href: "/coleccion/anillos" },
  { label: "Collares", href: "/coleccion/collares" },
  { label: "Aretes", href: "/coleccion/aretes" },
  { label: "Pulseras", href: "/coleccion/pulseras" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "80px top",
      onUpdate: (self) => setScrolled(self.progress > 0),
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          ease: "power3.inOut",
        }
      );
      gsap.fromTo(
        menuLinksRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-blanco/95 backdrop-blur-sm border-b border-gris-piedra"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-wide"
            style={{ fontWeight: 300 }}
          >
            Shenoa
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-btn text-gris-carbon hover:text-esmeralda transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573225518530"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center text-gris-carbon hover:text-esmeralda transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
            </a>
            <button
              className="w-11 h-11 flex items-center justify-center text-gris-carbon hover:text-esmeralda transition-colors"
              aria-label="Carrito"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center text-negro-tinta"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            >
              {menuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-blanco flex flex-col items-center justify-center lg:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="flex flex-col items-center gap-8">
          {links.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              ref={(el) => {
                if (el) menuLinksRef.current[i] = el;
              }}
              className="font-display text-4xl tracking-wide text-negro-tinta hover:text-esmeralda transition-colors"
              style={{ fontWeight: 300 }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
