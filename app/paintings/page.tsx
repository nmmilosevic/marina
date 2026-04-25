"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageFooter from "@/components/PageFooter";
import { useTransition } from "@/context/TransitionContext";
import { paintings } from "@/data/paintings";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function PaintingCard({ file, title, medium, year, onClick }: { file: string; title: string; medium: string; year: string; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <button
        onClick={onClick}
        data-cursor="view"
        aria-label={`View painting: ${title}`}
        style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, cursor: "none" }}
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
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
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
      </button>
    </motion.div>
  );
}

export default function PaintingsPage() {
  const { endTransition, startTransition } = useTransition();
  const router = useRouter();
  useEffect(() => { const t = setTimeout(endTransition, 100); return () => clearTimeout(t); }, [endTransition]);

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
            <PaintingCard
              key={file}
              file={file}
              title={title}
              medium={medium}
              year={year}
              onClick={async () => {
                await startTransition(file, null, "forward");
                router.push(`/painting/${file}`);
              }}
            />
          ))}
        </div>
      </section>

      <PageFooter />
    </main>
  );
}
