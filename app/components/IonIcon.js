"use client";

import { useEffect, useRef } from "react";

/**
 * Ionicons upgrades <ion-icon> outside React. If React owns that node, unmount
 * calls removeChild on a parent that is already null. The icon is created here
 * so React only mounts and removes the plain host element.
 */
export default function IonIcon({ name, className }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const icon = document.createElement("ion-icon");
    icon.setAttribute("name", name);
    if (className) icon.className = className;
    host.appendChild(icon);

    return () => {
      if (icon.parentNode === host) host.removeChild(icon);
    };
  }, [name, className]);

  return <span ref={hostRef} className="ion-icon-slot" aria-hidden="true" />;
}
