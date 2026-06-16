import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Shenoa — Joyeria de Autor",
    template: "%s | Shenoa",
  },
  description:
    "Piezas unicas de joyeria artesanal. Esmeraldas colombianas, diamantes y metales preciosos trabajados a mano con precision milenaria.",
  openGraph: {
    title: "Shenoa — Joyeria de Autor",
    description:
      "Piezas unicas de joyeria artesanal con esmeraldas colombianas y diamantes.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
