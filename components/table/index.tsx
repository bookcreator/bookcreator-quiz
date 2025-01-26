import { ReactElement } from "react";
import cx from "classnames";
import styles from "./index.module.css";

export interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (item: T) => ReactElement;
}

interface TableProps<T> {
  columns: Array<ColumnProps<T>>;
  data?: T[];
}

export default function Table<T>(props: TableProps<T>) {
  const { columns, data } = props;

  return (
    <div className={styles.table}>
      <div className={cx(styles.row, styles.rowHead)}>
        {columns.map((column) => (
          <div className={cx(styles.col, styles.colHead)} key={column.key}>
            {column.title}
          </div>
        ))}
      </div>
      {data?.map((item, itemIndex) => (
        <div className={styles.row} key={`row-${itemIndex}`}>
          {columns.map((column, columnIndex) => {
            const value = column.render
              ? column.render(item)
              : (item[column.key as keyof T] as string);

            return (
              <div className={styles.col} key={`cell-${columnIndex}`}>
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
