// Datos base, Autenticación de Perfil Admin, Control de Visibilidad, Paletas de Diseño, Gestor de Clientes (CRM) y Compresor de Fotos

const DEFAULT_BUSINESS_CONFIG = {
  brandName: "Aura Digital",
  tagline: "Invitaciones & Eventos",
  whatsappNumber: "5215512345678",
  promoBanner: "Promoción de Temporada: En la compra de tu Invitación Web VIP llévate GRATIS el PDF Interactivo + Pases Personalizados por Familia. Precios en Pesos Mexicanos (MXN).",
  currency: "MXN",
  clientVisibility: {
    showPromoBanner: true,
    showFormatsSection: true,
    formatPdfVisible: true,
    formatVideoVisible: true,
    formatWebVisible: true,
    showCatalogSection: true,
    showModalitiesSection: true,
    modalityConciergeVisible: true,
    modalityHibridoVisible: true,
    modalityAutogestionVisible: false,
    showPublicPrices: true,
    showQuoterSection: true,
    allowClientGenerator: false,
    showFormatSwitcherInDemo: true
  },
  formats: {
    pdf: {
      id: "pdf",
      name: "Imagen / PDF Interactivo",
      price: 490,
      badge: "Económico y Rápido",
      description: "Diseño vertical de 1 página con botones clicables a Google Maps, Mesa de Regalos y confirmación por WhatsApp.",
      deliveryTime: "Entrega en 24 hrs"
    },
    video: {
      id: "video",
      name: "Video-Invitación Animada HD",
      price: 790,
      badge: "Ideal para WhatsApp / Save the Date",
      description: "Video vertical 9:16 con animaciones fluidas, música de fondo, fotografías y textos dinámicos.",
      deliveryTime: "Entrega en 24-48 hrs"
    },
    web_esencial: {
      id: "web_esencial",
      name: "Invitación Web — Paquete Esencial",
      price: 890,
      badge: "Web Básica",
      description: "Micrositio web con portada, cuenta regresiva en vivo, mapas GPS de ceremonia/recepción y confirmación por WhatsApp.",
      deliveryTime: "Entrega en 24-48 hrs"
    },
    web_premium: {
      id: "web_premium",
      name: "Invitación Web — Paquete Premium",
      price: 1490,
      badge: "El Más Vendido",
      description: "Sobre animado, música de fondo, cuenta regresiva, mapas GPS, itinerario, galería de fotos, mesa de regalos (tiendas y CLABE) y código de vestimenta.",
      deliveryTime: "Entrega en 24-48 hrs"
    },
    web_vip: {
      id: "web_vip",
      name: "Invitación Web — Paquete VIP Diamante",
      price: 2290,
      badge: "Todo Incluido + Pases VIP",
      description: "Incluye los 3 formatos (Web Interactiva + PDF Interactivo + Video Save the Date) y sistema de Pases Personalizados por familia con límite de boletos.",
      deliveryTime: "Atención Prioritaria Concierge"
    }
  },
  extras: [
    { id: "pases_vip", name: "Sistema de Pases Personalizados por Familia", price: 450, includedInVip: true, visibleToClient: true },
    { id: "video_std", name: "Video 'Save the Date' adicional", price: 490, includedInVip: true, visibleToClient: true },
    { id: "pdf_extra", name: "Versión PDF Interactivo adicional", price: 290, includedInVip: true, visibleToClient: true },
    { id: "express", name: "Entrega Express en menos de 12 hrs", price: 350, includedInVip: false, visibleToClient: true }
  ]
};

// 9 Paletas de Diseño Profesionales para aplicar con 1 clic en el Generador
const DESIGN_PALETTES = {
  clasico_dorado: {
    id: "clasico_dorado",
    name: "Clásico Dorado & Marfil (Boda)",
    primary: "#8C6D46",
    secondary: "#FDFBF7",
    accent: "#D4AF37",
    dark: "#2C2520"
  },
  rose_gold: {
    id: "rose_gold",
    name: "Gala Rose Gold & Champagne (XV)",
    primary: "#B76E79",
    secondary: "#FFF9FA",
    accent: "#E6A8B2",
    dark: "#3A2227"
  },
  botanico_olivo: {
    id: "botanico_olivo",
    name: "Botánico Olivo & Eucalipto (Jardín)",
    primary: "#5B7A6E",
    secondary: "#F7FAF8",
    accent: "#A8C3B8",
    dark: "#23332C"
  },
  noche_imperial: {
    id: "noche_imperial",
    name: "Noche Imperial Negro & Oro (Gala)",
    primary: "#C59B27",
    secondary: "#FAF8F2",
    accent: "#E5C158",
    dark: "#121216"
  },
  azul_plata: {
    id: "azul_plata",
    name: "Azul Real & Plata (Aniversario / Graduación)",
    primary: "#2B4C7E",
    secondary: "#F8FAFC",
    accent: "#94A3B8",
    dark: "#0F172A"
  },
  lavanda_pastel: {
    id: "lavanda_pastel",
    name: "Lavanda & Dulce Pastel (Baby Shower)",
    primary: "#9D7B93",
    secondary: "#FDF8FB",
    accent: "#DFC5D7",
    dark: "#3B2835"
  },
  terracota_boho: {
    id: "terracota_boho",
    name: "Terracota & Boho Hacienda",
    primary: "#B85D43",
    secondary: "#FDF8F5",
    accent: "#E09F87",
    dark: "#3D221A"
  },
  borgona_real: {
    id: "borgona_real",
    name: "Vino Borgoña & Oro Viejo",
    primary: "#722F37",
    secondary: "#FCF9F9",
    accent: "#C5A059",
    dark: "#2D1216"
  },
  esmeralda_lujo: {
    id: "esmeralda_lujo",
    name: "Verde Esmeralda & Dorado",
    primary: "#1B5E4B",
    secondary: "#F6FBF9",
    accent: "#D4AF37",
    dark: "#0D2E24"
  }
};

