import type { ItemCarta, SeccionCarta, TipoWhisky, Uva, Vino, Whisky } from './tipos'

/**
 * Carta de Paul Roger, transcrita de las 8 fotos de la carta impresa
 * (Imagenes menu/, precios de septiembre de 2026). No hay platos ni precios
 * agregados: lo que no se lee en las fotos está marcado con `falta` o `verificar`.
 *
 * Correcciones de transcripción: tildes y erratas evidentes ("Quesp", "rusticas",
 * "caramelilzados", "Saint Felicient"). El nombre de las subcategorías sigue la
 * carta impresa, salvo "Sushi", que se abrió en tres grupos para leerlo mejor en
 * el celular, y "Aperitivos", que figura en las dos cartas y se unificó.
 */

export const SERVICIO_DE_MESA = 3500
export const FECHA_PRECIOS = 'septiembre de 2026'

/**
 * Menú ejecutivo, transcrito del Instagram de la casa (flyer, septiembre de 2026).
 * El precio de cada opción ya incluye el servicio de mesa: no se le suma aparte.
 * "Postre" se lee como opciones a elegir, no como un combo con las tres cosas.
 */
export const MENU_EJECUTIVO = {
  horario: 'Lunes a viernes, de 12 a 16 h',
  opciones: [
    { id: 'milanesa-napolitana-eje', nombre: 'Milanesa a la napolitana', descripcion: 'Con papas españolas', precio: 30000 },
    { id: 'pollo-grillado-eje', nombre: 'Pollo grillado', descripcion: 'Con papas plomo', precio: 30000 },
    { id: 'sushi-burger-eje', nombre: 'Sushi burger', descripcion: 'Opción de sushi', precio: 32000 },
  ],
  postres: ['Cheesecake', 'Frutillas con crema', 'Tiramisú'],
  incluye: 'Incluye servicio de mesa, principal, bebida sin alcohol, postre y café.',
  descuentoEfectivo: 20,
}

const item = (id: string, nombre: string, precio: number | null, extra: Partial<ItemCarta> = {}): ItemCarta => ({
  id,
  nombre,
  precio,
  ...extra,
})

const vino = (id: string, bodega: string, etiqueta: string, uva: Uva, precio: number | null, extra: Partial<Vino> = {}): Vino => ({
  id,
  nombre: etiqueta ? `${bodega} — ${etiqueta}` : bodega,
  bodega,
  etiqueta,
  uva,
  precio,
  ...extra,
})

const whisky = (id: string, nombre: string, origen: string, tipo: TipoWhisky, descripcion: string, precio: number | null, extra: Partial<Whisky> = {}): Whisky => ({
  id,
  nombre,
  origen,
  tipo,
  descripcion,
  precio,
  ...extra,
})

/* ================================================================ COCINA */

