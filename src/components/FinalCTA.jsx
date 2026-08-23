"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Check, Github, Linkedin, Twitter } from "lucide-react";
import { useGTMEvent } from "@/hooks/useGTMEvent";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { track } = useGTMEvent();

  return (
    <section
      id="cta"
      ref={ref}
      className="section relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(74,222,128,0.06),transparent_70%)]"
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-display-md text-ink">
            Ready to save time and grow your business?
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted">
            Book a free 15-minute consultation. No commitment, no sales pitch — just a conversation about your goals and how I can help.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#contact"
              onClick={() => track("cta_click", { cta_location: "final_cta", cta_text: "Book a Free Consultation" })}
              className="btn-primary animate-pulse-cta"
            >
              Book a Free Consultation
              <span aria-hidden className="ml-1">→</span>
            </Link>

          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-xs text-ink-subtle">
            <span className="inline-flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-brand" />{" "}
              24h response
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-brand" />{" "}
              No commitment
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={12} strokeWidth={2.5} className="text-brand" />{" "}
              Free initial assessment
            </span>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://github.com/dev-saiful"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("social_click", { platform: "github", location: "final_cta" })}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all duration-200 hover:border-brand hover:text-brand"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/dev-saiful/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("social_click", { platform: "linkedin", location: "final_cta" })}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all duration-200 hover:border-brand hover:text-brand"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/dev_saiful"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("social_click", { platform: "twitter", location: "final_cta" })}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-muted transition-all duration-200 hover:border-brand hover:text-brand"
            >
              <Twitter size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
