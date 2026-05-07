"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, use, useState } from "react";
import { notFound } from "next/navigation";
import { paintings } from "@/data/paintings";
import { useTransition } from "@/context/TransitionContext";
import PageFooter from "@/components/PageFooter";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface PageProps {
  params: Promise<{ id: string }>;
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontSize: "0.5625rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontSize: "0.8125rem",
  color: "var(--color-ink)",
  letterSpacing: "0.01em",
};

interface FormState {
  name: string;
  email: string;
  status: "idle" | "sending" | "sent" | "error";
}

function EnquiryForm({ paintingTitle }: { paintingTitle: string }) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", status: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setForm((f) => ({ ...f, status: "sending" }));
    try {
      const res = await fetch("/api/painting-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, paintingTitle }),
      });
      if (res.ok) {
        setForm((f) => ({ ...f, status: "sent" }));
      } else {
        setForm((f) => ({ ...f, status: "error" }));
      }
    } catch {
      setForm((f) => ({ ...f, status: "error" }));
    }
  }

  if (form.status === "sent") {
    return (
      <p
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "0.8125rem",
          color: "var(--color-muted)",
          lineHeight: 1.75,
        }}
      >
        Thank you. We will be in touch shortly.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    background: "none",
    border: "none",
    borderBottom: "1px solid var(--color-line)",
    padding: "0.625rem 0",
    fontFamily: "var(--font-hanken, sans-serif)",
    fontSize: "0.875rem",
    color: "var(--color-ink)",
    outline: "none",
    borderRadius: 0,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label
          htmlFor="enquiry-name"
          style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}
        >
          Name
        </label>
        <input
          id="enquiry-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>

      <div>
        <label
          htmlFor="enquiry-email"
          style={{ ...labelStyle, display: "block", marginBottom: "0.5rem" }}
        >
          Email
        </label>
        <input
          id="enquiry-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="your@email.com"
          style={inputStyle}
        />
      </div>

      <input type="hidden" name="paintingTitle" value={paintingTitle} />

      {form.status === "error" && (
        <p style={{ ...labelStyle, color: "var(--color-muted)" }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={form.status === "sending"}
        style={{
          display: "block",
          width: "100%",
          background: "var(--color-ink)",
          color: "var(--color-bg)",
          border: "none",
          padding: "1rem",
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "0.5625rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          cursor: form.status === "sending" ? "wait" : "pointer",
          opacity: form.status === "sending" ? 0.6 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {form.status === "sending" ? "Sending..." : "Enquire"}
      </button>
    </form>
  );
}

export default function PaintingDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { endTransition } = useTransition();

  useEffect(() => {
    const t = setTimeout(endTransition, 100);
    return () => clearTimeout(t);
  }, [endTransition]);

  const painting = paintings.find((p) => p.file === id);
  if (!painting) {
    notFound();
    return null;
  }

  const { file, title, medium, year } = painting;

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Two-column layout */}
        <div
          className="max-sm:!flex-col max-sm:!pt-24"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "120px 48px 6rem",
            display: "flex",
            gap: "5rem",
            alignItems: "flex-start",
          }}
        >
          {/* Left: image */}
          <div
            className="max-sm:!w-full"
            style={{ flex: "0 0 60%", position: "relative" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
              style={{ position: "relative", width: "100%" }}
            >
              <Image
                src={`/paintings/cropped/${file}.jpeg`}
                alt={`Marina Vanni — ${title}`}
                width={900}
                height={1200}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
                priority
              />
            </motion.div>
          </div>

          {/* Right: info + form */}
          <motion.div
            className="max-sm:!w-full max-sm:!px-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
            style={{ flex: "1 1 auto", paddingTop: "0.5rem" }}
          >
            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              {title}
            </h1>

            {/* Medium + year */}
            <p style={labelStyle}>
              {medium}{year ? `, ${year}` : ""}
            </p>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid var(--color-line)",
                margin: "2rem 0",
              }}
            />

            {/* Specifications */}
            <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>Specifications</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                <span style={labelStyle}>Medium</span>
                <span style={valueStyle}>{medium}</span>
              </div>

              {year && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                  <span style={labelStyle}>Year</span>
                  <span style={valueStyle}>{year}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                <span style={labelStyle}>Support</span>
                <span style={valueStyle}>Original work on paper</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem" }}>
                <span style={labelStyle}>Print</span>
                <span style={valueStyle}>Available as print</span>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid var(--color-line)",
                margin: "2rem 0",
              }}
            />

            {/* Enquiry form */}
            <p style={{ ...labelStyle, marginBottom: "1.5rem" }}>Enquire</p>
            <EnquiryForm paintingTitle={title} />
          </motion.div>
        </div>

        <PageFooter />
      </motion.div>
    </main>
  );
}
