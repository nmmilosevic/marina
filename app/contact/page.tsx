"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import { useTransition } from "@/context/TransitionContext";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fields = [
  { id: "name",    label: "Name",    type: "text",  required: true },
  { id: "email",   label: "Email",   type: "email", required: true },
  { id: "phone",   label: "Phone",   type: "tel",   required: false },
  { id: "subject", label: "Subject", type: "text",  required: true },
] as const;

type FieldId = typeof fields[number]["id"];
type FormData = Record<FieldId | "message", string>;

const empty: FormData = { name: "", email: "", phone: "", subject: "", message: "" };

const fieldStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontSize: "0.9375rem",
  fontWeight: 300,
  color: "var(--color-ink)",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--color-line)",
  borderRadius: 0,
  outline: "none",
  width: "100%",
  padding: "0.75rem 0",
  transition: "border-color 250ms ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-hanken, sans-serif)",
  fontSize: "0.5625rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  display: "block",
  marginBottom: "0.25rem",
};

function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.5 + i * 0.08 }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function ContactPage() {
  const { endTransition } = useTransition();
  useEffect(() => { const t = setTimeout(endTransition, 100); return () => clearTimeout(t); }, [endTransition]);
  const [form, setForm] = useState<FormData>(empty);
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "160px 48px 120px" }}
        className="max-sm:!px-5 max-sm:!pt-28"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8rem", alignItems: "start" }}
          className="max-md:!grid-cols-1 max-md:!gap-16"
        >

          {/* ── Left: heading + contact info ─────────────────────────── */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
                marginBottom: "3rem",
              }}
            >
              <WordReveal text="Let's work together." />
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
              >
                <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>Email</p>
                <a
                  href="mailto:hello@marinavanni.com"
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "0.9375rem",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    paddingBottom: "1px",
                    transition: "border-color 300ms ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--color-ink)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent"; }}
                >
                  hello@marinavanni.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
              >
                <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>Instagram</p>
                <a
                  href="https://instagram.com/marinavanni.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "0.9375rem",
                    color: "var(--color-muted)",
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    paddingBottom: "1px",
                    transition: "border-color 300ms ease, color 300ms ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderBottomColor = "var(--color-muted)";
                    el.style.color = "var(--color-ink)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderBottomColor = "transparent";
                    el.style.color = "var(--color-muted)";
                  }}
                >
                  @marinavanni.studio
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
              >
                <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>Location</p>
                <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "0.9375rem", color: "var(--color-muted)" }}>
                  Marbella, Spain
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Right: form ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.8 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ paddingTop: "2rem" }}
              >
                <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "1.25rem", fontWeight: 300, color: "var(--color-ink)", letterSpacing: "-0.01em", marginBottom: "1rem" }}>
                  Message received.
                </p>
                <p style={{ fontFamily: "var(--font-hanken, sans-serif)", fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.7 }}>
                  Thank you for reaching out. Marina will be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

                  {fields.map(({ id, label, type, required }) => (
                    <div key={id}>
                      <label htmlFor={id} style={labelStyle}>{label}</label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        required={required}
                        value={form[id]}
                        onChange={handleChange}
                        onFocus={() => setFocused(id)}
                        onBlur={() => setFocused(null)}
                        style={{
                          ...fieldStyle,
                          borderBottomColor: focused === id ? "var(--color-ink)" : "var(--color-line)",
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...fieldStyle,
                        resize: "none",
                        lineHeight: 1.75,
                        borderBottomColor: focused === "message" ? "var(--color-ink)" : "var(--color-line)",
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "0.5rem" }}>
                    <button
                      type="submit"
                      className="max-sm:!w-full"
                      style={{
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--color-bg)",
                        background: "var(--color-ink)",
                        border: "none",
                        borderRadius: 0,
                        padding: "1rem 3rem",
                        cursor: "pointer",
                        transition: "background-color 250ms ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-muted)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-ink)"; }}
                    >
                      Send message
                    </button>
                  </div>

                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      <div style={{ marginTop: "5rem" }}>
        <Marquee />
      </div>

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