// Implementación pura de SHA-256 (funciona tanto en file:// local como en https://)
function sha256Hex(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = "length";
  let i, j;
  let result = "";
  const words = [];
  const utf8Ascii = unescape(encodeURIComponent(ascii));
  const asciiBitLength = utf8Ascii[lengthProperty] * 8;

  let hash = (sha256Hex.h = sha256Hex.h || []);
  const k = (sha256Hex.k = sha256Hex.k || []);
  let primeCounter = k[lengthProperty];

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  let padded = utf8Ascii + "\x80";
  while ((padded[lengthProperty] % 64) - 56) padded += "\x00";
  for (i = 0; i < padded[lengthProperty]; i++) {
    j = padded.charCodeAt(i);
    if (j >> 8) return "";
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  let w = hash.slice(0);
  for (j = 0; j < words[lengthProperty]; ) {
    const wSlice = words.slice(j, (j += 16));
    const oldW = w.slice(0);
    w = w.slice(0, 8);

    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = wSlice[i - 15],
        w2 = wSlice[i - 2];

      const a = w[0],
        e = w[4];
      const temp1 =
        w[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & w[5]) ^ (~e & w[6])) +
        k[i] +
        (wSlice[i] =
          i < 16
            ? wSlice[i]
            : (wSlice[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                wSlice[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & w[1]) ^ (a & w[2]) ^ (w[1] & w[2]));

      w = [(temp1 + temp2) | 0].concat(w);
      w[4] = (w[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++) {
      w[i] = (w[i] + oldW[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (w[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : "") + b.toString(16);
    }
  }
  return result;
}

function hashAdminSecret(plainSecret) {
  return sha256Hex("aura_salt_v1:" + String(plainSecret).trim());
}

const DEFAULT_ADMIN_CREDENTIALS = {
  ownerName: "Administrador Principal",
  username: "admin",
  // Hash SHA-256 con salt (no expone la clave en texto plano en el código fuente)
  pinHash: "4c17587e952334ba5607f521bf472ae843e1ef344ec04876df39dfab5f8ee32e"
};

const DEFAULT_EVENT_PRESETS = {
  boda: {
    id: "boda",
    enabled: true,
    categoryLabel: "Nuestra Boda",
    badgeText: "Boda Civil & Religiosa",
    title: "Valentina & Sebastián",
    subtitle: "¡Nos casamos! Y queremos compartir este día tan especial contigo",
    quote: "«El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección.»",
    date: "2027-02-20T17:00:00",
    dateText: "Sábado 20 de Febrero de 2027",
    hostsTitle: "Con la bendición de nuestros padres",
    hostsLeftTitle: "Padres de la Novia",
    hostsLeft: ["Sr. Alejandro Morales", "Sra. Mariana Vega de Morales"],
    hostsRightTitle: "Padres del Novio",
    hostsRight: ["Sr. Eduardo Castillo", "Sra. Lucía Mendoza de Castillo"],
    godparentsTitle: "Padrinos de Velación",
    godparents: ["Sr. Roberto Salgado & Sra. Claudia Herrera"],
    ceremony: {
      name: "Parroquia de San Miguel Arcángel",
      time: "17:00 HRS",
      address: "Av. Juárez 142, Centro Histórico, San Miguel de Allende, Gto.",
      mapUrl: "https://maps.google.com/?q=Parroquia+de+San+Miguel+Arcangel+Guanajuato"
    },
    reception: {
      name: "Hacienda Los Arcángeles",
      time: "19:30 HRS",
      address: "Carretera Real a Querétaro Km 2.5, San Miguel de Allende, Gto.",
      mapUrl: "https://maps.google.com/?q=San+Miguel+de+Allende+Guanajuato"
    },
    dressCode: {
      title: "Etiqueta Rigurosa (Formal)",
      description: "Mujeres: Vestido largo (reservado el color blanco y marfil para la novia). Hombres: Traje formal o smoking.",
      note: "Adoramos a sus pequeños, pero esta celebración ha sido planeada exclusivamente para adultos (No niños)."
    },
    itinerary: [
      { time: "17:00 hrs", title: "Ceremonia Religiosa", desc: "Parroquia de San Miguel Arcángel", icon: "fa-church" },
      { time: "19:00 hrs", title: "Cóctel de Bienvenida", desc: "Jardín Principal de la Hacienda", icon: "fa-champagne-glasses" },
      { time: "20:30 hrs", title: "Banquete & Brindis", desc: "Salón Real de los Arcángeles", icon: "fa-utensils" },
      { time: "22:00 hrs", title: "Primer Vals & Fiesta", desc: "¡A bailar toda la noche!", icon: "fa-music" }
    ],
    gifts: {
      message: "Su presencia es nuestro mejor regalo, pero si desean tener un detalle con nosotros ponemos a su disposición nuestras opciones:",
      stores: [
        { name: "Mesa de Regalos Liverpool", code: "Evento #51289403", url: "https://www.liverpool.com.mx" },
        { name: "Mesa de Regalos Amazon", code: "Lista: Valentina & Sebastián", url: "https://www.amazon.com.mx" }
      ],
      bank: {
        title: "Lluvia de Sobres / Transferencia",
        bankName: "BBVA México",
        beneficiary: "Valentina Morales Vega",
        clabe: "012180001234567890",
        concept: "Regalo Boda V&S"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "20 de Enero de 2027",
    theme: {
      primary: "#8C6D46",
      secondary: "#FDFBF7",
      accent: "#D4AF37",
      dark: "#2C2520",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "romantic"
    },
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80"
    ]
  },

  xv: {
    id: "xv",
    enabled: true,
    categoryLabel: "Mis XV Años",
    badgeText: "Celebración de XV Años",
    title: "Camila Sofía",
    subtitle: "Hay momentos inolvidables que se atesoran en el corazón para siempre",
    quote: "«Hace 15 años nació una ilusión, hoy se convierte en realidad y quiero celebrarlo contigo.»",
    date: "2027-03-13T18:00:00",
    dateText: "Sábado 13 de Marzo de 2027",
    hostsTitle: "Con el amor de mis padres",
    hostsLeftTitle: "Mis Papás",
    hostsLeft: ["Sr. Fernando Ríos", "Sra. Gabriela Ortiz de Ríos"],
    hostsRightTitle: "Mis Padrinos",
    hostsRight: ["Sr. Mauricio Luna", "Sra. Daniela Torres de Luna"],
    godparentsTitle: "Chambelán de Honor",
    godparents: ["Diego Emiliano Ríos"],
    ceremony: {
      name: "Templo de Santo Domingo de Guzmán",
      time: "18:00 HRS",
      address: "Calle Macedonio Alcalá s/n, Centro, Guadalajara, Jal.",
      mapUrl: "https://maps.google.com/?q=Guadalajara+Centro"
    },
    reception: {
      name: "Palacio de Cristal Eventos",
      time: "20:00 HRS",
      address: "Av. Vallarta 3450, Zapopan, Jalisco",
      mapUrl: "https://maps.google.com/?q=Zapopan+Jalisco"
    },
    dressCode: {
      title: "Gala Formal",
      description: "El color Rosa Gold y Champagne están reservados exclusivamente para la Quinceañera.",
      note: "¡Prepara tus mejores pasos de baile y usa el hashtag #XVCamilaSofia2027!"
    },
    itinerary: [
      { time: "18:00 hrs", title: "Misa de Acción de Gracias", desc: "Templo de Santo Domingo", icon: "fa-church" },
      { time: "20:00 hrs", title: "Recepción & Alfombra Rosa", desc: "Palacio de Cristal", icon: "fa-star" },
      { time: "21:15 hrs", title: "Entrada Triunfal & Vals", desc: "Show sorpresa y brindis", icon: "fa-crown" },
      { time: "22:00 hrs", title: "Cena & After Party", desc: "DJ en vivo y cabina 360°", icon: "fa-compact-disc" }
    ],
    gifts: {
      message: "Tu compañía en esta noche mágica es lo más importante. Si deseas hacerme un obsequio:",
      stores: [
        { name: "Liverpool XV Años", code: "Evento #98451200", url: "https://www.liverpool.com.mx" },
        { name: "Wishlist Amazon", code: "XV Camila Sofía", url: "https://www.amazon.com.mx" }
      ],
      bank: {
        title: "Lluvia de Sobres en Recepción o Transferencia",
        bankName: "Santander México",
        beneficiary: "Gabriela Ortiz (Mamá de Camila)",
        clabe: "014180654321098765",
        concept: "Regalo XV Camila"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "25 de Febrero de 2027",
    theme: {
      primary: "#B76E79",
      secondary: "#FFF9FA",
      accent: "#E6A8B2",
      dark: "#3A2227",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "waltz"
    },
    heroImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80"
    ]
  },

  bautizo: {
    id: "bautizo",
    enabled: true,
    categoryLabel: "Mi Bautizo",
    badgeText: "Bautizo & Presentación",
    title: "Mateo Alejandro",
    subtitle: "Hoy recibo la luz de Dios en mi corazón y quiero celebrarlo con ustedes",
    quote: "«Señor, hoy me presentan ante Ti para ser bañado con la gracia de Tu amor.»",
    date: "2027-04-18T12:00:00",
    dateText: "Domingo 18 de Abril de 2027",
    hostsTitle: "Con el amor de mi familia",
    hostsLeftTitle: "Mis Papás",
    hostsLeft: ["Carlos Alberto Méndez", "Sofía Navarro de Méndez"],
    hostsRightTitle: "Mis Padrinos",
    hostsRight: ["Andrés Navarro", "Valeria Gómez de Navarro"],
    godparentsTitle: "Bendición Especial",
    godparents: ["Abuelitos Maternos y Paternos"],
    ceremony: {
      name: "Capilla de Nuestra Señora de Guadalupe",
      time: "12:00 HRS",
      address: "Av. Paseo de las Palmas 780, Lomas de Chapultepec, CDMX",
      mapUrl: "https://maps.google.com/?q=Lomas+de+Chapultepec+CDMX"
    },
    reception: {
      name: "Jardín Botánico Las Lomas",
      time: "14:00 HRS",
      address: "Monte Athos 310, Lomas de Chapultepec, CDMX",
      mapUrl: "https://maps.google.com/?q=Monte+Athos+CDMX"
    },
    dressCode: {
      title: "Semi-Formal de Día / Jardín",
      description: "Tonos claros, beige, azul cielo o verde olivo sugeridos para armonizar con el jardín.",
      note: "¡Habrá área de juegos infantiles e inflables para todos los pequeñitos!"
    },
    itinerary: [
      { time: "12:00 hrs", title: "Ceremonia de Bautizo", desc: "Capilla de Guadalupe", icon: "fa-dove" },
      { time: "14:00 hrs", title: "Recepción en Jardín", desc: "Coctelería y área infantil", icon: "fa-leaf" },
      { time: "15:00 hrs", title: "Banquete Familiar", desc: "Menú de 3 tiempos y mesa de dulces", icon: "fa-utensils" },
      { time: "17:00 hrs", title: "Tradicional Bolo & Pastel", desc: "¡Sorpresas para los niños!", icon: "fa-cake-candles" }
    ],
    gifts: {
      message: "Gracias por acompañarme en mi primer sacramento. Si gustas tener un detalle conmigo:",
      stores: [
        { name: "Mesa de Regalos Liverpool", code: "Evento #33109842", url: "https://www.liverpool.com.mx" },
        { name: "Palacio de Hierro", code: "Celebración #88120", url: "https://www.elpalaciodehierro.com" }
      ],
      bank: {
        title: "Mi Primera Alcancía (Transferencia)",
        bankName: "Banorte",
        beneficiary: "Sofía Navarro",
        clabe: "072180009988776655",
        concept: "Bautizo Mateo"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "5 de Abril de 2027",
    theme: {
      primary: "#5B7A6E",
      secondary: "#F7FAF8",
      accent: "#A8C3B8",
      dark: "#23332C",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "lullaby"
    },
    heroImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=800&q=80"
    ]
  },

  cumple: {
    id: "cumple",
    enabled: true,
    categoryLabel: "Gran Cumpleaños",
    badgeText: "Celebración Especial 50 Años",
    title: "Roberto Hernández",
    subtitle: "¡Medio siglo de grandes historias, amigos inolvidables y mucho por celebrar!",
    quote: "«La vida no se mide por los años que cumples, sino por las fiestas que compartes con quienes más quieres.»",
    date: "2027-05-22T19:30:00",
    dateText: "Sábado 22 de Mayo de 2027",
    hostsTitle: "Organizado con cariño por",
    hostsLeftTitle: "Esposa",
    hostsLeft: ["Adriana Solís de Hernández"],
    hostsRightTitle: "Hijos",
    hostsRight: ["Santiago & Renata Hernández Solís"],
    godparentsTitle: "Música en Vivo",
    godparents: ["Grupo Versátil & Mariachi Imperial"],
    ceremony: {
      name: "Brindis de Honor",
      time: "19:30 HRS",
      address: "Terraza Panorama, Piso 18, Av. Insurgentes Sur 1600, CDMX",
      mapUrl: "https://maps.google.com/?q=Insurgentes+Sur+CDMX"
    },
    reception: {
      name: "Terraza Panorama Lounge",
      time: "20:00 HRS",
      address: "Av. Insurgentes Sur 1600, Crédito Constructor, CDMX",
      mapUrl: "https://maps.google.com/?q=Insurgentes+Sur+CDMX"
    },
    dressCode: {
      title: "Cocktail Chic (Negro & Dorado)",
      description: "Viste elegante y cómodo para disfrutar de la terraza, barra de mixología y pista de baile.",
      note: "Confirmación indispensable para tu acceso en recepción del edificio."
    },
    itinerary: [
      { time: "19:30 hrs", title: "Mixología de Bienvenida", desc: "Terraza al atardecer", icon: "fa-martini-glass-citrus" },
      { time: "21:00 hrs", title: "Cena Gourmet & Brindis", desc: "Palabras de la familia", icon: "fa-champagne-glasses" },
      { time: "22:30 hrs", title: "Pista Abierta & Banda", desc: "¡Clásicos de los 80s, 90s y hoy!", icon: "fa-guitar" },
      { time: "00:30 hrs", title: "Mariachi & Tornaboda", desc: "Chilaquiles y tequila", icon: "fa-hat-cowboy" }
    ],
    gifts: {
      message: "El mejor regalo es brindar juntos esta noche. Si deseas obsequiarme algo:",
      stores: [
        { name: "Wishlist Amazon", code: "Cumple 50 Roberto", url: "https://www.amazon.com.mx" }
      ],
      bank: {
        title: "Para el Viaje de los 50s",
        bankName: "Citibanamex",
        beneficiary: "Roberto Hernández",
        clabe: "002180005544332211",
        concept: "Felicidades Roberto 50"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "10 de Mayo de 2027",
    theme: {
      primary: "#C59B27",
      secondary: "#FAF8F2",
      accent: "#E5C158",
      dark: "#0F0F12",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "festive"
    },
    heroImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80"
    ]
  },

  aniversario: {
    id: "aniversario",
    enabled: true,
    categoryLabel: "Bodas de Plata",
    badgeText: "25° Aniversario Matrimonial",
    title: "Elena & Carlos",
    subtitle: "25 años caminando juntos, construyendo una familia y celebrando el amor",
    quote: "«Veinticinco años después, volvería a elegirte una y mil veces más.»",
    date: "2027-06-12T17:30:00",
    dateText: "Sábado 12 de Junio de 2027",
    hostsTitle: "Con la alegría de nuestros hijos",
    hostsLeftTitle: "Nuestros Hijos",
    hostsLeft: ["Paulina, Rodrigo y Esteban Garza"],
    hostsRightTitle: "Nuestros Nietos",
    hostsRight: ["Leo y Martina"],
    godparentsTitle: "Renovación de Votos",
    godparents: ["Pbro. José María Domínguez"],
    ceremony: {
      name: "Capilla de la Hacienda San Gabriel",
      time: "17:30 HRS",
      address: "Km 40 Carretera Federal Cuernavaca, Morelos",
      mapUrl: "https://maps.google.com/?q=Cuernavaca+Morelos"
    },
    reception: {
      name: "Salón de los Espejos — San Gabriel",
      time: "19:00 HRS",
      address: "Km 40 Carretera Federal Cuernavaca, Morelos",
      mapUrl: "https://maps.google.com/?q=Cuernavaca+Morelos"
    },
    dressCode: {
      title: "Formal Elegante",
      description: "Detalles en plata son bienvenidos para conmemorar nuestras Bodas de Plata.",
      note: "Contamos con tarifa preferencial de hospedaje en el Hotel de la Hacienda."
    },
    itinerary: [
      { time: "17:30 hrs", title: "Misa de Renovación de Votos", desc: "Capilla de la Hacienda", icon: "fa-rings-wedding" },
      { time: "19:00 hrs", title: "Brindis con Violines", desc: "Patio de los Naranjos", icon: "fa-champagne-glasses" },
      { time: "20:00 hrs", title: "Cena de Gala", desc: "Proyección de semblanza 25 años", icon: "fa-film" },
      { time: "21:30 hrs", title: "Baile & Celebración", desc: "Orquesta en vivo", icon: "fa-music" }
    ],
    gifts: {
      message: "Haber compartido estos 25 años con ustedes es nuestra mayor dicha.",
      stores: [
        { name: "Mesa de Regalos Liverpool", code: "Evento #25002500", url: "https://www.liverpool.com.mx" }
      ],
      bank: {
        title: "Segunda Luna de Miel",
        bankName: "BBVA México",
        beneficiary: "Elena & Carlos Garza",
        clabe: "012180002525252525",
        concept: "25 Aniversario E&C"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "28 de Mayo de 2027",
    theme: {
      primary: "#4A607A",
      secondary: "#F8FAFC",
      accent: "#94A3B8",
      dark: "#1E293B",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "romantic"
    },
    heroImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=800&q=80"
    ]
  },

  babyshower: {
    id: "babyshower",
    enabled: true,
    categoryLabel: "Baby Shower",
    badgeText: "Dulce Espera & Bienvenida",
    title: "Bebé Luciana",
    subtitle: "¡Una pequeña estrellita está por llegar a iluminar nuestras vidas!",
    quote: "«Antes de conocerte ya te amábamos con todo nuestro corazón.»",
    date: "2027-03-27T10:30:00",
    dateText: "Sábado 27 de Marzo de 2027",
    hostsTitle: "Con la ilusión de sus futuros papás",
    hostsLeftTitle: "Papás de Luciana",
    hostsLeft: ["Daniela Solís & Rodrigo Cervantes"],
    hostsRightTitle: "Abuelitos Felices",
    hostsRight: ["Familia Solís & Familia Cervantes"],
    godparentsTitle: "Organizadoras",
    godparents: ["Tías Mariana y Fernanda"],
    ceremony: {
      name: "Brunch & Juegos de Baby Shower",
      time: "10:30 HRS",
      address: "Salón Jardín Los Olivos, Av. La Paz 540, San Ángel, CDMX",
      mapUrl: "https://maps.google.com/?q=San+Angel+CDMX"
    },
    reception: {
      name: "Jardín Los Olivos — Terraza Sur",
      time: "11:00 HRS",
      address: "Av. La Paz 540, San Ángel, CDMX",
      mapUrl: "https://maps.google.com/?q=San+Angel+CDMX"
    },
    dressCode: {
      title: "Casual Elegante de Mañana (Tonos Pastel)",
      description: "Te invitamos a vestir en tonos claros, beige, lavanda o rosa pastel.",
      note: "¡Participa en la rifa trayendo un paquete de pañales de cualquier etapa!"
    },
    itinerary: [
      { time: "10:30 hrs", title: "Bienvenida & Café", desc: "Barra de jugos y pan dulce artesanal", icon: "fa-mug-hot" },
      { time: "11:15 hrs", title: "Desayuno Brunch", desc: "Especialidades mexicanas", icon: "fa-utensils" },
      { time: "12:30 hrs", title: "Juegos & Dinámicas", desc: "Premios y sorpresas", icon: "fa-gift" },
      { time: "13:30 hrs", title: "Mesa de Postres & Fotos", desc: "Agradecimiento de los papás", icon: "fa-camera" }
    ],
    gifts: {
      message: "Gracias por llenar de amor la llegada de nuestra bebé. Si deseas hacernos un obsequio:",
      stores: [
        { name: "Mesa de Bebés Liverpool", code: "Evento #77123490", url: "https://www.liverpool.com.mx" },
        { name: "Baby Registry Amazon", code: "Bebé Luciana Cervantes", url: "https://www.amazon.com.mx" }
      ],
      bank: {
        title: "Pañalero Digital / Transferencia",
        bankName: "BBVA México",
        beneficiary: "Daniela Solís",
        clabe: "012180007788990011",
        concept: "Baby Shower Luciana"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "18 de Marzo de 2027",
    theme: {
      primary: "#9D7B93",
      secondary: "#FDF8FB",
      accent: "#DFC5D7",
      dark: "#3B2835",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "lullaby"
    },
    heroImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
    ]
  },

  graduacion: {
    id: "graduacion",
    enabled: true,
    categoryLabel: "Gala de Graduación",
    badgeText: "Generación 2023 – 2027",
    title: "Lic. en Arquitectura",
    subtitle: "Un sueño alcanzado, una meta cumplida y el inicio de un gran futuro profesional",
    quote: "«El futuro pertenece a quienes creen en la belleza de sus sueños.»",
    date: "2027-07-17T20:00:00",
    dateText: "Sábado 17 de Julio de 2027",
    hostsTitle: "Con orgullo y agradecimiento",
    hostsLeftTitle: "Graduado(a)",
    hostsLeft: ["Arq. Emiliano Vázquez Luna"],
    hostsRightTitle: "Agradecimiento Especial",
    hostsRight: ["A mis padres y familia por su apoyo incondicional"],
    godparentsTitle: "Padrino de Generación",
    godparents: ["Dr. Arturo Méndez"],
    ceremony: {
      name: "Acto Académico — Auditorio Mayor",
      time: "17:00 HRS",
      address: "Campus Universitario Central, Av. Universidad 3000",
      mapUrl: "https://maps.google.com/?q=Ciudad+Universitaria"
    },
    reception: {
      name: "Gran Salón Imperial — Cena Baile",
      time: "20:30 HRS",
      address: "Blvd. Manuel Ávila Camacho 450, Polanco, CDMX",
      mapUrl: "https://maps.google.com/?q=Polanco+CDMX"
    },
    dressCode: {
      title: "Gala Rigurosa (Black Tie)",
      description: "Mujeres: Vestido largo de noche. Hombres: Smoking o traje oscuro con corbata.",
      note: "Presentar pase digital en la entrada para asignación de mesa."
    },
    itinerary: [
      { time: "20:30 hrs", title: "Recepción & Alfombra Roja", desc: "Fotografía oficial por familia", icon: "fa-camera" },
      { time: "21:30 hrs", title: "Cena de Gala 4 Tiempos", desc: "Salón Imperial", icon: "fa-utensils" },
      { time: "22:30 hrs", title: "Último Pase de Lista & Brindis", desc: "Video de generación y fuegos fríos", icon: "fa-graduation-cap" },
      { time: "23:15 hrs", title: "Gran Baile & After Party", desc: "Orquesta y DJ en vivo", icon: "fa-music" }
    ],
    gifts: {
      message: "Acompañarme a celebrar este logro es el mejor regalo.",
      stores: [
        { name: "Wishlist Amazon", code: "Graduación Arq. Emiliano", url: "https://www.amazon.com.mx" }
      ],
      bank: {
        title: "Impulso para mi Estudio Profesional",
        bankName: "BBVA México",
        beneficiary: "Emiliano Vázquez Luna",
        clabe: "012180006655443322",
        concept: "Felicidades Arq Emiliano"
      }
    },
    rsvpWhatsapp: "5215512345678",
    rsvpDeadline: "1 de Julio de 2027",
    theme: {
      primary: "#1E3A5F",
      secondary: "#F8FAFC",
      accent: "#D4AF37",
      dark: "#0F172A",
      fontHeading: "'Cormorant Garamond', serif",
      fontScript: "'Great Vibes', cursive",
      melodyType: "festive"
    },
    heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
    ]
  }
};

// Pedidos / Clientes de muestra iniciales para el Gestor CRM en Pesos Mexicanos
const DEFAULT_CLIENT_ORDERS = [
  {
    id: "cli_boda_valentina",
    createdAt: "2026-10-28",
    clientName: "Mariana Morales",
    clientPhone: "5215511223344",
    eventType: "Nuestra Boda",
    eventTitle: "Valentina & Sebastián",
    eventDate: "2027-02-20",
    packageName: "Invitación Web — Paquete VIP Diamante",
    modality: "Personalizado Concierge",
    totalAmount: 2290,
    paidAmount: 2290,
    status: "Entregado",
    presetBase: "boda",
    vipGuestsRaw: "Familia Gómez Pérez, 4\nTíos Hernández Vega, 2\nPadrinos Salgado Herrera, 2",
    invitationData: null // Si es null, clona de presetBase al abrir
  },
  {
    id: "cli_xv_camila",
    createdAt: "2026-10-29",
    clientName: "Gabriela Ortiz",
    clientPhone: "5213344556677",
    eventType: "Mis XV Años",
    eventTitle: "XV Camila Sofía",
    eventDate: "2027-03-13",
    packageName: "Invitación Web — Paquete Premium",
    modality: "Personalizado Concierge",
    totalAmount: 1490,
    paidAmount: 745,
    status: "En diseño",
    presetBase: "xv",
    vipGuestsRaw: "Familia Ríos Ortiz, 5\nPadrinos Mauricio y Daniela, 4",
    invitationData: null
  },
  {
    id: "cli_bautizo_mateo",
    createdAt: "2026-10-30",
    clientName: "Sofía Navarro",
    clientPhone: "5215599887766",
    eventType: "Mi Bautizo",
    eventTitle: "Bautizo Mateo Alejandro",
    eventDate: "2027-04-18",
    packageName: "Invitación Web — Paquete Esencial",
    modality: "Catálogo Híbrido",
    totalAmount: 890,
    paidAmount: 445,
    status: "Anticipo 50% pagado",
    presetBase: "bautizo",
    vipGuestsRaw: "Abuelitos Méndez, 4\nPadrinos Navarro Gómez, 2",
    invitationData: null
  }
];

const STORAGE_KEYS = {
  BUSINESS_CONFIG: "aura_business_config_v1",
  EVENT_PRESETS: "aura_event_presets_v1",
  ADMIN_CREDS: "aura_admin_creds_v1",
  ADMIN_SESSION: "aura_admin_session_active",
  PREVIEW_AS_CLIENT: "aura_admin_preview_as_client",
  CLIENT_ORDERS: "aura_client_orders_v1"
};

function getBusinessConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUSINESS_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_BUSINESS_CONFIG,
        ...parsed,
        clientVisibility: {
          ...DEFAULT_BUSINESS_CONFIG.clientVisibility,
          ...(parsed.clientVisibility || {})
        },
        formats: { ...DEFAULT_BUSINESS_CONFIG.formats, ...(parsed.formats || {}) },
        extras: parsed.extras || DEFAULT_BUSINESS_CONFIG.extras
      };
    }
  } catch (e) {
    console.warn("Error leyendo configuración de negocio:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_BUSINESS_CONFIG));
}

function saveBusinessConfig(newConfig) {
  localStorage.setItem(STORAGE_KEYS.BUSINESS_CONFIG, JSON.stringify(newConfig));
  window.BUSINESS_CONFIG = getBusinessConfig();
}

function getEventPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENT_PRESETS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_EVENT_PRESETS, ...parsed };
    }
  } catch (e) {
    console.warn("Error leyendo presets de eventos:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_EVENT_PRESETS));
}

function saveEventPresets(newPresets) {
  localStorage.setItem(STORAGE_KEYS.EVENT_PRESETS, JSON.stringify(newPresets));
  window.EVENT_PRESETS = getEventPresets();
}

// =========================================================================
// GESTOR DE CLIENTES / PEDIDOS (CRM EN PESOS MEXICANOS)
// =========================================================================
function getClientOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENT_ORDERS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Error leyendo pedidos de clientes:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CLIENT_ORDERS));
}

function saveClientOrders(ordersList) {
  localStorage.setItem(STORAGE_KEYS.CLIENT_ORDERS, JSON.stringify(ordersList));
}

function getClientOrderById(clientId) {
  const orders = getClientOrders();
  return orders.find(o => o.id === clientId) || null;
}

function upsertClientOrder(orderObj) {
  const orders = getClientOrders();
  const idx = orders.findIndex(o => o.id === orderObj.id);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], ...orderObj };
  } else {
    orders.unshift(orderObj);
  }
  saveClientOrders(orders);
  return orderObj;
}

function deleteClientOrder(clientId) {
  const orders = getClientOrders().filter(o => o.id !== clientId);
  saveClientOrders(orders);
}

// Comprime cualquier foto subida desde la computadora (PC/Celular) usando Canvas para guardarla sin servidor
function compressImageFile(file, maxWidth = 1000, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No se seleccionó archivo"));
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Codifica/Decodifica datos esenciales en la URL para compartir invitaciones entre dispositivos sin servidor
function encodeInvitationShareData(inv) {
  try {
    const compact = {
      b: inv.id || "boda",
      c: inv.categoryLabel,
      bt: inv.badgeText,
      t: inv.title,
      st: inv.subtitle,
      q: inv.quote,
      d: inv.date,
      dt: inv.dateText,
      hl: inv.hostsLeft,
      hr: inv.hostsRight,
      cn: inv.ceremony.name,
      ct: inv.ceremony.time,
      ca: inv.ceremony.address,
      cm: inv.ceremony.mapUrl,
      rn: inv.reception.name,
      rt: inv.reception.time,
      ra: inv.reception.address,
      rm: inv.reception.mapUrl,
      dc: inv.dressCode.title,
      dd: inv.dressCode.description,
      bn: inv.gifts.bank.bankName,
      bb: inv.gifts.bank.beneficiary,
      bc: inv.gifts.bank.clabe,
      wa: inv.rsvpWhatsapp,
      dl: inv.rsvpDeadline,
      col: inv.theme.primary,
      sec: inv.theme.secondary,
      drk: inv.theme.dark,
      mel: inv.theme.melodyType,
      img: inv.heroImage && !inv.heroImage.startsWith("data:") ? inv.heroImage : undefined
    };
    return btoa(encodeURIComponent(JSON.stringify(compact)));
  } catch (e) {
    return "";
  }
}

function decodeInvitationShareData(encodedStr) {
  try {
    const compact = JSON.parse(decodeURIComponent(atob(encodedStr)));
    const presets = getEventPresets();
    const base = JSON.parse(JSON.stringify(presets[compact.b] || presets.boda));
    if (compact.c) base.categoryLabel = compact.c;
    if (compact.bt) base.badgeText = compact.bt;
    if (compact.t) base.title = compact.t;
    if (compact.st) base.subtitle = compact.st;
    if (compact.q) base.quote = compact.q;
    if (compact.d) base.date = compact.d;
    if (compact.dt) base.dateText = compact.dt;
    if (compact.hl) base.hostsLeft = compact.hl;
    if (compact.hr) base.hostsRight = compact.hr;
    if (compact.cn) base.ceremony.name = compact.cn;
    if (compact.ct) base.ceremony.time = compact.ct;
    if (compact.ca) base.ceremony.address = compact.ca;
    if (compact.cm) base.ceremony.mapUrl = compact.cm;
    if (compact.rn) base.reception.name = compact.rn;
    if (compact.rt) base.reception.time = compact.rt;
    if (compact.ra) base.reception.address = compact.ra;
    if (compact.rm) base.reception.mapUrl = compact.rm;
    if (compact.dc) base.dressCode.title = compact.dc;
    if (compact.dd) base.dressCode.description = compact.dd;
    if (compact.bn) base.gifts.bank.bankName = compact.bn;
    if (compact.bb) base.gifts.bank.beneficiary = compact.bb;
    if (compact.bc) base.gifts.bank.clabe = compact.bc;
    if (compact.wa) base.rsvpWhatsapp = compact.wa;
    if (compact.dl) base.rsvpDeadline = compact.dl;
    if (compact.col) base.theme.primary = compact.col;
    if (compact.sec) base.theme.secondary = compact.sec;
    if (compact.drk) base.theme.dark = compact.drk;
    if (compact.mel) base.theme.melodyType = compact.mel;
    if (compact.img) base.heroImage = compact.img;
    return base;
  } catch (e) {
    return null;
  }
}

function getAdminCredentials() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Si existía un PIN antiguo en texto plano, migrarlo automáticamente a hash SHA-256 y borrar el texto plano
      if (parsed.pin && !parsed.pinHash) {
        parsed.pinHash = hashAdminSecret(parsed.pin);
        delete parsed.pin;
        localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(parsed));
      }
      return {
        ownerName: parsed.ownerName || DEFAULT_ADMIN_CREDENTIALS.ownerName,
        username: parsed.username || DEFAULT_ADMIN_CREDENTIALS.username,
        pinHash: parsed.pinHash || DEFAULT_ADMIN_CREDENTIALS.pinHash
      };
    }
  } catch (e) {}
  return { ...DEFAULT_ADMIN_CREDENTIALS };
}

