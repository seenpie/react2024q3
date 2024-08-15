import { FormData } from "@/models";

type CardItemProps = {
  card: FormData;
};

export const CardItem = ({ card }: CardItemProps) => {
  return (
    <div>
      <span>name: {card.name}</span>
      <span>email: {card.email}</span>
      <span>password: {card.password}</span>
      <span>confirm password: {card.confirmPassword}</span>
      <span>accept terms: {card.acceptTerms}</span>
      {/*<span>name: {card.picture}</span>*/}
    </div>
  );
};
