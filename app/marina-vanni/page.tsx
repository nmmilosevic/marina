"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

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

const influences = [
  "Carlo Scarpa",
  "Lina Bo Bardi",
  "The light of Andalusia",
  "Japanese wabi-sabi",
  "The writings of Juhani Pallasmaa",
  "Peter Zumthor's Therme Vals",
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarinaVanniPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "160px 48px 80px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
            lineHeight: 1,
            marginBottom: "1.25rem",
          }}
        >
          <WordReveal text="Marina Vanni" />
        </h1>
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "4rem",
          }}
        >
          Interior Designer &amp; Architect &mdash; Marbella
        </p>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            background: "var(--color-line)",
          }}
        >
          <Image
            src="https://picsum.photos/seed/marina-vanni-portrait/1400/900"
            alt="Marina Vanni"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* ── Biography ──────────────────────────────────────────────────── */}
      <section
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
            className="max-md:grid-cols-1"
          >
            <div>
              <SectionLabel>Biography</SectionLabel>
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
                Marina Vanni grew up in Milan, the daughter of an architect and
                a textile designer. Her childhood was spent between drawing
                boards and fabric swatches — an education in materials that
                preceded any formal training.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                }}
              >
                She studied architecture at the Politecnico di Milano, where she
                developed a discipline for structural thinking and spatial logic.
                A fellowship took her to the AA School of Architecture in
                London, where she encountered the more atmospheric and
                phenomenological traditions of European spatial practice.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                }}
              >
                After working for five years in a Milan studio specialising in
                museum interiors, she moved to Marbella in 2010 and founded her
                own practice. The move was deliberate: the Mediterranean light,
                the particular quality of heat and stone, the unhurried rhythm
                of the south — these became foundational to her work.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-hanken, sans-serif)",
                  fontSize: "0.875rem",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                }}
              >
                Today she works from a studio in the old town of Marbella, on a
                small number of projects at a time. She believes in working
                slowly, in taking on only what she can fully inhabit.
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Approach quote ─────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--color-line)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <RevealSection style={{ maxWidth: "800px" }}>
          <p
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              lineHeight: 1.25,
              fontStyle: "italic",
              marginBottom: "2rem",
            }}
          >
            "I am interested in what a space feels like at six in the morning,
            not how it photographs at noon."
          </p>
          <p
            style={{
              fontFamily: "var(--font-hanken, sans-serif)",
              fontSize: "0.6875rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
            }}
          >
            Marina Vanni, 2023
          </p>
        </RevealSection>
      </section>

      {/* ── Influences ─────────────────────────────────────────────────── */}
      <section
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
            className="max-md:grid-cols-1"
          >
            <div>
              <SectionLabel>Influences</SectionLabel>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {influences.map((influence) => (
                <p
                  key={influence}
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "0.9375rem",
                    fontWeight: 300,
                    color: "var(--color-ink)",
                    lineHeight: 2.2,
                  }}
                >
                  {influence}
                </p>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Collaborators marquee ───────────────────────────────────────── */}
      <div
        style={{ marginTop: "2rem" }}
        className="py-8 border-t border-b border-[var(--color-line)] overflow-hidden"
      >
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...collaborators, ...collaborators, ...collaborators, ...collaborators].map((name, i) => (
            <span
              key={i}
              className="inline-flex items-center text-[0.75rem] tracking-[0.25em] uppercase px-10"
              style={{
                color: "var(--color-muted)",
                fontFamily: "var(--font-hanken, sans-serif)",
              }}
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
          margin: "2rem auto 0",
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
