"use client";

import { useEffect } from "react";
import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectRow";
import Marquee from "@/components/Marquee";
import { useTransition } from "@/context/TransitionContext";

export default function HomePage() {
  const { endTransition } = useTransition();
  useEffect(() => { const t = setTimeout(endTransition, 100); return () => clearTimeout(t); }, [endTransition]);

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Container: identical max-width and padding as Nav — aligns perfectly */}
      <div
        className="max-sm:!px-5 max-sm:!pt-24"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 48px 0" }}
      >
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div style={{ marginTop: "4rem" }}>
        <Marquee />
      </div>

      <footer
        className="max-sm:!px-5 max-sm:!py-10"
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
          Marbella &mdash; 2026
        </span>
      </footer>
    </main>
  );
}
