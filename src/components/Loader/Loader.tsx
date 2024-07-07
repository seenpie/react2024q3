import { Component } from "react";
import classes from "./Loader.module.scss";

class Loader extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.loader}></div>
      </div>
    );
  }
}

export default Loader;
