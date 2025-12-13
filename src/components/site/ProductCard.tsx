 "use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";

type ProductCardProps = {
  id: string;
  name: string;
  price?: number;
  compareAtPrice?: number;
  image: string;
  objectPosition?: string;
  badge?: string;
  href?: string;
  addButtonStyle?: React.CSSProperties;
};

export default function ProductCard({
  id,
  name,
  price,
  compareAtPrice,
  image,
  objectPosition,
  badge,
  href = `/p/${id}`,
  addButtonStyle,
}: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount =
    typeof price === "number" &&
    typeof compareAtPrice === "number" &&
    compareAtPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((compareAtPrice! - price!) / compareAtPrice!) * 100)
    : 0;

  return (
    <Card className="overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] w-full bg-stone-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-contain"
            style={objectPosition ? { objectPosition } : undefined}
          />
          {badge && (
            <span className="absolute left-2 top-2 rounded bg-stone-900 px-2 py-1 text-xs font-medium text-white">
              {badge}
            </span>
          )}
          {hasDiscount && (
            <span className="absolute right-2 top-2 rounded bg-stone-800 px-2 py-1 text-xs font-medium text-white">
              {discountPct}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className="space-y-1 p-3">
        <Link href={href} className="block text-sm text-stone-800">
          {name}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-stone-900">
            {typeof price === "number" ? formatCurrency(price) : "$"}
          </span>
          {hasDiscount && (
            <span className="text-sm text-stone-500 line-through">
              {formatCurrency(compareAtPrice!)}
            </span>
          )}
        </div>
        <Button
          className="w-full cursor-pointer"
          style={{ cursor: "pointer", ...(addButtonStyle ?? {}) }}
          variant="default"
          onClick={() => addItem({ id, name, price, image })}
        >
          Agregar al carrito
        </Button>
      </div>
    </Card>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}