const cocina: SeccionCarta = {
  id: 'cocina',
  titulo: 'Cocina',
  bajada: 'Entradas para compartir, fuertes y achuras, platos, guarniciones y postres de la casa.',
  subcategorias: [
    {
      id: 'entradas',
      titulo: 'Entradas',
      items: [
        item('empanada-paul-roger', 'Empanada Paul Roger', 5900, { descripcion: 'Blend de ternera.' }),
        item('papa-de-la-toscana', 'Papa de la Toscana', 10900, { descripcion: 'Papa asada. Cebolla caramelizada. Panceta. Queso provolone.' }),
        item('provoleta-de-la-casa', 'Provoleta de la casa', 19900, { descripcion: 'Queso provoleta. Cherrys confitados. Rúcula fresca.' }),
        item('papas-paul-roger', 'Papas Paul Roger', 18900, { descripcion: 'Papas rústicas. Doble queso. Panceta. Verdeo.' }),
        item('el-chori-de-paul', 'El Chori de Paul', 22500, { descripcion: 'Pan de campo. Chorizo. Provoleta. Rúcula fresca. Tomates secos.' }),
        item('laja-de-fiambres', 'Laja de fiambres', 39000, {
          descripcion: 'Queso Mar del Plata. Queso azul. Lomito. Jamón cocido. Jamón ibérico. Salamín. Mortadela. Cherry. Olivas verdes y negras.',
        }),
      ],
    },
    {
      id: 'entre-panes',
      titulo: 'Entre panes',
      items: [
        item('bagel-de-salmon', 'Bagel de salmón', 21900, { descripcion: 'Salmón. Queso philadelphia. Alcaparras. Rúcula. Palta.' }),
        item('croissant', 'Croissant', 5900, { descripcion: 'Croissant artesanal laminado.' }),
        item('croissant-relleno', 'Croissant relleno', 10900, { descripcion: 'Jamón cocido. Queso feta.' }),
        item('croissant-avocado', 'Croissant avocado', 12900, { descripcion: 'Huevo revuelto. Palta. Queso feta. Queso philadelphia.' }),
        item('bruschetta-1', 'Bruschetta 1', 12900, { descripcion: 'Pan tostado. Queso philadelphia. Jamón ibérico. Queso azul. Manzana verde.' }),
      ],
    },
    {
      id: 'guarniciones',
      titulo: 'Guarniciones',
      items: [
        item('papas-fritas', 'Papas fritas', 9900, { descripcion: 'Bastones de papa.' }),
        item('pure-de-papas', 'Puré de papas', 9900),
        item('morrones-asados', 'Morrones asados', 10900, { descripcion: 'Morrón. Ajo. Oliva. Maní.' }),
        item('ensalada-de-la-casa', 'Ensalada de la casa', 9000, { descripcion: 'Mézclum de hojas verdes. Parmesano. Frutos secos. Vinagreta de mostaza.' }),
        item('rucula-y-parmesano', 'Rúcula y parmesano', 10900, { descripcion: 'Rúcula fresca. Queso parmesano.' }),
        item('carpaccio-de-pepinos', 'Carpaccio de pepinos', 8500, { descripcion: 'Pepinos. Alioli de jengibre. Vinagreta oriental. Pickles. Maíz frito.' }),
        item('espinacas-a-la-italiana', 'Espinacas a la italiana', 8500, { descripcion: 'Espinacas. Queso parmesano. Polvo de panceta. Pistachos.' }),
        item('verdes-de-la-finca', 'Verdes de la finca', 15900, { descripcion: 'Brócoli. Crema de quesos. Ajo asado. Jamón ibérico. Pangrattato.' }),
      ],
    },
    {
      id: 'fuertes',
      titulo: 'Fuertes',
      items: [
        item('cochinillo-entero', 'Cochinillo entero', 290000, { detalle: 'para 6 personas · con reserva' }),
        item('entrana', 'Entraña', 38000),
        item('asado-banderita', 'Asado banderita', 28000),
        item('vacio', 'Vacío', 29000),
        item('ojo-de-bife', 'Ojo de bife', 39000, { detalle: '450 g' }),
        item('bife-de-chorizo', 'Bife de chorizo', 34000, { detalle: '450 g' }),
        item('pollo-de-campo', 'Pollo de campo deshuesado', 29000),
      ],
    },
    {
      id: 'achuras',
      titulo: 'Achuras',
      items: [
        item('rinon', 'Riñón', 13900),
        item('chorizo', 'Chorizo', 8900),
        item('morcilla', 'Morcilla', 7500),
        item('chinchulin', 'Chinchulín', 11900),
        item('molleja', 'Molleja', 29000),
        item('tabla-de-achuras', 'Tabla de achuras', 59000, { descripcion: 'Una porción de cada una de nuestras achuras.' }),
      ],
    },
    {
      id: 'platos',
      titulo: 'Platos',
      items: [
        item('hamburguesa-paul-roger', 'Hamburguesa Paul Roger', 35000, {
          descripcion: 'Medallón de blend de ternera. Queso cheddar. Panceta. Tomate. Lechuga. Pepinillos. Aderezo. Cebolla morada. Pan de papa. Papas fritas.',
        }),
        item('milanesa', 'Milanesa', 29000, { descripcion: 'De bife de chorizo. Tallarines a la manteca.' }),
        item('ribs-americana', 'Ribs americana', 39000, { descripcion: 'Costillas de cerdo. Barbacoa. Ensalada coleslaw. Papas fritas.' }),
        item('ensalada-caesar', 'Ensalada Caesar', 19900, { descripcion: 'Lechuga. Queso parmesano. Croutones. Aderezo caesar. Pollo asado.' }),
      ],
    },
    {
      id: 'kids',
      titulo: 'Kids',
      nota: 'Incluye bebida y flan de la casa.',
      items: [
        item('hamburguesita-pr', 'Hamburguesita PR', 29000, { descripcion: 'Medallón de blend de ternera. Queso cheddar. Pan de papa. Papas fritas.' }),
        item('pollo-crocante', 'Pollo crocante', 25000, { descripcion: 'Bastoncitos de pollo rebozados. Puré de papas.' }),
      ],
    },
    {
      id: 'postres',
      titulo: 'Postres',
      items: [
        item('acai', 'Açaí', 14900, { descripcion: 'Helado de açaí. Banana. Merengue. Pistachos garrapiñados.' }),
        item('oda-a-la-toscana', 'Oda a la Toscana', 15500, { descripcion: 'Mousse de chocolate. Almendras caramelizadas.' }),
        item('flan-de-la-casa', 'Flan de la casa', 12900, { descripcion: 'Flan de dulce de leche. Crema de limas.' }),
        item('legado-de-la-abuela', 'Legado de la abuela', 12900, { descripcion: 'Crème brûlée.' }),
        item('sinfonia-de-campo', 'Sinfonía de campo', 9000, { descripcion: 'Queso fresco. Dulce de batata. Pistachos caramelizados.' }),
        item('key-lime-pie', 'Key lime pie', 14900, { descripcion: 'Base crocante. Cremoso de lima. Crema chantilly.' }),
        item('torta-de-chocolate', 'Torta de chocolate', 15900, { descripcion: 'Base húmeda de chocolate. Ganache de chocolate.' }),
        item('torta-nube', 'Torta nube', 13900, { descripcion: 'Bizcocho húmedo de vainilla. Dulce de leche. Crema chantilly. Pistachos caramelizados.' }),
      ],
    },
  ],
}

/* ================================================================ SUSHI */

