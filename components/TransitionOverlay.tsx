"use client";

import { useEffect, useRef } from "react";
import { useTransition } from "@/context/TransitionContext";

export default function TransitionOverlay() {
  const { isTransitioning, direction } = useTransition();
  const elRef = useRef<HTMLDivElement>(null);
  const coveredRef = useRef(false);
  const pendingRef = useRef(false);
  const runningRef = useRef(false);
  const dirRef = useRef<"forward" | "back">("forward");
  const tidRef = useRef(0);

  function wipeOut(el: HTMLDivElement, tid: number) {
    if (!coveredRef.current || tid !== tidRef.current) return;
    coveredRef.current = false;

    const dir = dirRef.current;
    el.style.transition = "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
    el.style.clipPath = dir === "forward" ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

    setTimeout(() => {
      el.style.display = "none";
      el.style.clipPath = dir === "forward" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
      runningRef.current = false;
      pendingRef.current = false;
    }, 520);
  }

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (isTransitioning) {
      if (runningRef.current) return;
      runningRef.current = true;
      coveredRef.current = false;
      pendingRef.current = false;
      dirRef.current = direction;
      const tid = ++tidRef.current;

      el.style.transition = "none";
      el.style.clipPath = direction === "forward" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
      el.style.display = "block";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
          el.style.clipPath = "inset(0 0% 0 0)";

          // Mark as fully covered after animation
          setTimeout(() => {
            coveredRef.current = true;
            if (pendingRef.current) wipeOut(el, tid);
          }, 530);

          // Safety fallback: never stay covered more than 2.5s
          setTimeout(() => { wipeOut(el, tid); }, 2500);
        });
      });
    } else {
      if (!runningRef.current) return;
      const tid = tidRef.current;
      if (coveredRef.current) {
        wipeOut(el, tid);
      } else {
        // Still covering — wipe out as soon as covered
        pendingRef.current = true;
      }
    }
  }, [isTransitioning, direction]);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "#111111",
        pointerEvents: "none",
        display: "none",
        clipPath: "inset(0 100% 0 0)",
        willChange: "clip-path",
      }}
    />
  );
}
