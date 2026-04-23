"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "view" | "small";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const lerped = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) {
        setState("view");
      } else if (target.closest("[data-cursor='small']") || target.closest("a") || target.closest("button")) {
        setState("small");
      } else {
        setState("default");
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    function loop() {
      const el = cursorRef.current;
      if (el) {
        // Slightly higher lerp = more responsive, less lag when crossing into view zones
        const ease = 0.18;
        lerped.current.x += (pos.current.x - lerped.current.x) * ease;
        lerped.current.y += (pos.current.y - lerped.current.y) * ease;
        el.style.transform = `translate(${lerped.current.x}px, ${lerped.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isView = state === "view";
  const isSmall = state === "small";
  const size = isView ? 72 : isSmall ? 28 : 12;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        borderRadius: "50%",
        backgroundColor: isView ? "transparent" : "rgba(138, 128, 112, 0.6)",
        border: isView ? "1px solid rgba(138, 128, 112, 0.6)" : "none",
        opacity: visible ? 1 : 0,
        willChange: "transform",
        transition: [
          "width 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "height 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "margin 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "background-color 250ms ease",
          "border-color 250ms ease",
          "opacity 400ms ease",
        ].join(", "),
      }}
    >
      {/* Always rendered — opacity controls visibility to avoid pop-in */}
      <span
        style={{
          fontFamily: "var(--font-hanken, sans-serif)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-bg)",
          userSelect: "none",
          opacity: isView ? 1 : 0,
          transition: "opacity 200ms ease 80ms",
          whiteSpace: "nowrap",
        }}
      >
        View
      </span>
    </div>
  );
}
