"use client";

import { useEffect } from "react";
import { applySiteFavicon } from "../lib/favicon";

export default function FaviconTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => applySiteFavicon(root.getAttribute("data-theme") || "dark");
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return null;
}
