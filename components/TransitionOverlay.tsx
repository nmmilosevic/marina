"use client";

import { useEffect, useRef } from "react";
import { useTransition } from "@/context/TransitionContext";
import { WIPE_EASE, getWipeInDurationMs } from "@/lib/transitionConfig";

export default function TransitionOverlay() {
  const { isTransitioning, direction } = useTransition();
  const elRef = useRef<HTMLDivElement>(null);
  const coveredRef = useRef(false);
  const pendingRef = useRef(false);
  const runningRef = useRef(false);
  const dirRef = useRef<"forward" | "back">("forward");
  const tidRef = useRef(0);
  const durationRef = useRef(360);
  const timeoutIdsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!elRef.current) return;

    const clearTimeouts = () => {
      for (const id of timeoutIdsRef.current) window.clearTimeout(id);
      timeoutIdsRef.current = [];
    };

    const pushTimeout = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timeoutIdsRef.current.push(id);
    };

    function finishOut() {
      const el = elRef.current;
      if (!el) return;
      el.style.display = "none";
      el.style.transition = "none";
      el.style.transform = "scaleX(0)";
      el.style.willChange = "auto";
      runningRef.current = false;
      pendingRef.current = false;
    }

    function wipeOut(wipeTid: number) {
      const el = elRef.current;
      if (!el || !coveredRef.current || wipeTid !== tidRef.current) return;
      coveredRef.current = false;

      const dir = dirRef.current;
      const duration = durationRef.current;
      el.style.willChange = "transform";
      el.style.transformOrigin =
        dir === "forward" ? "right center" : "left center";
      el.style.transition = `transform ${duration}ms ${WIPE_EASE}`;
      el.style.transform = "scaleX(0)";

      const onOutEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform" || wipeTid !== tidRef.current) return;
        el.removeEventListener("transitionend", onOutEnd);
        finishOut();
      };

      el.addEventListener("transitionend", onOutEnd);
      pushTimeout(() => {
        el.removeEventListener("transitionend", onOutEnd);
        if (wipeTid === tidRef.current) finishOut();
      }, duration + 100);
    }

    if (isTransitioning) {
      if (runningRef.current) return;
      const el = elRef.current;
      if (!el) return;
      runningRef.current = true;
      coveredRef.current = false;
      pendingRef.current = false;
      dirRef.current = direction;
      const wipeTid = ++tidRef.current;
      clearTimeouts();

      const duration = getWipeInDurationMs();
      durationRef.current = duration;

      const onInEnd = (ev: TransitionEvent) => {
        if (ev.propertyName !== "transform") return;
        const node = elRef.current;
        if (!node) return;
        node.removeEventListener("transitionend", onInEnd);
        if (wipeTid !== tidRef.current) return;
        coveredRef.current = true;
        if (pendingRef.current) wipeOut(wipeTid);
      };

      el.style.willChange = "transform";
      el.style.transition = "none";
      el.style.transformOrigin =
        direction === "forward" ? "left center" : "right center";
      el.style.transform = "scaleX(0)";
      el.style.display = "block";

      const raf = requestAnimationFrame(() => {
        const node = elRef.current;
        if (!node || wipeTid !== tidRef.current) return;
        node.style.transition = `transform ${duration}ms ${WIPE_EASE}`;
        node.style.transform = "scaleX(1)";
        node.addEventListener("transitionend", onInEnd);
        pushTimeout(() => {
          const n = elRef.current;
          if (n) n.removeEventListener("transitionend", onInEnd);
          if (wipeTid !== tidRef.current) return;
          if (!coveredRef.current) {
            coveredRef.current = true;
            if (pendingRef.current) wipeOut(wipeTid);
          }
        }, duration + 100);
      });

      pushTimeout(() => {
        const n = elRef.current;
        if (n) n.removeEventListener("transitionend", onInEnd);
        if (wipeTid !== tidRef.current) return;
        if (coveredRef.current) {
          wipeOut(wipeTid);
        } else {
          coveredRef.current = true;
          wipeOut(wipeTid);
        }
      }, 2200);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeouts();
        const n = elRef.current;
        if (n) n.removeEventListener("transitionend", onInEnd);
      };
    }

    if (!runningRef.current) return;
    const wipeTid = tidRef.current;
    if (coveredRef.current) {
      wipeOut(wipeTid);
    } else {
      pendingRef.current = true;
    }

    return () => {
      clearTimeouts();
    };
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
        transform: "scaleX(0)",
        transformOrigin: "left center",
        willChange: "auto",
      }}
    />
  );
}
