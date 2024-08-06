import classes from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonToList,
  AppDispatch,
  removePokemonFromList,
  RootState
} from "@/state";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ICardProps {
  name: string;
  className?: string;
}

function Card({ name, className }: ICardProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  const [isChecked, setIsChecked] = useState<boolean>(tokens.includes(name));

  useEffect(() => {
    setIsChecked(tokens.includes(name));
  }, [tokens, name]);

  const handleCheckboxClick = (event: FormEvent) => {
    event.stopPropagation();
    if (isChecked) {
      dispatch(removePokemonFromList(name));
    } else {
      dispatch(addPokemonToList(name));
    }
  };

  const redirect = async () => {
    await router.replace({ query: { ...router.query, pokemon: name } });
  };

  return (
    <div className={`${classes.card} ${className}`} onClick={redirect}>
      <span>{name}</span>
      <span
        className={classes.card__checkbox}
        onClick={handleCheckboxClick}
        data-checked={isChecked}
      />
    </div>
  );
}

export default Card;