const sushi: SeccionCarta = {
  id: 'sushi',
  titulo: 'Sushi',
  bajada: 'Niguiris, sashimi, rolls de autor, bowls, tiraditos y lajas a elección del sushiman.',
  subcategorias: [
    {
      id: 'niguiris-y-sashimi',
      titulo: 'Niguiris y sashimi',
      items: [
        item('niguiri-salmon', 'Niguiri de salmón', 12900, { detalle: '3 piezas', descripcion: 'Lomo de salmón fresco. Arroz avinagrado.' }),
        item('niguiri-atun-rojo', 'Niguiri de atún rojo', 12900, { detalle: '3 piezas', descripcion: 'Atún rojo. Arroz avinagrado.' }),
        item('niguiri-pesca-blanca', 'Niguiri de pesca blanca', 12900, { detalle: '3 piezas', descripcion: 'Pesca blanca. Arroz avinagrado.' }),
        item('sashimi-salmon', 'Sashimi de salmón', 24500, { detalle: '6 piezas', descripcion: 'Cortes finos de salmón fresco.' }),
        item('sashimi-mixto', 'Sashimi mixto', 21900, { detalle: '6 piezas', descripcion: 'Salmón. Atún rojo. Pesca blanca.' }),
      ],
    },
    {
      id: 'geishas-y-rolls',
      titulo: 'Geishas y rolls',
      items: [
        item('geishas-salmon', 'Geishas de salmón', 19500, { detalle: '5 piezas', descripcion: 'Salmón fresco. Palta. Queso philadelphia.' }),
        item('geishas-langostinos', 'Geishas de langostinos', 17500, { detalle: '5 piezas', descripcion: 'Langostinos empanizados. Palta. Salmón fresco.' }),
        item('roll-paul', 'Roll Paul', 17900, { detalle: '5 piezas', descripcion: 'Salmón. Queso phila. Palta. Arroz. Alga nori. Sésamo tostado.' }),
        item('roll-roger', 'Roll Roger', 17900, { detalle: '5 piezas', descripcion: 'Langostinos crocantes. Queso phila. Arroz. Mango. Maracuyá.' }),
        item('roll-gusgus', 'Roll Gusgus', 17900, { detalle: '5 piezas', descripcion: 'Langostinos. Palta. Queso phila. Arroz. Salmón. Salsa teriyaki. Lima.' }),
        item('roll-lauri', 'Roll Lauri', 16500, { detalle: '5 piezas', descripcion: 'Zanahoria glaseada. Tofu. Hongos. Arroz. Palta. Salsa vegana.' }),
        item('roll-soni', 'Roll Soni', 19500, { detalle: '5 piezas', descripcion: 'Tamago. Salmón. Queso phila. Verdeo. Remolacha frita.' }),
        item('grill-roll', 'Grill roll', 19500, { detalle: '5 piezas', descripcion: 'Salmón grillado. Queso phila. Boniato. Palta. Arroz. Alga nori. Salsa ácida. Verdeo.' }),
        item('chilli-roll', 'Chilli roll', 19500, { detalle: '5 piezas', descripcion: 'Salmón. Queso phila. Mango. Arroz. Alga nori. Salsa de maracuyá. Sriracha. Boniato frito.' }),
        item('pistachio-roll', 'Pistachio roll', 20500, {
          detalle: '5 piezas',
          descripcion: 'Langostinos crocantes. Queso phila. Gírgolas grilladas. Arroz. Alga nori. Pesca blanca. Salsa nikkei. Pistachos caramelizados.',
        }),
      ],
    },
    {
      id: 'bowls-y-tiraditos',
      titulo: 'Bowls y tiraditos',
      items: [
        item('poke-bowl-nella', 'Poke bowl Nella', 30000, { descripcion: 'Arroz. Palta. Queso phila. Salmón. Mango. Tomates cherry. Batata frita. Sésamo tostado.' }),
        item('poke-bowl-pr', 'Poke bowl PR', 27500, {
          descripcion: 'Arroz. Langostinos fritos. Queso phila. Palta. Pickles de pepino, zanahoria y cebolla. Boniato frito. Sésamo tostado.',
        }),
        item('tiradito-nikkei', 'Tiradito nikkei', 21500, { descripcion: 'Pesca blanca. Salsa nikkei. Láminas de rabanito. Verdeo. Maíz frito. Aceite de cilantro.' }),
        item('tiradito-de-salmon', 'Tiradito de salmón', 23500, { descripcion: 'Salmón. Salsa de maracuyá y naranja. Boniato frito. Pistachos caramelizados. Verdeo.' }),
      ],
    },
    {
      id: 'lajas',
      titulo: 'Lajas',
      nota: 'A elección del sushiman.',
      items: [
        item('laja-15', 'Laja', 48000, { detalle: '15 piezas' }),
        item('laja-30', 'Laja', 95000, { detalle: '30 piezas' }),
        item('laja-45', 'Laja', 139000, { detalle: '45 piezas' }),
      ],
    },
  ],
}

/* ================================================================ BARRA */

