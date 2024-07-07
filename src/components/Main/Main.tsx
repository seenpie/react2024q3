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
  loading: boolean;
  selectedCard: IPokemonData | null;
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
      // console.log(response);
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
    this.setState((prevState) => ({ ...prevState, loading: true }));
    const { selectPokemon } = this.context;
    await selectPokemon(name);
    this.setState((prevState) => ({
      ...prevState,
      loading: false
    }));
  };

  render() {
    if (this.state.loading) return <Loader />;

    if (this.context.selectedPokemon) {
      return (
        <main className={classes.main}>
          <Detail
            data={this.context.selectedPokemon}
            onClick={this.context.deleteSelectedPokemon}
          />
        </main>
      );
    }

    return (
      <main className={classes.main}>
        <Cards
          cards={this.state.cards}
          totalCards={this.state.totalCards ?? 0}
          cardsOnPage={this.state.cards.length}
          onClick={this.selectCard}
        />
      </main>
    );
  }
}

export default Main;
