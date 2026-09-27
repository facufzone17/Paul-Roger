# BUILD BRIEF — Paul Roger — Brasas & Cocktail
> Tipo: Sitio institucional · Documento de ley fija para construir este sitio con Claude Code.

## 1. Objetivo y posicionamiento
**Qué ofrece:** Paul Roger es un restaurante premium de Polo Design, en Guillermo E. Hudson (zona sur de Buenos Aires). La marca es "Brasas & Cocktail": parrilla contemporánea y barra de autor. Además tiene sushi, más de 90 etiquetas de vino, música en vivo, menú ejecutivo al mediodía, un salón privado para 16 personas, eventos y limousine con chofer, y vende ramos de flores y chocolates belgas.
Paul Roger no vende comida, vende ocasiones: aniversarios, cumpleaños, pedidas de mano y cenas de empresa. Su propia carta impresa empieza por las flores, los bombones, el salón privado y la limousine, antes que por los platos.

**Para quién:**
- Parejas y grupos de zona sur que buscan dónde festejar algo.
- Gente que busca dónde comer en la zona y llega desde Google o Instagram (@paulroger.hudson).
- Empresas que necesitan un espacio para reuniones o cenas corporativas, sobre todo al mediodía y en días de semana.

**Acción primaria (qué tiene que hacer el visitante):** RESERVAR. Hay cuatro tipos de reserva: Mesa, Evento, Limousine y Menú ejecutivo. La acción secundaria es dejar una consulta de evento con todos los datos.

**Cómo sé que funciona:**
- Las reservas y las consultas de evento llegan por la web con los datos completos y dejan de llegar por WhatsApp.
- El cliente se entera de que existen la limousine, el salón privado y los complementos antes de sentarse a la mesa.
- En 5 segundos se entiende qué es Paul Roger y dónde se reserva.

**Contexto de uso:** mobile-first. La mayoría de la gente llega desde Instagram con el celular. En desktop tiene que verse tan bien como en mobile, porque la gerencia y el comité evalúan la propuesta en una computadora.

**Objetivo de esta etapa:** la Etapa 1 es una maqueta navegable que tiene que verse igual a la versión final. Se envía junto con el presupuesto y su función es demostrar la calidad del trabajo. Tiene que dar ganas de contratar el plan Experiencia.

## 2. Requisitos de la auditoría
No existe un sitio anterior, porque el dominio paulroger.com.ar figura en la papelería pero nunca se publicó. Los dolores actuales del negocio se convierten en estos requisitos:
- **Nadie los encuentra en internet → requisito:** sitio propio en paulroger.com.ar con SEO local (Hudson, Polo Design, parrilla, sushi), metadatos completos y schema Restaurant.
- **Todo entra por un solo WhatsApp (11 2300 5015) sin orden → requisito:** /reservar es el único lugar donde se piden datos. No va botón flotante de WhatsApp, ni formulario de contacto, ni teléfono suelto en el medio de una página. Todo lo que compite con Reservar le quita reservas.
- **Los productos de más margen solo aparecen en la carta impresa, que se lee ya sentado → requisito:** tienen que estar a la vista en la home (sección 4) y se ofrecen como complemento dentro de /reservar según la ocasión. Con "Aniversario" o "Cumpleaños" aparecen, con "Cena" no.
- **La carta tiene 90 vinos impresos y cada cambio de precio obliga a reimprimir → requisito:** carta en HTML, legible en el celular sin zoom y NUNCA en PDF. Los vinos se filtran por uva y los whiskies por tipo.
- **La música en vivo no aparece en ningún lado → requisito:** agenda de próximas fechas en La Casa, con acceso desde la home.
- **La limousine es un solo vehículo → requisito:** NUNCA se "agrega al carrito" ni se confirma al instante. Siempre es una consulta.
- **Los complementos se pagan en la mesa → requisito:** no hay pagos online ni carrito.
- **No negociables:** contraste AA, targets de 44px o más, una acción primaria por pantalla, carga rápida en 4G, el sitio funciona sin animaciones y respeta prefers-reduced-motion.

## 3. Dirección de diseño
**Base:** el Manual de Identidad Visual de Paul Roger (42 páginas, en Documentos/Manual_identidad_visual_PR.pdf). No se inventan colores ni tipografías: ya están definidos ahí.

