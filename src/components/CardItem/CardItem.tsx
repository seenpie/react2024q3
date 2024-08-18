import { ParsedFormData } from "@/models";
import classes from "./CardItem.module.css";

type CardItemProps = {
  card: ParsedFormData;
};

export const CardItem = ({ card }: CardItemProps) => {
  return (
    <div className={classes.card}>
      <span>name: {card.name}</span>
      <span>age: {card.age}</span>
      <span>gender: {card.gender}</span>
      <span>email: {card.email}</span>
      <span>password: {card.password}</span>
      <span>confirm password: {card.confirmPassword}</span>
      <span>accept terms: {card.acceptTerms.valueOf().toString()}</span>
      <span>country: {card.country}</span>
      <div className={classes.attachment}>
        attachment:
        <img src={card.attachment} />
      </div>
    </div>
  );
};
