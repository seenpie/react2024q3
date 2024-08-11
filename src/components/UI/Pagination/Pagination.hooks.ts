import { useMemo } from "react";
import {
  calculateCurrentPage,
  collectPaginationItems,
  countTotalPages
} from "../../../utils/pagination.utils.ts";
import { useRouter } from "next/router";

export interface IUsePaginationProps {
  offset: number;
  limit: number;
  totalCards: number;
}

export function usePagination({
  limit,
  offset,
  totalCards
}: IUsePaginationProps) {
  const router = useRouter();
  const totalPage = useMemo(
    () => countTotalPages(totalCards, limit),
    [totalCards, limit]
  );
  const currentPage = useMemo(
    () => calculateCurrentPage(totalCards, totalPage, limit, offset),
    [totalCards, totalPage, limit, offset]
  );
  const paginationItems = useMemo(
    () => collectPaginationItems(currentPage, totalPage),
    [currentPage, totalPage]
  );
  const handlePaginationClick = async (pageNumber: number) => {
    await router.replace({ query: { ...router.query, page: pageNumber } });
  };

  return { totalPage, currentPage, paginationItems, handlePaginationClick };
}
