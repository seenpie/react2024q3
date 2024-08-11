import { FormEvent, useCallback, useState } from "react";
import Input from "../Input/Input.tsx";
import classes from "./Pagination.module.scss";
import { checkInputValue } from "../../../utils/pagination.utils.ts";
import { IUsePaginationProps, usePagination } from "./Pagination.hooks.ts";

interface IPaginationProps extends IUsePaginationProps {}

function Pagination({ offset, totalCards, limit }: IPaginationProps) {
  const [inputValue, setInputValue] = useState("");
  const { totalPage, currentPage, paginationItems, handlePaginationClick } =
    usePagination({
      offset,
      limit,
      totalCards
    });

  const handleClick = useCallback(async (): Promise<void> => {
    const checkedInputValue: number | null = checkInputValue(
      Number(inputValue),
      totalPage
    );
    if (checkedInputValue) {
      await handlePaginationClick(checkedInputValue);
    }
  }, [inputValue, totalPage, handlePaginationClick]);

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
                onChange={handleInput}
                onClick={handleClick}
                placeholder={`${currentPage}`}
              />
            );
          }
          return (
            <button
              key={id}
              className={classes.pagination__button}
              onClick={() => handlePaginationClick(item)}
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
