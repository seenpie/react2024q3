import { Link } from "react-router-dom";
import classes from "./Card.module.scss";
import { useSearchParams } from "react-router-dom";

interface ICardProps {
  name: string;
  className?: string;
}

function Card({ name, className }: ICardProps) {
  const [searchParams] = useSearchParams();

  const redirect = searchParams
    ? `/pokemon/${name}?${searchParams}`
    : `/pokemon/${name}`;
  return (
    <Link to={redirect} className={`${classes.card} ${className}`}>
      {name}
    </Link>
  );
}

export default Card;
