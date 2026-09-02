// components/ThemeProvider.tsx
"use client"; // This is required because we are dealing with client-side state

import { ThemeProvider as NextThemesProvider } from "next-themes";

// We wrap the provider so we can safely use it in our Server Component layout
export function ThemeProvider({ children }: { children: React.ReactNode }) {
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
