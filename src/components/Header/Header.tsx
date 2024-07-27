import { FormEvent, useCallback, useEffect, useState } from "react";
import Buggy from "../UI/Buggy/Buggy.tsx";
import Input from "../UI/Input/Input.tsx";
import classes from "./Header.module.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import { useSearchParams } from "react-router-dom";
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher.tsx";

function Header() {
  const [inputValue, setInputValue] = useState<string>("");
  const { lsValue, updateLsValue } = useLocalStorage();
  const [, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(async (): Promise<void> => {
    const value = inputValue.trim().toLowerCase();
    let searchParamsValue = value;

    if (!value) {
      searchParamsValue = "";
    }

    setSearchParams({ search: searchParamsValue });
    updateLsValue(value);
  }, [inputValue, updateLsValue, setSearchParams]);

  const handleInput = useCallback((event: FormEvent): void => {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }, []);

  useEffect(() => {
    if (lsValue) {
      setInputValue(lsValue);
      setSearchParams({ search: lsValue });
    }
  }, [lsValue, setSearchParams]);

  return (
    <header className={classes.header}>
      <div>
        <Input
          onClick={handleSearch}
          value={inputValue}
          onChange={handleInput}
        />
      </div>
      <div className={classes.buttons}>
        <ThemeSwitcher />
        <Buggy />
      </div>
    </header>
  );
}

export default Header;
