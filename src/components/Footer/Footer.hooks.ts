import { AppDispatch, cleanPokemonList, RootState } from "@/state";
import { useFetchPokemonData } from "@/hooks/useFetchPokemonData.tsx";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { formatPokemonDataToCSV, parsePokemonsData } from "@/helpers";

export function useFooter() {
  const [href, setHref] = useState("");
  const favoriteList = useSelector(
    (state: RootState) => state.favoritePokemonList.pokemonList
  );
  const { data, isLoading } = useFetchPokemonData(favoriteList);
  const dispatch = useDispatch<AppDispatch>();

  const unselectedAll = useCallback(() => {
    dispatch(cleanPokemonList());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const parseData = parsePokemonsData(data);
      const formatData = formatPokemonDataToCSV(parseData);
      const url = URL.createObjectURL(formatData);
      setHref(url);
    }
  }, [data]);

  return {
    isLoading,
    href,
    unselectedAll,
    length: favoriteList.length
  } as const;
}
