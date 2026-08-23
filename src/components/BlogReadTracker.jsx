"use client";

import { useEffect, useRef } from "react";
import { useGTMEvent } from "@/hooks/useGTMEvent";

export default function BlogReadTracker({ title, slug, category }) {
  const { track } = useGTMEvent();
  const hasTrackedRead = useRef(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent >= 50 && !hasTrackedRead.current) {
        hasTrackedRead.current = true;
        const readTime = Math.round((Date.now() - startTime.current) / 1000);
        track("blog_read", {
          blog_title: title,
          blog_slug: slug,
          blog_category: category,
          read_time_seconds: readTime,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [title, slug, category, track]);

  return null;
}
