import { ReactNode, useContext } from "react";
import classes from "./Wrapper.module.scss";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext.tsx";

interface IWrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: IWrapperProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <div id="root">
      <div className={classes.layout} data-theme={theme}>
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