const whiskies: Whisky[] = [
  whisky('ballantines-finest', 'Ballantine’s Finest', 'Dumbarton, Escocia', 'blended', 'Suave y equilibrado, con notas de miel, vainilla y leve toque floral.', 4600),
  whisky('ballantines-7', 'Ballantine’s 7 años', 'Dumbarton, Escocia', 'blended', 'Caramelo y miel con un final ligeramente ahumado.', 6500),
  whisky('jw-red-label', 'Johnnie Walker Red Label', 'Kilmarnock, Escocia', 'blended', 'Vibrante, picante, ligero, con notas a canela y un final ahumado.', 4200),
  whisky('jw-black-label', 'Johnnie Walker Black Label', 'Kilmarnock, Escocia', 'blended', 'Ahumado, redondo y complejo, con tonos de roble tostado y frutos secos.', 7500),
  whisky('jw-double-black', 'Johnnie Walker Double Black', 'Kilmarnock, Escocia', 'blended', 'Expresivo y aromático, con turba marcada, notas de café, cacao y vainilla.', 9500),
  whisky('jw-gold-label', 'Johnnie Walker Gold Label', 'Kilmarnock, Escocia', 'blended', 'Sedoso y elegante, con miel, vainilla y un final cremoso.', 20500),
  whisky('jw-18', 'Johnnie Walker 18 años', 'Kilmarnock, Escocia', 'blended', 'Aromas de caramelo, frutos secos y madera especiada; final largo y cálido.', 26000),
  whisky('jw-blue-label', 'Johnnie Walker Blue Label', 'Kilmarnock, Escocia', 'blended', 'Abarcativo y aterciopelado, con notas de miel, cacao y sutiles notas a turba.', 83000),
  whisky('chivas-12', 'Chivas Regal 12 años', 'Keith, Escocia', 'blended', 'Dulce y afrutado, con toques de miel, manzana y manteca.', 8000),
  whisky('chivas-mizunara', 'Chivas Regal Mizunara', 'Keith, Escocia', 'blended', 'Exótico, con suaves notas de roble japonés, miel y almendra.', 15800),
  whisky('chivas-extra', 'Chivas Regal Extra', 'Keith, Escocia', 'blended', 'Intenso y afrutado, con matices de pasas, canela y roble especiado.', 11500),
  whisky('grants', 'Grant’s', 'Girvan, Escocia', 'blended', 'Suave y equilibrado, con miel y un final de caramelo tostado.', 6500),
  whisky('monkey-shoulder', 'Monkey Shoulder', 'Dufftown, Escocia', 'pure-malt', 'Aromático y redondo, con vainilla, frutas y un toque de malta tostada.', 24000),
  whisky('jw-green-label', 'Johnnie Walker Green Label', 'Kilmarnock, Escocia', 'pure-malt', 'Herbal y balanceado, con notas de humo leve, madera y miel.', 33000),
  whisky('glenfiddich-12', 'Glenfiddich 12 años', 'Dufftown, Escocia', 'single-malt', 'Fresco y frutal, ligero: fruta blanca, roble y un final a malta levemente dulce.', 24500),
  whisky('singleton-18', 'Singleton 18 años', 'Dufftown, Escocia', 'single-malt', 'Delicado, con aromas a madera nueva, sedoso, notas a miel, frutos secos, caramelo y café. Final persistente.', 14500),
  whisky('macallan-12', 'Macallan 12 años', 'Craigellachie, Escocia', 'single-malt', 'Sutil, con aromas a madera y frutos secos. En boca es elegante, delicado y untuoso: caramelo, fruta, madera y ahumado.', 25500),
  whisky('jameson', 'Jameson', 'Dublín, Irlanda', 'irlanda', 'Aterciopelado, con miel, cereal tostado y un toque especiado.', 6000),
  whisky('jameson-black-barrel', 'Jameson Black Barrel', 'Midleton, Irlanda', 'irlanda', 'Cremoso, notas a vainilla, frutos secos y madera tostada.', 10500),
  whisky('tullamore-dew', 'Tullamore D.E.W.', 'Tullamore, Irlanda', 'irlanda', 'Ligero y floral, miel, almendra y un final delicado.', 11000),
  whisky('shankys-whip', 'Shanky’s Whip', 'Dublín, Irlanda', 'irlanda', 'Notas a especias dulces, tostado, untuoso, caramelo y malta tostada.', 11500),
  whisky('jack-daniels', 'Jack Daniel’s', 'Lynchburg, Tennessee, EE. UU.', 'estados-unidos', 'Ahumado y dulce, con vainilla, roble, banana y cerezas.', 10000),
  whisky('jim-beam-white', 'Jim Beam White', 'Clermont, Kentucky, EE. UU.', 'estados-unidos', 'Suave, con notas de maíz dulce, caramelo y vainilla.', 8000),
  whisky('jim-beam-black', 'Jim Beam Black', 'Clermont, Kentucky, EE. UU.', 'estados-unidos', 'Ahumado, seco y con aromas marcados a madera, seguido de notas a vainilla y café.', 13700),
  whisky('makers-mark', 'Maker’s Mark', 'Loretto, Kentucky, EE. UU.', 'estados-unidos', 'Dulce y aterciopelado, con miel, toffee y roble suave.', 16500),
  whisky('tx-bourbon', 'TX Bourbon', 'Fort Worth, Texas, EE. UU.', 'estados-unidos', 'Aromático, con vainilla, coco y roble americano.', null, {
    falta: 'nombre y precio: cortados en la foto de la carta',
    verificar: 'Se lee "…X (Fort Worth, Texas, EE.UU.)" y "$12…". El nombre "TX Bourbon" es una deducción.',
  }),
]

export const TIPOS_WHISKY: { id: TipoWhisky; titulo: string }[] = [
  { id: 'blended', titulo: 'Blended Scotch' },
  { id: 'pure-malt', titulo: 'Pure Malt' },
  { id: 'single-malt', titulo: 'Single Malt' },
  { id: 'irlanda', titulo: 'Irlanda' },
  { id: 'estados-unidos', titulo: 'Estados Unidos' },
]

