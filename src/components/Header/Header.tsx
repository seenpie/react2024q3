import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

  const redirect = useCallback(
    async (queries: { search: string } | Record<string, never>) => {
      await router.replace({
        query: queries
      });
    },
    [router]
  );

  useEffect(() => {
    const checkValue = router.query.search ?? "";

    if (checkValue !== lsValue) {
      redirect({ search: lsValue });
    }
  }, [lsValue, redirect, router]);

  const handleSearch = useCallback(async (): Promise<void> => {
    const value = inputValue.trim().toLowerCase();
    if (value === router.query.search || (!value && !router.query.search))
      return;
    if (value) {
      await redirect({ search: value });
    } else {
      await redirect({});
    }
    updateLsValue(value ?? "");
  }, [inputValue, updateLsValue, router, redirect]);

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
