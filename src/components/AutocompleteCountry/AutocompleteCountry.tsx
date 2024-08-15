import { useSelector } from "react-redux";
import { selectCountries } from "@/store";
import { ChangeEvent, useState } from "react";
import classes from "./AutocompleteCountry.module.css";

export const AutocompleteCountry = () => {
  const countries = useSelector(selectCountries).countries;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const selectHint = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor="country">country</label>
      <input id="country" value={inputValue} onChange={handleInputChange} />
      {inputValue && (
        <form className={classes.countryList} onClick={selectHint}>
          {countries
            .filter(
              (country) =>
                inputValue &&
                country.toLowerCase().startsWith(inputValue.toLowerCase()) &&
                country !== inputValue
            )
            .map((country) => (
              <input type="button" value={country} />
            ))}
        </form>
      )}
    </div>
  );
};
