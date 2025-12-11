"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

export default function CartDrawer() {
  const { isOpen, close, items, removeItem, clear, total } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-[70] w-[380px] max-w-[90vw] transform bg-white shadow-xl transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-stone-200 p-4">
          <h2 className="text-base font-semibold text-stone-900">Tu carrito</h2>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100dvh-64px-140px)] flex-col overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-4 text-sm text-stone-600">Tu carrito está vacío.</div>
          ) : (
            <ul className="divide-y divide-stone-200">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 p-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded bg-stone-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-stone-900">{item.name}</div>
                    <div className="text-xs text-stone-600">Cant. {item.quantity}</div>
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
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-stone-200 p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">{formatCurrency(total)}</span>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 cursor-pointer">Finalizar compra</Button>
            <Button variant="outline" className="cursor-pointer" onClick={clear}>
              Vaciar
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}


