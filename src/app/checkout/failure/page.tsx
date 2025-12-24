"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function FailureContent() {
  const params = useSearchParams();
  const status = (params.get("status") || params.get("collection_status") || "").toLowerCase();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-900">No se pudo completar el pago</h1>
      <p className="mt-3 text-stone-700">
        {status
          ? `El estado informado fue: ${status}.`
          : "Mercado Pago no pudo completar el pago."}{" "}
        Podés volver al checkout y reintentar.
      </p>

      <div className="mt-6 flex gap-3">
        <Button asChild className="cursor-pointer">
          <Link href="/checkout">Volver al checkout</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/">Volver a la tienda</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-stone-900">No se pudo completar el pago</h1>
        <p className="mt-3 text-stone-700">Cargando...</p>
      </div>
    }>
      <FailureContent />
    </Suspense>
  );
}


