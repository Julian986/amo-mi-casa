"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  targetId: string;
  offset?: number;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
};

export default function ScrollToProductsButton({
  targetId,
  offset = 130,
  children,
  className,
  variant = "default",
  style,
  onClick,
}: Props) {
  const handleClick = (e: React.MouseEvent) => {
    // Si hay un onClick personalizado, ejecutarlo primero
    if (onClick) {
      onClick(e);
      // Si el onClick previene el comportamiento por defecto, no hacer scroll
      if (e.defaultPrevented) {
        return;
      }
    }

    // Hacer scroll suave hacia el elemento objetivo
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Button onClick={handleClick} className={className} variant={variant} style={style}>
      {children}
    </Button>
  );
}


