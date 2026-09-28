"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "shabeeb-welcome-seen";
const EXIT_MS = 850;
const HOLD_MS = 3200;

export default function Preloader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const skip =
      root.classList.contains("preloader-skip") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (_) {}
      root.classList.remove("is-preloading");
      root.classList.add("preloader-skip");
      return;
    }

    setActive(true);
    root.classList.add("is-preloading");

    const leaveTimer = window.setTimeout(() => {
      setLeaving(true);
      root.classList.add("preloader-leaving");
    }, HOLD_MS);

    const hideTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (_) {}
      setActive(false);
      root.classList.remove("is-preloading", "preloader-leaving");
      root.classList.add("preloader-skip");
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`preloader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Welcome"
    >
      <div className="preloader-glow" aria-hidden="true" />
      <div className="preloader-ring" aria-hidden="true" />

      <div className="preloader-mark">
        <p className="preloader-welcome">Welcome</p>

        <div className="preloader-lockup">
          <svg
            className="preloader-svg"
            viewBox="0 0 480 130"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <text x="228" y="88" textAnchor="middle" className="preloader-word">
              shabeeb
            </text>
            <rect
              className="preloader-dot"
              x="418"
              y="62"
              width="13"
              height="13"
              rx="2.5"
            />
          </svg>

          <p className="preloader-tag">
            <span>D</span>
            <span>E</span>
            <span>V</span>
          </p>

          <div className="preloader-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
