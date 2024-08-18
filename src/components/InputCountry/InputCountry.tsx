import {
  AutocompleteCountry,
  AutocompleteCountryProps
} from "../AutocompleteCountry/AutocompleteCountry";
import { InputProps, FormData } from "@/models";

type InputCountryProps = Omit<InputProps<FormData>, "options" | "children"> &
  AutocompleteCountryProps;

export const InputCountry = ({
  errorMessage,
  register,
  label,
  text,
  type,
  watch,
  setValue
}: InputCountryProps) => {
  return (
    <label>
      <span>{text}</span>
      <input type={type} {...register(label)} />
      {errorMessage && <span>{errorMessage}</span>}
      <AutocompleteCountry setValue={setValue} watch={watch} />
    </label>
  );
};
