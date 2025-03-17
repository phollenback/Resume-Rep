"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function Progress({
  className,
  value,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: number }) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary/20",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-primary/80 to-primary transition-all duration-500 ease-in-out"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          boxShadow: '0 0 8px rgba(var(--primary), 0.3)'
        }}
      />
    </div>
  );
} 