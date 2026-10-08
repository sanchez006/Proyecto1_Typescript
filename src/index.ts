// Punto de entrada: usa el catálogo y muestra los resultados en la terminal.
import {
  aFichas,
  calcularTotalConDescuento,
  calificacionPromedio,
  contarPorGenero,
  filtrarPorGenero,
  filtrarPorRangoDeAnios,
  libros,
  resumirCatalogo,
} from "./catalog.js";
import type { FichaLibro } from "./models.js";

function imprimirFichas(titulo: string, fichas: readonly FichaLibro[]): void {
  console.log(`\n=== ${titulo} ===`);
  if (fichas.length === 0) {
    console.log("  (sin resultados)");
    return;
  }
  for (const ficha of fichas) {
    console.log(`  • ${ficha.titulo} — ${ficha.autor}`);
    console.log(`    ${ficha.etiqueta}`);
  }
}

function main(): void {
  console.log("📚 Catálogo de la biblioteca");

  imprimirFichas("Todos los libros", aFichas(libros));

  const tecnologia = filtrarPorGenero(libros, "tecnologia", true);
  imprimirFichas("Tecnología disponible", aFichas(tecnologia));

  const sigloXX = filtrarPorRangoDeAnios(libros, 1900, 1999);
  imprimirFichas("Publicados en el siglo XX", aFichas(sigloXX));

  const descuento = 15;
  const total = calcularTotalConDescuento(tecnologia, descuento);
  console.log(`\nComprar todo lo de tecnología con ${descuento}% de descuento: Q${total.toFixed(2)}`);

  const resumen = resumirCatalogo(libros);
  console.log("\n=== Resumen ===");
  console.log(`  Total de libros:     ${resumen.totalLibros}`);
  console.log(`  Disponibles:         ${resumen.disponibles}`);
  console.log(`  Valor de inventario: Q${resumen.valorInventario.toFixed(2)}`);
  console.log(`  Promedio de páginas: ${resumen.promedioPaginas}`);

  const promedio = calificacionPromedio(libros);
  console.log(`  Calificación media:  ${promedio === undefined ? "sin datos" : `${promedio} / 5`}`);

  console.log("\n=== Libros por género ===");
  for (const [genero, cantidad] of Object.entries(contarPorGenero(libros))) {
    console.log(`  ${genero.padEnd(12)} ${cantidad}`);
  }
}

main();
