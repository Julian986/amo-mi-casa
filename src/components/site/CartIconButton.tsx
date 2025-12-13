"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { useEffect, useState } from "react";

export default function CartIconButton() {
  const { count, open } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer"
      aria-label="Carrito"
    >
      <ShoppingBag className="h-5 w-5" />
      {mounted && count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-800 px-1.5 text-xs font-medium text-white">
          {count}
        </span>
      )}
    </button>
  );
}
 

