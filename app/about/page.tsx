"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Marquee from "@/components/Marquee";
import { useTransition } from "@/context/TransitionContext";

// ─── Data ────────────────────────────────────────────────────────────────────

const processPhases = [
  {
    index: "01",
    name: "Reading",
    description:
      "We begin by listening — to the site, its light, its history of inhabitation. Nothing is drawn until the place has been understood.",
  },
  {
    index: "02",
    name: "Structure",
    description:
      "Spatial planning and architectural intervention. We work on the bones: proportion, circulation, the relationship between enclosure and openness.",
  },
  {
    index: "03",
    name: "Material",
    description:
      "Palette, texture, craft. Every surface is chosen for its behaviour in specific light, its honesty to its own nature, its capacity to age well.",
  },
  {
    index: "04",
    name: "Detail",
    description:
      "Furniture, light, objects. At this scale, subtraction is the discipline: fewer things, each precisely placed, each earning its presence.",
  },
];

const services = [
  {
    index: "01",
    title: "Residential\nDesign",
    subtitle: "Homes & Private Residences",
    description: "Home design is deeply personal. The studio works around each client's tastes and lifestyle, layering in the spatial instincts of a skilled designer to produce environments that feel both deliberate and alive. Not a delivered product. A creative process you move through together.",
    tagline: "Passion and professionalism in balance. Every time.",
    image: "https://picsum.photos/seed/mv-residential/1200/700",
    bg: "#EDE4D8",
    color: "var(--color-ink)",
    mutedColor: "var(--color-muted)",
    span: 2,
  },
  {
    index: "02",
    title: "Commercial\nProjects",
    subtitle: "Hotels, F&B & Retail",
    description: "Commercial work demands a different discipline. Deadlines, budgets, and quality control run alongside creative vision. A full team handles every project end to end — from a single decoration brief to a complete structural refurbishment.",
    tagline: "Concept to construction. No handoffs, no gaps.",
    image: "https://picsum.photos/seed/mv-commercial/800/600",
    bg: "#EDE4D8",
    color: "var(--color-ink)",
    mutedColor: "var(--color-muted)",
    span: 1,
  },
  {
    index: "03",
    title: "Refurbishment\n& Renovation",
    subtitle: "Full-Scope Transformation",
    description: "Renovation work reveals what a space is already trying to be. The studio's approach draws from a rich textural and tonal palette — natural materials inside and out — to create a composed dialogue between existing architecture, spatial form, and furniture.",
    tagline: "What is already there, made unmissable.",
    image: "https://picsum.photos/seed/mv-renovation/800/600",
    bg: "#EDE4D8",
    color: "var(--color-ink)",
    mutedColor: "var(--color-muted)",
    span: 1,
  },
  {
    index: "04",
    title: "Bespoke\nFurniture",
    subtitle: "Commissions & Limited Editions",
    description: "The studio sources rare and singular furniture pieces, and also designs one-of-a-kind limited editions produced to measure by skilled craftsmen. These are objects made to carry weight in a room — pieces that create impact, hold attention, and are made for nowhere else.",
    tagline: "Pieces that exist once. Designed for exactly one room.",
    image: "https://picsum.photos/seed/mv-furniture/1200/700",
    bg: "#EDE4D8",
    color: "var(--color-ink)",
    mutedColor: "var(--color-muted)",
    span: 2,
  },
];

// ─── Animation config ─────────────────────────────────────────────────────────

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const WORD_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

// ─── WordReveal ───────────────────────────────────────────────────────────────

function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  return (
    <span ref={ref} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 16, filter: "blur(4px)" }
          }
          transition={{
            duration: 1.1,
            ease: WORD_EASE,
            delay: i * 0.07,
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Shared components ────────────────────────────────────────────────────────

function RevealSection({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-hanken, sans-serif)",
        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
        fontWeight: 300,
        letterSpacing: "-0.03em",
        color: "var(--color-ink)",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

// ─── PhaseCard ────────────────────────────────────────────────────────────────

function PhaseCard({
  phase,
}: {
  phase: { index: string; name: string; description: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        border: "1px solid var(--color-line)",
        padding: "2.5rem",
        transition: "background-color 300ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor =
          "rgba(200,168,130,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.625rem",
          letterSpacing: "0.2em",
          color: "var(--color-muted)",
        }}
      >
        {phase.index}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "2rem",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          marginTop: "1.5rem",
        }}
      >
        {phase.name}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "0.8125rem",
          lineHeight: 1.8,
          color: "var(--color-muted)",
          marginTop: "1rem",
        }}
      >
        {phase.description}
      </p>
    </motion.div>
  );
}

