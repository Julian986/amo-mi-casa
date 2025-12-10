"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 cursor-pointer"
      style={{ cursor: "pointer" }}
      aria-label="Volver"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Volver</span>
    </button>
  );
}


