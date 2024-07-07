import { Component } from "react";
import classes from "./Buggy.module.scss";

interface IBuggyComponentState {
  throwError: boolean;
}

class Buggy extends Component<object, IBuggyComponentState> {
  state: IBuggyComponentState = {
    throwError: false
  };

  handleClick = (): void => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error("I crashed!");
    }
    return (
      <div>
        <button className={classes.buggy} onClick={this.handleClick}>
          #cause error
        </button>
      </div>
    );
  }
}

export default Buggy;
