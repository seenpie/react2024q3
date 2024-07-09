import { Component, ContextType } from "react";
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

class Main extends Component<object, IMainState> {
  static contextType = PokemonContext;
  declare context: ContextType<typeof PokemonContext>;

  state: IMainState = {
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
  };

  componentDidMount() {
    const fetchData = async () => {
      const response = await getPokemonList(
        this.state.offset,
        this.state.limit
      );
      if (response) {
        this.setState((prevState) => ({
          ...prevState,
          cards: response.results,
          totalCards: response.count,
          pagination: { next: response.next, previous: response.previous },
          loading: false
        }));
      }
    };

    fetchData();
  }

  selectCard = async (name: string) => {
    const { selectPokemon } = this.context;
    await selectPokemon(name);
  };

  render() {
    const { loading, selectedPokemon } = this.context;
    const { cards, totalCards, loading: stateLoading } = this.state;

    if (loading || stateLoading) return <Loader />;

    if (selectedPokemon) {
      return (
        <main className={classes.main}>
          <Detail
            data={selectedPokemon}
            onClick={this.context.deleteSelectedPokemon}
          />
        </main>
      );
    }

    return (
      <main className={classes.main}>
        <Cards
          cards={cards}
          totalCards={totalCards ?? 0}
          cardsOnPage={cards.length}
          onClick={this.selectCard}
        />
      </main>
    );
  }
}

export default Main;
