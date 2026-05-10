/**
 * Remote logo assets for the marquee. Mix of Wikimedia Commons, official brand CDNs,
 * and Google’s favicon service (256px) where no public vector was available.
 * Replace favicon fallbacks with press-kit PNG/SVG URLs when you have them.
 */

export type MarqueeBrandAsset = {
  id: string;
  /** Accessible name */
  alt: string;
  /** Absolute image URL (SVG or raster) */
  src: string;
};

/** Google-hosted high-res site icon (PNG/JPEG), derived from the brand’s public site. */
function siteIcon(siteUrl: string): string {
  const u = encodeURIComponent(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`);
  return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${u}&size=256`;
}

export const MARQUEE_BRAND_ASSETS: MarqueeBrandAsset[] = [
  {
    id: "cassina",
    alt: "Cassina",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/78/Cassina_SpA_logo.svg",
  },
  {
    id: "kettal",
    alt: "Kettal",
    src: siteIcon("https://www.kettal.com/"),
  },
  {
    id: "molteni",
    alt: "Molteni&C",
    src: siteIcon("https://www.molteni.it/"),
  },
  {
    id: "flos",
    alt: "Flos",
    src: "https://flos.com/on/demandware.static/Sites-FLOS-EU-Site/-/default/dw28535938/images/logos/flos-logo.svg",
  },
  {
    id: "living-divani",
    alt: "Living Divani",
    src: siteIcon("https://www.livingdivani.it/"),
  },
  {
    id: "paola-lenti",
    alt: "Paola Lenti",
    src: siteIcon("https://www.paolalenti.it/"),
  },
  {
    id: "bb-italia",
    alt: "B&B Italia",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/B%26B_Italia_logo.svg",
  },
  {
    id: "poliform",
    alt: "Poliform",
    src: "https://s3.poliform.it/2025/07/poliform-logo.svg",
  },
  {
    id: "dedar",
    alt: "Dedar",
    src: siteIcon("https://www.dedar.com/"),
  },
  {
    id: "pierre-frey",
    alt: "Pierre Frey",
    src: siteIcon("https://www.pierrefrey.com/"),
  },
  {
    id: "rubelli",
    alt: "Rubelli",
    src: siteIcon("https://www.rubelli.com/"),
  },
  {
    id: "loro-piana",
    alt: "Loro Piana",
    src: siteIcon("https://www.loropiana.com/"),
  },
  {
    id: "hermes",
    alt: "Hermès Maison",
    src: siteIcon("https://www.hermes.com/"),
  },
  {
    id: "fornasetti",
    alt: "Fornasetti",
    src: siteIcon("https://www.fornasetti.com/"),
  },
  {
    id: "liaigre",
    alt: "Liaigre",
    src: siteIcon("https://www.liaigre.com/"),
  },
  {
    id: "frette",
    alt: "Frette",
    src: siteIcon("https://www.frette.com/"),
  },
];
