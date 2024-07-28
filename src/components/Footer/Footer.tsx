import classes from "./Footer.module.scss";
import { useFooter } from "./Footer.hooks.ts";

export function Footer() {
  const { isLoading, href, unselectedAll, length } = useFooter();

  return (
    <footer className={classes.footer}>
      <span>{`selected ${length} ${length > 1 ? "pokemons" : "pokemon"}`}</span>
      <div className={classes.button_wrapper}>
        <a
          className={`${classes.footer__button} ${isLoading ? classes.footer__button_disabled : ""}`}
          download={`${length}_pokemons.csv`}
          href={isLoading ? "" : href}
        >
          download
        </a>
        <button className={classes.footer__button} onClick={unselectedAll}>
          unselected all
        </button>
      </div>
    </footer>
  );
}
