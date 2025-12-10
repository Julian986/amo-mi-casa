import React from "react";

export default function TopBar() {
  return (
    <div className="w-full bg-stone-100 text-stone-700 text-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden h-9 flex items-center">
          <div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap">
            <span className="mx-6">25% OFF abonando con EFECTIVO</span>
            <span className="mx-6">6 cuotas SIN INTERÉS</span>
            <span className="mx-6">10% OFF abonando con TRANSFERENCIA</span>
            <span className="mx-6">25% OFF abonando con EFECTIVO</span>
            <span className="mx-6">6 cuotas SIN INTERÉS</span>
            <span className="mx-6">10% OFF abonando con TRANSFERENCIA</span>
          </div>
        </div>
      </div>
    </div>
  );
}