**Referencias (y qué tomar de cada una):**
- **Zuma:** la estructura. Se sostiene con tipografía, negro y silencio visual, casi sin fotos grandes. Es la referencia clave porque no hay fotos en alta.
- **Amazónico (Madrid):** el concepto. Cada ambiente se presenta como una experiencia con carácter propio y los menús van separados por propuesta.
- **COTE / Cote Korean Steakhouse:** la temperatura. Brasa y carne premium sin caer en lo rústico. También es la referencia del scrollytelling de Servicios.
- **Don Julio:** la sobriedad. Una parrilla de lujo que no grita.
- **Sexy Fish:** la música y el entretenimiento como sección propia.

**Vibe:** nocturno, sobrio, cálido, editorial, hospitalario.

**Paleta (tokens del manual):**
- Principal: rojo #e52521, negro #1d1d1b, gris #3c3c3b, blanco.
- Secundaria: crudo #f9ecdc, tierra #392513, tinto #4d160d.
- Especiales: oro #987d3b y plata #c4c4c4, solo como detalle puntual y NUNCA sobre el logo.
- El fondo es siempre oscuro (negro del manual). El crudo va para texto largo sobre negro.
- ⚠ El rojo #e52521 sobre negro da un contraste de ~3.7:1. Solo sirve para CTAs, bordes y texto grande (≥24px), nunca para texto de cuerpo. Texto blanco sobre botón rojo: ~4.5:1, está OK.

**Tipografía:**
- Títulos: IvyMode, que dice el manual. Se usa vía Adobe Fonts solo si confirman que tienen Creative Cloud. Mientras tanto, Prata como alternativa libre, dejada en un solo token para cambiarla en minutos.
- Cuerpo: Montserrat (Google Fonts). La impone el manual, así que el aviso "overused-font" es un falso positivo en este proyecto.
- El logotipo es script manuscrito. Se usa siempre el archivo del logo (SVG, versión negativa porque el fondo es más de 60% negro). Nunca se escribe con una fuente.
- Reglas del logo: no expandir, no condensar, no inclinar, sin degradés ni efectos. El claim es exactamente "Brasas & Cocktail".

**Tratamiento de fotos (según el manual):**
- Alto contraste, con overlay en degradé rojo #e52521 o negro #1d1d1b para ganar contraste. Se admite escala de grises.
- Las fotos van en bloques medianos. Pantalla completa solo en el hero.
- Una foto regular tratada en oscuro se ve intencional. Una foto regular a pantalla completa se ve pobre.

**Movimiento:** fades y reveals al scrollear, sobrios. Scrollytelling en la sección Servicios de la home. Header que pasa de transparente a sólido. Nada rebota ni se mueve solo sin motivo.

**Tono del copy:** "cordial, pero amigable y cercano", como dice el manual. Se usa el voseo rioplatense ("Conocé", "Reservá"). La frase de la marca es "Bienvenidos a casa", tomada de su propia carta. La idea de lujo sale de su cultura interna: "que el cliente sienta que todo fue pensado para él". Nada de palabras en inglés innecesarias, excepto los nombres propios de la marca (Private Dining, Stand Flowers).

**Anti-referencias (qué EVITAR):**
- Carta en PDF para descargar.
- Carrusel con flechas en la portada.
- Fotos de banco de imágenes.
- Fondo blanco (es un local de noche).
- "Bienvenidos a nuestro restaurante" como título.
- Carrusel de reseñas de Google.
- Botón flotante de WhatsApp.
- Mapa embebido.
- Look de plantilla o de librería UI genérica: cards redondeadas con sombras, gradientes violetas, íconos de stock.
- Dorado o plateado en el logo.

## 4. Arquitectura / sitemap
**Header (todas las páginas):**
- Izquierda: La Casa · Carta · Eventos.
- Centro: el logo PAUL ROGER.
- Derecha: Private Dining · Nosotros, y el botón RESERVAR (rojo, siempre visible).
- Es transparente sobre el hero y se vuelve sólido al scrollear.
- En mobile: menú a pantalla completa (base: ejemplo del manual, pág. 36), con RESERVAR siempre visible.
- Contacto NO va en el header, va en el footer.