const barra: SeccionCarta = {
  id: 'barra',
  titulo: 'Barra',
  bajada: 'Coctelería de autor y clásica, aperitivos, whiskies, cervezas, opciones sin alcohol y cafetería.',
  subcategorias: [
    {
      id: 'cocteleria-de-autor',
      titulo: 'Coctelería de autor',
      items: [
        item('cocktail-paul-roger', 'Paul Roger', 18000, { descripcion: 'Whisky, ron añejo, frutos secos, chocolate blanco, óleo de banana casero.' }),
        item('wasabi-roger', 'Wasabi Roger', 16000, { descripcion: 'Whisky, miel de jengibre, wasabi, limón.' }),
        item('caricia-al-paladar', 'Caricia al paladar', 16000, { descripcion: 'Aperol, vodka, maracuyá, limón, naranja.' }),
        item('sbagliato-bianco', 'Sbagliato bianco', 15000, { descripcion: 'Campari, vermouth bianco, cordial de vino blanco, pera y manzana, espumante.' }),
        item('se-te-calienta-el-pico', 'Se te calienta el pico', 16000, { descripcion: 'Vodka, malbec, almíbar de frutos rojos, dressing de frambuesa, soda.' }),
        item('blanco-toscano', 'Blanco toscano', 15000, { descripcion: 'Ron, almíbar de manzanilla y lavanda, vino blanco, jugo de pomelo, limón, sal de jengibre.' }),
        item('negroni-de-la-casa', 'Negroni de la casa', 16000, {
          descripcion: 'Gin, Campari, vermouth y macerados naturales.',
          verificar: 'El pie de la foto está cortado: precio "$16.0…" y descripción "…n, campari, vermouth, macerados de …as naturales".',
        }),
      ],
    },
    {
      id: 'cocteleria-clasica',
      titulo: 'Coctelería clásica',
      items: [
        item('gimlet', 'Gimlet', 13000, { descripcion: 'Beefeater gin, lima, almíbar.' }),
        item('french-75', 'French 75', 13000, { descripcion: 'Gordon’s gin, lima, almíbar, vino espumoso.' }),
        item('rusty-nail', 'Rusty nail', 13000, { descripcion: 'Chivas 12 años, Drambuie.' }),
        item('penicillin', 'Penicillin', 13000, { descripcion: 'Chivas 12 años, limón, miel de jengibre.' }),
        item('margarita', 'Margarita', 13000, { descripcion: 'Tequila José Cuervo, Cointreau, limón.' }),
        item('caipiroska', 'Caipiroska', 13000, { descripcion: 'Smirnoff, lima macerada con almíbar.' }),
        item('mojito', 'Mojito', 12000, { descripcion: 'Havana Club 3 años, limón, menta, azúcar.' }),
        item('negroni', 'Negroni', 14000, { descripcion: 'Beefeater gin, Campari, vermouth rosso.' }),
        item('boulevardier', 'Boulevardier', 14000, { descripcion: 'Texas bourbon, Campari, vermouth rosso.' }),
        item('old-fashioned', 'Old fashioned', 14000, { descripcion: 'Texas bourbon, almíbar, amaro Angostura.' }),
        item('manhattan', 'Manhattan', 14000, { descripcion: 'Texas bourbon, vermouth rosso, amaro Angostura.' }),
      ],
    },
    {
      id: 'aperitivos',
      titulo: 'Aperitivos',
      items: [
        item('ramazzotti-sour', 'Ramazzotti sour', 12000, { descripcion: 'Ramazzotti, jugo de limón, almíbar.' }),
        item('aperol-spritz', 'Aperol spritz', 12000, { descripcion: 'Aperol, Chandon Extra Brut, soda.' }),
        item('gin-and-tonic', 'Gin and tonic', 12000, { descripcion: 'Beefeater gin, tónica, limón / pepino / naranja / lima.' }),
        item('lemon-drop', 'Lemon drop', 11000, { descripcion: 'Absolut, Cointreau, lima.' }),
        item('garibaldi', 'Garibaldi', 11000, { descripcion: 'Campari, jugo de naranja.' }),
        item('fernet', 'Fernet', 11000, { descripcion: 'Nada que explicar.' }),
        item('amargo-obrero', 'Amargo obrero', 12000, { descripcion: 'Amargo Obrero, pomelo, soda.' }),
        item('cynar-julep', 'Cynar julep', 10000, { descripcion: 'Cynar, menta, pomelo, soda.' }),
        item('vermouth', 'Vermouth', 10000, {
          descripcion: 'Vermouth, splash de soda.',
          verificar: 'La carta de barra dice "Vermouth" a $10.000 y la de cocina "Martini Rosso" a $12.000.',
        }),
        item('martini-rosso', 'Martini Rosso', 12000, { descripcion: 'Vermouth, splash de soda.' }),
      ],
    },
    {
      id: 'whiskies',
      titulo: 'Whiskies',
      tipo: 'whiskies',
      falta: 'la foto de la carta de whiskies está cortada al pie: puede haber más etiquetas',
      items: whiskies,
    },
    {
      id: 'cervezas',
      titulo: 'Cervezas',
      items: [
        item('stella-tirada', 'Stella Artois tirada', 10900),
        item('patagonia-lata', 'Patagonia', 9000, { detalle: 'lata' }),
        item('corona-porron', 'Corona', 9000, { detalle: 'porrón' }),
        item('stella-porron', 'Stella Artois', 9000, { detalle: 'porrón' }),
        item('michelob-ultra', 'Michelob Ultra', 9000, { detalle: 'porrón · sin gluten' }),
      ],
    },
    {
      id: 'mocktails',
      titulo: 'Tragos sin alcohol',
      items: [
        item('limonada', 'Limonada', 8900),
        item('exprimido-de-naranja', 'Exprimido de naranja', 8500),
        item('mocktail', 'Mocktail', 9900, { detalle: 'consultar' }),
      ],
    },
    {
      id: 'bebidas-sin-alcohol',
      titulo: 'Bebidas sin alcohol',
      items: [
        item('eco-sin-gas', 'Eco de los Andes sin gas', 4900, { detalle: '500 ml' }),
        item('eco-con-gas', 'Eco de los Andes con gas', 4900, { detalle: '500 ml' }),
        item('paso-de-los-toros', 'Paso de los Toros pomelo / tónica', 4900, { detalle: '235 ml' }),
        item('h2o', 'H2O pomelo / limoneto / manzana', 4900, { detalle: '500 ml' }),
        item('gaseosa-pepsi', 'Gaseosa línea Pepsi', 4900, { detalle: 'lata' }),
        item('stella-sin-alcohol', 'Stella Artois sin alcohol', 9000, { detalle: 'porrón' }),
      ],
    },
    {
      id: 'cafeteria',
      titulo: 'Cafetería',
      items: [
        item('ristretto', 'Ristretto', 5000),
        item('espresso', 'Espresso', 5000),
        item('espresso-cortado', 'Espresso cortado', 5200),
        item('espresso-con-crema', 'Espresso con crema', 5500),
        item('espresso-doble', 'Espresso doble', 6500),
        item('lagrima-pequena', 'Lágrima', 5500, { detalle: 'pequeña' }),
        item('lagrima-doble', 'Lágrima', 6500, { detalle: 'doble' }),
        item('cafe-con-leche', 'Café con leche', 6900, { detalle: 'doble' }),
        item('te', 'Té', 6500),
      ],
    },
  ],
}

