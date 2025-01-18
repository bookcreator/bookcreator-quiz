"use client";
import type { Metadata } from "next";
import Header from "../../components/header";
import Page from "../../components/page";
import Content from "../../components/content";

// export const metadata: Metadata = {
//   title: "Book Creator Quiz",
//   description: "Test your knowledge on some stuff",
// };

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page>
      <Header title="Book Creator" subtitle="Quiz" />
      <Content>{children}</Content>
    </Page>
  );
}
