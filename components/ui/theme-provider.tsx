"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: React.ComponentProps<typeof NextThemesProvider>["attribute"];
  defaultTheme?: string;
  enableSystem?: boolean;
}

export const ThemeProvider = ({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = false,
}: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
};
