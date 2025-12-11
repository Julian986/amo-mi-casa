"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { WHATSAPP_PHONE } from "@/lib/constants";

type Props = {
  id: string;
  name: string;
  price?: number;
  image: string;
};

export default function ProductActions({ id, name, price, image }: Props) {
  const { addItem, open } = useCart();

  const handleAdd = () => {
    addItem({ id, name, price, image }, 1);
    open();
  };

  const msg = encodeURIComponent(`Hola! Quisiera consultar por ${name}`);
  const waHref = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;

  return (
    <div className="flex gap-3">
      <Button className="h-11 px-6 cursor-pointer flex-1" onClick={handleAdd}>
        Agregar al carrito
      </Button>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button className="w-full h-11 cursor-pointer" variant="secondary">
          Consultar
        </Button>
      </a>
    </div>
  );
}


