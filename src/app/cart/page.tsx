"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, clear, total } = useCart();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
          aria-label="Volver"
          title="Volver"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-stone-900">Carrito</h1>
      </div>
      {items.length === 0 ? (
        <div className="mt-6 text-stone-700">
          Tu carrito está vacío.{" "}
          <Link className="underline" href="/">
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-3"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-stone-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-stone-600">
                    Cantidad: {item.quantity}
                  </div>
                  <div className="text-sm text-stone-900">
                    {typeof item.price === "number" ? formatCurrency(item.price) : "$"}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => removeItem(item.id)}
                >
                  Quitar
                </Button>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-4 h-fit">
            <h2 className="text-sm font-semibold text-stone-900">Resumen</h2>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">
                {formatCurrency(total)}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <Button
                className="flex-1 cursor-pointer"
                onClick={() => router.push("/checkout")}
                disabled={items.length === 0}
              >
                Finalizar compra
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => clear()}
              >
                Vaciar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}


