import { useMemo } from "react";
import {
  calculateCurrentPage,
  collectPaginationItems,
  countTotalPages
} from "../../../utils/pagination.utils.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../state";

export function usePagination() {
  const pageData = useSelector((state: RootState) => state.pageData.pageParams);

  const { limit, offset, totalItems: totalCards } = pageData;

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

  return { totalPage, currentPage, paginationItems };
}
