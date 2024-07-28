import { ReactNode, useContext } from "react";
import classes from "./Layout.module.scss";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext.tsx";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classes.layout} data-theme={theme}>
      {children}
    </div>
  );
}

export default Layout;
