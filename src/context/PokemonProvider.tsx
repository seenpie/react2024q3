import { Component, ReactNode } from "react";
import { IPokemonContext, PokemonContext } from "./PokemonContext.tsx";
import { getPokemonByName } from "../api/api.ts";

interface IPokemonProviderProps {
  children: ReactNode;
}

interface IPokemonProviderState extends IPokemonContext {}

class PokemonProvider extends Component<
  IPokemonProviderProps,
  IPokemonProviderState
> {
  constructor(props: IPokemonProviderProps) {
    super(props);
    this.state = {
      selectedPokemon: null,
      deleteSelectedPokemon: this.deleteSelectedPokemon,
      selectPokemon: this.selectPokemon,
      loading: false,
      error: ""
    };
  }

  selectPokemon = async (name: string) => {
    this.setState((prevState) => ({ ...prevState, loading: true }));
    const pokemon = await getPokemonByName(name);
    this.setState({
      selectedPokemon: pokemon,
      loading: false,
      error: pokemon ? "" : `${name} not found`
    });
    if (!pokemon) {
      this.deleteError(2000);
    }
    return !!pokemon;
  };

  deleteError = (ms: number): void => {
    setTimeout(() => this.setState({ error: "" }), ms);
  };

  deleteSelectedPokemon = () => {
    this.setState({ selectedPokemon: null });
  };

  render() {
    const { selectedPokemon, loading, error } = this.state;
    const { selectPokemon, deleteSelectedPokemon } = this;

    return (
      <PokemonContext.Provider
        value={{
          selectPokemon,
          deleteSelectedPokemon,
          selectedPokemon,
          loading,
          error
        }}
      >
        {this.props.children}
      </PokemonContext.Provider>
    );
  }
}

export default PokemonProvider;
