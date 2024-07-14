import { ReactNode } from "react";
import classes from "./Layout.module.scss";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return <div className={classes.layout}>{children}</div>;
}

export default Layout;
