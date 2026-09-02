// components/ThemeProvider.tsx
"use client"; // This is required because we are dealing with client-side state

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

// We wrap the provider so we can safely use it in our Server Component layout
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // next-themes v0.4.x injects a <script> tag that React 19 warns about.
  // This is a known upstream bug — the warning is harmless; theme still works.
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("script tag")) return;
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
