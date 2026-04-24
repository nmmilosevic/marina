"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Marquee from "@/components/Marquee";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const paintings = [
  { file: "painting_02", title: "The Wall",         medium: "Gouache on paper",             year: "2021" },
  { file: "painting_03", title: "The Mountains",    medium: "Watercolor on paper",           year: "2018" },
  { file: "painting_04", title: "Hoku by the Lake", medium: "Watercolor on paper",           year: "2025" },
  { file: "painting_05", title: "The Fog",          medium: "Watercolor & Gouache on paper", year: "2022" },
  { file: "painting_06", title: "Exploration I",    medium: "Mixed media on paper",          year: ""     },
  { file: "painting_07", title: "Exploration II",   medium: "Mixed media on paper",          year: ""     },
  { file: "painting_08", title: "Exploration III",  medium: "Mixed media on paper",          year: ""     },
  { file: "painting_09", title: "Exploration IV",   medium: "Mixed media on paper",          year: ""     },
  { file: "painting_10", title: "Exploration V",    medium: "Mixed media on paper",          year: ""     },
  { file: "painting_11", title: "Exploration VI",   medium: "Mixed media on paper",          year: ""     },
  { file: "painting_12", title: "Marbella",         medium: "Ink on paper",                  year: ""     },
  { file: "painting_13", title: "Plaza",            medium: "Ink on paper",                  year: ""     },
  { file: "painting_14", title: "City Mural I",     medium: "Ink on paper",                  year: ""     },
  { file: "painting_15", title: "City Mural II",    medium: "Ink on paper",                  year: ""     },
  { file: "painting_16", title: "Rooftops",         medium: "Ink on paper",                  year: ""     },
  { file: "painting_17", title: "Skyline",          medium: "Ink on paper",                  year: ""     },
  { file: "painting_18", title: "Piazza",           medium: "Ink on paper",                  year: ""     },
  { file: "painting_19", title: "Red Door",         medium: "Ink & watercolor on paper",     year: ""     },
  { file: "painting_20", title: "Green Kitchen",    medium: "Ink & watercolor on paper",     year: ""     },
  { file: "painting_21", title: "Old House",        medium: "Ink on paper",                  year: ""     },
  { file: "painting_22", title: "From Above",       medium: "Ink on paper",                  year: ""     },
];

function PaintingCard({ file, title, medium, year }: { file: string; title: string; medium: string; year: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "2/3",
          overflow: "hidden",
          background: "var(--color-bg)",
        }}
      >
        <Image
          src={`/paintings/cropped/${file}.jpeg`}
          alt={`Marina Vanni — ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div style={{ marginTop: "0.875rem" }}>
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.8125rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
            fontWeight: 600,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.6875rem",
            color: "var(--color-muted)",
            marginTop: "0.125rem",
          }}
        >
          {medium}{year ? `, ${year}` : ""}
        </p>
      </div>
    </motion.div>
  );
}

export default function PaintingsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>

      {/* Header */}
      <section
        className="max-sm:!px-5 max-sm:!pt-28 max-sm:!pb-10"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "160px 48px 64px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.625rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "1.25rem",
          }}
        >
          In the Making
        </p>
        <h1
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: "var(--color-ink)",
            lineHeight: 1,
          }}
        >
          Paintings
        </h1>
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.8125rem",
            color: "var(--color-muted)",
            marginTop: "1.5rem",
            maxWidth: "480px",
            lineHeight: 1.75,
          }}
        >
          A collection of works on paper — watercolour, gouache, and pencil — made alongside the architecture.
        </p>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid var(--color-line)", maxWidth: "1200px", margin: "0 auto" }} />

      {/* Gallery grid */}
      <section
        className="max-sm:!px-5"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 48px 8rem" }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "4rem 2.5rem" }}
          className="max-sm:!grid-cols-1 max-sm:!gap-y-12"
        >
          {paintings.map(({ file, title, medium, year }) => (
            <PaintingCard key={file} file={file} title={title} medium={medium} year={year} />
          ))}
        </div>
      </section>

      <Marquee />

      {/* Footer */}
      <footer
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="max-sm:!px-5"
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
