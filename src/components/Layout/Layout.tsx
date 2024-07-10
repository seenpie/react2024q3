import { ReactNode, useContext } from "react";
import classes from "./Layout.module.scss";
import { PokemonContext } from "../../context/PokemonContext.tsx";
import Popup from "../Popup/Popup.tsx";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  const { error } = useContext(PokemonContext);

  return (
    <div className={classes.layout}>
      {error && <Popup message={error} />}
      {children}
    </div>
  );
}

export default Layout;
