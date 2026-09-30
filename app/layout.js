import Script from "next/script";
import FaviconTheme from "./components/FaviconTheme";
import SiteAtmosphere from "./components/SiteAtmosphere";
import { siteConfig } from "./data/seo";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.metaDescription,
  keywords: [
    "web developer in Kerala",
    "website development Kerala",
    "low cost website development",
    "web developer Malappuram",
    "freelance web developer Kerala",
    "MERN stack developer Kerala",
    "Next.js developer Kerala",
    "Muhammed Shabeeb",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.metaDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Muhammed Shabeeb, web developer in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.metaDescription,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      {
        url: "/favicon-dark.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-light.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-dark.png",
  },
};

const themeScript = `
try {
  var saved = localStorage.getItem("theme");
  var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PHYW2CDKFL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PHYW2CDKFL');
          `}
        </Script>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <FaviconTheme />
        <SiteAtmosphere />
        {children}
        <Script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
