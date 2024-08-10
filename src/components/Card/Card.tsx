"use client";

import classes from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addPokemonToList,
  AppDispatch,
  removePokemonFromList,
  RootState
} from "@/state";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface ICardProps {
  name: string;
  className?: string;
}

export function Card({ name, className }: ICardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    const { page, search } = {
      page: searchParams?.get("page"),
      search: searchParams?.get("search")
    };
    const newQuery = new URLSearchParams({
      pokemon: name,
      ...(page && { page }),
      ...(search && { search })
    }).toString();
    router.replace(`?${newQuery}`);
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
