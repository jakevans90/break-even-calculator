"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function CompletionTracker({ toolName, complete }: { toolName: string; complete: boolean }) {
  const sent = useRef(false);

  useEffect(() => {
    if (!complete || sent.current) return;
    sent.current = true;
    const params = { tool_name: toolName };
    if (window.gtag) window.gtag("event", "tool_complete", params);
    else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(["event", "tool_complete", params]);
    }
  }, [complete, toolName]);

  return null;
}
