import React from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export const NAV: NavItem[] = [
  { label: "Inicio", href: "/" },
  {
    label: "Productos",
    children: [
      { label: "Textiles", href: "/c/textiles" },
      { label: "Cocina", href: "/c/cocina" },
      { label: "Baño", href: "/c/bano" },
      { label: "Decoración", href: "/c/decoracion" },
      { label: "Esencias y Aromas", href: "/c/esencias" },
      { label: "Iluminación", href: "/c/iluminacion" },
      { label: "GIFT CARD", href: "/c/gift-card" },
      { label: "SALE", href: "/c/sale" },
    ],
  },
  { label: "Preguntas Frecuentes", href: "/faq" },
  { label: "Cómo Comprar", href: "/como-comprar" },
  { label: "Envíos / Cambios", href: "/envios-cambios" },
];

export default function MainNav() {
  return (
    <nav className="w-full border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex h-12 items-center gap-6 text-sm">
          {NAV.map((item) => (
            <li key={item.label} className="group relative">
              {item.href ? (
                <Link
                  className="text-stone-700 hover:text-stone-900"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="cursor-default text-stone-700">
                  {item.label}
                </span>
              )}
              {item.children && (
                <div className="invisible absolute left-0 top-full z-30 mt-2 w-[640px] rounded-md border border-stone-200 bg-white p-4 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="rounded px-2 py-1 text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}


