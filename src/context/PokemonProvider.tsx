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
      selectPokemon: this.selectPokemon
    };
  }

  selectPokemon = async (name: string) => {
    const pokemon = await getPokemonByName(name);
    console.log(pokemon);
    this.setState({ selectedPokemon: pokemon });
    return !!pokemon;
  };

  deleteSelectedPokemon = () => {
    this.setState({ selectedPokemon: null });
  };

  render() {
    const { selectedPokemon } = this.state;
    const { selectPokemon, deleteSelectedPokemon } = this;

    return (
      <PokemonContext.Provider
        value={{ selectPokemon, deleteSelectedPokemon, selectedPokemon }}
      >
        {this.props.children}
      </PokemonContext.Provider>
    );
  }
}

export default PokemonProvider;
