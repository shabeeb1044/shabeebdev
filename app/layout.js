import Script from "next/script";
import Preloader from "./components/Preloader";
import SiteAtmosphere from "./components/SiteAtmosphere";
import "./globals.css";

export const metadata = {
  title: "Muhammed Shabeeb | Full-stack Developer",
  description:
    "Portfolio of Muhammed Shabeeb, a full-stack developer from Malappuram, Kerala, working with the MERN stack and Next.js.",
};

const themeScript = `
try {
  var saved = localStorage.getItem("theme");
  var theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);
} catch (e) {}
`;

const preloaderScript = `
try {
  if (localStorage.getItem("shabeeb-welcome-seen")) {
    document.documentElement.classList.add("preloader-skip");
  } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("is-preloading");
  } else {
    localStorage.setItem("shabeeb-welcome-seen", "1");
    document.documentElement.classList.add("preloader-skip");
  }
} catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Script id="preloader-init" strategy="beforeInteractive">
          {preloaderScript}
        </Script>
        <Preloader />
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