function saveAdminCredentials(creds) {
  const clean = {
    ownerName: creds.ownerName || DEFAULT_ADMIN_CREDENTIALS.ownerName,
    username: creds.username || DEFAULT_ADMIN_CREDENTIALS.username,
    pinHash: creds.pinHash || DEFAULT_ADMIN_CREDENTIALS.pinHash
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(clean));
}

function isAdminLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === "true";
}

function isPreviewingAsClient() {
  return sessionStorage.getItem(STORAGE_KEYS.PREVIEW_AS_CLIENT) === "true";
}

function setPreviewAsClient(val) {
  if (val) {
    sessionStorage.setItem(STORAGE_KEYS.PREVIEW_AS_CLIENT, "true");
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.PREVIEW_AS_CLIENT);
  }
}

function hasEffectiveAdminView() {
  return isAdminLoggedIn() && !isPreviewingAsClient();
}

function loginAdmin(username, pin) {
  const creds = getAdminCredentials();
  const inputHash = hashAdminSecret(pin);
  if (
    username.trim().toLowerCase() === creds.username.toLowerCase() &&
    inputHash === creds.pinHash
  ) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "true");
    sessionStorage.removeItem(STORAGE_KEYS.PREVIEW_AS_CLIENT);
    return true;
  }
  return false;
}

