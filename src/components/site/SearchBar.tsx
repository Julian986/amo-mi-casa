"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initial = useMemo(() => (searchParams?.get("q") || "").toString(), [searchParams]);
  const [value, setValue] = useState(initial);

  const submit = () => {
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  // Búsqueda reactiva con debounce
  useEffect(() => {
    const id = setTimeout(() => {
      const q = value.trim();
      if (pathname === "/search") {
        router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
      } else {
        if (q) {
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }
      }
    }, 250);
    return () => clearTimeout(id);
  }, [value, router, pathname]);

  // Si cambia la ruta (por navegar atrás/adelante), sincronizar el input
  useEffect(() => {
    const q = (searchParams?.get("q") || "").toString();
    setValue(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
        placeholder="Buscar productos…"
        className="pl-9 h-10 rounded-full bg-stone-100 border-stone-200"
      />
      <button
        type="button"
        onClick={submit}
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm text-stone-700 hover:bg-stone-200/60"
        aria-label="Buscar"
      >
        Buscar
      </button>
    </div>
  );
}