**Páginas:**
- `/` Home
- `/la-casa` La Casa: el salón, la barra, la música en vivo con su agenda. El wireframe la llamaba /experiencia; se usa /la-casa para que la URL coincida con el nombre del menú.
- `/carta` Carta
- `/eventos` Eventos
- `/private-dining` Private Dining (el salón privado)
- `/nosotros` Nosotros
- `/reservar` Reservar

**Regla de nombres:** "VIP" y "Private Dining" son EL MISMO espacio, el salón privado de hasta 16 personas con TV y aire acondicionado. El cliente lo confirmó. Todo lo que diga VIP lleva a /private-dining, y esa página lo aclara ("nuestro salón privado, el VIP de la casa"). Nunca pueden parecer dos espacios distintos.

**Orden de la home (según wireframe):**
1. **Hero:** imagen tratada en oscuro (o un loop corto de video optimizado, solo si se confirma), el logo, "Bienvenidos a casa" y el CTA RESERVAR. Abajo a la izquierda, el link "↓ Conocer", que scrollea a la sección 2.
2. **La Casa:** tres bloques. BARRA → /la-casa#barra. VIP → /private-dining. MÚSICA EN VIVO → /la-casa#musica (agenda).
3. **Servicios (scrollytelling):** el título "Conocé nuestros servicios" queda fijo en pantalla. El scroll del usuario (no una animación automática) va reemplazando las imágenes del mosaico que lo rodea: Brasas · Sushi · Coctelería · Vinos. Cada imagen linkea a /carta#seccion. Cierra con un CTA RESERVAR grande.
   - Mobile y reduced-motion: sin pin, bloques apilados con el mismo contenido.
4. **Eventos / Complementos:**
   - Banner 1: Eventos en general (cumpleaños, corporativos, privatización) → /eventos.
   - Banner 2: tres franjas, Flores 20% · Chocolates 20% · Limousine 60%. Al tocar una franja se despliega una card con texto explicativo y un CTA.
     - Flores y chocolates: el CTA dice "Sumar a mi reserva" y lleva a /reservar?extra=flores (o chocolates), con el complemento ya tildado.
     - Limousine: el CTA dice "Consultar" y lleva a /reservar?tipo=limousine.
5. **Contacto / Footer:**
   - Imagen del local y los datos: Calle 47 6750, Polo Design, Guillermo E. Hudson, Buenos Aires · horarios por servicio · reservas@paulroger.com.ar.
   - Footer: "Paul Roger — Brasas & Cocktail" · Brasas · Sushi · Coctelería · Salón VIP · **Eventos Privados** · Limousine · @paulroger.hudson.
   - Sin formulario y sin mapa embebido.

**Resto de las páginas (bloques en orden):**
- **/carta:** Se toma el prototipo del socio y se respeta.
  - Arriba de todo, una franja destacada para el Menú ejecutivo (lunes a viernes al mediodía), con su propia reserva.
  - Cuatro secciones: Cocina · Sushi · Barra · Vinos. En desktop van en una columna lateral y en mobile como tabs sticky.
  - Adentro de cada sección, las subcategorías.
  - Filtros por uva en Vinos y por tipo en Whiskies.
  - RESERVAR sticky.
  - En mobile la carta se recorre de corrido con scroll continuo, no de a una subcategoría por vez.
  - Sin foto por plato. Se escribe "Coctelería", nunca "Cóctail".
- **/la-casa:**
  - Apertura: una foto del salón de noche y una frase.
  - `#salon`: las brasas a la vista, las mesas, la recepción con el stand de flores.
  - `#barra`: coctelería de autor y pared de vinos → /carta#barra.
  - `#musica`: qué se toca y la lista de próximas fechas (día, horario).
  - Cierra con RESERVAR.
- **/eventos** (según estructura-eventos.html, adaptada):
  - 01 Apertura.
  - 02 Selector de 3 escalones con la capacidad visible: Mesa de festejo · Salón privado (16) · Exclusividad total (capacidad a confirmar). El escalón "Salón privado" lleva a /private-dining.
  - 03 Detalle de "Mesa de festejo" y de "Exclusividad total".
  - 04 Menús de evento: establecido, personalizado, formal/cocktail, islas gastronómicas.
  - 05 Adicionales: DJ, ambientación y flores, coordinación, limousine siempre a consultar.
  - 06 Productos Paul Roger: flores, chocolate belga, pistacho de Mendoza → /reservar con el producto tildado.
  - 07 Formulario de consulta, con el escalón elegido ya precargado.
  - El DJ (servicio del evento) NUNCA se mezcla con la agenda de música en vivo (contenido del restaurante).