function logoutAdmin() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  sessionStorage.removeItem(STORAGE_KEYS.PREVIEW_AS_CLIENT);
}

function resetAllBusinessSettings() {
  localStorage.removeItem(STORAGE_KEYS.BUSINESS_CONFIG);
  localStorage.removeItem(STORAGE_KEYS.EVENT_PRESETS);
  localStorage.removeItem(STORAGE_KEYS.CLIENT_ORDERS);
  window.BUSINESS_CONFIG = getBusinessConfig();
  window.EVENT_PRESETS = getEventPresets();
}

function renderAdminFloatingBar() {
  const existing = document.getElementById("aura-admin-floating-bar");
  if (existing) existing.remove();

  if (!isAdminLoggedIn()) return;

  const creds = getAdminCredentials();
  const previewClient = isPreviewingAsClient();

  const bar = document.createElement("div");
  bar.id = "aura-admin-floating-bar";
  bar.className = "no-print fixed bottom-4 left-4 z-50 bg-stone-950/95 text-white border-2 border-amber-500 rounded-2xl px-4 py-2.5 shadow-2xl flex flex-wrap items-center gap-2.5 text-xs backdrop-blur-md";

  bar.innerHTML = `
    <div class="flex items-center gap-2 pr-2 border-r border-stone-700">
      <span class="w-2.5 h-2.5 rounded-full ${previewClient ? 'bg-sky-400' : 'bg-emerald-400 animate-pulse'}"></span>
      <span class="font-bold text-amber-400"><i class="fa-solid fa-user-shield mr-1"></i>${creds.ownerName}</span>
      <span class="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-semibold text-stone-300">
        ${previewClient ? 'Viendo como Cliente' : 'Modo Admin'}
      </span>
    </div>
    <button onclick="window.toggleAdminClientPreview()" class="px-2.5 py-1 rounded-lg ${previewClient ? 'bg-sky-600 hover:bg-sky-500 text-white' : 'bg-stone-800 hover:bg-stone-700 text-amber-300'} font-semibold transition">
      <i class="fa-solid ${previewClient ? 'fa-unlock' : 'fa-eye'} mr-1"></i>
      ${previewClient ? 'Volver a Vista Admin' : 'Ver como Cliente'}
    </button>
    <a href="configuracion.html" class="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition">
      <i class="fa-solid fa-sliders mr-1"></i> Panel Admin & CRM
    </a>
    <a href="generador.html" class="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition">
      <i class="fa-solid fa-wand-magic-sparkles text-amber-400 mr-1"></i> Generador
    </a>
    <button onclick="window.handleGlobalAdminLogout()" class="px-2 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-700 text-rose-200 font-semibold transition" title="Cerrar sesión de Admin">
      <i class="fa-solid fa-right-from-bracket"></i>
    </button>
  `;

  document.body.appendChild(bar);
}

