import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import classes from "./Input.module.scss";
import { GoSearch } from "react-icons/go";

interface IInputProps {
  onClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
  className?: string;
  focus?: boolean;
}

function Input({
  onClick,
  onChange,
  value,
  placeholder,
  className,
  focus
}: IInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick?.();
    }
  };

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  });

  return (
    <div className={`${classes.search} ${className}`}>
      <input
        ref={ref}
        className={classes.input}
        type="text"
        placeholder={placeholder ?? "#pokemon name"}
        value={value}
        onChange={onChange}
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
