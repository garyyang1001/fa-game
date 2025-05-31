"use client";

import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Future providers like NextAuth, Theme, etc. */}
      {children}
    </>
  );
}