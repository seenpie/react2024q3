import Card from "../Card/Card.tsx";
import classes from "./CardList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../state";

export function CardList() {
  const items = useSelector((state: RootState) => state.pageData.itemList);
  const pageParams = useSelector(
    (state: RootState) => state.pageData.pageParams
  );

  if (!items) return <span>not results</span>;

  return (
    <div className={classes.wrapper}>
      <section className={classes.text}>
        <h2>total: {pageParams.totalItems}</h2>
      </section>
      <section className={classes.cards}>
        {items.map((card, i) => (
          <Card key={i} name={card.name} />
        ))}
      </section>
    </div>
  );
}
