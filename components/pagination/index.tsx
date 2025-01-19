import React from "react";
import styles from "./index.module.css";
import Button from "@/components/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div data-testid="pagination" className={styles.pagination}>
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
