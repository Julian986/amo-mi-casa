"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV } from "./MainNav";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-[85vw] max-w-[360px] transform bg-white shadow-xl transition-transform md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 p-4">
          <span className="text-sm font-semibold text-stone-900">Menú</span>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-stone-100 last:border-none">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-stone-800 hover:bg-stone-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div className="px-4 py-3 text-stone-500">{item.label}</div>
                    {item.children && (
                      <div className="pb-2 pl-6">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            href={c.href}
                            className="block rounded px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                            onClick={() => setOpen(false)}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}


