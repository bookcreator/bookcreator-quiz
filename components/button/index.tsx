import Link from "next/link";
import SvgIcon from "../svg-icon";
import cx from "classnames";
import { IconType } from "@/types/common";
import styles from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  large?: boolean;
  small?: boolean;
  href?: string;
  style?: React.CSSProperties;
  text?: boolean;
  icon?: IconType;
  secondary?: boolean;
  type?: string;
  buttonClassName?: string;
}

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    onClick,
    large,
    small,
    href,
    style,
    text,
    icon,
    secondary,
    buttonClassName,
  } = props;

  const className = cx(
    styles.button,
    {
      [styles.large]: large,
      [styles.small]: small,
      [styles.text]: text,
      [styles.secondary]: secondary,
    },
    buttonClassName
  );

  const sharedProps = {
    className,
    onClick,
    style,
    disabled,
  };

  const content = (
    <>
      {icon && <SvgIcon icon={icon} className={styles.icon} />}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return <button {...sharedProps}>{content}</button>;
}
