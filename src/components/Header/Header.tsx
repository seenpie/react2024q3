import { Component, ContextType, FormEvent } from "react";
import Buggy from "../Buggy/Buggy.tsx";
import Input from "../Input/Input.tsx";
import { PokemonContext } from "../../context/PokemonContext.tsx";
import classes from "./Header.module.scss";

interface IHeaderProps {}

interface IHeaderState {
  inputValue: string;
}

class Header extends Component<IHeaderProps, IHeaderState> {
  static contextType = PokemonContext;
  declare context: ContextType<typeof PokemonContext>;

  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem("term") ?? ""
    };
  }

  handleSearch = async (): Promise<void> => {
    if (!this.state.inputValue) return;
    const { selectPokemon } = this.context;
    const value = this.state.inputValue.trim().toLowerCase();
    const isFound = await selectPokemon(value);
    if (isFound) {
      localStorage.setItem("term", value);
      this.setState({ inputValue: "" });
    }
  };

  handleInput = (event: FormEvent): void => {
    const target = event.target as HTMLInputElement;
    this.setState({ inputValue: target.value });
  };

  render() {
    const { inputValue } = this.state;
    const { handleSearch, handleInput } = this;
    return (
      <header className={classes.header}>
        <div>
          <Input
            onClick={handleSearch}
            value={inputValue}
            onInput={handleInput}
          />
        </div>
        <div>
          <Buggy />
        </div>
      </header>
    );
  }
}

export default Header;
