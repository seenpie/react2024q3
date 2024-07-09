import { Component, FormEvent, KeyboardEvent } from "react";
import classes from "./Input.module.scss";
import { GoSearch } from "react-icons/go";

interface IInputProps {
  onClick?: () => void;
  onInput?: (event: FormEvent) => void;
  value: string;
}

class Input extends Component<IInputProps, object> {
  constructor(props: IInputProps) {
    super(props);
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.props.onClick?.();
    }
  };

  render() {
    const { value, onClick, onInput } = this.props;
    return (
      <div className={classes.search}>
        <input
          className={classes.input}
          type="text"
          placeholder="#pokemon name"
          value={value}
          onInput={onInput}
          onKeyDown={this.handleKeyDown}
        />
        <button className={classes.button} type="button" onClick={onClick}>
          <GoSearch />
        </button>
      </div>
    );
  }
}

export default Input;
