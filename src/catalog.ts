// Datos y lógica del catálogo. No imprime nada: solo recibe y devuelve datos.
import type { FichaLibro, Genero, Libro, ResumenCatalogo } from "./models.js";

/** Arreglo tipado con los libros de la biblioteca. */
export const libros: readonly Libro[] = [
  { isbn: "978-0307474728", titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "novela", anio: 1967, paginas: 471, precio: 145, disponible: true, calificacion: 5 },
  { isbn: "978-0553380163", titulo: "Breve historia del tiempo", autor: "Stephen Hawking", genero: "ciencia", anio: 1988, paginas: 212, precio: 120, disponible: true, calificacion: 4 },
  { isbn: "978-0132350884", titulo: "Clean Code", autor: "Robert C. Martin", genero: "tecnologia", anio: 2008, paginas: 464, precio: 380, disponible: false, calificacion: 4 },
  { isbn: "978-0062316097", titulo: "Sapiens", autor: "Yuval Noah Harari", genero: "historia", anio: 2011, paginas: 464, precio: 175, disponible: true },
  { isbn: "978-0547928227", titulo: "El hobbit", autor: "J. R. R. Tolkien", genero: "fantasia", anio: 1937, paginas: 310, precio: 110, disponible: true, calificacion: 5 },
  { isbn: "978-0135957059", titulo: "The Pragmatic Programmer", autor: "David Thomas y Andrew Hunt", genero: "tecnologia", anio: 2019, paginas: 352, precio: 410, disponible: true, calificacion: 5 },
  { isbn: "978-8437604947", titulo: "Pedro Páramo", autor: "Juan Rulfo", genero: "novela", anio: 1955, paginas: 124, precio: 75, disponible: false, calificacion: 4 },
];

/** Filtrado: libros de un género, opcionalmente solo los disponibles. */
export function filtrarPorGenero(
  catalogo: readonly Libro[],
  genero: Genero,
  soloDisponibles: boolean = false,
): Libro[] {
  return catalogo.filter(
    (libro) => libro.genero === genero && (!soloDisponibles || libro.disponible),
  );
}

/** Filtrado: libros publicados dentro de un rango de años (inclusive). */
export function filtrarPorRangoDeAnios(
  catalogo: readonly Libro[],
  desde: number,
  hasta: number,
): Libro[] {
  return catalogo.filter((libro) => libro.anio >= desde && libro.anio <= hasta);
}

/** Cálculo: precio total aplicando un descuento en porcentaje (0 a 100). */
export function calcularTotalConDescuento(
  seleccion: readonly Libro[],
  descuentoPorcentaje: number,
): number {
  if (descuentoPorcentaje < 0 || descuentoPorcentaje > 100) {
    throw new RangeError("El descuento debe estar entre 0 y 100.");
  }
  const subtotal = seleccion.reduce((suma, libro) => suma + libro.precio, 0);
  const total = subtotal * (1 - descuentoPorcentaje / 100);
  return Math.round(total * 100) / 100;
}

/** Cálculo: resumen general del catálogo. */
export function resumirCatalogo(catalogo: readonly Libro[]): ResumenCatalogo {
  const totalLibros = catalogo.length;
  const totalPaginas = catalogo.reduce((suma, libro) => suma + libro.paginas, 0);
  return {
    totalLibros,
    disponibles: catalogo.filter((libro) => libro.disponible).length,
    valorInventario: catalogo.reduce((suma, libro) => suma + libro.precio, 0),
    promedioPaginas: totalLibros === 0 ? 0 : Math.round(totalPaginas / totalLibros),
  };
}

/** Cálculo: calificación promedio ignorando los libros sin calificación. */
export function calificacionPromedio(catalogo: readonly Libro[]): number | undefined {
  const calificaciones = catalogo
    .map((libro) => libro.calificacion)
    .filter((valor): valor is number => valor !== undefined);
  if (calificaciones.length === 0) {
    return undefined;
  }
  const suma = calificaciones.reduce((total, valor) => total + valor, 0);
  return Math.round((suma / calificaciones.length) * 10) / 10;
}

/** Transformación: convierte libros en fichas listas para mostrar. */
export function aFichas(catalogo: readonly Libro[]): FichaLibro[] {
  return catalogo.map((libro) => ({
    titulo: libro.titulo,
    autor: libro.autor,
    etiqueta: `[${libro.genero.toUpperCase()}] ${libro.anio} · Q${libro.precio.toFixed(2)}${libro.disponible ? "" : " · AGOTADO"}`,
  }));
}

/** Transformación: agrupa la cantidad de libros por género. */
export function contarPorGenero(catalogo: readonly Libro[]): Record<Genero, number> {
  const conteo: Record<Genero, number> = {
    novela: 0,
    ciencia: 0,
    historia: 0,
    tecnologia: 0,
    fantasia: 0,
  };
  for (const libro of catalogo) {
    conteo[libro.genero] += 1;
  }
  return conteo;
}
