import { ReactNode } from "react";
import { CardList } from "../CardList/CardList.tsx";
import classes from "./Main.module.scss";
import Pagination from "../UI/Pagination/Pagination.tsx";
import { useGenerateRootPage } from "@/hooks/useGenerateRootPage.ts";
import { getPokemonList } from "@/services";

interface IMainProps {
  children?: ReactNode;
  page: string;
  search: string;
}

const itemsPageLimit = 40;

export async function Main({ page, search, children }: IMainProps) {
  let limit = itemsPageLimit;
  let offset = page ? itemsPageLimit * Number(page) - itemsPageLimit : 0;

  if (search) {
    limit = 5000;
    offset = 0;
  }

  const data = await getPokemonList(offset, limit);

  const { cards, totalCards, pageOffset } = useGenerateRootPage({
    offset,
    search: search ? (search as string) : search,
    page: page ? (page as string) : page,
    itemsPageLimit,
    data
  });

  return (
    <main className={classes.main}>
      <section className={classes.content}>
        <CardList totalCards={totalCards} cards={cards} />
        <Pagination
          totalCards={totalCards}
          offset={pageOffset}
          limit={itemsPageLimit}
        />
      </section>
      {children}
    </main>
  );
}
