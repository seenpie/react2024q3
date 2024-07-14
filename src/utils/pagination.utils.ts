export const countTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

export const calculateCurrentPage = (
  totalCards: number,
  totalPage: number,
  limit: number,
  offset: number
): number => {
  if (totalCards - offset < limit) {
    return totalPage;
  } else {
    let currentOffset = totalCards;
    while (currentOffset > offset) {
      currentOffset -= limit;
      totalPage -= 1;
    }
    return totalPage + 1;
  }
};

export const collectPaginationItems = (
  currentPage: number,
  totalPage: number
): (number | string)[] => {
  if (!totalPage || totalPage === 1) {
    return [];
  }

  if (currentPage === totalPage) {
    return [1, currentPage - 1, "search", totalPage];
  }

  if (currentPage === 1) {
    return [1, "search", currentPage + 1, totalPage];
  }

  return [1, currentPage - 1, "search", currentPage + 1, totalPage];
};

export const checkInputValue = (
  value: number | typeof NaN,
  totalPage: number
): number | null => {
  if (value <= totalPage && value >= 1) {
    return Number(value.toFixed());
  }
  return null;
};
