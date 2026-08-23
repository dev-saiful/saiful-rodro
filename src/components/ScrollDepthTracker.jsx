"use client";

import { useEffect, useRef } from "react";
import { useGTMEvent } from "@/hooks/useGTMEvent";

export default function ScrollDepthTracker() {
  const { track } = useGTMEvent();
  const trackedRef = useRef(new Set());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedRef.current.has(threshold)) {
          trackedRef.current.add(threshold);
          track("scroll_depth", {
            page_path: window.location.pathname,
            depth: threshold,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [track]);

  return null;
}