window.toggleAdminClientPreview = function () {
  setPreviewAsClient(!isPreviewingAsClient());
  window.location.reload();
};

window.handleGlobalAdminLogout = function () {
  logoutAdmin();
  window.location.href = "index.html";
};

class AmbientMusicPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.melodyType = "romantic";
    this.step = 0;
  }

  setMelody(type) {
    this.melodyType = type || "romantic";
  }

  start() {
    if (this.isPlaying) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.step = 0;

    const melodies = {
      romantic: [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63, 293.66, 349.23, 440.00, 587.33, 523.25],
      waltz: [293.66, 440.00, 554.37, 440.00, 329.63, 493.88, 659.25, 493.88, 369.99, 554.37, 739.99, 554.37],
      lullaby: [392.00, 493.88, 587.33, 659.25, 587.33, 493.88, 392.00, 329.63, 293.66, 392.00, 493.88, 392.00],
      festive: [329.63, 392.00, 493.88, 659.25, 587.33, 493.88, 392.00, 440.00, 523.25, 659.25, 783.99, 659.25]
    };

    const playNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      const notes = melodies[this.melodyType] || melodies.romantic;
      const freq = notes[this.step % notes.length];
      this.step++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.85);
    };

    playNote();
    this.intervalId = setInterval(playNote, 650);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

