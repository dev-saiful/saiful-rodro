"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { Globe, Mail, Phone, Send, MessageCircle, CheckCircle } from "lucide-react";
import { useGTMEvent } from "@/hooks/useGTMEvent";

const secondaryInfo = [
  {
    icon: Globe,
    label: "Location",
    value: "Narayanganj, Dhaka, Bangladesh",
    subtext: "Available for remote work worldwide",
  },
  {
    icon: Mail,
    label: "Working hours",
    value: "Sat–Thu • 10:00 AM – 7:00 PM BST (GMT+6)",
    subtext: "Flexible for anyone worldwide",
  },
  {
    icon: Phone,
    label: "Response time",
    value: "Within 24 hours, every business day",
    subtext: "Usually faster!",
  },
];

const whatsappNumber = "8801521566142";
const whatsappLink = `https://wa.me/${whatsappNumber}`;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const { track } = useGTMEvent();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    track("contact_form_submit", { form_name: "contact" });

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        track("contact_form_success", { form_name: "contact" });
      } else {
        setStatus("error");
        track("contact_form_error", { form_name: "contact", error: "server_error" });
      }
    } catch {
      setStatus("error");
      track("contact_form_error", { form_name: "contact", error: "network_error" });
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section relative overflow-hidden bg-surface scroll-mb-20"
    >
      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-left"
        >
          <span className="eyebrow">Get in touch</span>
          <h2 className="mt-4 text-display-md text-ink">
            Let&apos;s talk about your project.
          </h2>
          <p className="mt-4 text-body-lg text-ink-muted">
            Have a project in mind? Need a technical partner? Let&apos;s discuss
            how I can help bring your vision to life.
          </p>
        </motion.div>

        <div className="mt-10 sm:mt-14 grid gap-8 sm:gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="card-surface p-3 sm:p-6 space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-50"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "sent" ? (
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle size={16} /> Message Sent!
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-danger">
                  Something went wrong. Please try again or contact me directly.
                </p>
              )}
            </form>
          </motion.div>

          {/* Right column — WhatsApp + Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            {/* WhatsApp CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("outbound_link", { link_type: "whatsapp", link_url: whatsappLink })}
              className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:border-green-500/40 hover:bg-green-500/5"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-500 transition-all duration-300 group-hover:scale-105 group-hover:bg-green-500/20">
                <MessageCircle size={20} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                  WhatsApp
                </span>
                <p className="text-sm sm:text-base font-semibold text-ink">
                  Chat directly on WhatsApp
                </p>
                <p className="text-xs sm:text-sm text-ink-muted">
                  Quick reply — usually within hours
                </p>
              </div>
              <span className="shrink-0 text-xs sm:text-sm font-medium text-green-500 transition-colors group-hover:underline">
                Open →
              </span>
            </a>

            {/* Email CTA */}
            <a
              href="mailto:devwork.saiful@gmail.com"
              onClick={() => track("outbound_link", { link_type: "email", link_url: "mailto:devwork.saiful@gmail.com" })}
              className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-200 hover:border-brand/40 hover:bg-brand/5"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:scale-105 group-hover:bg-brand/20">
                <Mail size={20} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                  Email
                </span>
                <p className="text-sm sm:text-base font-semibold text-ink truncate">
                  devwork.saiful@gmail.com
                </p>
                <p className="text-xs sm:text-sm text-ink-muted">
                  Response within 24 hours
                </p>
              </div>
              <span className="shrink-0 text-xs sm:text-sm font-medium text-brand transition-colors group-hover:underline">
                Open →
              </span>
            </a>

            {/* Secondary info */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {secondaryInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="card-surface p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted">
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-ink">
                          {info.label}
                        </h4>
                        <p className="mt-0.5 text-xs sm:text-sm text-ink-muted">
                          {info.value}
                        </p>
                      </div>
                    </div>
                    {info.subtext && (
                      <p className="mt-1.5 text-xs text-ink-subtle pl-11">
                        {info.subtext}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Trust message */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 sm:mt-12 rounded-2xl border border-border bg-brand-soft/50 p-4 sm:p-6 text-center"
        >
          <h3 className="text-base font-semibold text-ink">
            No commitment. Just a conversation.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            I&apos;ll review your project needs and give you honest advice —
            even if we don&apos;t work together. No sales pitch, no pressure.
            Just a straightforward conversation about what&apos;s best for your
            project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
