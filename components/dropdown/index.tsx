import styles from "./index.module.css";
import SvgIcon from "../svg-icon";
import cx from "classnames";

interface DropdownProps<T> {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: T;
  values: T[];
}

export default function Dropdown<T extends number | string>(
  props: DropdownProps<T>
) {
  const { onChange, defaultValue, values } = props;

  return (
    <select
      className={styles.dropdown}
      onChange={onChange}
      value={defaultValue}
    >
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
