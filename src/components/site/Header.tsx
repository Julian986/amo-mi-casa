import React from "react";
import Link from "next/link";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import CartIconButton from "./CartIconButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="w-full bg-white">
      {/* Bloque superior fijo (promos + logo/buscador/iconos) */}
      <div className="fixed inset-x-0 top-0 z-40 bg-white">
        <TopBar />
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="relative grid grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center gap-3">
            <div className="justify-self-start md:hidden">
              <MobileMenu />
            </div>
            <Link
              href="/"
              className="justify-self-center text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight"
              style={{ fontFamily: "cursive" }}
            >
              Amo mi casa
            </Link>
            <div className="hidden md:flex w-full max-w-3xl items-center gap-2 justify-self-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <Input
                  placeholder="Buscar productos…"
                  className="pl-9 h-10 rounded-full bg-stone-100 border-stone-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href="/account"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50"
                aria-label="Ingresá / Registrate"
              >
                <User className="h-5 w-5" />
              </Link>
              <CartIconButton />
            </div>
          </div>
        </div>
      </div>

      {/* Espaciador para que el contenido no quede tapado por el header fijo */}
      <div className="h-[92px] md:h-[110px]" />

      <MainNav />
    </header>
  );
}


