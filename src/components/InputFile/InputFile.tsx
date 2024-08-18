import { ChangeEvent } from "react";
import { FormData, InputProps } from "@/models";
import { parsePictureToString } from "@/utils";
import { UseFormRegister } from "react-hook-form";

type InputFileProps = Omit<
  InputProps<FormData>,
  "options" | "children" | "register"
> & {
  callback: (value: string) => void;
  register?: UseFormRegister<FormData>;
};

export const InputFile = ({
  type,
  label,
  errorMessage,
  register,
  callback
}: InputFileProps) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const uploadFile = files ? files[0] : null;

    if (uploadFile) {
      parsePictureToString({ image: uploadFile, callback });
    }
  };

  if (register) {
    return (
      <label>
        <span>{label}</span>
        <input type={type} {...register(label)} onInput={handleInput} />
        {errorMessage && <span>{errorMessage}</span>}
      </label>
    );
  }

  return (
    <label>
      <span>{label}</span>
      <input type={type} name={label} onInput={handleInput} />
      {errorMessage && <span>{errorMessage}</span>}
    </label>
  );
};
