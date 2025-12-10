"use client";

import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  targetId: string;
  offset?: number;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
};

export default function ScrollToProductsButton({
  targetId,
  offset = 130,
  children,
  className,
  variant = "default",
}: Props) {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Button onClick={onClick} className={className} variant={variant}>
      {children}
    </Button>
  );
}


