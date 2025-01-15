import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import styles from "./layout.module.css";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Book Creator Quiz",
  description: "Test your knowledge on some stuff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
