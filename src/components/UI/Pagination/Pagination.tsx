import { FormEvent, useCallback, useState } from "react";
import Input from "../Input/Input.tsx";
import classes from "./Pagination.module.scss";
import { checkInputValue } from "../../../utils/pagination.utils.ts";
import { usePagination } from "./Pagination.hooks.ts";

interface IPaginationProps {
  onClick: (pageNumber: number) => void;
}

function Pagination({ onClick }: IPaginationProps) {
  const [inputValue, setInputValue] = useState("");
  const { totalPage, currentPage, paginationItems } = usePagination();

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
