import { FormEvent, useCallback, useEffect, useState } from "react";
import Buggy from "../UI/Buggy/Buggy.tsx";
import Input from "../UI/Input/Input.tsx";
import classes from "./Header.module.scss";
import { useSearchParams } from "@remix-run/react";
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher.tsx";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";

function Header() {
  const [inputValue, setInputValue] = useState<string>("");
  const { lsValue, updateLsValue } = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();

  const redirect = useCallback(
    (searchParam: string) => {
      const newSearchParams = new URLSearchParams({
        search: searchParam,
        page: "1"
      });
      setSearchParams(newSearchParams);
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(async (): Promise<void> => {
    const value = inputValue.trim().toLowerCase();
    redirect(value);
    updateLsValue(value);
  }, [inputValue, updateLsValue, redirect]);

  const handleInput = useCallback((event: FormEvent): void => {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  }, []);

  useEffect(() => {
    const checkValue = searchParams.get("search");

    if (lsValue && checkValue !== lsValue) {
      redirect(lsValue);
    }
    setInputValue(lsValue);
  }, [lsValue, setSearchParams, searchParams, redirect]);

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
