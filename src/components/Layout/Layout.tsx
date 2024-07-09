import { Component, ContextType, ReactNode } from "react";
import classes from "./Layout.module.scss";
import { PokemonContext } from "../../context/PokemonContext.tsx";
import Popup from "../Popup/Popup.tsx";

interface ILayoutProps {
  children: ReactNode;
}

class Layout extends Component<ILayoutProps> {
  static contextType = PokemonContext;
  declare context: ContextType<typeof PokemonContext>;
  constructor(props: ILayoutProps) {
    super(props);
  }

  render() {
    const { children } = this.props;
    const { error } = this.context;
    return (
      <div className={classes.layout}>
        {error && <Popup message={error} />}
        {children}
      </div>
    );
  }
}

export default Layout;
