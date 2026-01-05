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
    name: "Mantel antimanchas rayas",
    price: 70000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/antimancha_x9wvyp.webp",
    description: "Fácil para limpiar, ideal para usos diarios.",
    colors: ["Gris"],
    sizes: ["1,40 x 2,00", "1,40 x 2,40"],
  },
  {
    id: "manteles-anti-manchas-2",
    name: "Mantel antimanchas floreado",
    price: 70000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/antimancha2_sxepkx.webp",
    description: "Fácil para limpiar, ideal para usos diarios.",
    colors: ["Verde petróleo"],
    sizes: ["1,40 x 2,00", "1,40 x 2,40"],
  },
  {
    id: "lonchera-ninos",
    name: "Frascos contenedores",
    price: 50000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765380007/comidita_2_mdtlfv.webp",
    description:
      "De plástico resistente, herméticos y con cierre seguro. Incluyen 6 frascos de diferentes tamaños.",
    colors: ["Tapa negra"],
  },
  {
    id: "recipientes-organizadores-x6",
    name: "Recipientes organizadores",
    price: 40000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382600/comidita2_eobqhq.webp",
    objectPosition: "center",
    description: "Set de 6 recipientes apilables para despensa o heladera.",
    colors: ["Tapa blanca"],
  },
  {
    id: "vasos-termicos",
    name: "Vasos infantiles",
    price: 38000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767392085/vasos_termicos_prod_cl2nni.webp",
    description: "Vasos térmicos Stanley para bebidas frías o calientes.",
    colors: ["Blanco", "Azul", "Negro", "Gris", "Rosa", "Naranja"],
    sizes: ["500 ml"],
  },
  {
    id: "vasos-termicos-foto-2",
    name: "Vasos térmicos",
    price: 38000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382600/vasos_termicos_2_wtimsd.webp",
    description: "Vasos térmicos Stanley para bebidas frías o calientes.",
    colors: ["Blanco", "Azul", "Negro", "Gris", "Rosa", "Naranja"],
    sizes: ["500 ml"],
  },
  {
    id: "vasos-termicos-2",
    name: "Vasos térmicos con manija",
    price: 35000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382604/vasos_termicos2_vasv2t.webp",
    description: "Vasos térmicos Stanley para bebidas frías o calientes.",
    colors: ["Negro", "Gris", "Azul", "Rosa", "Verde", "Rojo"],
    sizes: ["500 ml"],
  },
  {
    id: "botellita-plegable",
    name: "Botellas plegables",
    price: 30000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382601/botellita_1_qmrerf_1_c3keof.webp",
    description:
      "Set de tres botellas de silicona, fácil de trasladar y en diferentes tamaños.",
    colors: ["Multicolor"],
  },
  {
    id: "repasador",
    name: "Repasador Panal",
    price: 24000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382612/repasador_jhdcvg.webp",
    description: "Repasador de algodón de gran absorción. Por 1 unidad.",
    colors: ["Crudo", "Gris", "Visón"],
    sizes: ["50 x 70 cm"],
  },
  {
    id: "pava-electrica-sensor",
    name: "Pava Eléctrica Tokyo",
    price: 60000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1765382610/pava_electrica_zhydht.webp",
    description: "Control de temperatura para té y café. Corte automático.",
    colors: ["Blanco", "Negro"],
  },
  {
    id: "panquequera-electrica-oryx",
    name: "Panquequera Eléctrica Oryx",
    price: 50000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767202436/D_NQ_NP_903403-MLA95353865225_102025-O_gdcfmn.webp",
    description: "Base antiadherente, fácil de manipular.",
    colors: ["Negro"],
  },
  {
    id: "cafetera-kiowa",
    name: "Cafetera Kiowa",
    price: 52000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767614184/cafetera_omobai_1_wpwkcm.webp",
    description:
      "Cafetera con filtro, botón con indicador luminoso, medidor de nivel de agua y filtro de café removible. Jarra de vidrio con capacidad para 12 tazas.",
    colors: ["Negro"],
  },
  {
    id: "humidificador-aroma-ultrasonico",
    name: "Humidificador Aroma Ultrasonico",
    price: 16000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767392085/humificador_ultrasonico_prod_mmqdim.webp",
    description:
      "Funcionamiento con agua, con entrada USB y luz LED. Ideal para perfumar los rincones de tu hogar.",
    colors: ["Madera"],
  },
  {
    id: "kit-utensilios-silicona-x19",
    name: "Kit utensilios de silicona x19 piezas",
    price: 40000,
    image: "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767392085/Kit_utensilios_prod_nmsyyf.webp",
    description:
      "Incluye tabla de picar, set de cuchillos, tijera, pinza y batidor.",
    colors: ["Gris y madera"],
  },
  {
    id: "auriculares-usb-blanco",
    name: "Auriculares USB (blanco)",
    price: 30000,
    image:
      "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767614185/auriculares_usb_blanco_1_uja1hd.webp",
    description: "Auriculares USB.",
    colors: ["Blanco"],
  },
  {
    id: "auriculares-xaea",
    name: "Auriculares Xaea",
    price: 30000,
    image:
      "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767614185/Auriculares_Xaea_1_hoamdu.webp",
    description: "Auriculares. Precio a consultar.",
  },
  {
    id: "auriculares-usb-negro",
    name: "Auriculares USB (negro)",
    price: 30000,
    image:
      "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767613838/auriculares_usb_negro_1_e89hcs.webp",
    description: "Auriculares USB.",
    colors: ["Negro"],
  },
  {
    id: "parlante-mediano-con-microfono",
    name: "Parlante mediano con micrófono",
    price: 30000,
    image:
      "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767612981/parlante_x7sy4x.webp",
    description: "De fácil traslado. Cargador USB. Larga duración de batería.",
  },
  {
    id: "porta-maple",
    name: "Porta maple",
    price: 30000,
    image:
      "https://res.cloudinary.com/dzoupwn0e/image/upload/v1767613585/porta-maple_1_arlev5.webp",
    description: "Ideal para el traslado en tus compras.",
  },
 
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}


