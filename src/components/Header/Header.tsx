import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import Buggy from "../Buggy/Buggy.tsx";
import Input from "../Input/Input.tsx";
import { PokemonContext } from "../../context/PokemonContext.tsx";
import classes from "./Header.module.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";

function Header() {
  const { selectPokemon } = useContext(PokemonContext);
  const [inputValue, setInputValue] = useState<string>("");
  const { lsValue, updateLsValue } = useLocalStorage();

  const handleSearch = useCallback(
    async (searchTerm?: string): Promise<void> => {
      const value =
        searchTerm?.trim().toLowerCase() || inputValue.trim().toLowerCase();
      if (!value) return;
      const isFound = await selectPokemon(value);
      if (isFound) {
        updateLsValue(value);
      }
    },
    [inputValue, selectPokemon, updateLsValue]
  );

  const handleInput = useCallback((event: FormEvent): void => {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }, []);

  useEffect(() => {
    setInputValue(lsValue);
  }, [lsValue]);

  return (
    <header className={classes.header}>
      <div>
        <Input
          onClick={() => handleSearch()}
          value={inputValue}
          onInput={handleInput}
        />
      </div>
      <div>
        <Buggy />
      </div>
    </header>
  );
}

export default Header;
