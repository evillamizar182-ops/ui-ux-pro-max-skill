import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

const products: Product[] = productsData as Product[];

export function getAll(): Product[] {
  return products;
}

export function getBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getByCategory(categoria: Product["categoria"]): Product[] {
  return products.filter((p) => p.categoria === categoria);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.destacado);
}

export function formatPrice(precio: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
}
