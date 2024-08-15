import { FormData } from "@/models";
import { CardItem } from "@/components/CardItem/CardItem.tsx";

type CardListProps = {
  cards: FormData[];
  label: "form hook" | "form uncontrolled";
};

export const CardList = ({ cards, label }: CardListProps) => {
  if (!cards.length) {
    return <div>{label} has no data</div>;
  }

  return (
    <div>
      {cards.map((card) => (
        <CardItem card={card} />
      ))}
    </div>
  );
};
