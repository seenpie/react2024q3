import {
  calculateCurrentPage,
  checkInputValue,
  collectPaginationItems,
  countTotalPages
} from "../../utils/pagination.utils.ts";

describe("Pagination Helper Functions", () => {
  describe("countTotalPages", () => {
    it("should return the correct number of total pages", () => {
      expect(countTotalPages(50, 10)).toBe(5);
      expect(countTotalPages(55, 10)).toBe(6);
      expect(countTotalPages(0, 10)).toBe(0);
      expect(countTotalPages(10, 10)).toBe(1);
    });
  });

  describe("calculateCurrentPage", () => {
    it("should calculate the current page correctly", () => {
      expect(calculateCurrentPage(50, 5, 10, 20)).toBe(3);
      expect(calculateCurrentPage(50, 5, 10, 0)).toBe(1);
      expect(calculateCurrentPage(50, 5, 10, 40)).toBe(5);
      expect(calculateCurrentPage(50, 5, 10, 50)).toBe(5);
    });
  });

  describe("collectPaginationItems", () => {
    it("should collect pagination items correctly", () => {
      expect(collectPaginationItems(1, 5)).toEqual([1, "search", 2, 5]);
      expect(collectPaginationItems(3, 5)).toEqual([1, 2, "search", 4, 5]);
      expect(collectPaginationItems(5, 5)).toEqual([1, 4, "search", 5]);
      expect(collectPaginationItems(1, 1)).toEqual([]);
      expect(collectPaginationItems(2, 2)).toEqual([1, 1, "search", 2]);
    });
  });

  describe("checkInputValue", () => {
    it("should return the valid input value within the total page range", () => {
      expect(checkInputValue(3, 5)).toBe(3);
      expect(checkInputValue(0, 5)).toBeNull();
      expect(checkInputValue(6, 5)).toBeNull();
      expect(checkInputValue(1, 5)).toBe(1);
      expect(checkInputValue(NaN, 5)).toBeNull();
    });
  });
});
