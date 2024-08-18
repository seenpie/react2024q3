import { FormType, ParsedFormData } from "@/models";
import { CardItem } from "@/components/CardItem/CardItem.tsx";
import classes from "./CardList.module.css";

type CardListProps = {
  cards: ParsedFormData[];
  label: FormType;
};

export const CardList = ({ cards, label }: CardListProps) => {
  if (!cards.length) {
    return <div>{label} has no data</div>;
  }

  return (
    <div className={classes.cardList}>
      {cards.map((card, index) => (
        <CardItem key={card.attachment + index} card={card} />
      ))}
    </div>
  );
};
