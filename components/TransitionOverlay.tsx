"use client";

import { useEffect, useRef } from "react";
import { useTransition } from "@/context/TransitionContext";

export default function TransitionOverlay() {
  const { isTransitioning, direction, endTransition } = useTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevTransitioning = useRef(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    if (isTransitioning && !prevTransitioning.current) {
      // Start: wipe in from left (forward) or from right (back)
      prevTransitioning.current = true;

      if (direction === "forward") {
        // Starts invisible (clipped on right), sweeps left to right covering screen
        el.style.transition = "none";
        el.style.clipPath = "inset(0 100% 0 0)";
        el.style.display = "block";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition =
              "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
            el.style.clipPath = "inset(0 0% 0 0)";

            // After fully covering, wipe off to the right
            setTimeout(() => {
              el.style.transition =
                "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
              el.style.clipPath = "inset(0 0 0 100%)";

              setTimeout(() => {
                el.style.display = "none";
                el.style.clipPath = "inset(0 100% 0 0)";
                prevTransitioning.current = false;
                endTransition();
              }, 520);
            }, 520);
          });
        });
      } else {
        // Back: wipe in from right to left
        el.style.transition = "none";
        el.style.clipPath = "inset(0 0 0 100%)";
        el.style.display = "block";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition =
              "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
            el.style.clipPath = "inset(0 0% 0 0)";

            setTimeout(() => {
              el.style.transition =
                "clip-path 500ms cubic-bezier(0.76, 0, 0.24, 1)";
              el.style.clipPath = "inset(0 100% 0 0)";

              setTimeout(() => {
                el.style.display = "none";
                el.style.clipPath = "inset(0 0 0 100%)";
                prevTransitioning.current = false;
                endTransition();
              }, 520);
            }, 520);
          });
        });
      }
    }
  }, [isTransitioning, direction, endTransition]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "#111111",
        pointerEvents: "none",
        display: "none",
        clipPath: "inset(0 100% 0 0)",
      }}
    />
  );
}
