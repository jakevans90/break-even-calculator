"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function sendEvent(name: string, params: Record<string, string>) {
  if (window.gtag) window.gtag("event", name, params);
  else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", name, params]);
  }
}

export function CompletionTracker({ toolName, complete }: { toolName: string; complete: boolean }) {
  const sent = useRef(false);

  useEffect(() => {
    let visitorType = "unknown";
    try {
      const key = `jakegenerates:visited:${toolName}`;
      visitorType = window.localStorage.getItem(key) ? "returning" : "new";
      window.localStorage.setItem(key, "1");
    } catch {
      // Analytics still works when browser storage is unavailable.
    }
    sendEvent("tool_visit", { tool_name: toolName, visitor_type: visitorType });
  }, [toolName]);

  useEffect(() => {
    if (!complete || sent.current) return;
    sent.current = true;
    sendEvent("tool_complete", { tool_name: toolName });
  }, [complete, toolName]);

  return null;
}
