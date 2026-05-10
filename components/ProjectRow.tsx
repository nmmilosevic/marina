"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";
import type { Project } from "@/data/projects";

interface ProjectRowProps {
  project: Project;
  index: number;
}

// Block-level positioning: width + marginLeft + marginRight
// marginLeft:"auto" + marginRight:"0" = flush right
// marginLeft:"7%" + marginRight:"auto" = left-center
// marginLeft:"0"  + marginRight:"0"   = flush left (full width)
const CONFIGS = [
  // index 0: full width, text centered — exactly like COMN first image
  { width: "100%", ml: "0",    mr: "0",    aspect: "16/9", textAlign: "center" },
  // index 1+: cycle below
  { width: "46%",  ml: "auto", mr: "0",    aspect: "3/4",  textAlign: "right"  },
  { width: "52%",  ml: "7%",   mr: "auto", aspect: "4/5",  textAlign: "right"  },
  { width: "48%",  ml: "auto", mr: "0",    aspect: "3/4",  textAlign: "right"  },
  { width: "62%",  ml: "0",    mr: "auto", aspect: "16/9", textAlign: "right"  },
] as const;

function makeVariants(index: number) {
  return {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        delay: index < 3 ? index * 0.12 : 0,
      },
    },
  };
}

export default function ProjectRow({ project, index }: ProjectRowProps) {
  const configIndex = index === 0 ? 0 : ((index - 1) % (CONFIGS.length - 1)) + 1;
  const cfg = CONFIGS[configIndex];
  const variants = makeVariants(index);

  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { startTransition } = useTransition();

  const isInView = useInView(rowRef, { once: true, margin: "-80px" });

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (videoRef.current && project.videoUrl) videoRef.current.play().catch(() => {});
  }, [project.videoUrl]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (videoRef.current) videoRef.current.pause();
  }, []);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const rect = imageRef.current?.getBoundingClientRect() ?? null;
      const sourceRect = rect
        ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
        : null;
      await startTransition(project.slug, sourceRect, "forward");
      router.push(`/project/${project.slug}`);
    },
    [project.slug, router, startTransition]
  );

  return (
    <motion.div
      ref={rowRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ paddingTop: index === 0 ? "2rem" : "5rem", paddingBottom: "0" }}
    >
      {/* Image block — width + auto margins control horizontal position */}
      <div
        ref={imageRef}
        data-cursor="view"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`View ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent);
          }
        }}
        style={{
          position: "relative",
          display: "block",
          width: cfg.width,
          marginLeft: cfg.ml,
          marginRight: cfg.mr,
          aspectRatio: cfg.aspect,
          overflow: "hidden",
          willChange: "transform",
          cursor: "inherit",
        }}
      >
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, min(1200px, 92vw)"
          quality={90}
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
          priority={index === 0}
        />

        {project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: hovered ? 1 : 0,
              transition: "opacity 600ms ease",
            }}
          />
        )}
      </div>

      {/* Text below image — same width + margins to stay flush with image edges */}
      <div
        onClick={handleClick}
        role="button"
        tabIndex={-1}
        style={{
          display: "block",
          width: cfg.width,
          marginLeft: cfg.ml,
          marginRight: cfg.mr,
          marginTop: "0.75rem",
          textAlign: cfg.textAlign,
          cursor: "inherit",
        }}
      >
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
          {project.title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "0.6875rem",
            color: "var(--color-muted)",
            marginTop: "0.125rem",
          }}
        >
          {project.location}
        </p>
      </div>
    </motion.div>
  );
}
