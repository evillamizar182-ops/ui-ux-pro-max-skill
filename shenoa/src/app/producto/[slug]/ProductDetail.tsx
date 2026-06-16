"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import Button from "@/components/ui/Button";
import ProductVisual from "@/components/ui/ProductVisual";
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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".pd-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    },
    { scope: pageRef }
  );

  const waMessage = encodeURIComponent(
    `Hola, me interesa la pieza "${product.nombre}" (${formatPrice(product.precio)}).${selectedSize ? ` Talla: ${selectedSize}.` : ""} Me gustaria recibir mas informacion.`
  );

  return (
    <div ref={pageRef}>
      <main className="pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Visual */}
            <div className="lg:col-span-3 pd-anim opacity-0">
              <ProductVisual
                product={product}
                className="aspect-[4/5] w-full"
                size="lg"
              />
            </div>

            {/* Product info */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start space-y-6">
              <div className="pd-anim opacity-0">
                <p className="text-eyebrow text-gris-carbon mb-2">
                  {product.categoria}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl">
                  {product.nombre}
                </h1>
              </div>

              <p className="pd-anim opacity-0 font-display text-3xl">
                {formatPrice(product.precio)}
              </p>

              <p className="pd-anim opacity-0 text-gris-carbon leading-relaxed">
                {product.descripcion}
              </p>

              {/* Materials */}
              <div className="pd-anim opacity-0 border-t border-gris-piedra pt-6">
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

              {/* Size selector */}
              {product.tallas && product.tallas.length > 0 && (
                <div className="pd-anim opacity-0 border-t border-gris-piedra pt-6">
                  <h3 className="text-eyebrow mb-4">
                    Talla{selectedSize ? `: ${selectedSize}` : ""}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tallas.map((talla) => (
                      <button
                        key={talla}
                        onClick={() => setSelectedSize(talla)}
                        className={`min-w-[44px] min-h-[44px] px-4 py-2 text-sm font-body border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2 ${
                          selectedSize === talla
                            ? "border-esmeralda bg-esmeralda-velo text-esmeralda"
                            : "border-gris-piedra text-gris-carbon hover:border-negro-tinta"
                        }`}
                      >
                        {talla}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="pd-anim opacity-0 flex flex-col gap-3 pt-4">
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
                <Button variant="ghost" onClick={() => setLiked(!liked)}>
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

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-24 md:mt-40">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-eyebrow text-esmeralda block mb-4">
                  Piezas similares
                </span>
                <h2 className="font-display text-3xl md:text-4xl">
                  Tambien te puede interesar
                </h2>
              </div>
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
