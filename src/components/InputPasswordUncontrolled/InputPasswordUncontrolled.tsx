import { getAutoCompleteValue } from "@/utils";
import { ChangeEvent, useState } from "react";
import { PasswordStrengthMeter } from "../PasswordStrengthMeter/PasswordStrengthMeter";
import { InputProps, FormData } from "@/models";

type InputPasswordUncontrolledProps = Omit<
  InputProps<FormData>,
  "options" | "children" | "register"
>;

export const InputPasswordUncontrolled = ({
  type,
  text,
  label,
  errorMessage
}: InputPasswordUncontrolledProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <label>
      <span>{text}</span>
      <input
        type={type}
        autoComplete={getAutoCompleteValue(type)}
        value={inputValue}
        onChange={handleInput}
        name={label}
      />
      <PasswordStrengthMeter value={inputValue} />
      {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
