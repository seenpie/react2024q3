import classes from "./Card.module.scss";

interface ICardProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

function Card({ name, onClick, className }: ICardProps) {
  return (
    <div className={`${classes.card} ${className}`} onClick={onClick}>
      {name}
    </div>
  );
}

export default Card;
