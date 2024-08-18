import { useState } from "react";
import { AutocompleteCountry } from "../AutocompleteCountry/AutocompleteCountry";

export const InputCountryUncontrolled = ({
  errorMessage
}: {
  errorMessage: string | undefined;
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <label>
      <span>country:</span>
      <input
        type="text"
        name="country"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      {errorMessage && <span>{errorMessage}</span>}
      <AutocompleteCountry setValue={setInputValue} value={inputValue} />
    </label>
  );
};
