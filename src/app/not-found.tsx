import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="my-4 md:my-6 flex min-h-[40vh] flex-col items-center justify-center text-center rounded-xl border border-stone-200 bg-white p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-stone-900">
          Próximamente
        </h1>
        <p className="mt-2 text-stone-700">
          Esta página estará disponible pronto.
        </p>
        <div className="mt-6">
          <Link href="/">
            <Button className="h-11 px-6 cursor-pointer">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


