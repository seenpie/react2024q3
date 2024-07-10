import { ReactNode, useCallback, useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext.tsx";
import { getPokemonByName, IPokemonData } from "../api/api.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.tsx";

interface PokemonProviderProps {
  children: ReactNode;
}

function PokemonProvider({ children }: PokemonProviderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemonData | null>(
    null
  );

  const { lsValue } = useLocalStorage();

  const deleteError = useCallback((ms: number): void => {
    setTimeout(() => setError(""), ms);
  }, []);

  const selectPokemon = useCallback(
    async (name: string): Promise<boolean> => {
      setLoading(true);
      const pokemon = await getPokemonByName(name);
      setLoading(false);
      setSelectedPokemon(pokemon);

      if (!pokemon) {
        setError(`${name} not found`);
        deleteError(2000);
      }

      return !!pokemon;
    },
    [deleteError]
  );

  const deleteSelectedPokemon = useCallback((): void => {
    setSelectedPokemon(null);
  }, []);

  useEffect(() => {
    if (lsValue) {
      selectPokemon(lsValue);
    }
  }, [selectPokemon, lsValue]);

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
      {children}
    </PokemonContext.Provider>
  );
}

export default PokemonProvider;
