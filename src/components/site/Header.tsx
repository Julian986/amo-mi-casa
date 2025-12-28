import React, { Suspense } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import CartIconButton from "./CartIconButton";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="w-full bg-white">
      {/* Bloque superior fijo (promos + logo/buscador/iconos) */}
      <div className="fixed inset-x-0 top-0 z-40 bg-white">
        <TopBar />
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-2">
            <div className="justify-self-start md:hidden">
              <MobileMenu />
            </div>
            <Link
              href="/"
              className="justify-self-center text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight whitespace-nowrap"
              style={{ fontFamily: "cursive" }}
            >
              Amo mi casa
            </Link>
            <div className="hidden md:flex w-full max-w-3xl items-center gap-2 justify-self-center">
              <Suspense fallback={null}>
                <SearchBar />
              </Suspense>
            </div>
            <div className="flex items-center gap-2 justify-self-end">
              <Link
                href="/admin"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50"
                aria-label="Panel de administración"
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


