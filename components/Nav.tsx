"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";

const navLinks = [
  { label: "Work",          href: "/" },
  { label: "Studio",        href: "/about" },
  { label: "Marina Vanni",  href: "/marina-vanni" },
  { label: "Contact",       href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { startTransition } = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === pathname) return;
    e.preventDefault();
    await startTransition("nav", null, "forward");
    router.push(href);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{ fontFamily: "var(--font-hanken, sans-serif)" }}
    >
      <div
        className="max-sm:!h-auto max-sm:!px-5 max-sm:!py-5"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          height: "96px",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — white pill on scroll */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="nav-underline"
          style={{
            fontFamily: "var(--font-hanken, sans-serif)",
            fontSize: "1.125rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: scrolled ? "var(--color-ink)" : "var(--nav-color-override, var(--color-ink))",
            lineHeight: 1,
            backgroundColor: scrolled ? "#ffffff" : "transparent",
            padding: scrolled ? "8px 12px" : "0 0 3px",
            transition: "background-color 350ms ease, padding 350ms ease, color 350ms ease",
          }}
        >
          <span className="nav-weight">Marina Vanni</span>
        </Link>

        {/* Nav links — shared white pill on scroll */}
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
              style={{
                fontFamily: "var(--font-hanken, sans-serif)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: scrolled ? "var(--color-ink)" : "var(--nav-color-override, var(--color-ink))",
                padding: scrolled ? "0" : "0 0 3px",
                transition: "color 350ms ease, padding 350ms ease",
              }}
              data-cursor="small"
            >
              <span className="nav-weight">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
