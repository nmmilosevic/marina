"use client";

import { useEffect, use, useRef } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { getProjectBySlug, getAdjacentProject } from "@/data/projects";
import { useTransition } from "@/context/TransitionContext";
import ProjectGallery from "@/components/ProjectGallery";
import Marquee from "@/components/Marquee";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const WORD_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Page-entry WordReveal: no useInView, fires on mount, 0.5s base delay
function WordReveal({
  text,
  style,
  className,
  delay = 0,
}: {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const baseDelay = 0.5 + delay;

  return (
    <span style={{ display: "inline", ...style }} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.3,
            ease: WORD_EASE,
            delay: baseDelay + i * 0.08,
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Next-project title: triggered by useInView since it's below the fold
function NextProjectTitle({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <span ref={ref} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          transition={{
            duration: 1.3,
            ease: WORD_EASE,
            delay: i * 0.08,
          }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const metaReveal = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: 0.1,
    },
  },
};

const descReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.8,
    },
  },
};

export default function ProjectPage({ params }: PageProps) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const router = useRouter();
  const { startTransition, endTransition } = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => endTransition(), 100);
    return () => clearTimeout(timer);
  }, [endTransition]);

  useEffect(() => {
    if (!project) return;
    const color = project.navTheme === "light" ? "#ffffff" : "var(--color-ink)";
    document.documentElement.style.setProperty("--nav-color-override", color);
    return () => { document.documentElement.style.removeProperty("--nav-color-override"); };
  }, [project?.navTheme]);

  if (!project) {
    notFound();
  }

  const nextProject = getAdjacentProject(slug);

  const handleBack = async (e: React.MouseEvent) => {
    e.preventDefault();
    await startTransition("nav", null, "back");
    router.push("/");
  };

  const handleNextProject = async (e: React.MouseEvent) => {
    e.preventDefault();
    await startTransition(nextProject.slug, null, "forward");
    router.push(`/project/${nextProject.slug}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero, full viewport */}
      <div className="relative w-full overflow-hidden" style={{ height: "100svh", background: "#111111" }}>
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Back link — aligned to the 1200px grid */}
        <div className="absolute top-20 z-10 max-sm:!px-5" style={{ left: 0, right: 0, maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          <button
            onClick={handleBack}
            className="link-underline text-[0.625rem] tracking-[0.18em] uppercase text-white hover:text-[var(--color-accent)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
            aria-label="Back to work"
          >
            ← Work
          </button>
        </div>

        {/* Hero title overlay */}
        <div className="absolute bottom-10 z-10 max-sm:!px-5" style={{ left: 0, right: 0, maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl uppercase tracking-widest leading-none"
            style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
          >
            <WordReveal text={project.title} style={{ color: "#ffffff" }} />
          </h1>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 right-12 animate-pulse-gentle"
          aria-hidden="true"
        >
          <div
            className="text-white/60 text-lg select-none"
            style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
          >
            ↓
          </div>
        </div>

        {/* Subtle gradient overlay at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* Text content — 6rem top and bottom so gallery starts with a full gap below */}
      <div className="max-sm:!px-5 max-sm:!py-12" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 48px 6rem" }}>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Left: metadata */}
          <motion.div
            variants={metaReveal}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[30%] flex-shrink-0"
          >
            <dl className="flex flex-col gap-5">
              {[
                { label: "Project", value: project.title },
                { label: "Location", value: project.location },
                { label: "Year", value: project.year },
                { label: "Typology", value: project.typology },
                { label: "Area", value: project.area },
                ...(project.photography
                  ? [{ label: "Photography", value: project.photography }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <dt
                    className="text-[0.5625rem] tracking-[0.18em] uppercase"
                    style={{ color: "var(--color-muted)", fontFamily: "var(--font-hanken, sans-serif)" }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-[0.8125rem] tracking-wide"
                    style={{ color: "var(--color-ink)", fontFamily: "var(--font-hanken, sans-serif)" }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right: description */}
          <motion.div
            variants={descReveal}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[70%]"
          >
            <p
              className="font-display text-2xl md:text-3xl leading-relaxed"
              style={{ fontFamily: "var(--font-hanken, sans-serif)", color: "var(--color-ink)" }}
            >
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gallery — outside text container so content bottom padding creates the gap */}
      <div className="max-sm:!px-5 max-sm:!pb-12" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px 6rem" }}>
        <ProjectGallery images={project.images} title={project.title} />
      </div>

      <Marquee />

      {/* Next project teaser */}
      <div style={{ borderTop: "1px solid var(--color-line)" }}>
        <button
          onClick={handleNextProject}
          data-cursor="view"
          className="w-full group hover:bg-[var(--color-ink)] transition-colors duration-500"
          style={{ background: "transparent" }}
          aria-label={`Next project: ${nextProject.title}`}
        >
          <div
            className="max-sm:!px-5 max-sm:!py-8 max-sm:!flex-col max-sm:!items-start"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "4rem 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <span
              className="group-hover:text-[var(--color-bg)] transition-colors duration-500"
              style={{ fontSize: "0.625rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", fontFamily: "var(--font-hanken, sans-serif)" }}
            >
              Next Project
            </span>
            <span
              className="group-hover:text-[var(--color-bg)] transition-colors duration-500 max-sm:!text-2xl"
              style={{ fontSize: "2.5rem", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "var(--font-hanken, sans-serif)", color: "var(--color-ink)" }}
            >
              <NextProjectTitle text={nextProject.title} />
            </span>
          </div>
        </button>
      </div>
    </main>
  );
}
