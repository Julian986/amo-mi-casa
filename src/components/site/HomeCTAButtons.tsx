"use client";

import Link from "next/link";
import { useState } from "react";
import ScrollToProductsButton from "@/components/site/ScrollToProductsButton";
import { Button } from "@/components/ui/button";

type StyleCombo = 0 | 1 | 2; // 0: default, 1: combo A, 2: combo B

const COMBO_A = { background: "#7f6939", color: "#fde9e9" } as const;
const COMBO_B = { background: "#fde9e9", color: "#7f6938" } as const;

function getStyleForCombo(combo: StyleCombo): React.CSSProperties | undefined {
  if (combo === 1) return { background: COMBO_A.background, color: COMBO_A.color };
  if (combo === 2) return { background: COMBO_B.background, color: COMBO_B.color };
  return undefined;
}

export default function HomeCTAButtons() {
  const [productsCombo, setProductsCombo] = useState<StyleCombo>(0);
  const [offersCombo, setOffersCombo] = useState<StyleCombo>(0);

  const cycle = (v: StyleCombo): StyleCombo => ((v + 1) % 3) as StyleCombo;

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
      <div className="w-full sm:w-auto">
        <ScrollToProductsButton
          targetId="productos"
          offset={100}
          className="h-11 w-full sm:w-auto px-6 cursor-pointer"
          style={getStyleForCombo(productsCombo)}
          onClick={() => setProductsCombo((v) => cycle(v))}
        >
          Ver productos
        </ScrollToProductsButton>
      </div>
      <div className="w-full sm:w-auto">
        <Link href="/c/sale" className="w-full sm:w-auto">
          <Button
            className="h-11 w-full sm:w-auto px-6 cursor-pointer"
            variant="outline"
            style={getStyleForCombo(offersCombo)}
            onClick={(e) => {
              // Evita navegar para poder ciclar los colores
              e.preventDefault();
              setOffersCombo((v) => cycle(v));
            }}
          >
            Ver ofertas
          </Button>
        </Link>
      </div>
    </div>
  );
}

