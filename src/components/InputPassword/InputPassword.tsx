import { InputProps, FormData } from "@/models";
import { getAutoCompleteValue } from "@/utils";
import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { PasswordStrengthMeter } from "../PasswordStrengthMeter/PasswordStrengthMeter";

type InputPasswordProps = Omit<InputProps<FormData>, "options" | "children"> & {
  watch: UseFormWatch<FormData>;
};

export const InputPassword = ({
  text,
  register,
  type,
  label,
  errorMessage,
  watch
}: InputPasswordProps) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const subscribtion = watch((value) => setInputValue(value.password ?? ""));

    return () => subscribtion.unsubscribe();
  }, [watch]);

  return (
    <label>
      <span>{text}</span>
      <input
        type={type}
        {...register(label)}
        autoComplete={getAutoCompleteValue(type)}
      />
      <PasswordStrengthMeter value={inputValue} />
      {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
