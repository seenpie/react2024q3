import { useState } from "react";
import classes from "./Buggy.module.scss";

function Buggy() {
  const [throwError, setThrowError] = useState<boolean>(false);

  const handleClick = (): void => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error("I crashed!");
  }
  return (
    <div>
      <button className={classes.buggy} onClick={handleClick}>
        #cause error
      </button>
    </div>
  );
}

export default Buggy;
