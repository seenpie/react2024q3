import classes from "./Detail.module.scss";
import Loader from "../Loader/Loader";
import { useDetail } from "./Detail.hooks.ts";

function Detail() {
  const { isLoading, pokemonData, handleClose } = useDetail();

  if (isLoading) {
    return (
      <aside className={classes.wrapper}>
        <Loader />;
      </aside>
    );
  }

  if (!pokemonData) {
    return (
      <aside className={classes.wrapper}>
        <div>not found</div>;
      </aside>
    );
  }

  return (
    <aside className={classes.wrapper}>
      <button className={classes.button} onClick={handleClose}>
        #close
      </button>
      <div className={classes.pokemon__wrapper}>
        <div className={classes.pokemon}>
          <div className={classes.image}>
            <img src={pokemonData.image} alt={pokemonData.name} />
          </div>
          <div className={classes.information}>
            <div className={classes.information__name}>
              Name:
              <h2>{pokemonData.name}</h2>
            </div>
            <div>
              Description:
              <p>{pokemonData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Detail;
