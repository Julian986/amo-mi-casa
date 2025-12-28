"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
      aria-label="Volver"
      title="Volver"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}


