import { useNavigate, useSearchParams } from "react-router-dom";
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

function Card({ name, className }: ICardProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tokens = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  const [isChecked, setIsChecked] = useState<boolean>(tokens.includes(name));

  useEffect(() => {
    setIsChecked(tokens.includes(name));
  }, [tokens, name]);

  const path = searchParams
    ? `/pokemon/${name}?${searchParams}`
    : `/pokemon/${name}`;

  const handleCheckboxClick = (event: FormEvent) => {
    event.stopPropagation();
    if (isChecked) {
      dispatch(removePokemonFromList(name));
    } else {
      dispatch(addPokemonToList(name));
    }
  };

  const redirect = () => {
    navigate(path);
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
