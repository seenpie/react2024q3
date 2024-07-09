import { Component } from "react";
import classes from "./Popup.module.scss";

interface IPopupProps {
  message?: string;
}

class Popup extends Component<IPopupProps> {
  constructor(props: IPopupProps) {
    super(props);
  }

  render() {
    const { message } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.popup}>{message ?? "error"}</div>
      </div>
    );
  }
}

export default Popup;
