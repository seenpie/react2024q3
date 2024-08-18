import { useSelector } from "react-redux";
import { selectCountries } from "@/store";
import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { FormData } from "@/models";
import classes from "./AutocompleteCountry.module.css";

export type AutocompleteCountryProps = {
  setValue: (value: string) => void;
  watch?: UseFormWatch<FormData>;
  value?: string;
};

export const AutocompleteCountry = ({
  setValue,
  watch,
  value
}: AutocompleteCountryProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (watch) {
      const subscribtion = watch((value) => setInputValue(value.country ?? ""));

      return () => subscribtion.unsubscribe();
    }
    if (value != null) {
      setInputValue(value);
    }
  }, [watch, value]);

  const countries = useSelector(selectCountries).countries;

  const selectHint = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    const target = event.target as HTMLButtonElement;
    setValue(target.innerText);
  };

  return (
    <>
      {inputValue && (
        <ul className={classes.countryList} onClick={selectHint}>
          {countries
            .filter(
              (country) =>
                inputValue &&
                country.toLowerCase().startsWith(inputValue.toLowerCase()) &&
                country !== inputValue
            )
            .map((country) => (
              <li key={country}>
                <button>{country}</button>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
