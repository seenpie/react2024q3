import { Component } from "react";
import { IPokemonData } from "../../api/api.ts";
import classes from "./Detail.module.scss";

interface IDetailProps {
  data: IPokemonData;
  onClick: () => void;
}

interface IDetailState {
  description: string;
}

class Detail extends Component<IDetailProps, IDetailState> {
  constructor(props: IDetailProps) {
    super(props);
    this.state = {
      description: ""
    };
  }

  componentDidMount() {
    const description =
      this.props.data.description.flavor_text_entries.find(
        (item) => item.language.name === "en"
      )?.flavor_text ?? "not found description";
    this.setState({ description });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <button className={classes.button_back} onClick={this.props.onClick}>
          #back
        </button>
        <div className={classes.pokemon__wrapper}>
          <div className={classes.pokemon}>
            <div className={classes.image}>
              <img
                src={this.props.data.image}
                alt={this.props.data.pokemon.name}
              />
            </div>
            <div className={classes.information}>
              <div className={classes.information__name}>
                Name:
                <h2>{this.props.data.pokemon.name}</h2>
              </div>
              <div>
                Description:
                <p>{this.state.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
