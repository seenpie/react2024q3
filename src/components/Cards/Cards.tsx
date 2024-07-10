import Card from "../Card/Card.tsx";
import { PokeAPI } from "pokeapi-types";
import classes from "./Cards.module.scss";

interface ICardsProps {
  readonly cards: PokeAPI.NamedAPIResource[];
  readonly totalCards: number;
  readonly cardsOnPage: number;
  readonly onClick: (name: string) => void;
}

function Cards({ cards, totalCards, onClick }: ICardsProps) {
  return (
    <div className={classes.wrapper}>
      <section className={classes.text}>
        <h2>total: {totalCards}</h2>
      </section>
      <section className={classes.cards}>
        {cards.map((card, i) => (
          <Card key={i} name={card.name} onClick={() => onClick(card.name)} />
        ))}
      </section>
    </div>
  );
}

export default Cards;
