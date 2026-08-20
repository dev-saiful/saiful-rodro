"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GTMRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !window.dataLayer) return;

    window.dataLayer.push({
      event: "page_view",
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
