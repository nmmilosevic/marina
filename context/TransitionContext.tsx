"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

interface SourceRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionContextValue {
  isTransitioning: boolean;
  direction: "forward" | "back";
  clickedSlug: string | null;
  sourceRect: SourceRect | null;
  startTransition: (
    slug: string,
    rect: SourceRect | null,
    dir?: "forward" | "back"
  ) => Promise<void>;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);
  const [sourceRect, setSourceRect] = useState<SourceRect | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);

  const startTransition = useCallback(
    async (
      slug: string,
      rect: SourceRect | null,
      dir: "forward" | "back" = "forward"
    ) => {
      setClickedSlug(slug);
      setSourceRect(rect);
      setDirection(dir);
      setIsTransitioning(true);
      return new Promise<void>((resolve) => {
        resolveRef.current = resolve;
        // Auto-resolve after overlay covers screen
        setTimeout(() => {
          resolve();
        }, 540);
      });
    },
    []
  );

  const endTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        direction,
        clickedSlug,
        sourceRect,
        startTransition,
        endTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
