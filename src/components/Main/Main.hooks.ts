import { PokeAPI } from "pokeapi-types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, useGetPokemonsQuery } from "../../state";
import {
  addItemsToList,
  updatePageParams
} from "../../state/pageData/pageDataSlice.ts";
import { useDispatch } from "react-redux";

interface IMainState {
  offset: number;
  limit: number;
  cards: PokeAPI.NamedAPIResource[];
  totalCards: number;
}

export function useMain() {
  const [state, setState] = useState<IMainState>({
    offset: 0,
    limit: 40,
    cards: [],
    totalCards: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const { isFetching, data } = useGetPokemonsQuery({
    offset: search ? 0 : state.offset,
    limit: search ? 5000 : state.limit
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!data) return;

    const updateState = (
      newOffset: number,
      newCards: PokeAPI.NamedAPIResource[],
      newTotalCards: number
    ) => {
      setState((prevState) => ({
        ...prevState,
        offset: newOffset,
        cards: newCards ?? [],
        totalCards: newTotalCards
      }));
      dispatch(addItemsToList(newCards));
      dispatch(
        updatePageParams({
          limit: state.limit,
          offset: newOffset,
          totalItems: newTotalCards
        })
      );
    };

    let offset = 0;

    if (page) {
      offset = state.limit * Number(page) - state.limit;
    }

    if (search) {
      const coincidences = data.results.filter((card) => {
        return card.name.includes(search);
      });

      const cards: PokeAPI.NamedAPIResource[][] = coincidences?.reduce<
        PokeAPI.NamedAPIResource[][]
      >((acc, cur, i) => {
        const index = Math.floor(i / state.limit);
        if (!acc[index]) {
          acc[index] = [];
        }
        acc[index].push(cur);
        return acc;
      }, []);

      const index = page ? Number(page) - 1 : 0;

      updateState(offset, cards[index], coincidences.length);
    } else {
      updateState(offset, data.results, data.count);
    }
  }, [searchParams, data, state.limit, dispatch, page, search]);

  const handlePaginationClick = useCallback(
    (pageNumber: number) => {
      const search = searchParams.get("search");
      const newOffset = state.limit * pageNumber - state.limit;
      setSearchParams({ page: String(pageNumber), search: search ?? "" });
      setState((prevState) => ({ ...prevState, offset: newOffset }));
    },
    [state.limit, setSearchParams, searchParams]
  );

  return { isFetching, state, handlePaginationClick };
}
