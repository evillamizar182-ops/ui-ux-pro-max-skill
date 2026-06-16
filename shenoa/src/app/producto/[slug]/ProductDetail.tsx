"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const touchStartX = useRef(0);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const items = pageRef.current?.querySelectorAll("[data-anim]");
      if (items) {
        gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.15 });
      }
    },
    { scope: pageRef }
  );

  const changeImage = (index: number) => {
    if (index === activeImage) return;
    const img = mainImageRef.current?.querySelector("img");
    if (!img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveImage(index);
      return;
    }
    gsap.to(img, { opacity: 0, duration: 0.15, onComplete: () => {
      setActiveImage(index);
      gsap.to(img, { opacity: 1, duration: 0.2 });
    }});
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      changeImage(diff > 0 ? Math.min(activeImage + 1, product.imagenes.length - 1) : Math.max(activeImage - 1, 0));
    }
  };

  const waMessage = encodeURIComponent(`Hola, me interesa la pieza "${product.nombre}" (${formatPrice(product.precio)}).${selectedSize ? ` Talla: ${selectedSize}.` : ""}`);

  return (
    <div ref={pageRef}>
      <main className="pt-24 md:pt-32 pb-20 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Gallery */}
            <div className="lg:col-span-3" data-anim>
              <div className="flex flex-col-reverse lg:flex-row gap-3">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] pb-2 lg:pb-0 scrollbar-hide">
                  {product.imagenes.map((img, i) => (
                    <button key={i} onClick={() => changeImage(i)} className={`relative shrink-0 w-16 h-20 lg:w-20 lg:h-24 overflow-hidden transition-all duration-300 ${i === activeImage ? "border border-esmeralda" : "border border-transparent opacity-50 hover:opacity-100"}`} aria-label={`Ver imagen ${i + 1}`}>
                      <Image src={img} alt={`${product.nombre} vista ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
                <div ref={mainImageRef} className="relative flex-1 aspect-[4/5] overflow-hidden bg-gris-niebla touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                  <Image src={product.imagenes[activeImage]} alt={product.nombre} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                  {product.nuevo && <span className="absolute top-4 left-4 text-eyebrow text-esmeralda bg-white/90 backdrop-blur-sm px-3 py-1 z-10">Nuevo</span>}
                  {product.imagenes.length > 1 && (
                    <>
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none lg:hidden">
                        <button onClick={() => changeImage(Math.max(0, activeImage - 1))} disabled={activeImage === 0} className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm disabled:opacity-30" aria-label="Anterior"><ChevronLeft size={18} /></button>
                        <button onClick={() => changeImage(Math.min(product.imagenes.length - 1, activeImage + 1))} disabled={activeImage === product.imagenes.length - 1} className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm disabled:opacity-30" aria-label="Siguiente"><ChevronRight size={18} /></button>
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                        {product.imagenes.map((_, i) => (<span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImage ? "bg-esmeralda" : "bg-black/30"}`} />))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start space-y-6">
              <div data-anim>
                <p className="text-eyebrow text-gris-carbon mb-2">{product.categoria}</p>
                <h1 className="font-display text-4xl sm:text-5xl">{product.nombre}</h1>
              </div>
              <p data-anim className="font-display text-3xl">{formatPrice(product.precio)}</p>
              <p data-anim className="text-gris-carbon leading-relaxed">{product.descripcion}</p>

              <div data-anim className="border-t border-gris-piedra pt-6">
                <h3 className="text-eyebrow mb-4">Materiales</h3>
                <ul className="space-y-2">
                  {product.materiales.map((mat) => (<li key={mat} className="text-sm text-gris-carbon border-b border-gris-piedra/30 pb-2">{mat}</li>))}
                </ul>
              </div>

              {product.tallas && product.tallas.length > 0 && (
                <div data-anim className="border-t border-gris-piedra pt-6">
                  <h3 className="text-eyebrow mb-4">Talla{selectedSize ? `: ${selectedSize}` : ""}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tallas.map((talla) => (
                      <button key={talla} onClick={() => setSelectedSize(talla)} className={`min-w-[44px] min-h-[44px] px-4 py-2 text-sm font-body border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2 ${selectedSize === talla ? "border-esmeralda bg-esmeralda-velo text-esmeralda" : "border-gris-piedra text-gris-carbon hover:border-negro-tinta"}`}>
                        {talla}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div data-anim className="flex flex-col gap-3 pt-4">
                <Button href={`https://wa.me/573225518530?text=${waMessage}`} magnetic>
                  <MessageCircle size={16} strokeWidth={1.5} className="mr-2" />Consultar por WhatsApp
                </Button>
                <Button variant="ghost" onClick={() => setLiked(!liked)}>
                  <Heart size={16} strokeWidth={1.5} className={`mr-2 transition-colors ${liked ? "fill-esmeralda text-esmeralda" : ""}`} />
                  {liked ? "Guardado en favoritos" : "Agregar a favoritos"}
                </Button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-24 md:mt-40">
              <div className="text-center mb-12 md:mb-16">
                <span className="text-eyebrow text-esmeralda block mb-4">Piezas similares</span>
                <h2 className="font-display text-3xl md:text-4xl">Tambien te puede interesar</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((p, i) => (<ProductCard key={p.id} product={p} index={i} />))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
