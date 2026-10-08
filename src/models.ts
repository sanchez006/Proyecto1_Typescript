// Modelos del dominio: catálogo de una biblioteca.

/** Géneros permitidos. Un tipo unión evita valores inválidos como "terrror". */
export type Genero = "novela" | "ciencia" | "historia" | "tecnologia" | "fantasia";

/** Libro del catálogo. */
export interface Libro {
  readonly isbn: string;
  titulo: string;
  autor: string;
  genero: Genero;
  anio: number;
  paginas: number;
  precio: number; // en quetzales
  disponible: boolean;
  calificacion?: number; // 1 a 5, opcional porque no todos los libros tienen reseñas
}

/** Resumen calculado a partir del catálogo. */
export interface ResumenCatalogo {
  totalLibros: number;
  disponibles: number;
  valorInventario: number;
  promedioPaginas: number;
}

/** Vista simplificada de un libro para mostrar en la terminal. */
export type FichaLibro = Pick<Libro, "titulo" | "autor"> & {
  etiqueta: string;
};
