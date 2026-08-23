import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";

const siteLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Main footer */}
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-brand-fg text-sm font-bold">
                SI
              </span>
              <span className="text-lg font-semibold tracking-tight text-ink">
                Saiful Islam
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              AI-Enabled Software Engineer building intelligent systems and
              scalable backend applications. Based in Dhaka, working worldwide.
            </p>

            {/* Social links */}
            <SocialLinks className="mt-6 flex gap-3" />
          </div>

          {/* Column 2 — Quick links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Quick links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors duration-200 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand" />
                <a
                  href="mailto:devwork.saiful@gmail.com"
                  className="text-sm text-ink-muted transition-colors hover:text-brand"
                >
                  devwork.saiful@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                <span className="text-sm text-ink-muted">
                  Narayanganj, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-brand" />
                <span className="text-sm text-ink-muted">
                  Sat–Thu • 10:00 AM – 7:00 PM BST
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-ink-subtle">
            &copy; {new Date().getFullYear()} Saiful Islam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
