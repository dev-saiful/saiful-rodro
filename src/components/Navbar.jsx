"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { CircleCheck } from "lucide-react";
import { useGTMEvent } from "@/hooks/useGTMEvent";

const menuVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const linkVariants = {
  closed: { y: 12, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const navbarVariants = {
  hidden: { y: -32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { track } = useGTMEvent();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 12);
  }, []);

  useEffect(() => {
    let ticking = false;
    const optimized = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", optimized, { passive: true });
    return () => window.removeEventListener("scroll", optimized);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(
    () => setIsMenuOpen((v) => !v),
    []
  );
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const navLinks = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-elegant ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand mark + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink transition-opacity duration-200 hover:opacity-80"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-brand text-brand-fg text-sm font-bold"
          >
            SI
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Saiful Islam
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline text-sm font-medium text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            onClick={() => track("cta_click", { cta_location: "navbar_desktop", cta_text: "Book a Consultation" })}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Book a Consultation
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="relative z-50 grid h-10 w-10 place-items-center rounded-md border border-border text-ink transition-colors duration-200 hover:bg-surface-2 md:hidden"
        >
          {isMenuOpen ? (
            <MdOutlineCancel size={20} />
          ) : (
            <CiMenuFries size={20} />
          )}
        </button>
      </div>

      {/* Mobile menu — full-screen takeover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col bg-bg/98 backdrop-blur-lg md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6" />

            <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="text-3xl font-semibold tracking-tight text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-border p-6">
              <Link
                href="#contact"
                onClick={() => {
                  track("cta_click", { cta_location: "navbar_mobile", cta_text: "Book a Consultation" });
                  closeMenu();
                }}
                className="btn-primary w-full text-base"
              >
                Book a Consultation
                <span aria-hidden>→</span>
              </Link>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-ink-subtle">
                <span className="inline-flex items-center gap-1"><CircleCheck size={12} className="text-brand" /> Friendly chat</span>
                <span className="inline-flex items-center gap-1"><CircleCheck size={12} className="text-brand" /> No commitment</span>
                <span className="inline-flex items-center gap-1"><CircleCheck size={12} className="text-brand" /> Reply within 24h</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default memo(Navbar);