/* ================================================================ VINOS */

const tintos: Vino[] = [
  vino('nicasia-red-blend', 'Nicasia', 'Red Blend', 'blend', 19800),
  vino('dv-catena-malbec-malbec', 'DV Catena', 'Malbec Malbec', 'malbec', 49000),
  vino('dv-catena-cabernet-malbec', 'DV Catena', 'Cabernet Malbec', 'blend', 36000),
  vino('dv-catena-pinot-pinot', 'DV Catena', 'Pinot Pinot', 'pinot-noir', 39000),
  vino('dv-catena-cabernet-cabernet', 'DV Catena', 'Cabernet Cabernet', 'cabernet-sauvignon', 49000),
  vino('dv-catena-syrah-syrah', 'DV Catena', 'Syrah Syrah', 'syrah', 39000),
  vino('catena-zapata-birth-of-cabernet', 'Catena Zapata', 'Birth of Cabernet', 'blend', 159000),
  vino('angelica-zapata-malbec', 'Angélica Zapata', 'Malbec', 'malbec', 60000),
  vino('angelica-zapata-merlot', 'Angélica Zapata', 'Merlot', 'merlot', 49000),
  vino('angelica-zapata-cabernet-sauvignon', 'Angélica Zapata', 'Cabernet Sauvignon', 'cabernet-sauvignon', 49000),
  vino('rutini-malbec', 'Rutini', 'Malbec', 'malbec', 49800),
  vino('rutini-cabernet-franc', 'Rutini', 'Cabernet Franc', 'cabernet-franc', 42900),
  vino('rutini-cabernet-malbec', 'Rutini', 'Cabernet Malbec', 'blend', 29000),
  vino('rutini-cabernet-franc-malbec', 'Rutini', 'Cabernet Franc Malbec', 'blend', 29000),
  vino('rutini-pinot-noir', 'Rutini', 'Pinot Noir', 'pinot-noir', 69000),
  vino('rutini-altamira-malbec', 'Rutini', 'Altamira Malbec', 'malbec', 85000),
  vino('rutini-antologia-xxxviii', 'Rutini', 'Antología XXXVIII Blend', 'blend', 80000),
  vino('luigi-bosca-malbec', 'Luigi Bosca', 'Malbec', 'malbec', 29000),
  vino('luigi-bosca-de-sangre-malbec', 'Luigi Bosca', 'De Sangre Malbec', 'malbec', 40000),
  vino('la-linterna-malbec', 'La Linterna', 'Malbec', 'malbec', 145000),
  vino('la-linterna-pinot-noir', 'La Linterna', 'Pinot Noir', 'pinot-noir', 145000),
  vino('salentein-pinot-noir', 'Salentein', 'Pinot Noir', 'pinot-noir', 35000),
  vino('sanguinaria-cabernet-franc', 'Sanguinaria', 'Cabernet Franc', 'cabernet-franc', 29000),
  vino('4-brotes-malbec', '4 Brotes', 'Malbec', 'malbec', 45000),
  vino('chupasangre-cabernet-sauvignon', 'Chupasangre', 'Cabernet Sauvignon', 'cabernet-sauvignon', 29000),
  vino('chupasangre-gran-corte', 'Chupasangre Gran Corte', 'Red Blend', 'blend', 29000),
  vino('chupasangre-malbec', 'Chupasangre', 'Malbec', 'malbec', 30000),
  vino('famiglia-bianchi-malbec', 'Famiglia Bianchi', 'Malbec', 'malbec', 19000),
  vino('alta-magnolia-malbec-syrah', 'Alta Magnolia', 'Malbec Syrah', 'blend', 19000),
  vino('pyros-limestone-hill-malbec', 'Pyros', 'Limestone Hill Malbec', 'malbec', 140000),
  vino('pyros-block-4-malbec', 'Pyros', 'Block Nº 4 Malbec', 'malbec', 25000),
  vino('pyros-syrah', 'Pyros', 'Syrah', 'syrah', 25000),
  vino('pyros-special-blend', 'Pyros', 'Special Blend', 'blend', 45000),
  vino('el-esteco-finca-notables-malbec', 'El Esteco', 'Finca Notables Malbec', 'malbec', 40000),
  vino('el-esteco-finca-notables-tannat', 'El Esteco', 'Finca Notables Tannat', 'tannat', 50000),
  vino('el-esteco-finca-notables-merlot', 'El Esteco', 'Finca Notables Merlot', 'merlot', 50000),
  vino('el-esteco-finca-notables-cabernet-sauvignon', 'El Esteco', 'Finca Notables Cabernet Sauvignon', 'cabernet-sauvignon', 50000),
  vino('el-esteco-chanar-punco', 'El Esteco', 'Chañar Punco Blend', 'blend', 70000),
  vino('el-esteco-blend-de-extremos-malbec', 'El Esteco', 'Blend de Extremos Malbec', 'malbec', 40000),
  vino('aleanna-enemigo-bonarda', 'Bodega Aleanna', 'Enemigo Bonarda', 'bonarda', 46000),
  vino('aleanna-gran-enemigo-blend', 'Bodega Aleanna', 'Gran Enemigo Blend', 'blend', 98000),
  vino('aleanna-gran-enemigo-agrelo', 'Bodega Aleanna', 'Gran Enemigo Agrelo', 'cabernet-franc', 98000),
  vino('aleanna-gran-enemigo-gualtallary', 'Bodega Aleanna', 'Gran Enemigo Gualtallary', 'cabernet-franc', 110000),
  vino('sagrado-el-pedernal-malbec', 'Sagrado El Pedernal', 'Malbec', 'malbec', 80000),
  vino('iscay-syrah-viognier', 'Iscay', 'Syrah Viognier', 'blend', 120000),
  vino('trapiche-medalla-malbec', 'Trapiche Medalla', 'Malbec', 'malbec', 30000),
  vino('trapiche-gran-medalla-malbec', 'Trapiche Gran Medalla', 'Malbec', 'malbec', 69000),
  vino('costa-y-pampa-pinot-noir', 'Costa y Pampa', 'Pinot Noir', 'pinot-noir', 30000),
  vino('saint-felicien-malbec', 'Saint Felicien', 'Malbec', 'malbec', 29000),
  vino('finca-las-moras-gran-syrah', 'Finca Las Moras', 'Gran Syrah', 'syrah', 65000),
  vino('terrazas-grand-malbec', 'Terrazas de los Andes', 'Grand Malbec', 'malbec', 110000),
  vino('trumpeter-reserva-malbec', 'Trumpeter', 'Reserva Malbec', 'malbec', 25000),
  vino('trumpeter-reserva-pinot-noir', 'Trumpeter', 'Reserva Pinot Noir', 'pinot-noir', 25000),
  vino('demencial-malbec', 'Demencial', 'Malbec', 'malbec', 35000),
  vino('demencial-pinot-noir', 'Demencial', 'Pinot Noir', 'pinot-noir', 35000, {
    verificar: 'Precio cortado en la foto: se lee "$35.0…".',
  }),
  vino('gran-mascota-cabernet-sauvignon', 'Gran Mascota', 'Cabernet Sauvignon', 'cabernet-sauvignon', null, {
    falta: 'confirmar nombre y precio: cortados en la foto',
    verificar: 'Se lee "…an Mascota – Cabernet Sauvignon" y "$3…".',
  }),
  vino('la-mascota-cabernet-sauvignon', 'La Mascota', 'Cabernet Sauvignon', 'cabernet-sauvignon', null, {
    falta: 'confirmar nombre y precio: cortados en la foto',
    verificar: 'Se lee "…scota – Cabernet Sauvignon"; el precio no se ve.',
  }),
]

