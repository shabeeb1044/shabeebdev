"use client";

import { useEffect, useState } from "react";

export default function SiteAtmosphere() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));

    function updateProgress() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <div className={`site-lines${ready ? " is-ready" : ""}`} aria-hidden="true">
        <div className="line-group light">
          <div className="line one"></div>
          <div className="line two"></div>
          <div className="line three"></div>
        </div>
        <div className="line-group dark">
          <div className="line one"></div>
          <div className="line two"></div>
          <div className="line three"></div>
        </div>
      </div>

      <div className="scroll-rail" aria-hidden="true">
        <div className="scroll-track">
          <div className="scroll-fill" style={{ height: `${progress * 100}%` }}></div>
        </div>
        <div className="scroll-handle" style={{ top: `${progress * 100}%` }}></div>
      </div>
    </>
  );
}
