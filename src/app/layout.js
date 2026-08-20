import { Inter } from "next/font/google";
import Script from "next/script";
import GTMRouteTracker from "@/components/GTMRouteTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saifulislam.com";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saiful Islam — AI-Enabled Software Engineer",
    template: "%s · Saiful Islam",
  },
  description:
    "AI-Enabled Software Engineer specializing in LangChain, OpenAI, RAG systems, and scalable backend applications. Building intelligent systems that solve real problems.",
  keywords: [
    "AI engineer",
    "software engineer",
    "LangChain developer",
    "OpenAI API",
    "RAG systems",
    "Node.js developer",
    "Python developer",
    "backend engineer",
    "full-stack developer",
    "GenAI engineer",
    "LLM applications",
    "intelligent systems",
  ],
  authors: [{ name: "Saiful Islam", url: siteUrl }],
  creator: "Saiful Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Saiful Islam",
    title: "Saiful Islam — AI-Enabled Software Engineer",
    description:
      "Building intelligent systems with AI & code. Specializing in LangChain, OpenAI, RAG, and scalable backend applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saiful Islam — AI-Enabled Software Engineer",
    description:
      "Building intelligent systems with AI & code. Specializing in LangChain, OpenAI, RAG, and scalable backend applications.",
    creator: "@dev_saiful",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Saiful Islam",
  url: siteUrl,
  jobTitle: "AI-Enabled Software Engineer",
  description:
    "Software engineer specializing in AI/ML, LangChain, OpenAI, and scalable backend systems.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  sameAs: [
    "https://github.com/dev-saiful",
    "https://www.linkedin.com/in/dev-saiful/",
    "https://x.com/dev_saiful",
    "https://www.facebook.com/jsdev.saiful",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "LangChain",
    "OpenAI API",
    "Node.js",
    "Python",
    "Backend Development",
    "Full Stack Development",
    "RAG Systems",
    "LLMs",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sonargaon University",
    department: "Computer Science and Engineering",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <Script id="google-tag-manager-dataLayer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {GTM_ID && <GTMRouteTracker />}
        {children}
      </body>
    </html>
  );
}
