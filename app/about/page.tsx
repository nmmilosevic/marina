"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  { label: "Interior Architecture", seed: "svc-interior-arch-mv" },
  { label: "Space Planning", seed: "svc-space-plan-mv" },
  { label: "Material Specification", seed: "svc-material-spec-mv" },
  { label: "Lighting Design", seed: "svc-lighting-mv" },
  { label: "Furniture & Object Selection", seed: "svc-furniture-mv" },
  { label: "Project Management", seed: "svc-project-mgmt-mv" },
];

const collaborators = [
  "Cassina",
  "Kettal",
  "Molteni&C",
  "Flos",
  "Living Divani",
  "Paola Lenti",
  "B&B Italia",
  "Poliform",
  "Dedar",
  "Pierre Frey",
  "Rubelli",
  "Loro Piana",
  "Hermès Maison",
  "Fornasetti",
  "Liaigre",
  "Frette",
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
    <p
      style={{
        fontFamily: "var(--font-hanken, sans-serif)",
        fontSize: "0.625rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--color-muted)",
      }}
    >
      {children}
    </p>
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

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: { label: string; seed: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          overflow: "hidden",
          background: "var(--color-line)",
        }}
      >
        <Image
          src={`https://picsum.photos/seed/${service.seed}/800/600`}
          alt={service.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{ transition: "transform 600ms ease" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 400,
          color: "var(--color-ink)",
          marginTop: "1rem",
        }}
      >
        {service.label}
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>

      {/* ── Hero manifesto ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
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

        <motion.div
          variants={fadeUp}
          custom={0.35}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="flex-wrap gap-8 max-sm:flex-col max-sm:gap-6"
          style={{ marginTop: "4rem", display: "flex", gap: "4rem" }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Founded
            </p>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.8125rem",
                color: "var(--color-ink)",
              }}
            >
              2010, Marbella
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Practice
            </p>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.8125rem",
                color: "var(--color-ink)",
              }}
            >
              Solo practice
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.625rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "0.5rem",
              }}
            >
              Focus
            </p>
            <p
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.8125rem",
                color: "var(--color-ink)",
              }}
            >
              Mediterranean + Europe
            </p>
          </div>
        </motion.div>
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

      {/* ── Process ────────────────────────────────────────────────────── */}
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
          <SectionLabel>Process</SectionLabel>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="max-md:!grid-cols-1"
        >
          {processPhases.map((phase) => (
            <PhaseCard key={phase.index} phase={phase} />
          ))}
        </div>
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
          className="max-sm:!grid-cols-1 max-md:!grid-cols-2"
        >
          {services.map((service) => (
            <ServiceCard key={service.label} service={service} />
          ))}
        </div>
      </section>

      {/* ── Collaborators marquee ───────────────────────────────────────── */}
      <div
        style={{ marginTop: "5rem" }}
        className="py-10 border-t border-b border-[var(--color-line)] overflow-hidden max-sm:mt-10"
      >
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...collaborators, ...collaborators, ...collaborators, ...collaborators].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center text-[0.75rem] tracking-[0.25em] uppercase px-10"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-hanken, sans-serif)" }}
            >
              {name}
              <span
                className="mx-10 inline-block w-1 h-1 rounded-full bg-[var(--color-accent)]"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
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
