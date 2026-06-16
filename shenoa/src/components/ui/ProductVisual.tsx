"use client";

import type { Product } from "@/types/product";

const categoryIcons: Record<Product["categoria"], React.ReactNode> = {
  anillos: (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="65" r="28" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="65" r="22" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <path d="M48 40 L60 28 L72 40" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="28" r="7" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="28" r="3" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </svg>
  ),
  collares: (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <path d="M20 35 Q60 85 100 35" stroke="currentColor" strokeWidth="1" />
      <path d="M25 35 Q60 80 95 35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="60" cy="76" r="8" stroke="currentColor" strokeWidth="1" />
      <circle cx="60" cy="76" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <line x1="60" y1="68" x2="60" y2="58" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  ),
  aretes: (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="30" r="4" stroke="currentColor" strokeWidth="1" />
      <line x1="60" y1="34" x2="60" y2="48" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="60" cy="72" rx="14" ry="22" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="60" cy="72" rx="8" ry="14" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  ),
  pulseras: (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <ellipse cx="60" cy="60" rx="35" ry="22" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="60" cy="60" rx="29" ry="17" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <rect x="55" y="37" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </svg>
  ),
};

const materialAccents: Record<string, string> = {
  "oro": "#C5A55A",
  "platino": "#A8B0B8",
  "diamante": "#D4D8DC",
  "esmeralda": "#1A7A62",
  "rubi": "#8B3A4A",
  "zafiro": "#3A5A8B",
  "perla": "#E8E0D4",
};

function getAccentColor(materiales: string[]): string {
  const joined = materiales.join(" ").toLowerCase();
  for (const [key, color] of Object.entries(materialAccents)) {
    if (joined.includes(key)) return color;
  }
  return "#C5A55A";
}

const categoryGradients: Record<Product["categoria"], string> = {
  anillos: "radial-gradient(ellipse at 50% 40%, rgba(197,165,90,0.12) 0%, transparent 55%), linear-gradient(170deg, #14120e 0%, #1c1710 40%, #12100c 100%)",
  collares: "radial-gradient(ellipse at 50% 40%, rgba(168,176,184,0.1) 0%, transparent 55%), linear-gradient(170deg, #0d1117 0%, #151b24 40%, #0d1117 100%)",
  aretes: "radial-gradient(ellipse at 50% 40%, rgba(26,122,98,0.12) 0%, transparent 55%), linear-gradient(170deg, #0a1410 0%, #0e1c16 40%, #0a1410 100%)",
  pulseras: "radial-gradient(ellipse at 50% 40%, rgba(197,165,90,0.1) 0%, transparent 55%), linear-gradient(170deg, #16100e 0%, #1e1614 40%, #16100e 100%)",
};

interface ProductVisualProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export default function ProductVisual({
  product,
  className = "",
  size = "md",
  showName = false,
}: ProductVisualProps) {
  const accent = getAccentColor(product.materiales);
  const iconSize = size === "sm" ? "w-16 h-16" : size === "lg" ? "w-28 h-28" : "w-20 h-20";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: categoryGradients[product.categoria] }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${accent}15 0%, transparent 50%)`,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[1px] h-[30%] absolute top-[10%] opacity-10"
          style={{ backgroundColor: accent }}
        />
        <div
          className="h-[1px] w-[30%] absolute top-[30%] opacity-10"
          style={{ backgroundColor: accent }}
        />
      </div>

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${iconSize} opacity-40`} style={{ color: accent }}>
          {categoryIcons[product.categoria]}
        </div>
      </div>

      {/* Bottom info */}
      {showName && (
        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/40 to-transparent">
          <p
            className="text-eyebrow mb-1 opacity-60"
            style={{ color: accent }}
          >
            {product.categoria}
          </p>
          <p className="font-display text-lg text-white/90">
            {product.nombre}
          </p>
        </div>
      )}

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-10"
        style={{
          background: `linear-gradient(225deg, ${accent} 0%, transparent 60%)`,
        }}
      />

      {/* Nuevo badge */}
      {product.nuevo && (
        <span
          className="absolute top-4 left-4 text-eyebrow px-3 py-1 text-[10px]"
          style={{
            color: accent,
            backgroundColor: `${accent}15`,
            borderLeft: `1px solid ${accent}40`,
          }}
        >
          Nuevo
        </span>
      )}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="absolute inset-0 bg-[#0a0e0c]">
      {/* Main emerald glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(14,94,74,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(14,94,74,0.08) 0%, transparent 40%)",
        }}
      />

      {/* Subtle gold accent top-right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(197,165,90,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative diamond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] opacity-[0.04] rotate-45 border border-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] opacity-[0.03] rotate-45 border border-white" />
    </div>
  );
}

export function CollectionVisual({ category }: { category: string }) {
  const gradients: Record<string, string> = {
    Anillos:
      "radial-gradient(ellipse at 50% 60%, rgba(197,165,90,0.2) 0%, transparent 50%), linear-gradient(160deg, #14120e 0%, #1e1a12 50%, #14120e 100%)",
    Collares:
      "radial-gradient(ellipse at 50% 60%, rgba(14,94,74,0.2) 0%, transparent 50%), linear-gradient(160deg, #0a1410 0%, #0e1c16 50%, #0a1410 100%)",
    Aretes:
      "radial-gradient(ellipse at 50% 60%, rgba(168,176,184,0.15) 0%, transparent 50%), linear-gradient(160deg, #10121a 0%, #181c28 50%, #10121a 100%)",
  };

  const icons: Record<string, React.ReactNode> = {
    Anillos: categoryIcons.anillos,
    Collares: categoryIcons.collares,
    Aretes: categoryIcons.aretes,
  };

  return (
    <div
      className="absolute inset-0"
      style={{ background: gradients[category] || gradients.Anillos }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 md:w-32 md:h-32 opacity-20 text-white/60">
          {icons[category] || icons.Anillos}
        </div>
      </div>
    </div>
  );
}
