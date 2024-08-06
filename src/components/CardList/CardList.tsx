import { IResource } from "@/state/interfaces.ts";
import Card from "../Card/Card.tsx";
import classes from "./CardList.module.scss";

export interface ICardListProps {
  totalCards: number;
  cards: IResource[];
}

export function CardList({ cards, totalCards }: ICardListProps) {
  return (
    <div className={classes.wrapper}>
      {cards.length ? (
        <>
          <section className={classes.text}>
            <h2>total: {totalCards}</h2>
          </section>
          <section className={classes.cards}>
            {cards.map((card, i) => (
              <Card key={i} name={card.name} />
            ))}
          </section>
        </>
      ) : (
        <span>not results</span>
      )}
    </div>
  );
}
