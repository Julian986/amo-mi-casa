"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Dejar que el layout se pinte y luego scrollear suave al tope
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);
  return null;
}


