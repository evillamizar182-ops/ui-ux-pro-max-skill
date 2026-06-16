import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAll, getBySlug } from "@/lib/products";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  return getAll().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return {};
  return {
    title: product.nombre,
    description: product.descripcion,
    openGraph: {
      title: `${product.nombre} | Shenoa`,
      description: product.descripcion,
      images: product.imagenes,
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const related = getAll()
    .filter((p) => p.categoria === product.categoria && p.id !== product.id)
    .slice(0, 4);

  return (
    <SmoothScroll>
      <Navbar />
      <ProductDetail product={product} related={related} />
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
