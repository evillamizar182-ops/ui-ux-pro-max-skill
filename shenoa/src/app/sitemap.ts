import type { MetadataRoute } from "next";
import { getAll } from "@/lib/products";

const BASE = "https://shenoa.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAll().map((p) => ({
    url: `${BASE}/producto/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const categories = ["anillos", "collares", "aretes", "pulseras"].map(
    (c) => ({
      url: `${BASE}/coleccion/${c}`,
      lastModified: new Date(),
      priority: 0.7,
    })
  );

  return [
    { url: BASE, lastModified: new Date(), priority: 1 },
    ...categories,
    ...products,
  ];
}
