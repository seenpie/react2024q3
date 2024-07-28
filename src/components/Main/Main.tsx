import { ReactNode } from "react";
import Loader from "../Loader/Loader.tsx";
import { CardList } from "../CardList/CardList.tsx";
import classes from "./Main.module.scss";
import Pagination from "../UI/Pagination/Pagination.tsx";
import { useMain } from "./Main.hooks.ts";

interface IMainProps {
  children: ReactNode;
}

export function Main({ children }: IMainProps) {
  const { isFetching, handlePaginationClick } = useMain();

  if (isFetching) return <Loader />;

  return (
    <main className={classes.main}>
      <section className={classes.content}>
        <CardList />
        <Pagination onClick={handlePaginationClick} />
      </section>
      {children}
    </main>
  );
}
