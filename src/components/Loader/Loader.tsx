import classes from "./Loader.module.scss";

function Loader() {
  return (
    <div className={classes.wrapper} data-testid="loader">
      <div className={classes.loader}></div>
    </div>
  );
}

export default Loader;
