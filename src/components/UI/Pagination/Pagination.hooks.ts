import { useMemo } from "react";
import {
  calculateCurrentPage,
  collectPaginationItems,
  countTotalPages
} from "@/utils/pagination.utils.ts";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
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
    const search = searchParams && searchParams.get("search");
    const pokemon = searchParams && searchParams.get("pokemon");
    const newQuery = new URLSearchParams({
      page: `${pageNumber}`,
      ...(search && { search }),
      ...(pokemon && { pokemon })
    }).toString();
    router.push(`?${newQuery}`);
  };

  return { totalPage, currentPage, paginationItems, handlePaginationClick };
}
