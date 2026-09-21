"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CompletionTracker({ toolName, complete }: { toolName: string; complete: boolean }) {
  const sent = useRef(false);

  useEffect(() => {
    if (!complete || sent.current) return;
    sent.current = true;
    window.gtag?.("event", "tool_complete", { tool_name: toolName });
  }, [complete, toolName]);

  return null;
}