window.DEFAULT_BUSINESS_CONFIG = DEFAULT_BUSINESS_CONFIG;
window.DEFAULT_EVENT_PRESETS = DEFAULT_EVENT_PRESETS;
window.DESIGN_PALETTES = DESIGN_PALETTES;
window.getBusinessConfig = getBusinessConfig;
window.saveBusinessConfig = saveBusinessConfig;
window.getEventPresets = getEventPresets;
window.saveEventPresets = saveEventPresets;
window.getClientOrders = getClientOrders;
window.saveClientOrders = saveClientOrders;
window.getClientOrderById = getClientOrderById;
window.upsertClientOrder = upsertClientOrder;
window.deleteClientOrder = deleteClientOrder;
window.compressImageFile = compressImageFile;
window.encodeInvitationShareData = encodeInvitationShareData;
window.decodeInvitationShareData = decodeInvitationShareData;
window.getAdminCredentials = getAdminCredentials;
window.saveAdminCredentials = saveAdminCredentials;
window.hashAdminSecret = hashAdminSecret;
window.isAdminLoggedIn = isAdminLoggedIn;
window.isPreviewingAsClient = isPreviewingAsClient;
window.setPreviewAsClient = setPreviewAsClient;
window.hasEffectiveAdminView = hasEffectiveAdminView;
window.loginAdmin = loginAdmin;
window.logoutAdmin = logoutAdmin;
window.renderAdminFloatingBar = renderAdminFloatingBar;
window.resetAllBusinessSettings = resetAllBusinessSettings;
window.BUSINESS_CONFIG = getBusinessConfig();
window.EVENT_PRESETS = getEventPresets();
window.AmbientMusicPlayer = AmbientMusicPlayer;
