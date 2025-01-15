import styles from "./index.module.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps) {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}
