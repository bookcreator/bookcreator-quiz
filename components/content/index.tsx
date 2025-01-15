import styles from "./index.module.css";

interface ContentProps {
  children: React.ReactNode;
}

export default function Content(props: ContentProps) {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}
