import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionContent from "./CollectionContent";

const validCategories = ["anillos", "collares", "aretes", "pulseras"] as const;
type ValidCategory = (typeof validCategories)[number];

const categoryNames: Record<ValidCategory, string> = {
  anillos: "Anillos",
  collares: "Collares",
  aretes: "Aretes",
  pulseras: "Pulseras",
};

export async function generateStaticParams() {
  return validCategories.map((c) => ({ categoria: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  if (!validCategories.includes(categoria as ValidCategory)) return {};
  const name = categoryNames[categoria as ValidCategory];
  return {
    title: name,
    description: `Coleccion de ${name.toLowerCase()} Shenoa. Piezas unicas de joyeria artesanal.`,
  };
}

export default async function ColeccionPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  if (!validCategories.includes(categoria as ValidCategory)) {
    notFound();
  }

  return (
    <SmoothScroll>
      <Navbar />
      <CollectionContent
        categoria={categoria as ValidCategory}
        title={categoryNames[categoria as ValidCategory]}
      />
      <Footer />
    </SmoothScroll>
  );
}
