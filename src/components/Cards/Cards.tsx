import { Component } from "react";
import Card from "../Card/Card.tsx";
import { PokeAPI } from "pokeapi-types";
import classes from "./Cards.module.scss";

interface ICardsProps {
  readonly cards: PokeAPI.NamedAPIResource[];
  readonly totalCards: number;
  readonly cardsOnPage: number;
  readonly onClick: (name: string) => void;
}

class Cards extends Component<ICardsProps, object> {
  constructor(props: ICardsProps) {
    super(props);
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <section className={classes.text}>
          <h2>total: {this.props.totalCards}</h2>
        </section>
        <section className={classes.cards}>
          {this.props.cards.map((card, i) => (
            <Card
              key={i}
              name={card.name}
              onClick={() => this.props.onClick(card.name)}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Cards;
