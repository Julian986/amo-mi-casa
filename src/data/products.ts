export type Product = {
  id: string;
  name: string;
  price?: number;
  image: string;
  objectPosition?: string;
  compareAtPrice?: number;
  description?: string;
  colors?: string[]; // nombres o códigos
  sizes?: string[];  // medidas/variantes
};

export const products: Product[] = [
  {
    id: "manteles-anti-manchas",
    name: "Manteles antimanchas 65min",
    price: 65000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/antimancha_x9wvyp.webp",
    description: "Mantel antimanchas fácil de limpiar. Ideal para uso diario y eventos.",
    colors: ["Crudo", "Gris claro", "Visón"],
    sizes: ["1,40 x 1,40", "1,40 x 2,00", "1,40 x 2,40"],
  },
  {
    id: "manteles-anti-manchas-2",
    name: "Manteles antimanchas 65min",
    price: 65000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/antimancha2_sxepkx.webp",
    description: "Tela resistente con tratamiento anti derrames. Secado rápido.",
    colors: ["Crudo", "Gris claro", "Visón"],
    sizes: ["1,40 x 1,40", "1,40 x 2,00", "1,40 x 2,40"],
  },
  {
    id: "bolso-matero",
    name: "Bolso matero",
    price: 45000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/mochila_matera_wcfcag.webp",
    objectPosition: "top",
    description: "Bolso matero con compartimentos y aislación ligera.",
    colors: ["Arena", "Verde oliva", "Gris"],
  },
  {
    id: "bolso-playero",
    name: "Bolso playero",
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382600/bolso_playero_urc9ek.webp",
    objectPosition: "center",
    description: "Bolso amplio y liviano para playa o pileta.",
    colors: ["Natural", "Celeste", "Coral"],
  },
  {
    id: "lonchera-ninos",
    name: "Lonchera niños",
    price: 35000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765380007/comidita_2_mdtlfv.webp",
    description: "Lonchera para chicos, fácil de limpiar y con cierre seguro.",
    colors: ["Azul", "Rosa", "Verde"],
  },
  {
    id: "recipientes-organizadores-x6",
    name: "Recipientes organizadores x 6",
    price: 40000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382600/comidita2_eobqhq.webp",
    objectPosition: "center",
    description: "Set de 6 recipientes apilables para despensa o heladera.",
    sizes: ["Set x6 (varios tamaños)"],
  },
  {
    id: "vasos-termicos",
    name: "Vasos Térmicos",
    price: 35000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382600/vasos_termicos_2_wtimsd.webp",
    description: "Vasos térmicos para bebidas frías o calientes.",
    colors: ["Blanco", "Negro", "Acero"],
    sizes: ["350ml", "500ml"],
  },
  {
    id: "vasos-termicos-2",
    name: "Vasos Térmicos",
    price: 35000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382604/vasos_termicos2_vasv2t.webp",
    description: "Acabado anti deslizante y tapa hermética.",
    colors: ["Blanco", "Negro", "Acero"],
    sizes: ["350ml", "500ml"],
  },
  {
    id: "botellita-plegable",
    name: "Botellita plegable",
    price: 25000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/botellita_1_qmrerf_1_c3keof.webp",
    description: "Botella plegable de silicona para llevar a todos lados.",
    colors: ["Gris", "Verde agua", "Rosa"],
    sizes: ["500ml"],
  },
  {
    id: "repasador",
    name: "Repasador",
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382612/repasador_jhdcvg.webp",
    description: "Repasador de algodón de gran absorción.",
    colors: ["Crudo", "Gris", "Visón"],
    sizes: ["50 x 70 cm"],
  },
  {
    id: "termo",
    name: "Termo",
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382610/termo_nl3cmg.webp",
    description: "Termo con doble pared, mantiene la temperatura por horas.",
    colors: ["Acero", "Negro"],
    sizes: ["750ml", "1L"],
  },
  {
    id: "pava-electrica-sensor",
    name: "Pava eléctrica con sensor de temperatura",
    price: 60000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382610/pava_electrica_zhydht.webp",
    description: "Control de temperatura para té y café. Corte automático.",
    colors: ["Acero", "Negro"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}


