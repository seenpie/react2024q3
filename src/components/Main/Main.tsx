import { ReactNode } from "react";
import { CardList, ICardListProps } from "../CardList/CardList.tsx";
import classes from "./Main.module.scss";
import Pagination from "../UI/Pagination/Pagination.tsx";
import { IUsePaginationProps } from "../UI/Pagination/Pagination.hooks.ts";

interface IMainProps extends ICardListProps, IUsePaginationProps {
  children?: ReactNode;
}

export function Main({
  children,
  cards,
  totalCards,
  offset,
  limit
}: IMainProps) {
  return (
    <main className={classes.main}>
      <section className={classes.content}>
        <CardList totalCards={totalCards} cards={cards} />
        <Pagination totalCards={totalCards} offset={offset} limit={limit} />
      </section>
      {children}
    </main>
  );
}