const blancos: Vino[] = [
  vino('salentein-rose', 'Salentein', 'Rosé', 'rosado', 36000, { verificar: 'Precio cortado en la foto: se lee "$36.0…".' }),
  vino('salentein-primus-chardonnay', 'Salentein Primus', 'Chardonnay', 'chardonnay', 49000),
  vino('chupasangre-rose', 'Chupasangre', 'Rosé', 'rosado', 29000),
  vino('fond-de-cave-tardive', 'Fond de Cave', 'Tardive', 'blanco-otro', 29000),
  vino('fond-de-cave-chardonnay', 'Fond de Cave', 'Chardonnay', 'chardonnay', 19000),
  vino('saint-felicien-fume-blanc', 'Saint Felicien', 'Fumé Blanc, Sauvignon Blanc', 'sauvignon-blanc', 42000),
  vino('dv-catena-chardonnay', 'DV Catena', 'Chardonnay', 'chardonnay', 63000),
  vino('angelica-zapata-chardonnay', 'Angélica Zapata', 'Chardonnay', 'chardonnay', 49000),
  vino('rutini-sauvignon-blanc', 'Rutini', 'Sauvignon Blanc', 'sauvignon-blanc', 29000),
  vino('rutini-riesling', 'Rutini', 'Riesling', 'riesling', 79000),
  vino('rutini-gewurztraminer', 'Rutini', 'Gewürztraminer', 'gewurztraminer', 79000),
  vino('rutini-rose', 'Rutini', 'Rosé', 'rosado', 75000),
  vino('rutini-dominio-chardonnay', 'Rutini', 'Dominio Chardonnay', 'chardonnay', 39000),
  vino('nicasia-blanc-de-blancs', 'Nicasia', 'Blanc de Blancs', 'blanco-otro', 19800),
  vino('aleanna-amiguito-criolla', 'Bodega Aleanna', 'Amiguito Criolla', 'criolla', 49000),
  vino('aleanna-amiguito-moscatel', 'Bodega Aleanna', 'Amiguito Moscatel', 'moscatel', 49000),
  vino('el-esteco-criolla', 'El Esteco', 'Criolla', 'criolla', 40000),
  vino('el-esteco-blanc-de-blancs', 'El Esteco', 'Blanc de Blancs', 'blanco-otro', 40000),
  vino('el-esteco-1945-torrontes', 'El Esteco', '1945 Torrontés', 'torrontes', 35000),
  vino('el-esteco-blend-de-extremos-torrontes', 'El Esteco', 'Blend de Extremos Torrontés', 'torrontes', 40000),
  vino('lateral-semillon-anfora', 'Lateral', 'Semillón Ánfora', 'semillon', 45000),
  vino('costa-y-pampa-chardonnay', 'Costa y Pampa', 'Chardonnay', 'chardonnay', 42000),
  vino('costa-y-pampa-riesling', 'Costa y Pampa', 'Riesling', 'riesling', 42000),
  vino('costa-y-pampa-sauvignon-blanc', 'Costa y Pampa', 'Sauvignon Blanc', 'sauvignon-blanc', 30000),
  vino('trapiche-gran-medalla-chardonnay', 'Trapiche Gran Medalla', 'Chardonnay', 'chardonnay', 30000),
  vino('terrazas-reserva-petit-manseng', 'Terrazas', 'Reserva Petit Manseng', 'petit-manseng', 60000),
  vino('terrazas-grand-chardonnay', 'Terrazas', 'Grand Chardonnay', 'chardonnay', 99000),
  vino('luigi-bosca-rose', 'Luigi Bosca', 'Rosé', 'rosado', 45000),
  vino('trumpeter-reserve-chardonnay', 'Trumpeter', 'Reserve Chardonnay', 'chardonnay', 25000),
  vino('trumpeter-reserve-rose', 'Trumpeter', 'Reserve Rosé', 'rosado', 25000),
  vino('trumpeter-reserve-viognier', 'Trumpeter', 'Reserve Viognier', 'viognier', 25000),
  vino('saint-felicien-semillon', 'Saint Felicien', 'Semillón', 'semillon', 59000),
  vino('demencial-blanc-de-blanc', 'Demencial', 'Blanc de Blanc', 'blanco-otro', 35000),
]

