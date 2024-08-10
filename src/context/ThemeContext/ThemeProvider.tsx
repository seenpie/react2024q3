"use client";

import { ReactNode, useCallback, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext.tsx";

interface IThemeProvider {
  children: ReactNode;
}

function ThemeProvider({ children }: IThemeProvider) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
