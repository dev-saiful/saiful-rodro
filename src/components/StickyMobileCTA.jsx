"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useGTMEvent } from "@/hooks/useGTMEvent";

export default function StickyMobileCTA() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { track } = useGTMEvent();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling past ~400px (roughly past the hero)
    setVisible(latest > 400);
  });

  return (
    <motion.div
      initial={false}
      animate={visible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <Link
        href="#contact"
        onClick={() => track("cta_click", { cta_location: "sticky_mobile", cta_text: "Let's Connect" })}
        className="flex items-center justify-center gap-2 bg-brand px-6 py-4 text-sm font-semibold text-brand-fg shadow-elevated transition-colors duration-200 hover:bg-brand-hover"
      >
        Let&apos;s Connect
        <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}
