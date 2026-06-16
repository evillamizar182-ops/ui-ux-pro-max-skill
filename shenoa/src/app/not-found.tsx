import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-6 text-center">
      <span className="text-eyebrow text-esmeralda mb-6">404</span>
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl mb-6">
        Pagina no encontrada
      </h1>
      <p className="text-gris-carbon mb-10 max-w-md">
        La pieza que buscas no esta disponible. Explora nuestra coleccion para
        encontrar algo extraordinario.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 text-btn border border-esmeralda text-esmeralda hover:bg-esmeralda hover:text-blanco transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-esmeralda focus:ring-offset-2"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
