import Link from "next/link";
import SvgIcon from "../svg-icon";
import cx from "classnames";
import styles from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  large?: boolean;
  href?: string;
  style?: React.CSSProperties;
  text?: boolean;
  icon?: string;
  secondary?: boolean;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    onClick,
    large,
    href,
    style,
    text,
    icon,
    secondary,
  } = props;

  const className = cx(styles.button, {
    [styles.large]: large,
    [styles.text]: text,
    [styles.secondary]: secondary,
  });

  const sharedProps = {
    className,
    onClick,
    style,
    disabled,
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {icon ? <SvgIcon icon={icon} className={styles.icon} /> : null}
        {children}
      </Link>
    );
  }

  return <button {...sharedProps}>{children}</button>;
}
