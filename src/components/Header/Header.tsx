"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Buggy from "../UI/Buggy/Buggy.tsx";
import Input from "../UI/Input/Input.tsx";
import classes from "./Header.module.scss";
import { useLocalStorage } from "../../hooks/useLocalStorage.tsx";
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher.tsx";
import { useRouter, useSearchParams } from "next/navigation";

export function Header() {
  const { lsValue, updateLsValue } = useLocalStorage();
  const [inputValue, setInputValue] = useState<string>(() => lsValue);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (lsValue) {
      const newQuery = new URLSearchParams({ search: lsValue }).toString();
      router.push(`?${newQuery}`);
    }
  }, [lsValue, router]);

  const handleSearch = (): void => {
    const value = inputValue.trim().toLowerCase();
    const search = searchParams?.get("search");
    if (value === search) {
      return;
    }

    if (value) {
      const newQuery = new URLSearchParams({ search: value }).toString();
      router.push(`?${newQuery}`);
    } else {
      router.push("/");
    }
    updateLsValue(value ?? "");
  };

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
