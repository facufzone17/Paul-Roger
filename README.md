# Paul Roger — Brasas & Cocktail · sitio web

Etapa 1: maqueta navegable que acompaña el presupuesto. Se ve igual a la versión
final, pero **no tiene backend**: los formularios validan y muestran la
confirmación, y no envían ni guardan nada (lo avisa una barra fija arriba).

Stack: Next.js 16 (App Router) + TypeScript, CSS Modules con los tokens del
manual, GSAP + ScrollTrigger solo para el scrollytelling de Servicios.

## Correrlo

```bash
npm install
npm run dev          # http://localhost:3000
```

Versión de producción (la que se mide con Lighthouse):

```bash
npm run build
npm start            # http://localhost:3000
```

`npm run typecheck` revisa los tipos.

## Páginas

| Ruta | Qué tiene | Acción principal |
|---|---|---|
| `/` | Portada · La Casa · Servicios (scrollytelling) · Eventos y complementos · Contacto | Reservar |
| `/la-casa` | `#salon` · `#barra` · `#musica` (agenda de ejemplo, rotulada) | Reservar |
| `/carta` | Menú ejecutivo · Cocina · Sushi · Barra · Vinos (filtro por uva) · Whiskies (filtro por tipo) | Reservar |
| `/eventos` | Escalones · detalle · menús · adicionales · productos · consulta | Consulta de evento |
| `/private-dining` | El salón privado (el VIP de la casa) · consulta con el escalón precargado | Consulta de evento |
| `/nosotros` | Historia · misión y valores · recorrido del cliente | Reservar |
| `/reservar` | Mesa · Evento · Limousine · Menú ejecutivo | Confirmar |

Preselección por URL en `/reservar`: `?tipo=mesa|evento|limousine|ejecutivo`,
`?extra=flores|chocolates|pistachos|limousine`, `?escalon=mesa-festejo|salon-privado|exclusividad`,
`?ocasion=aniversario|cumpleanos|celebracion|cena|negocios`.

## Estructura

```
app/            páginas, metadata, sitemap.xml, robots.txt, 404, íconos e imagen para compartir
components/     layout (header, footer, aviso), home, carta, eventos, reservas, ui, marca
data/           TODO el contenido: carta, complementos, agenda, eventos, opciones de reserva, datos de la casa
lib/            fotos (lib/imagenes.ts), formato de precios, schema Restaurant
public/img/     fotos (WebP finales, importadas con el script)
public/brand/   logos y sprite de íconos del manual (vectores reales), grano
scripts/        importar_fotos.py · generar_marca.py · vectores extraídos del manual
```

**Contenido.** Todo vive en `data/` como filas de tablas (ids estables, sin HTML,
referencias por id). En la Etapa 2 se pasa a la base de datos sin tocar los
componentes: reciben el mismo objeto. La carta está transcrita de las fotos de
la carta impresa (precios de septiembre de 2026); no se agregó ningún plato ni precio.

**Datos que faltan.** Nunca se inventan: se ven en el sitio como
`[FALTA: …]` (componente `components/ui/Falta.tsx`). Hoy faltan: horarios por
servicio, días/horario/precio del menú ejecutivo, grilla de música en vivo,
precio por persona de los menús de evento, costo del DJ y de las islas,
alquiler y mínimo del salón privado, capacidad del espacio completo, qué incluye
la limousine, anticipación y seña de los eventos, y algunas etiquetas de vino y
whisky que quedaron cortadas en las fotos de la carta.

**Tipografía.** Los títulos usan Prata como alternativa libre a IvyMode. Si se
confirma Creative Cloud, se cambia la fuente en `app/layout.tsx`: todo el sitio
lee la variable `--fuente-titulos`.

## Fotos

Las fotos salen de `../img/final/` (WebP retocadas según `../guia-retoque-fotos.html`):

```bash
pip install pillow pymupdf
python scripts/importar_fotos.py
```

El script copia las WebP **tal cual** a `public/img/` (lo que está en
`img/final/` es lo que se ve en el sitio) y genera dos derivados: el recorte
vertical de la fachada para el bloque de Contacto y la imagen para compartir.
Para actualizar una foto: reemplazarla en `img/final/` con el mismo nombre,
correr el script y volver a compilar.

Las cards de platos `pr-card-sushi-palillos`, `pr-card-espinaca`,
`pr-card-pollo` y `pr-card-pollo-espinaca` están importadas pero no se usan en
ninguna página (el brief no pone foto por plato).

Faltan fotos del **Salón Privado**, de la **música en vivo** y de los
**pistachos**: esos lugares muestran un placeholder oscuro marcado.

## Indexación

La maqueta no se indexa (`noindex` y `robots.txt` cerrado). Al publicar en
paulroger.com.ar: variable de entorno `NEXT_PUBLIC_INDEXAR=si`. Sumar los
horarios al schema Restaurant (`lib/seo.tsx`) cuando se confirmen.

## Deploy (Vercel)

Proyecto nuevo en Vercel con **Root Directory = `web`**. Framework: Next.js,
sin variables de entorno para la maqueta. Cada push genera un link de preview.
