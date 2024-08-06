import { ChangeEvent, useCallback, useState } from "react";
import Buggy from "../UI/Buggy/Buggy.tsx";
import Input from "../UI/Input/Input.tsx";
import classes from "./Header.module.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher.tsx";
import { useRouter } from "next/router";

export function Header() {
  const { lsValue, updateLsValue } = useLocalStorage();
  const [inputValue, setInputValue] = useState<string>(() => lsValue);
  const router = useRouter();

  const handleSearch = useCallback(async (): Promise<void> => {
    const value = inputValue.trim().toLowerCase();
    if (value === router.query.search || (!value && !router.query.search))
      return;
    if (value) {
      await router.replace({
        query: { search: value }
      });
    } else {
      await router.replace({
        query: {}
      });
    }
    updateLsValue(value ?? "");
  }, [inputValue, updateLsValue, router]);

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setInputValue(event.target.value);
    },
    []
  );

  return (
    <header className={classes.header}>
      <div>
        <Input
          focus
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
