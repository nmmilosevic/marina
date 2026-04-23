"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "@/context/TransitionContext";

const navLinks = [
  { label: "Work",         href: "/" },
  { label: "Studio",       href: "/about" },
  { label: "Marina Vanni", href: "/marina-vanni" },
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

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  async function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === pathname) return;
    e.preventDefault();
    setMenuOpen(false);
    await startTransition("nav", null, "forward");
    router.push(href);
  }

  const inkColor = "var(--nav-color-override, var(--color-ink))";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
      >
        {/* ── Desktop nav (sm and up) ─────────────────────────────────── */}
        <div
          className="hidden sm:flex items-center justify-between"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            height: "96px",
            padding: "0 48px",
          }}
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
            <span className="nav-weight">Marina Vanni</span>
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

        {/* ── Mobile nav (below sm) ───────────────────────────────────── */}
        <div
          className="flex sm:hidden items-center justify-between"
          style={{
            margin: scrolled ? "16px 16px 0" : "0",
            padding: scrolled ? "12px 16px" : "20px 20px",
            backgroundColor: scrolled ? "var(--color-bg)" : "transparent",
            transition: "margin 350ms ease, padding 350ms ease, background-color 350ms ease",
          }}
        >
          {/* Burger — left */}
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
              zIndex: 50,
            }}
          >
            <span style={{
              display: "block", width: "22px", height: "1px",
              backgroundColor: menuOpen ? "var(--color-ink)" : inkColor,
              transition: "transform 300ms ease, background-color 200ms ease",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: "22px", height: "1px",
              backgroundColor: menuOpen ? "var(--color-ink)" : inkColor,
              transition: "opacity 300ms ease, background-color 200ms ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: "22px", height: "1px",
              backgroundColor: menuOpen ? "var(--color-ink)" : inkColor,
              transition: "transform 300ms ease, background-color 200ms ease",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }} />
          </button>

          {/* Logo — right */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            style={{
              fontSize: "0.875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: menuOpen ? "var(--color-ink)" : inkColor,
              transition: "color 200ms ease",
              lineHeight: 1,
            }}
          >
            <span className="nav-weight">Marina Vanni</span>
          </Link>
        </div>
      </header>

      {/* ── Mobile full-screen menu ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-30 sm:hidden"
            style={{ backgroundColor: "var(--color-bg)", paddingTop: "100px", paddingLeft: "32px", paddingRight: "32px" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                style={{ borderBottom: "1px solid var(--color-line)" }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-hanken, sans-serif)",
                    fontSize: "2.25rem",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                    padding: "1.25rem 0",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
