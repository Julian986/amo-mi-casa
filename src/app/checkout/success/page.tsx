"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const params = useSearchParams();
  const { clear } = useCart();

  const status = (params.get("status") || params.get("collection_status") || "").toLowerCase();
  const approved = status === "approved";

  useEffect(() => {
    // Solo vaciamos el carrito si MP indica aprobado.
    if (approved) clear();
  }, [approved, clear]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-stone-900">
        {approved ? "Pago aprobado" : "Vuelta desde Mercado Pago"}
      </h1>
      <p className="mt-3 text-stone-700">
        {approved
          ? "¡Gracias! Tu pago fue aprobado. En breve nos comunicamos para coordinar el envío."
          : "Recibimos tu regreso desde Mercado Pago. Si el pago quedó pendiente, podés reintentar o elegir otro medio."}
      </p>

      <div className="mt-6 flex gap-3">
        <Button asChild className="cursor-pointer">
          <Link href="/">Volver a la tienda</Link>
        </Button>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/checkout">Volver al checkout</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-stone-900">Pago aprobado</h1>
        <p className="mt-3 text-stone-700">Cargando...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}


