import { Component } from "react";
import classes from "./Card.module.scss";

interface ICardProps {
  name: string;
  onClick?: () => void;
  className?: string;
}

class Card extends Component<ICardProps, object> {
  constructor(props: ICardProps) {
    super(props);
  }

  render() {
    const { onClick, className } = this.props;
    return (
      <div className={`${classes.card} ${className}`} onClick={onClick}>
        {this.props.name}
      </div>
    );
  }
}

export default Card;
