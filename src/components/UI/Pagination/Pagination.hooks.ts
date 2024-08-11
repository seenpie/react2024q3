import { useMemo } from "react";
import {
  calculateCurrentPage,
  collectPaginationItems,
  countTotalPages
} from "../../../utils/pagination.utils.ts";
import { useSearchParams } from "@remix-run/react";

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
  const [searchParams, setSearchParams] = useSearchParams();
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
  const handlePaginationClick = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(pageNumber));
    setSearchParams(newSearchParams);
  };

  return { totalPage, currentPage, paginationItems, handlePaginationClick };
}
