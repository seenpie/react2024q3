import { useContext, useEffect, useState } from "react";
import { getPokemonList, IPokemonData } from "../../api/api.ts";
import Loader from "../Loader/Loader.tsx";
import Cards from "../Cards/Cards.tsx";
import Detail from "../Detail/Detail.tsx";
import { PokeAPI } from "pokeapi-types";
import { PokemonContext } from "../../context/PokemonContext.tsx";
import classes from "./Main.module.scss";

interface IMainState {
  offset: string;
  limit: string;
  cards: PokeAPI.NamedAPIResource[];
  totalCards: number | null;
  pagination: {
    next: string | null;
    previous: string | null;
  };
  selectedCard: IPokemonData | null;
  loading: boolean;
}

function Main() {
  const { deleteSelectedPokemon, selectedPokemon, loading, selectPokemon } =
    useContext(PokemonContext);
  const [state, setState] = useState<IMainState>({
    offset: "0",
    limit: "40",
    cards: [],
    totalCards: null,
    pagination: {
      next: null,
      previous: null
    },
    loading: true,
    selectedCard: null
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPokemonList(state.offset, state.limit);
      if (response) {
        setState((prevState) => ({
          ...prevState,
          cards: response.results,
          totalCards: response.count,
          pagination: { next: response.next, previous: response.previous },
          loading: false
        }));
      }
    };

    fetchData();
  }, [state.offset, state.limit]);

  const selectCard = async (name: string) => {
    await selectPokemon(name);
  };

  const { cards, totalCards, loading: stateLoading } = state;

  if (loading || stateLoading) return <Loader />;

  if (selectedPokemon) {
    return (
      <main className={classes.main}>
        <Detail data={selectedPokemon} onClick={deleteSelectedPokemon} />
      </main>
    );
  }

  return (
    <main className={classes.main}>
      <Cards
        cards={cards}
        totalCards={totalCards ?? 0}
        cardsOnPage={cards.length}
        onClick={selectCard}
      />
    </main>
  );
}

export default Main;
