"use client";

import Link from "next/link";
import ScrollToProductsButton from "@/components/site/ScrollToProductsButton";
import { Button } from "@/components/ui/button";

export default function HomeCTAButtons() {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <div className="w-full sm:w-auto">
        <ScrollToProductsButton
          targetId="productos"
          offset={100}
          className="h-11 w-full sm:w-auto px-6"
        >
          Ver productos
        </ScrollToProductsButton>
      </div>
      <div className="w-full sm:w-auto">
        <Link href="/c/sale" className="w-full sm:w-auto">
          <Button
            className="h-11 w-full sm:w-auto px-6 cursor-pointer"
            variant="outline"
          >
            Ver ofertas
          </Button>
        </Link>
      </div>
    </div>
  );
}

