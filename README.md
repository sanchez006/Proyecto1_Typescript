# Catálogo de Biblioteca en TypeScript

Aplicación de consola en TypeScript que modela el catálogo de una biblioteca pequeña. Filtra, calcula y transforma datos de libros, y se compila y ejecuta desde la terminal.

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior (probado con v24)
- npm 10 o superior
- Git (para clonar el repositorio)

## Instalación

```bash
git clone <URL-del-repositorio>
cd Proyecto1-TypeScript
npm install
```

## Comandos disponibles

| Comando             | Qué hace                                                      |
| ------------------- | ------------------------------------------------------------- |
| `npm run typecheck` | Comprueba los tipos con `tsc --noEmit` sin generar archivos   |
| `npm run build`     | Compila `src/` a JavaScript en `dist/` (con mapas de código)  |
| `npm start`         | Ejecuta `dist/index.js` con Node (requiere `build` primero)   |

Flujo completo:

```bash
npm run typecheck && npm run build && npm start
```

## Estructura del proyecto

```
Proyecto1-TypeScript/
├── src/
│   ├── models.ts     # Tipos del dominio: Genero, Libro, ResumenCatalogo, FichaLibro
│   ├── catalog.ts    # Datos tipados y funciones de filtrado, cálculo y transformación
│   └── index.ts      # Punto de entrada: usa el catálogo e imprime resultados
├── dist/             # Salida compilada (.js y .js.map); generada por build, no se versiona
├── package.json      # Metadatos, scripts y dependencias
├── tsconfig.json     # Configuración del compilador (modo estricto)
└── README.md
```

## Dominio elegido: biblioteca

Cada **libro** tiene ISBN, título, autor, género, año, páginas, precio (en quetzales), disponibilidad y una calificación opcional. Sobre ese catálogo la aplicación:

- **Filtra** por género (opcionalmente solo disponibles) y por rango de años (`filtrarPorGenero`, `filtrarPorRangoDeAnios`).
- **Calcula** el total con descuento, un resumen del inventario y la calificación promedio (`calcularTotalConDescuento`, `resumirCatalogo`, `calificacionPromedio`).
- **Transforma** libros en fichas para mostrar y cuenta libros por género (`aFichas`, `contarPorGenero`).

## Decisiones de tipado

1. **`Genero` como tipo unión** (`"novela" | "ciencia" | ...`) en vez de `string`: el compilador rechaza géneros mal escritos. Además permite `Record<Genero, number>` en `contarPorGenero`, y TypeScript exige inicializar todos los géneros.
2. **`calificacion?` opcional y `exactOptionalPropertyTypes`**: no todos los libros tienen reseñas. `calificacionPromedio` usa un *type guard* (`valor is number`) para descartar `undefined` sin conversiones forzadas, y devuelve `number | undefined`, así quien la llama tiene que manejar el caso sin datos.
3. **`readonly`**: el ISBN es `readonly` y las funciones reciben `readonly Libro[]`, así que no pueden modificar el catálogo original. Cada función devuelve un arreglo nuevo.

## Separación entre módulos

- `models.ts` contiene **solo tipos**. No genera código en tiempo de ejecución y se importa con `import type`.
- `catalog.ts` contiene **datos y lógica pura**: recibe datos y devuelve datos, sin `console.log`. Así se puede reutilizar o probar por separado.
- `index.ts` es la **capa de presentación**: combina las funciones e imprime en la terminal.

El proyecto no usa `any` ni conversiones forzadas (`as`) para ocultar errores. El `tsconfig.json` activa `strict`, `noUncheckedIndexedAccess`, `noImplicitReturns` y `noUnused*`.