- **/private-dining:**
  - Apertura.
  - Qué es: hasta 16 personas, TV, aire acondicionado, privacidad.
  - Dos usos: cenas y celebraciones íntimas, y reuniones de trabajo o coworking combinables con el menú ejecutivo de lunes a viernes.
  - Menús y adicionales disponibles (link a /eventos#menus).
  - Formulario de consulta con el escalón "Salón privado" precargado.
- **/nosotros:**
  - La historia: dos amigos, el campo y la buena comida ("alrededor de una mesa pasan cosas importantes").
  - Misión y valores en tono de marca, breve. No es una página de RRHH.
  - Cierra con RESERVAR.
- **/reservar:**
  1. Cuatro tabs: Mesa · Evento · Limousine · Menú ejecutivo. Se preseleccionan desde la URL (?tipo=, ?extra=).
  2. Mesa: fecha, horario, cantidad de personas, sector (Salón o Barra, sin VIP), ocasión y a nombre de quién.
  3. Complementos (flores, chocolates, pistachos, limousine): solo aparecen si la ocasión es Aniversario, Cumpleaños o Celebración. Se aclara "se abona en la mesa".
  4. Resumen de todo lo elegido y el total de los complementos.
  5. Confirmación.
  - Evento es EL MISMO componente de formulario que el de /eventos y /private-dining: una sola fuente de verdad.
  - Limousine pide trayecto, horario y pasajeros, y siempre es una consulta.
  - Menú ejecutivo es el formulario más corto: día, horario y cantidad de personas.

**Acción primaria por página:**
- Home, La Casa, Carta, Nosotros → Reservar.
- Eventos y Private Dining → Consulta de evento.
- Reservar → Confirmar.

## 5. Contenido e inventario
**Carta:** son fotos de la carta impresa con precios de septiembre de 2026, en `Imagenes menu/` (8 JPG de WhatsApp). Hay que transcribirla a un archivo de datos estructurado (JSON/TS por sección → subcategoría → ítem, precio). La carta es la fuente de los precios reales. No se inventa ningún plato ni ningún precio. El prototipo de carta del socio es la base de la UI.

**Complementos (precios de la carta):**
- Bombones belgas: 6 / 12 / 20 unidades → $19.900 / $36.900 / $59.000.
- Ramo floral pequeño / grande → $18.900 / $30.000.
- Pistachos premium de altura → $29.000.
- Salón privado y limousine → a consultar.

**Eventos:** el texto sale de `Paul_Roger_Servicios_y_Eventos (1).docx`, que trae los escalones, los menús de evento, los adicionales y los productos. El documento tiene erratas: el nombre correcto es "Pistachos premium de altura", no "Pistache". Se corrigen al usarlo.

**Historia / tono:** del documento de cultura del cliente (Capacitación Nº 1, Consultoría Mentor):
- Misión: "Crear experiencias gastronómicas únicas y memorables, integrando excelencia, hospitalidad y calidez humana".
- Valores: hospitalidad, excelencia, respeto, compromiso, trabajo en equipo, pasión.
- El recorrido del cliente de 10 pasos empieza en la Reserva.

**Fotos (carpeta `img/`, auditadas el 25/09):**
- Casi todas vienen de Instagram o WhatsApp: 1440px como máximo y con mucha compresión.
- Listas para usar (solo falta exportarlas a AVIF/WebP):
  - `591147118…`: bife con copa, la mejor foto de producto.
  - `660997074…`: cava con mozo.
  - `669630515…`: etiquetas de vino.
- Hay que retocar el resto. Tener cuidado con `foto_hero_desktop.jfif`, porque el agrandado con IA deformó el neón "Paul Roger".
- Descartadas:
  - `642608666`, `656274139`, `641658784` (collage).
  - Las capturas de historias de Instagram.
  - `IMG_5026`, `IMG_4892` (se ve una patente).
  - La foto de la pareja cenando: son clientes reales y no hay consentimiento. NO usarla.
- Tamaños que necesita el sitio: hero de ~2560px, secciones de ~1600px, cards de ~1200px. Se exporta en AVIF y WebP con srcset.
- Faltan: el Salón Privado, algún cóctel en buena resolución, la fachada de día y guarniciones. Mientras tanto va un placeholder marcado, tratado en oscuro.
- REGLA: después de mejorar cualquier foto, revisar que el texto de la marca (neón, servilletas, sello del flan) no esté deformado.

**Datos de marca:**
- Dirección: Calle 47 6750, Polo Design, Guillermo E. Hudson, Buenos Aires.
- Mail: reservas@paulroger.com.ar.
- Instagram: @paulroger.hudson.
- Dominio: paulroger.com.ar (falta el acceso).
- Logos: se usan los del manual hasta que lleguen los vectoriales (.svg) en sus 4 versiones.

**Datos que FALTAN** (van como placeholder visible `[FALTA: …]`, nunca inventados):
- Horarios por servicio.
- Días y precio del menú ejecutivo.
- Grilla de música en vivo. Hasta que llegue, la agenda va con fechas de ejemplo marcadas como tal.
- Precio por persona de los menús de evento, costo del DJ y de las islas.
- Si el salón privado se alquila por hora o por evento, y el mínimo de consumo.
- La capacidad del espacio completo.
- Si la limousine es propia o tercerizada y qué incluye.
- La anticipación mínima y si se pide seña en los eventos.

## 6. Stack y restricciones
**Stack:** propuesta, a confirmar con el socio.
- Next.js (App Router) + TypeScript, con CSS basado en tokens (variables CSS del manual).
- GSAP + ScrollTrigger solo para el scrollytelling y los reveals.
- Imágenes con next/image, en AVIF/WebP.
- Fuentes con next/font: Montserrat y Prata. IvyMode por Adobe Fonts si se confirma.

**Etapa 1 (maqueta):**
- Sin backend.
- La carta, la agenda, los eventos y los complementos viven en archivos de datos tipados (/data). Tienen que estar pensados para migrar a una base de datos sin tocar los componentes.
- Los formularios validan y muestran la pantalla de confirmación, pero NO envían ni guardan nada.
- Una barra fija discreta avisa que es una maqueta.

**Etapa 2 (según el plan que elijan, no se construye ahora):**
- Supabase (Postgres + auth) para las reservas y el panel.
- Resend para el correo de confirmación con la identidad de la casa y el aviso de nueva reserva al equipo.
- Botón de WhatsApp dentro del panel, para escribirle al cliente.
- Carta y agenda editables por el equipo.
- El panel tiene que ser autoexplicativo: se usa entre pedido y pedido con el local lleno. Si necesita manual, está mal hecho.

**Integraciones:**
- Ninguna en la Etapa 1.
- En la Etapa 2: Google Business Profile, SEO local, analítica simple (Vercel Analytics).

**Hosting / dominio:** Vercel. La Etapa 1 se publica en un link de preview para mandar con el presupuesto. Después va a paulroger.com.ar (falta el acceso al dominio).

**No negociables:**
- Mobile-first.
- Contraste AA (ver la aclaración del rojo en la sección 3).
- Targets de 44px o más.
- LCP menor a 2.5s en 4G, con el hero optimizado y sin video pesado.
- prefers-reduced-motion respetado.
- HTML semántico y navegable por teclado.

**Qué NO usar:**
- Pasarela de pago, carrito ni stock online: los complementos se pagan en la mesa y la venta suelta sería otro proyecto.
- Widget flotante de WhatsApp, mapa embebido, formulario de contacto.
- PDF de carta.
- Librerías de componentes con look genérico (shadcn por defecto, Bootstrap).
- Carruseles automáticos.
- Fotos de stock.
- Lorem ipsum.

## 7. Plan de construcción
**ETAPA 1 — Maqueta navegable (lo que se manda con el presupuesto)**
1. Scaffold de Next.js + tokens del manual (colores, tipografías, espaciado) + fuentes + modelos de datos en /data (carta transcrita, complementos, agenda de ejemplo, escalones de eventos).
2. Layout base: header (transparente → sólido, menú mobile a pantalla completa), footer con contacto, barra de "maqueta".
3. Home · Hero.
4. Home · La Casa (Barra · VIP · Música).
5. Home · Servicios con scrollytelling, más el fallback mobile y reduced-motion.
6. Home · Eventos / Complementos (banner 1 + banner 2 con las cards desplegables).
7. Home · Contacto / Footer, y revisión completa de la home en 375px y 1440px.
8. /reservar: tabs, preselección por URL, complementos según la ocasión, resumen y confirmación sin envío.
9. /carta: portar el prototipo del socio con los datos reales, filtros, tabs sticky y scroll continuo en mobile.
10. /eventos (con el formulario compartido con /reservar).
11. /private-dining.
12. /la-casa (con los anclas #salon, #barra, #musica).
13. /nosotros.
14. SEO base: metadata, Open Graph, schema Restaurant, sitemap.xml, 404 con identidad.
15. Deploy de preview en Vercel y pasada final de QA.

**ETAPA 2 (después de que el cliente elija el plan):** backend de reservas, panel, correos, carta editable. Se escribe un brief aparte cuando el alcance esté confirmado.

## 8. Definición de “terminado”
- Se le corrió ux-audit al sitio y todos los 🔴 están resueltos.
- Pasa el test de los 5 segundos: se entiende qué es Paul Roger y dónde se reserva.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, LCP < 2.5s. En Core Web Vitals, CLS < 0.1.
- Todos los links y anclas funcionan, incluida la preselección (?tipo=, ?extra=) y el escalón precargado en los formularios.
- Sin scroll horizontal en 375px. El menú mobile y los CTAs se tocan bien con el pulgar.
- No hay precios, platos, fechas ni testimonios inventados. Cada dato que falta se ve como `[FALTA: …]`, y la agenda de ejemplo está rotulada.
- Ninguna foto muestra el logo deformado, clientes reconocibles ni patentes.
- VIP y Private Dining se leen como el mismo espacio en todo el sitio.
- La maqueta está publicada en un link de preview y la revisamos los dos socios antes de mandarla.

## Notas sueltas (volcado)
**Documentos de contexto en la carpeta del proyecto:**
- `briefing-paul-roger.html`: todo el análisis del negocio, la identidad, las referencias y las preguntas pendientes.
- `mapa-del-sitio.html` (versión del 14/09, reemplazada por el wireframe en el sitemap).
- `estructura-eventos.html`: el detalle de /eventos.
- `presupuesto-paul-roger.html`: los planes.
- `paul_roger_wireframe_home.html`: la estructura de la home que manda.
- Anteproyecto anterior de la home: `anteproyecto-paul-roger.html`. Sirve como referencia de tono y de motor de reservas, pero sus decisiones de estructura quedaron viejas.

**Planes de la propuesta (15/09):** Presencia USD 400 · Experiencia USD 680 (recomendado) · Autonomía USD 900, más un abono de USD 25/mes. La maqueta tiene que mostrar el alcance del plan Experiencia.

**Pendiente de pedir al cliente:** accesos al dominio, logos en vectorial, confirmación de Creative Cloud (IvyMode), carta en texto editable, fotos originales (sobre todo del Salón Privado), horarios y quién va a recibir las reservas.

**Redes:** las maneja una amiga del equipo por separado. No competimos con ella: coordinamos la lista de tomas que necesitamos (fachada de noche, barra, salón privado vacío, plato cenital, limousine).

---

## Reglas fijas para Claude Code (la ley)
1. Seguí la dirección de diseño al pie. Si una decisión no está definida, preguntá antes de inventar — no tires el default genérico.
2. Mobile-first siempre.
3. Una acción primaria dominante por pantalla.
4. No inventes contenido: sin contenido real, dejá un placeholder marcado, nunca datos/precios/testimonios falsos.
5. Construí de a una sección y no avances sin mi confirmación.
6. Cada decisión sirve al objetivo del sitio. Lo que no aporta a la acción primaria, sobra.
7. Accesibilidad y performance no son opcionales: contraste AA, targets ≥44px, imágenes optimizadas.
8. Cuando termines una sección, recordame correrle la skill ux-audit antes de seguir.

---
### Handoff
Leé este brief completo: es la ley de este proyecto. Empezá por el paso 1 del plan de construcción y no avances de sección sin que confirme.