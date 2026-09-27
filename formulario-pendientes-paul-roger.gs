/**
 * Crea el Google Form «Paul Roger · Pendientes para la web».
 * Uso: script.google.com → Proyecto nuevo → pegar todo → Guardar → Ejecutar «crearFormulario»
 * → aceptar permisos. Los links del formulario aparecen en «Registro de ejecución».
 */
const PAGINAS = [
  {
    "title": "A · Para poder arrancar",
    "intro": "Lo técnico y lo básico del día a día. Casi todo es urgente porque sin esto la web no se puede publicar o las reservas no le llegan a nadie.",
    "items": [
      {
        "title": "A1 · Dominio paulroger.com.ar: ¿quién figura como titular en NIC Argentina y quién puede darnos acceso?",
        "help": "[URGENTE]\n\nNecesitamos el nombre o la empresa titular. Por favor no nos manden contraseñas por WhatsApp: lo resolvemos en una llamada corta o nos delegan el dominio desde NIC.ar.\n\nPara qué: Es la dirección de la web. Figura en toda la papelería pero nunca se publicó.",
        "long": true
      },
      {
        "title": "A2 · Correo reservas@paulroger.com.ar: ¿existe hoy? ¿Quién lo lee y dónde está (Gmail, Google Workspace, otro)?",
        "help": "[URGENTE]\n\nPara qué: Es el correo que aparece en la web y adonde van a llegar las reservas.",
        "long": true
      },
      {
        "title": "A3 · ¿Quién recibe y responde las reservas?",
        "help": "[URGENTE]\n\nNombre, celular y mail de la persona o las personas encargadas, y en qué horario las atienden.\n\nPara qué: Define a quién le avisa la web cada vez que entra una reserva o una consulta de evento.",
        "long": true
      },
      {
        "title": "A4 · Horarios reales de cada servicio",
        "help": "[URGENTE]\n\n• Cafetería / turno mañana\n• Mediodía\n• Noche, y hasta qué hora se toman pedidos en la cocina\n• Qué días cierran y qué pasa los feriados\n\nPara qué: Van en el pie de todas las páginas, en Google y en el formulario de reservas, que hoy muestra turnos de ejemplo.",
        "long": true
      },
      {
        "title": "A5 · Logos en archivo vectorial, en sus 4 versiones",
        "help": "[URGENTE]\n\nHorizontal, vertical completa, vertical simplificada y circular, en .ai, .svg o .pdf. Se los puede pedir al diseñador que hizo el manual de identidad.\n\nPara qué: Hoy usamos los logos recortados del manual. En pantallas grandes se van a ver pixelados.\n\nCómo mandarlo: Por Drive o mail, nunca como captura de pantalla.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      },
      {
        "title": "A6 · Tipografía IvyMode: ¿el diseñador del manual tiene Adobe Creative Cloud?",
        "help": "[NECESARIO]\n\nSolo necesitamos un sí o un no. Si la tiene, puede habilitar la fuente para la web sin costo extra. Si no, usamos una alternativa gratuita muy parecida y no pasa nada.\n\nPara qué: Es la letra de los títulos que pide el manual. Tiene licencia paga.",
        "long": false
      }
    ]
  },
  {
    "title": "B · Nosotros",
    "intro": "Hoy es la sección más pobre de la maqueta: solo tenemos la misión y los valores de la capacitación interna. Con historia, caras, números y reconocimientos podemos armar una página con una línea de tiempo, retratos, cifras grandes y citas. Mandanos todo lo que tengan, aunque sea poco: elegimos juntos qué se publica.",
    "items": [
      {
        "title": "B1 · ¿Cómo empezó Paul Roger?",
        "help": "[NECESARIO]\n\nAño de apertura, quiénes lo fundaron, una anécdota del arranque y de dónde viene el nombre «Paul Roger».\n\nPara qué: Es la base de la historia. Hoy tenemos una frase general («un grupo de amigos y empresarios…») y queremos que suene a ustedes.",
        "long": true
      },
      {
        "title": "B2 · El producto y su origen: ¿de dónde sale lo que sirven?",
        "help": "[NECESARIO]\n\n• La carne: proveedor o campo propio, raza, maduración, tipo de corte\n• Leña o carbón de la parrilla\n• Pescados del sushi: de dónde y cada cuánto llegan\n• Chocolate belga y pistachos de Mendoza: productor o marca\n\nPara qué: La idea de la historia es «dos amigos, el campo y la buena comida». Si hay un campo o un proveedor de confianza, es el mejor contenido de la sección.",
        "long": true
      },
      {
        "title": "B3 · Años de experiencia y cifras de la casa",
        "help": "[SUMA MUCHO]\n\nSolo las que quieran hacer públicas. Por ejemplo: años desde la apertura, años de oficio del equipo, cuántas personas trabajan, cuántos eventos hicieron, cubiertos por mes, kilos de carne por semana. De vinos ya sabemos que son más de 90 etiquetas.\n\nPara qué: Con 3 o 4 números grandes armamos una franja de cifras que da confianza de un vistazo.",
        "long": true
      },
      {
        "title": "B4 · Premios, certificaciones y reconocimientos",
        "help": "[SUMA MUCHO]\n\n• Notas en medios: diarios, revistas, radio, TV, blogs o cuentas gastronómicas\n• Menciones en guías o sitios (Guía Oleo, TripAdvisor, etc.)\n• Certificaciones: manipulación de alimentos, cocina sin TACC habilitada, cursos del equipo\n• Concursos de coctelería o de parrilla\n• La capacitación con Consultoría Mentor, si quieren mencionarla\n\nPara qué: Lo que otros dicen de Paul Roger pesa más que lo que dice la marca de sí misma.\n\nCómo mandarlo: Un link o una captura de cada uno.",
        "long": true
      },
      {
        "title": "B5 · Reseñas públicas: ¿dónde los califican y cuáles son sus favoritas?",
        "help": "[SUMA MUCHO]\n\nEl link a su ficha de Google (puntaje y cantidad de reseñas) y de cualquier otro sitio, y 3 a 5 reseñas que los representen.\n\nPara qué: No vamos a poner un carrusel de reseñas. Usamos una o dos frases destacadas, con el nombre de pila y la fuente, y el puntaje de Google.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      },
      {
        "title": "B6 · Los dueños: ¿quieren aparecer?",
        "help": "[SUMA MUCHO]\n\nSi es que sí: nombre, rol, dos o tres líneas sobre cada uno y una foto. Si prefieren no aparecer, podemos firmar la historia como «los fundadores».\n\nPara qué: Una cara y un nombre hacen que la historia se crea.",
        "long": true
      },
      {
        "title": "B7 · El equipo clave",
        "help": "[SUMA MUCHO]\n\nJefe de cocina, parrillero, sushiman, bartender y encargado de vinos: nombre, dónde trabajaron antes, años de oficio y una foto trabajando.\n\nPara qué: Nos permite presentar «las manos detrás de cada servicio» y reforzar la carta.",
        "long": true
      },
      {
        "title": "B8 · Una frase de los dueños que resuma la casa",
        "help": "[SUMA MUCHO]\n\nPuede ser algo que digan siempre. Si no se les ocurre, la redactamos nosotros y ustedes la aprueban.\n\nPara qué: Cierra la página con una cita firmada.",
        "long": true
      }
    ]
  },
  {
    "title": "C · La Casa: salón, barra y música",
    "intro": "La página que muestra el lugar por dentro. La música en vivo hoy no aparece en ningún lado y es de lo más atractivo que tienen.",
    "items": [
      {
        "title": "C1 · Capacidad del salón",
        "help": "[NECESARIO]\n\nCuántas personas sentadas entran en el salón, en la barra y en el salón privado. ¿Hay vereda o terraza?\n\nPara qué: Aparece en La Casa y ordena el formulario de reservas.",
        "long": true
      },
      {
        "title": "C2 · Música en vivo: ¿cómo funciona?",
        "help": "[NECESARIO]\n\n• Qué días y en qué horario\n• Qué géneros o formatos (banda, solista, DJ del local)\n• Músicos que tocan seguido, con su Instagram\n• Si se cobra entrada o un adicional\n• Las fechas del próximo mes\n• Quién se va a encargar de mantener la agenda al día\n\nPara qué: Arma la agenda de próximas fechas. Hoy la maqueta muestra fechas de ejemplo.",
        "long": true
      },
      {
        "title": "C3 · Stand Flowers: ¿es de Paul Roger o de un socio? ¿Le venden a alguien que no viene a comer?",
        "help": "[NECESARIO]\n\nPara qué: Si las flores se venden sueltas, eso es una tienda online y se cotiza aparte. Si son para quien reserva, entran en el plan actual.",
        "long": true
      },
      {
        "title": "C4 · La barra y el cocktail de la casa",
        "help": "[SUMA MUCHO]\n\nNombre del bartender, la historia del cocktail «Paul Roger» y cualquier detalle propio de la barra (el hielo grabado con el logo, por ejemplo).\n\nPara qué: Es el «& Cocktail» de la marca: merece un texto propio.",
        "long": true
      },
      {
        "title": "C5 · Turno mañana y cafetería: ¿desde qué hora y se reserva?",
        "help": "[SUMA MUCHO]\n\nPara qué: La carta tiene croissants, bagels y cafetería, pero no sabemos si es un servicio que quieran destacar.",
        "long": true
      }
    ]
  },
  {
    "title": "D · Carta",
    "intro": "La carta la pasamos a mano desde las fotos de la carta impresa, con los precios de septiembre. Hay datos cortados en las fotos que no pudimos leer.",
    "items": [
      {
        "title": "D1 · La carta en archivo editable",
        "help": "[NECESARIO]\n\nEl Word, Excel o el archivo que usa la imprenta. Si lo tienen, nos ahorra el punto D2 y evita errores de tipeo.\n\nCómo mandarlo: Por mail o Drive.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      },
      {
        "title": "D2 · Si no hay archivo: confirmar estos datos que salieron cortados en las fotos",
        "help": "[NECESARIO]\n\n• Whiskies: la foto está cortada al pie. ¿Hay más etiquetas? Y el bourbon de Fort Worth, Texas: nombre exacto y precio (se lee «$12…»)\n• Negroni de la casa: ¿$16.000? y la descripción completa\n• Vermouth: la carta de barra dice $10.000 y la de cocina dice «Martini Rosso» $12.000. ¿Son dos tragos distintos?\n• Demencial Pinot Noir: ¿$35.000?\n• Gran Mascota y La Mascota Cabernet Sauvignon: nombre exacto y precio\n• Salentein Rosé: ¿$36.000? · Trumpeter Brut Nature: ¿$30.000?\n• Tintos y espumosos: las fotos están cortadas al pie. ¿Faltan etiquetas?\n\nPara qué: Un precio mal puesto en la web es un problema en la mesa.",
        "long": true
      },
      {
        "title": "D3 · Menú ejecutivo: días, horario, precio y qué incluye",
        "help": "[NECESARIO]\n\n¿Entrada, principal, postre, bebida? ¿Cambia todos los días? Si cambia, ¿quién lo actualizaría?\n\nPara qué: Tiene una franja propia arriba de la carta y un formulario de reserva propio. Hoy está todo como [FALTA].",
        "long": true
      },
      {
        "title": "D4 · Opciones sin TACC, vegetarianas y veganas. ¿Hay menú para chicos?",
        "help": "[NECESARIO]\n\nPara qué: Es de las preguntas que más se hacen antes de reservar. Si la carta lo marca, se ahorran mensajes.",
        "long": true
      },
      {
        "title": "D5 · Platos que se encargan con anticipación",
        "help": "[NECESARIO]\n\nEl cochinillo dice «con reserva»: ¿con cuántos días u horas? ¿Hay otros platos así?\n\nPara qué: Lo sumamos a la reserva para que el cliente lo encargue al reservar.",
        "long": true
      },
      {
        "title": "D6 · Servicio de mesa y medios de pago",
        "help": "[NECESARIO]\n\n¿Sigue en $3.500 por persona? ¿Qué medios de pago aceptan (efectivo, tarjetas, transferencia, QR)?\n\nPara qué: Se aclara en la carta y en la confirmación de la reserva.",
        "long": true
      },
      {
        "title": "D7 · Los platos insignia: de 3 a 5 que los definan",
        "help": "[SUMA MUCHO]\n\nLos más pedidos o los que ustedes más recomiendan.\n\nPara qué: Los destacamos en la portada y en la carta.",
        "long": true
      },
      {
        "title": "D8 · ¿Cada cuánto cambian los precios y quién los actualizaría?",
        "help": "[SUMA MUCHO]\n\nPara qué: Nos ayuda a definir cómo va a ser el panel para editar la carta.",
        "long": true
      }
    ]
  },
  {
    "title": "E · Eventos",
    "intro": "La propuesta de servicios y eventos que nos pasaron ya está volcada en la web. Faltan los números y las condiciones, que son lo que la gente pregunta primero.",
    "items": [
      {
        "title": "E1 · Capacidad del espacio completo para un evento privado",
        "help": "[NECESARIO]\n\nCuántas personas sentadas y cuántas de pie (formato cocktail).\n\nPara qué: Va en el selector de espacios de la página de Eventos, junto al salón privado para 16.",
        "long": true
      },
      {
        "title": "E2 · Precio por persona de cada menú de evento (aunque sea «desde»)",
        "help": "[NECESARIO]\n\nMenú establecido de cumpleaños, menú personalizado, formal / cocktail e islas gastronómicas. ¿Incluyen bebida?\n\nPara qué: Sin un precio orientativo, las consultas llegan sin filtro. Con un «desde», llegan las que van en serio.",
        "long": true
      },
      {
        "title": "E3 · DJ e islas gastronómicas: ¿propios o tercerizados? ¿Cuánto cuestan?",
        "help": "[NECESARIO]\n\nPara qué: Figuran como adicionales en la página de Eventos.",
        "long": true
      },
      {
        "title": "E4 · Condiciones para reservar un evento",
        "help": "[NECESARIO]\n\nMínimo de invitados, con cuánta anticipación hay que reservar, si piden seña (qué porcentaje), política de cancelación y duración máxima.\n\nPara qué: Van en la página y en el formulario de consulta.",
        "long": true
      },
      {
        "title": "E5 · Preguntas frecuentes: torta propia, descorche y decoración",
        "help": "[SUMA MUCHO]\n\n¿Se puede traer torta? ¿Cobran descorche si traen vino? ¿Se puede traer decoración propia?\n\nPara qué: Con estas respuestas armamos un bloque de preguntas frecuentes y les llegan menos mensajes.",
        "long": true
      },
      {
        "title": "E6 · Eventos que ya hicieron",
        "help": "[SUMA MUCHO]\n\nFotos (sin invitados reconocibles o con su permiso), qué tipo de eventos fueron, y empresas que hayan hecho eventos y acepten aparecer.\n\nPara qué: Mostrar eventos reales convence más que describirlos.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      }
    ]
  },
  {
    "title": "F · Private Dining: el salón privado (VIP)",
    "intro": "Ya sabemos que el VIP y el salón privado son el mismo espacio, para 16 personas, con TV y aire acondicionado. Falta saber cómo se contrata.",
    "items": [
      {
        "title": "F1 · ¿Cómo se cobra el salón privado?",
        "help": "[NECESARIO]\n\n¿Se alquila por hora, por evento o solo se paga lo que se consume? ¿Hay un mínimo de consumo?\n\nPara qué: Es la primera pregunta de cualquiera que lo quiere reservar.",
        "long": true
      },
      {
        "title": "F2 · Reuniones de trabajo: días, horarios y equipamiento",
        "help": "[NECESARIO]\n\n¿Qué días y horarios está disponible para reuniones o coworking? ¿Tiene wifi, cable para conectar una notebook a la TV, proyector o pizarra?\n\nPara qué: Es un uso que puede llenar el salón al mediodía, combinado con el menú ejecutivo.",
        "long": true
      },
      {
        "title": "F3 · Fotos del salón privado",
        "help": "[URGENTE]\n\nVacío y puesto para una cena. Ver la lista de tomas al final.\n\nPara qué: La página no tiene ninguna foto propia. Es el hueco más visible de la maqueta.\n\nCómo mandarlo: Archivos originales por Drive.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      }
    ]
  },
  {
    "title": "G · Limousine",
    "intro": "Es un diferencial que casi nadie tiene y hoy no aparece en ningún lado. Como hay un solo vehículo, en la web siempre funciona como consulta, nunca como compra directa.",
    "items": [
      {
        "title": "G1 · ¿La limusina es propia o de un tercero? ¿Qué modelo es y cuántos pasajeros lleva?",
        "help": "[NECESARIO]",
        "long": true
      },
      {
        "title": "G2 · ¿Qué incluye el servicio?",
        "help": "[NECESARIO]\n\nIda, vuelta, recorrido, tiempo de espera, bebida a bordo. ¿Hasta qué zonas llega?",
        "long": true
      },
      {
        "title": "G3 · Precio orientativo o «desde»",
        "help": "[NECESARIO]\n\n¿O se bonifica a partir de cierto consumo?\n\nPara qué: Aunque siga siendo «a consultar», un rango orienta al cliente y filtra consultas.",
        "long": true
      },
      {
        "title": "G4 · ¿Se puede contratar sola (para un casamiento, por ejemplo) o solo junto con una reserva? ¿Con cuánta anticipación?",
        "help": "[NECESARIO]\n\nPara qué: Define si va solo dentro de la reserva o también como servicio aparte.",
        "long": true
      }
    ]
  },
  {
    "title": "H · Flores, bombones y pistachos",
    "intro": "En la web se ofrecen al reservar, cuando la ocasión es un aniversario o un cumpleaños, y se pagan en la mesa. No hay pagos online.",
    "items": [
      {
        "title": "H1 · Confirmar los precios vigentes",
        "help": "[NECESARIO]\n\nBombones belgas 6 / 12 / 20 unidades: $19.900 / $36.900 / $59.000 · Ramo pequeño / grande: $18.900 / $30.000 · Pistachos premium de altura: $29.000.\n\nPara qué: Aparecen en el resumen de la reserva con el total.",
        "long": true
      },
      {
        "title": "H2 · ¿Con cuánta anticipación hay que pedirlos para que estén en la mesa?",
        "help": "[NECESARIO]\n\n¿Se puede elegir tipo o color de flor? ¿Incluyen una tarjeta con mensaje?\n\nPara qué: Si hay tarjeta, sumamos un campo para el mensaje en el formulario: es un detalle que se agradece.",
        "long": true
      },
      {
        "title": "H3 · Sabores de los bombones y presentación de los pistachos",
        "help": "[SUMA MUCHO]\n\nPara qué: Para describirlos bien en la card de cada producto.",
        "long": true
      }
    ]
  },
  {
    "title": "I · Fotos y videos",
    "intro": "Hoy la maqueta usa fotos de Instagram y WhatsApp mejoradas por nosotros. Sirven para mostrar la idea, pero en pantallas grandes pierden calidad.",
    "items": [
      {
        "title": "I1 · El contacto del fotógrafo, o los archivos originales de las sesiones que ya hicieron",
        "help": "[URGENTE]\n\nPara qué: Es la forma más rápida de subir la calidad de toda la web sin sacar fotos nuevas.\n\nCómo mandarlo: Drive o WeTransfer, con los archivos originales.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      },
      {
        "title": "I2 · Las tomas que faltan (ver la lista al final de este documento)",
        "help": "[NECESARIO]\n\nPara qué: Se pueden producir junto con la persona que lleva las redes: las mismas fotos le sirven para Instagram.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      },
      {
        "title": "I3 · Videos cortos del local: brasas, barra, música en vivo",
        "help": "[SUMA MUCHO]\n\nAunque sean del celular, de 10 a 15 segundos, sin música editada encima.\n\nPara qué: Un video corto de las brasas puede ser el fondo de la portada.\n\nSi es un archivo, subilo a una carpeta de Google Drive y pegá acá el link (con acceso para «cualquier persona con el enlace»).",
        "long": true
      }
    ]
  },
  {
    "title": "J · Presencia en internet",
    "intro": "La web tiene que conectarse con lo que ya existe, para que Google la muestre cuando alguien busca dónde comer en Hudson.",
    "items": [
      {
        "title": "J1 · Ficha de Google (Google Maps / Google Business): ¿existe? ¿Quién la administra?",
        "help": "[NECESARIO]\n\nPara qué: La vinculamos con la web. Es de donde más gente llega cuando busca un restaurante en la zona.",
        "long": true
      },
      {
        "title": "J2 · El WhatsApp 11 2300 5015: ¿sigue siendo el número oficial? ¿Quién lo atiende?",
        "help": "[NECESARIO]\n\nPara qué: La idea es que las reservas entren por la web, pero el número sigue siendo el de contacto.",
        "long": true
      },
      {
        "title": "J3 · Otras redes o sitios donde figuran",
        "help": "[SUMA MUCHO]\n\nFacebook, TikTok, TripAdvisor, Guía Oleo, apps de reservas, etc. El link de cada una.",
        "long": true
      },
      {
        "title": "J4 · Contacto de la persona que lleva las redes",
        "help": "[SUMA MUCHO]\n\nPara qué: Para coordinar las fotos y que la web y el Instagram hablen igual.",
        "long": true
      }
    ]
  },
  {
    "title": "K · Números del día a día",
    "intro": "Esto no se publica. Nos sirve para armar bien el sistema de reservas y para medir después si la web está funcionando.",
    "items": [
      {
        "title": "K1 · ¿Cuántas reservas reciben por día y por semana? ¿Cómo las anotan hoy (cuaderno, planilla, sistema)?",
        "help": "[SUMA MUCHO]",
        "long": true
      },
      {
        "title": "K2 · ¿Cuántas mesas reservadas no se presentan sin avisar, más o menos?",
        "help": "[SUMA MUCHO]",
        "long": true
      },
      {
        "title": "K3 · El mes pasado: ¿cuántas consultas de eventos recibieron y cuántas se concretaron?",
        "help": "[SUMA MUCHO]\n\nPara qué: La diferencia entre esos dos números es lo que la web tiene que ayudar a recuperar.",
        "long": true
      }
    ]
  }
];

const TOMAS = "• Salón privado (VIP), vacío y puesto para una cena (Urgente) → Página Private Dining y portada. Hoy no tenemos ninguna foto.\n• Salón de noche, con luces encendidas y sin gente (Urgente) → Portada y La Casa\n• Fachada de noche (con el neón) y de día (Necesario) → Contacto y «cómo llegar»\n• La barra con el bartender preparando un trago (Necesario) → La Casa · Barra\n• El cocktail «Paul Roger» y 2 o 3 tragos de autor, de cerca (Necesario) → Carta · Barra y portada\n• Parrilla encendida: fotos y un video corto de 10 a 15 segundos de las brasas (Necesario) → Fondo animado de la portada\n• Música en vivo: la banda tocando, con el salón de fondo (Necesario) → La Casa · Música en vivo\n• Stand de flores, un ramo armado, bombones y pistachos (Necesario) → Complementos de la reserva\n• Limusina por fuera y por dentro (Necesario) → Limousine\n• Platos vistos desde arriba: ojo de bife, laja de sushi, cochinillo, guarniciones, flan (Necesario) → Servicios de la portada y Carta\n• Pared de vinos y cava (Suma mucho) → Carta · Vinos\n• Retratos de los dueños y del equipo (cocina, parrilla, barra, salón) (Suma mucho) → Nosotros\n• Un evento armado (mesa larga decorada, salón privatizado) (Suma mucho) → Eventos";

function crearFormulario() {
  const form = FormApp.create('Paul Roger · Pendientes para la web');
  form.setDescription(
    'Estos son los datos que necesitamos para terminar la web de Paul Roger. Cada punto tiene un código (A1, B3…) y una prioridad:\n\n' +
    'URGENTE: sin esto no podemos publicar la web.\n' +
    'NECESARIO: hoy aparece como [FALTA] en la maqueta.\n' +
    'SUMA MUCHO: no bloquea nada, pero nos deja diseñar secciones con más contenido, sobre todo «Nosotros».\n\n' +
    'Ninguna pregunta es obligatoria: respondé lo que sepas y dejá el resto en blanco. Si algo no aplica, escribí «no aplica». ' +
    'Podés editar tus respuestas después con el link que llega al enviar, así que no hace falta completarlo todo de una vez.\n\n' +
    'Fotos, logos y documentos: subilos a una carpeta de Google Drive y pegá el link en la pregunta correspondiente. Por WhatsApp no, porque comprime las fotos.'
  );
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  form.setConfirmationMessage('¡Gracias! Guardá el link para editar tus respuestas: podés volver a completar lo que falte cuando quieras.');

  form.addTextItem().setTitle('¿Quién completa el formulario?').setHelpText('Nombre y rol');

  PAGINAS.forEach(function (pag) {
    form.addPageBreakItem().setTitle(pag.title).setHelpText(pag.intro);
    pag.items.forEach(function (it) {
      const item = it.long ? form.addParagraphTextItem() : form.addTextItem();
      item.setTitle(it.title).setHelpText(it.help);
      if (it.title.indexOf('I2 ·') === 0) {
        form.addSectionHeaderItem().setTitle('Lista de tomas para fotografiar').setHelpText(TOMAS +
          '\n\nCómo tienen que llegar: archivo original, sin filtros; si se puede en horizontal y en vertical; sin clientes reconocibles salvo permiso escrito; sin patentes a la vista; con el cartel y el logo derechos y enfocados.');
      }
    });
  });

  form.addPageBreakItem().setTitle('Para terminar');
  form.addParagraphTextItem().setTitle('¿Algo más que quieras contarnos o que no esté en la lista?');

  Logger.log('Link para completar (mandáselo a la gerenta): ' + form.getPublishedUrl());
  Logger.log('Link para editar el formulario y ver respuestas: ' + form.getEditUrl());
}
