import { FormEvent, KeyboardEvent } from "react";
import classes from "./Input.module.scss";
import { GoSearch } from "react-icons/go";

interface IInputProps {
  onClick?: () => void;
  onInput?: (event: FormEvent) => void;
  value: string;
}

function Input({ onClick, onInput, value }: IInputProps) {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className={classes.search}>
      <input
        className={classes.input}
        type="text"
        placeholder="#pokemon name"
        value={value}
        onInput={onInput}
        onKeyDown={handleKeyDown}
      />
      <button className={classes.button} type="button" onClick={onClick}>
        <GoSearch />
      </button>
    </div>
  );
}

export default Input;
