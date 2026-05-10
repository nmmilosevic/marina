export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  typology: string;
  area: string;
  photography?: string;
  description: string;
  heroImage: string;
  images: string[];
  videoUrl: string | null;
  /** "light" = white nav (dark hero image), "dark" = black nav (light hero image) */
  navTheme: "light" | "dark";
}

/** Static files in `public/VILLA PREMIUM/` (URL-encoded for Next/Image). */
function villaPremiumImage(file: string): string {
  return `/VILLA%20PREMIUM/${encodeURIComponent(file)}`;
}

export const projects: Project[] = [
  {
    slug: "villa-premium",
    title: "Villa Premium",
    location: "Marbella, ES",
    year: "2025",
    typology: "Private Residence",
    area: "450 sqm",
    description:
      "A contemporary villa interior defined by open living spaces, warm materiality, and calm sightlines. Living and dining zones flow as one sequence; bedrooms layer tactile finishes and controlled daylight for a quiet, residential calm.",
    heroImage: villaPremiumImage("LIVING.jpg"),
    images: [
      villaPremiumImage("DINING.jpg"),
      villaPremiumImage("01 HAB 1.jpg"),
      villaPremiumImage("01 HAB 2.jpg"),
      villaPremiumImage("02 HAB 1.jpg"),
      villaPremiumImage("02 HAB 2.jpg"),
    ],
    videoUrl: null,
    navTheme: "dark",
  },
  {
    slug: "villa-portofino",
    title: "Villa Portofino",
    location: "Portofino, IT",
    year: "2023",
    typology: "Private Residence",
    area: "420 sqm",
    photography: "Marco Introini",
    description:
      "A complete interior renovation of a clifftop villa overlooking the Ligurian Sea. The project draws on the warmth of local stone and bleached oak while introducing contemporary spatial sequences that frame the landscape at every turn.",
    heroImage: "https://picsum.photos/seed/portofino-hero/1600/900",
    images: [
      "https://picsum.photos/seed/portofino1/1600/900",
      "https://picsum.photos/seed/portofino2/900/1200",
      "https://picsum.photos/seed/portofino3/1600/900",
      "https://picsum.photos/seed/portofino4/800/600",
      "https://picsum.photos/seed/portofino5/800/600",
    ],
    videoUrl: null,
    navTheme: "light",
  },
  {
    slug: "penthouse-milan",
    title: "Penthouse Milan",
    location: "Milan, IT",
    year: "2022",
    typology: "Residential",
    area: "280 sqm",
    photography: "Davide Galli",
    description:
      "A sky-level apartment in Milan's Porta Nuova district, redesigned around a central living axis that connects private and collective zones through a considered sequence of materials and light.",
    heroImage: "https://picsum.photos/seed/milan-hero/1600/900",
    images: [
      "https://picsum.photos/seed/milan1/1600/900",
      "https://picsum.photos/seed/milan2/900/1200",
      "https://picsum.photos/seed/milan3/800/600",
    ],
    videoUrl: null,
    navTheme: "dark",
  },
  {
    slug: "hotel-amalfi",
    title: "Hotel Amalfi",
    location: "Amalfi Coast, IT",
    year: "2024",
    typology: "Hospitality",
    area: "1200 sqm",
    photography: "Federico Cedrone",
    description:
      "A boutique hotel renovation that collapses the boundary between interior and terraced landscape. Rooms are conceived as intimate caves opening onto the sea, clad in local ceramics and raw plaster.",
    heroImage: "https://picsum.photos/seed/amalfi-hero/1600/900",
    images: [
      "https://picsum.photos/seed/amalfi1/1600/900",
      "https://picsum.photos/seed/amalfi2/900/1200",
      "https://picsum.photos/seed/amalfi3/1600/900",
      "https://picsum.photos/seed/amalfi4/800/600",
    ],
    videoUrl: null,
    navTheme: "light",
  },
  {
    slug: "casa-venezia",
    title: "Casa Venezia",
    location: "Venice, IT",
    year: "2023",
    typology: "Private Residence",
    area: "310 sqm",
    photography: "Simone Bossi",
    description:
      "A piano nobile apartment on the Grand Canal, stripped back to its sixteenth-century bones. Terrazzo floors were restored, new partition walls dissolved to reconnect salon and loggia, and a palette of Venetian plaster and aged bronze introduced without ornament.",
    heroImage: "https://picsum.photos/seed/venezia-hero/1600/900",
    images: [
      "https://picsum.photos/seed/venezia1/1600/900",
      "https://picsum.photos/seed/venezia2/900/1200",
      "https://picsum.photos/seed/venezia3/1600/900",
      "https://picsum.photos/seed/venezia4/800/600",
    ],
    videoUrl: null,
    navTheme: "dark",
  },
  {
    slug: "maison-antibes",
    title: "Maison Antibes",
    location: "Antibes, FR",
    year: "2022",
    typology: "Villa",
    area: "560 sqm",
    photography: "Adrien Dirand",
    description:
      "A 1970s villa on the Cap d'Antibes transformed through a rigorous subtraction of excess. The project opens the ground floor entirely to the pine garden, reads the Mediterranean light through new apertures, and grounds the interiors in a single material family of limestone, linen and raw steel.",
    heroImage: "https://picsum.photos/seed/antibes-hero/1600/900",
    images: [
      "https://picsum.photos/seed/antibes1/1600/900",
      "https://picsum.photos/seed/antibes2/900/1200",
      "https://picsum.photos/seed/antibes3/800/600",
      "https://picsum.photos/seed/antibes4/800/600",
    ],
    videoUrl: null,
    navTheme: "light",
  },
  {
    slug: "atelier-torino",
    title: "Atelier Torino",
    location: "Turin, IT",
    year: "2024",
    typology: "Commercial",
    area: "180 sqm",
    photography: "Matteo Piazza",
    description:
      "A jewellery atelier in a former industrial loft near the Lingotto. The brief called for an interior that recedes so the craft takes precedence: poured concrete floors, museum-grade lighting, vitrines of blackened steel, and a single continuous skylight running the length of the workshop.",
    heroImage: "https://picsum.photos/seed/torino-hero/1600/900",
    images: [
      "https://picsum.photos/seed/torino1/1600/900",
      "https://picsum.photos/seed/torino2/900/1200",
      "https://picsum.photos/seed/torino3/1600/900",
    ],
    videoUrl: null,
    navTheme: "dark",
  },
  {
    slug: "villa-toscana",
    title: "Villa Toscana",
    location: "Chianti, IT",
    year: "2021",
    typology: "Private Residence",
    area: "780 sqm",
    photography: "Giovanni Gastel",
    description:
      "An eighteenth-century farmhouse in the Chianti hills converted into a family residence. Structural walls were exposed, original terracotta reinstated and new joinery designed in the spirit of the existing — nothing restored to a fiction of newness, everything allowed to show its age.",
    heroImage: "https://picsum.photos/seed/toscana-hero/1600/900",
    images: [
      "https://picsum.photos/seed/toscana1/1600/900",
      "https://picsum.photos/seed/toscana2/900/1200",
      "https://picsum.photos/seed/toscana3/1600/900",
      "https://picsum.photos/seed/toscana4/800/600",
      "https://picsum.photos/seed/toscana5/800/600",
    ],
    videoUrl: null,
    navTheme: "light",
  },
  {
    slug: "loft-paris",
    title: "Loft Paris",
    location: "Paris, FR",
    year: "2023",
    typology: "Residential",
    area: "220 sqm",
    photography: "Romain Laurendeau",
    description:
      "A double-height loft in the 10th arrondissement remade for a photographer and her archive. The ground level is left open and raw — polished screed, exposed steel columns, a kitchen as precise instrument. Above, a sleeping mezzanine floats in timber and frosted glass.",
    heroImage: "https://picsum.photos/seed/paris-hero/1600/900",
    images: [
      "https://picsum.photos/seed/paris1/1600/900",
      "https://picsum.photos/seed/paris2/900/1200",
      "https://picsum.photos/seed/paris3/800/600",
    ],
    videoUrl: null,
    navTheme: "dark",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  const nextIdx = (idx + 1) % projects.length;
  return projects[nextIdx];
}
