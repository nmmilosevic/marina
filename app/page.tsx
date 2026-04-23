"use client";

import { projects } from "@/data/projects";
import ProjectRow from "@/components/ProjectRow";

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Container: identical max-width and padding as Nav — aligns perfectly */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "96px 48px 0" }}
      >
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}

        <footer
          style={{
            paddingTop: "3rem",
            paddingBottom: "3rem",
            marginTop: "4rem",
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
      </div>
    </main>
  );
}
