import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext.tsx";
import classes from "./ThemeSwitcher.module.scss";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={classes.switcher}
      data-theme={theme}
      onClick={toggleTheme}
    >
      <div>
        <span data-pos={theme}></span>
      </div>
    </button>
  );
}

export default ThemeSwitcher;
