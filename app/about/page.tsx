"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Marquee from "@/components/Marquee";

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
    label: "Interior Architecture",
    seed: "svc-interior-arch-mv",
    descriptor: "Space & Structure",
    description: "Full spatial redesign — walls, openings, volumes. We work from the bones outward, ensuring every structural decision serves both light and life.",
  },
  {
    label: "Space Planning",
    seed: "svc-space-plan-mv",
    descriptor: "Flow & Proportion",
    description: "Circulation, proportion, and the relationship between rooms. We map how a space is lived in across the day before a single object is placed.",
  },
  {
    label: "Material Specification",
    seed: "svc-material-spec-mv",
    descriptor: "Surface & Texture",
    description: "Stone, plaster, timber, linen — each surface chosen for its behaviour in specific light, its honesty, and its capacity to age with grace.",
  },
  {
    label: "Lighting Design",
    seed: "svc-lighting-mv",
    descriptor: "Atmosphere & Mood",
    description: "Layered natural and artificial light as a design material. We consider the quality of light at every hour, not just at noon.",
  },
  {
    label: "Furniture & Objects",
    seed: "svc-furniture-mv",
    descriptor: "Form & Craft",
    description: "A considered edit of furniture, textiles, and objects — sourced from long-standing collaborators and ateliers across Europe.",
  },
  {
    label: "Project Management",
    seed: "svc-project-mgmt-mv",
    descriptor: "Process & Precision",
    description: "Full oversight from first drawing to final placement. We remain present at every stage, ensuring intention survives execution.",
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

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  flipped,
  onFlip,
}: {
  service: { label: string; seed: string; descriptor: string; description: string };
  flipped: boolean;
  onFlip: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  const directionRef = useRef<1 | -1>(-1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.6 });

  // Idle oscillation when card is resting
  useEffect(() => {
    if (hovered || flipped) return;
    let frame: number;
    const start = performance.now();
    function tick() {
      const t = (performance.now() - start) / 1000;
      mouseY.set(Math.sin(t * 0.65) * 5);
      mouseX.set(Math.sin(t * 0.38 + 1) * 2.5);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hovered, flipped, mouseX, mouseY]);

  // Reset tilt when flipped from outside
  useEffect(() => {
    if (flipped) { mouseX.set(0); mouseY.set(0); }
  }, [flipped, mouseX, mouseY]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(-y * 16);
    mouseY.set(x * 16);
  }

  function handleMouseLeave() {
    setHovered(false);
    if (!flipped) { mouseX.set(0); mouseY.set(0); }
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    directionRef.current = x < 0.5 ? -1 : 1;
    mouseX.set(0);
    mouseY.set(0);
    onFlip();
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={0}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div
        style={{ perspective: "900px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleClick(e)}
      >
        {/* Tilt wrapper — driven by spring motion values */}
        <motion.div
          style={{
            rotateX: rotX,
            rotateY: rotY,
            transformStyle: "preserve-3d",
            cursor: "pointer",
            willChange: "transform",
          }}
        >
          {/* Flip element */}
          <motion.div
            animate={{ rotateY: flipped ? directionRef.current * 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", position: "relative" }}
          >
            {/* Front face */}
            <div style={{ backfaceVisibility: "hidden" }}>
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
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                    color: "var(--color-ink)",
                  }}
                >
                  {service.label}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "0.5rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    flexShrink: 0,
                    marginLeft: "0.5rem",
                  }}
                >
                  tap to reveal
                </span>
              </div>
            </div>

            {/* Back face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(-180deg)",
                background: "#B8936A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                textAlign: "center",
                gap: "0.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--color-ink)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {service.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  color: "#4A3018",
                  fontWeight: 300,
                  maxWidth: "240px",
                  textAlign: "center",
                }}
              >
                {service.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

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
          {services.map((service, i) => (
            <ServiceCard
              key={service.label}
              service={service}
              flipped={flippedIndex === i}
              onFlip={() => setFlippedIndex(flippedIndex === i ? null : i)}
            />
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
