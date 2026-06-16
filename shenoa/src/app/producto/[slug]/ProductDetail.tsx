"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".product-detail-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    },
    { scope: pageRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPosition({ x, y });
  };

  const waMessage = encodeURIComponent(
    `Hola, me interesa la pieza "${product.nombre}" (${formatPrice(product.precio)}). Me gustaria recibir mas informacion.`
  );

  return (
    <div ref={pageRef}>
      <main className="pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3 product-detail-anim opacity-0">
              <div
                ref={imageContainerRef}
                className="relative aspect-[4/5] overflow-hidden bg-gris-niebla cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowLens(true)}
                onMouseLeave={() => setShowLens(false)}
              >
                <Image
                  src={product.imagenes[0]}
                  alt={product.nombre}
                  fill
                  priority
                  className="object-cover transition-transform duration-300"
                  style={
                    showLens
                      ? {
                          transformOrigin: `${lensPosition.x}% ${lensPosition.y}%`,
                          transform: "scale(1.8)",
                        }
                      : {}
                  }
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {product.nuevo && (
                  <span className="absolute top-4 left-4 text-eyebrow text-esmeralda bg-esmeralda-velo px-3 py-1 z-10 pointer-events-none">
                    Nuevo
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-6">
                <div className="product-detail-anim opacity-0">
                  <p className="text-eyebrow text-gris-carbon mb-2">
                    {product.categoria}
                  </p>
                  <h1 className="font-display text-4xl sm:text-5xl">
                    {product.nombre}
                  </h1>
                </div>

                <p className="product-detail-anim opacity-0 font-display text-3xl">
                  {formatPrice(product.precio)}
                </p>

                <p className="product-detail-anim opacity-0 text-gris-carbon leading-relaxed">
                  {product.descripcion}
                </p>

                <div className="product-detail-anim opacity-0 border-t border-gris-piedra pt-6">
                  <h3 className="text-eyebrow mb-4">Materiales</h3>
                  <ul className="space-y-2">
                    {product.materiales.map((mat) => (
                      <li
                        key={mat}
                        className="text-sm text-gris-carbon border-b border-gris-piedra/30 pb-2"
                      >
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product-detail-anim opacity-0 flex flex-col gap-3 pt-4">
                  <Button
                    href={`https://wa.me/573225518530?text=${waMessage}`}
                    magnetic
                  >
                    <MessageCircle
                      size={16}
                      strokeWidth={1.5}
                      className="mr-2"
                    />
                    Consultar por WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.5}
                      className={`mr-2 transition-colors ${
                        liked ? "fill-esmeralda text-esmeralda" : ""
                      }`}
                    />
                    {liked ? "Guardado en favoritos" : "Agregar a favoritos"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-32">
              <h2 className="font-display text-3xl md:text-4xl text-center mb-12 md:mb-16">
                Piezas relacionadas
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
