import { useState } from "react";
import classes from "./Buggy.module.scss";

function Buggy() {
  const [isErrorThrow, setThrowError] = useState<boolean>(false);

  const throwError = (): void => {
    setThrowError(true);
  };

  if (isErrorThrow) {
    throw new Error("I crashed!");
  }
  return (
    <div>
      <button className={classes.buggy} onClick={throwError}>
        #cause error
      </button>
    </div>
  );
}

export default Buggy;
