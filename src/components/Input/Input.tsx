import { FormEvent, KeyboardEvent } from "react";
import classes from "./Input.module.scss";
import { GoSearch } from "react-icons/go";

interface IInputProps {
  onClick?: () => void;
  onInput?: (event: FormEvent) => void;
  placeholder?: string;
  value: string;
  className?: string;
}

function Input({
  onClick,
  onInput,
  value,
  placeholder,
  className
}: IInputProps) {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className={`${classes.search} ${className}`}>
      <input
        className={classes.input}
        type="text"
        placeholder={placeholder ?? "#pokemon name"}
        value={value}
        onInput={onInput}
        onKeyDown={handleKeyDown}
      />
      <button
        className={classes.button}
        type="button"
        onClick={onClick}
        data-testid="searchBtn"
      >
        <GoSearch />
      </button>
    </div>
  );
}

export default Input;
