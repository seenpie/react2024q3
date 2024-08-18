import { getAutoCompleteValue } from "@/utils";
import { FieldValues } from "react-hook-form";
import { InputProps } from "@/models/types";

export const InputHookForm = <T extends FieldValues>({
  label,
  register,
  errorMessage,
  type,
  options,
  children
}: InputProps<T>) => {
  switch (type) {
    case "radio":
      return (
        <label>
          <span>{label}</span>
          <span>
            {options?.map((option) => (
              <label key={option.value}>
                <input type={type} value={option.value} {...register(label)} />
                {option.value}
              </label>
            ))}
          </span>
          {errorMessage && <span>{errorMessage}</span>}
        </label>
      );

    case "checkbox":
      return (
        <label>
          <span>{label}</span>
          <span>
            <input type={type} {...register(label)} />
          </span>
          {errorMessage && <span>{errorMessage}</span>}
        </label>
      );

    default:
      return (
        <label>
          <span>{label}</span>
          <input
            type={type}
            {...register(label)}
            autoComplete={getAutoCompleteValue(type)}
          />
          {errorMessage && <span>{errorMessage}</span>}
          {children}
        </label>
      );
  }
};
