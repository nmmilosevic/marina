"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

/** Top-left header wordmark (home link). */
const SITE_WORDMARK = "OCCHI DI VANNI";

const navLinks = [
  { label: "Work",         href: "/" },
  { label: "Studio",       href: "/about" },
  { label: "Marina Vanni", href: "/marina-vanni" },
  { label: "Paintings",    href: "/paintings" },
  { label: "Contact",      href: "/contact" },
];

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { startTransition } = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  async function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === pathname) return;
    e.preventDefault();
    setMenuOpen(false);
    await startTransition("nav", null, "forward");
    router.push(href);
  }

  const inkColor = "var(--nav-color-override, var(--color-ink))";
  const floated = scrolled || menuOpen;

  return (
    <>
      {/* ── Desktop nav ──────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 hidden sm:block"
        style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ maxWidth: "1200px", margin: "0 auto", height: "96px", padding: "0 48px" }}
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="nav-underline"
            style={{
              fontSize: "1.125rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: scrolled ? "var(--color-ink)" : inkColor,
              backgroundColor: scrolled ? "#ffffff" : "transparent",
              padding: scrolled ? "8px 12px" : "0 0 3px",
              transition: "background-color 350ms ease, padding 350ms ease, color 350ms ease",
              lineHeight: 1,
            }}
          >
            <span className="nav-weight">{SITE_WORDMARK}</span>
          </Link>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              backgroundColor: scrolled ? "#ffffff" : "transparent",
              padding: scrolled ? "8px 12px" : "0",
              transition: "background-color 350ms ease, padding 350ms ease",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-underline"
                data-cursor="small"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: scrolled ? "var(--color-ink)" : inkColor,
                  padding: scrolled ? "0" : "0 0 3px",
                  transition: "color 350ms ease, padding 350ms ease",
                }}
              >
                <span className="nav-weight">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Mobile nav ───────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-40 sm:hidden"
        style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
      >
        {/* Box 1: logo + burger */}
        <div
          className="flex items-center justify-between"
          style={{
            margin: floated ? "16px 20px 0" : "0",
            backgroundColor: floated ? "#ffffff" : "transparent",
            padding: floated ? "12px 16px" : "20px 20px",
            transition: "margin 350ms ease, background-color 350ms ease, padding 350ms ease",
          }}
        >
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            style={{
              fontSize: "0.9625rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: floated ? "var(--color-ink)" : inkColor,
              transition: "color 200ms ease",
              lineHeight: 1,
            }}
          >
            <span className="nav-weight">{SITE_WORDMARK}</span>
          </Link>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "transparent",
              border: "none",
              padding: "4px",
              cursor: "none",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {[
              { transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" },
              { opacity: menuOpen ? 0 : 1 },
              { transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" },
            ].map((extra, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  backgroundColor: floated ? "var(--color-ink)" : inkColor,
                  transition: "transform 300ms ease, opacity 300ms ease, background-color 200ms ease",
                  ...extra,
                }}
              />
            ))}
          </button>
        </div>

        {/* Box 2: nav links — separate white bg, 2px below box 1 */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE }}
              style={{
                overflow: "hidden",
                margin: "2px 20px 0",
                backgroundColor: "#ffffff",
              }}
            >
              <div style={{ padding: "4px 16px 16px" }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-hanken, sans-serif)",
                        fontSize: "0.8125rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--color-ink)",
                        textDecoration: "none",
                        padding: "12px 0",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