// ─── BentoCard ────────────────────────────────────────────────────────────────

function BentoCard({
  service,
  delay,
}: {
  service: typeof services[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        gridColumn: `span ${service.span}`,
        background: service.bg,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: "320px", overflow: "hidden" }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div style={{ padding: "clamp(1.75rem, 2.5vw, 2.5rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, gap: "1.25rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.625rem", letterSpacing: "0.2em", color: service.mutedColor }}>
            {service.index} —
          </p>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "clamp(1.5rem, 2.2vw, 2.25rem)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                color: service.color,
                lineHeight: 1.05,
                whiteSpace: "pre-line",
                marginBottom: "0.4rem",
              }}
            >
              {service.title}
            </h3>
            <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "0.5625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: service.mutedColor }}>
              {service.subtitle}
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "0.8125rem", lineHeight: 1.8, color: service.mutedColor }}>
            {service.description}
          </p>
        </div>

        <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "0.75rem", color: service.color, fontStyle: "italic", fontWeight: 300, paddingTop: "1.25rem", borderTop: "1px solid var(--color-line)" }}>
          {service.tagline}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { endTransition } = useTransition();
  useEffect(() => { const t = setTimeout(endTransition, 100); return () => clearTimeout(t); }, [endTransition]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>

      {/* ── Hero manifesto ─────────────────────────────────────────────── */}
      <section
        className="max-sm:!px-5 max-sm:!pt-28 max-sm:!pb-16"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "160px 48px 128px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "clamp(2.25rem, 5vw, 5rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--color-ink)",
            maxWidth: "820px",
          }}
        >
          <WordReveal text="We design spaces that are made to be inhabited, not admired." />
        </p>

      </section>

      {/* ── Philosophy ─────────────────────────────────────────────────── */}
      <section
        className="max-sm:!px-5 max-sm:!py-16"
        style={{
          borderTop: "1px solid var(--color-line)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 48px",
        }}
      >
        <RevealSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "4rem",
            }}
            className="max-md:!grid-cols-1 max-md:!gap-8"
          >
            <div>
              <SectionLabel>Philosophy</SectionLabel>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "var(--color-ink)",
                  fontWeight: 400,
                }}
              >
                Every project begins with a long, unhurried reading of place.
                Light, proportion, the particular silences of a building at noon
                and at dusk. We believe that the right answer to a spatial
                problem is almost always already latent in the site. Our task is
                to listen before we speak.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                }}
              >
                Material honesty is not an aesthetic preference, it is an
                ethical one. We choose stone that reads as stone, linen that
                reads as linen, wood that carries the grain and memory of its
                origin. Nothing pretends to be something it is not. This
                commitment to honesty extends to structure: we do not decorate
                bones we are not proud of.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                }}
              >
                The discipline we return to again and again is subtraction. Most
                spaces are improved by removing, not adding. We edit with
                persistence. What remains at the end of this process should feel
                inevitable, as though it could not have been otherwise.
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section
        className="max-sm:!px-5 max-sm:!py-16"
        style={{
          borderTop: "1px solid var(--color-line)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 48px",
        }}
      >
        <RevealSection style={{ marginBottom: "4rem" }}>
          <SectionLabel>Services</SectionLabel>
        </RevealSection>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
          className="max-sm:!grid-cols-1"
        >
          {services.map((service, i) => (
            <BentoCard key={service.index} service={service} delay={i * 0.08} />
          ))}
        </div>
      </section>

      <div style={{ marginTop: "5rem" }} className="max-sm:mt-10">
        <Marquee />
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.875rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
          }}
        >
          Marina Vanni
        </span>
        <span
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
          }}
        >
          Marbella, 2026
        </span>
      </footer>
    </main>
  );
}
