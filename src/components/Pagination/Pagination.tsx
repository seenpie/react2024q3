import { FormEvent, useCallback, useEffect, useState } from "react";
import Input from "../Input/Input.tsx";
import classes from "./Pagination.module.scss";
import {
  calculateCurrentPage,
  checkInputValue,
  collectPaginationItems,
  countTotalPages
} from "../../utils/pagination.utils.ts";

interface IPaginationProps {
  totalCards: number;
  offset: number;
  limit: number;
  onClick: (pageNumber: number) => void;
}

function Pagination({ totalCards, offset, limit, onClick }: IPaginationProps) {
  const [totalPage] = useState(() => countTotalPages(totalCards, limit));
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationItems, setPaginationItems] = useState<(number | string)[]>();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const page: number = calculateCurrentPage(
      totalCards,
      totalPage,
      limit,
      offset
    );
    setCurrentPage(page);

    const paginationItems = collectPaginationItems(page, totalPage);
    setPaginationItems(paginationItems);
  }, [totalCards, offset, limit, totalPage]);

  const handleClick = useCallback((): void => {
    const checkedInputValue: number | null = checkInputValue(
      Number(inputValue),
      totalPage
    );
    if (checkedInputValue) {
      onClick(checkedInputValue);
    }
  }, [inputValue, totalPage, onClick]);

  const handleInput = useCallback((e: FormEvent): void => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pagination}>
        {paginationItems?.map((item, id) => {
          if (typeof item === "string") {
            return (
              <Input
                key={id}
                className={classes.pagination__input}
                value={inputValue}
                onInput={handleInput}
                onClick={handleClick}
                placeholder={`${currentPage}`}
              />
            );
          }
          return (
            <button
              key={id}
              className={classes.pagination__button}
              onClick={() => onClick(item)}
              disabled={item === currentPage}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
