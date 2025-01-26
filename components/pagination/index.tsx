import cx from "classnames";
import Button from "@/components/button";
import styles from "./index.module.css";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (value: number) => void;
  totalItems: number;
}

const MAX_LIMIT = 5;

export default function Pagination(props: PaginationProps) {
  const { currentPage, itemsPerPage, onPageChange, totalItems } = props;

  const totalPageNumber = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage < 1) return;
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage > totalPageNumber) return;
    onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    if (totalPageNumber <= 5) {
      return Array.from({ length: totalPageNumber }).map((_, i) => i + 1);
    }

    return Array.from({ length: MAX_LIMIT }).map((_, i) => {
      if (currentPage <= 2) {
        return i + 1;
      }

      if (currentPage >= totalPageNumber - 1) {
        return totalPageNumber - MAX_LIMIT + i + 1;
      }

      return i + currentPage - Math.floor((MAX_LIMIT - 1) / 2);
    });
  };

  if (totalPageNumber <= 1) return null;

  return (
    <nav aria-label="pagination" className={styles.pagination}>
      <Button
        disabled={currentPage === 1}
        onClick={handlePrevious}
        small
        text
        type="button"
      >
        Prev
      </Button>
      <ul className={styles.paginationList}>
        {renderPageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <Button
              small
              text
              type="button"
              onClick={() => onPageChange(pageNumber)}
              buttonClassName={cx({
                [styles.selected]: currentPage === pageNumber,
              })}
            >
              {pageNumber}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        disabled={currentPage === totalPageNumber}
        onClick={handleNext}
        small
        text
        type="button"
      >
        Next
      </Button>
    </nav>
  );
}
