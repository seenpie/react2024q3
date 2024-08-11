import { useSearchParams } from "@remix-run/react";
import classes from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonToList,
  AppDispatch,
  removePokemonFromList,
  RootState
} from "../../state";
import { FormEvent, useEffect, useState } from "react";

interface ICardProps {
  name: string;
  className?: string;
}

export function Card({ name, className }: ICardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
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

  const redirect = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("pokemon", name);
    setSearchParams(newSearchParams);
  };

  return (
    <div
      className={`${classes.card} ${className}`}
      onClick={redirect}
      aria-label="card"
    >
      <span>{name}</span>
      <span
        className={classes.card__checkbox}
        onClick={handleCheckboxClick}
        data-checked={isChecked}
        aria-label="checkbox"
      />
    </div>
  );
}
