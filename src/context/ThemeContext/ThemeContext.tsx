import { createContext } from "react";

export type Theme = "light" | "dark";

interface IThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContextType>({
  theme: "light",
  toggleTheme: () => {}
});
