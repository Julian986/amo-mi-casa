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
      { label: "Manteles antimanchas", href: "/c/manteles" },
      { label: "Bolsos materos y playeros", href: "/c/bolsos" },
      { label: "Loncheras para niños", href: "/c/infantil" },
      { label: "Recipientes organizadores", href: "/c/organizadores" },
      { label: "Vasos térmicos", href: "/c/vasos-termicos" },
      { label: "Botellitas plegables", href: "/c/botellitas" },
      { label: "Termos", href: "/c/termos" },
      { label: "Pavas eléctricas", href: "/c/pavas-electricas" },
      { label: "Ofertas", href: "/c/sale" },
    ],
  },
  { label: "Preguntas Frecuentes", href: "/faq" },
  { label: "Cómo Comprar", href: "/como-comprar" },
  { label: "Envíos / Cambios", href: "/envios-cambios" },
];

export default function MainNav() {
  return (
    <nav className="hidden md:block w-full border-b border-stone-200">
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