const espumosos: Vino[] = [
  vino('louis-roederer-cristal', 'Louis Roederer', 'Cristal', 'espumoso', 2000000, { detalle: 'especial' }),
  vino('baron-b-extra-brut', 'Baron B', 'Extra Brut', 'espumoso', 79000),
  vino('baron-b-brut-nature', 'Baron B', 'Brut Nature', 'espumoso', 89000),
  vino('baron-b-rose-brut', 'Baron B', 'Rosé Brut', 'espumoso', 90000),
  vino('rutini-extra-brut', 'Rutini', 'Extra Brut', 'espumoso', 50000),
  vino('rutini-dominio-extra-brut', 'Rutini', 'Dominio Extra Brut', 'espumoso', 45000),
  vino('salentein-brut-nature', 'Salentein', 'Brut Nature', 'espumoso', 35000),
  vino('salentein-extra-brut', 'Salentein', 'Extra Brut', 'espumoso', 32000),
  vino('casa-boher-extra-brut', 'Casa Boher', 'Extra Brut', 'espumoso', 50000),
  vino('luigi-bosca-boheme-brut-nature', 'Luigi Bosca', 'Bohème Brut Nature', 'espumoso', 65000),
  vino('alma-4-pinot-rose', 'Alma 4', 'Pinot Rosé', 'espumoso', 35000),
  vino('alma-4-pinot-chardonnay', 'Alma 4', 'Pinot Chardonnay', 'espumoso', 35000),
  vino('trumpeter-brut-nature', 'Trumpeter', 'Brut Nature', 'espumoso', 30000, { verificar: 'Precio cortado en la foto: se lee "$30.0…".' }),
]

const copas: Vino[] = [
  vino('copa-tinto-media', 'Copa de tinto', 'Gama media', 'copa', 8000),
  vino('copa-tinto-alta', 'Copa de tinto', 'Gama alta', 'copa', 12000),
  vino('copa-blanco', 'Copa de blanco', '', 'copa', 8000),
  vino('copa-espumante', 'Copa de espumante', '', 'copa', 10000),
]

const vinos: SeccionCarta = {
  id: 'vinos',
  titulo: 'Vinos',
  bajada: 'Más de 90 etiquetas, del Malbec de todos los días al Cristal. Filtrá por uva.',
  subcategorias: [
    {
      id: 'tintos',
      titulo: 'Tintos',
      tipo: 'vinos',
      falta: 'la foto de la carta de tintos está cortada al pie: puede haber más etiquetas',
      items: tintos,
    },
    { id: 'blancos', titulo: 'Blancos, rosados y ligeros', tipo: 'vinos', items: blancos },
    {
      id: 'espumosos',
      titulo: 'Espumosos',
      tipo: 'vinos',
      falta: 'la foto de la carta de espumosos está cortada al pie: puede haber más etiquetas',
      items: espumosos,
    },
    { id: 'copas', titulo: 'Por copa', tipo: 'vinos', items: copas },
  ],
}

/** Filtros por uva de la carta de vinos (decisión del prototipo del socio). */
export const FILTROS_UVA: { id: string; titulo: string; uvas?: Uva[] }[] = [
  { id: 'todas', titulo: 'Todas' },
  { id: 'malbec', titulo: 'Malbec', uvas: ['malbec'] },
  { id: 'cabernet-sauvignon', titulo: 'Cabernet Sauvignon', uvas: ['cabernet-sauvignon'] },
  { id: 'chardonnay', titulo: 'Chardonnay', uvas: ['chardonnay'] },
  { id: 'sauvignon-blanc', titulo: 'Sauvignon Blanc', uvas: ['sauvignon-blanc'] },
  { id: 'pinot-noir', titulo: 'Pinot Noir', uvas: ['pinot-noir'] },
  {
    id: 'blend-otras',
    titulo: 'Blends y otras uvas',
    uvas: ['blend', 'cabernet-franc', 'syrah', 'merlot', 'tannat', 'bonarda', 'torrontes', 'semillon', 'riesling', 'gewurztraminer', 'viognier', 'criolla', 'moscatel', 'petit-manseng', 'blanco-otro', 'rosado'],
  },
  { id: 'espumosos', titulo: 'Espumosos', uvas: ['espumoso'] },
  { id: 'copas', titulo: 'Por copa', uvas: ['copa'] },
]

export const CARTA: SeccionCarta[] = [cocina, sushi, barra, vinos]
