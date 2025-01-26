import UserNameForm from "@/components/quiz/userNameForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Book Creator Quiz</h1>
        <UserNameForm />
      </main>
    </div>
  );
}
