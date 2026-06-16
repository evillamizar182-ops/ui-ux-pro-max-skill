export interface Product {
  id: number;
  slug: string;
  nombre: string;
  categoria: "anillos" | "collares" | "aretes" | "pulseras";
  precio: number;
  materiales: string[];
  descripcion: string;
  imagenes: string[];
  destacado: boolean;
  nuevo: boolean;
  tallas?: string[];
}
