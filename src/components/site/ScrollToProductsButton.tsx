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

  return (
    <Button onClick={onClick} className={className} variant={variant} style={style}>
      {children}
    </Button>
  );
}


