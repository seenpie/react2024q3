import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  errorMessage: string | undefined;
  type:
    | "text"
    | "email"
    | "password"
    | "radio"
    | "number"
    | "checkbox"
    | "file";
  options?: { value: string }[];
};

export const Input = <T extends FieldValues>({
  label,
  register,
  errorMessage,
  type,
  options
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
          <input type={type} {...register(label)} />
          {errorMessage && <span>{errorMessage}</span>}
        </label>
      );
  }
};
