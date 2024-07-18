import { ReactNode, useCallback, useEffect, useState } from "react";
import { getPokemonList, IPokemonData } from "../../api/api.ts";
import Loader from "../Loader/Loader.tsx";
import Cards from "../Cards/Cards.tsx";
import { PokeAPI } from "pokeapi-types";
import classes from "./Main.module.scss";
import Pagination from "../UI/Pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";

interface IMainState {
  offset: number;
  limit: number;
  cards: PokeAPI.NamedAPIResource[];
  totalCards: number | null;
  selectedCard: IPokemonData | null;
  loading: boolean;
}

interface IMainProps {
  children: ReactNode;
}

function Main({ children }: IMainProps) {
  const [state, setState] = useState<IMainState>({
    offset: 0,
    limit: 40,
    cards: [],
    totalCards: null,
    loading: false,
    selectedCard: null
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { lsValue } = useLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      setState((prevValue) => ({ ...prevValue, loading: true }));

      const pageParams = searchParams.get("page");
      const search = searchParams.get("search");

      let offset = 0;
      if (pageParams) {
        offset = state.limit * Number(pageParams) - state.limit;
      }

      if (search || lsValue) {
        const pokemons = await getPokemonList();
        if (pokemons) {
          const coincidences = pokemons.results.filter((card) => {
            return card.name.includes(search ?? lsValue);
          });

          const cards: PokeAPI.NamedAPIResource[][] = coincidences.reduce<
            PokeAPI.NamedAPIResource[][]
          >((acc, cur, i) => {
            const index = Math.floor(i / 40);
            if (!acc[index]) {
              acc[index] = [];
            }
            acc[index].push(cur);
            return acc;
          }, []);

          const index = pageParams ? Number(pageParams) - 1 : 0;

          setState((prevState) => ({
            ...prevState,
            cards: cards[index] ?? [],
            totalCards: coincidences.length,
            offset,
            loading: false
          }));
        }
        return;
      }

      const response = await getPokemonList(offset, state.limit);

      if (response) {
        setState((prevState) => ({
          ...prevState,
          cards: response.results,
          totalCards: response.count,
          offset,
          loading: false
        }));
      }
    };

    fetchData();
  }, [state.offset, state.limit, searchParams, lsValue]);

  const handlePaginationClick = useCallback(
    (pageNumber: number) => {
      const search = searchParams.get("search");
      const newOffset = state.limit * pageNumber - state.limit;
      setSearchParams({ page: String(pageNumber), search: search ?? "" });
      setState((prevState) => ({ ...prevState, offset: newOffset }));
    },
    [state.limit, setSearchParams, searchParams]
  );

  const { cards, totalCards, loading, limit, offset } = state;

  if (loading) return <Loader />;

  return (
    <main className={classes.main}>
      <section className={classes.content}>
        <Cards
          cards={cards}
          totalCards={totalCards ?? 0}
          cardsOnPage={cards.length}
        />
        <Pagination
          totalCards={totalCards ?? 0}
          limit={limit}
          offset={offset}
          onClick={handlePaginationClick}
        />
      </section>
      {children}
    </main>
  );
}

export default Main;
