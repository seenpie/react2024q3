import classes from "./Popup.module.scss";

interface IPopupProps {
  message?: string;
}

function Popup({ message }: IPopupProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.popup}>{message ?? "error"}</div>
    </div>
  );
}

export default Popup;
