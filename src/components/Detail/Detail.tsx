import { IPokemon } from "@/state/interfaces";
import classes from "./Detail.module.scss";
import { useDetail } from "@/components/Detail/Detail.hooks.ts";

export function Detail({ data }: { data: IPokemon }) {
  const { parsedPokemonData, handleClose } = useDetail(data);

  if (!parsedPokemonData) {
    return (
      <aside className={classes.wrapper}>
        <div>not found</div>
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
            <img src={parsedPokemonData.image} alt={parsedPokemonData.name} />
          </div>
          <div className={classes.information}>
            <div className={classes.information__name}>
              Name:
              <h2>{parsedPokemonData.name}</h2>
            </div>
            <div className={classes.detailInfo}>
              Info:
              <div>height: {parsedPokemonData.height}</div>
              <div>weight: {parsedPokemonData.weight}</div>
              <div>happiness: {parsedPokemonData.happiness}</div>
              <div>type: {parsedPokemonData.type}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
