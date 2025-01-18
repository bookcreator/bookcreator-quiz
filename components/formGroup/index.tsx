import cx from "classnames";
import styles from "./index.module.css";

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  error?: string;
  htmlFor?: string;
  isLabelHidden?: boolean;
  label: string;
  required?: boolean;
}

export default function FormGroup(props: FormGroupProps) {
  const {
    children,
    className,
    error,
    htmlFor,
    isLabelHidden,
    label,
    required,
  } = props;

  return (
    <div className={cx(styles.group, className)}>
      <label
        className={cx(styles.label, { "sr-only": isLabelHidden })}
        htmlFor={htmlFor}
      >
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
