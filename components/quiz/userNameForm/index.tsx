"use client";

import { useContext, useState } from "react";
import { InputChangeType } from "@/types/form";
import { QuizContext } from "@/context/quiz";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import FormGroup from "@/components/formGroup";
import Input from "@/components/input";
import styles from "./index.module.css";

export default function UserNameForm() {
  const { setUserName } = useContext(QuizContext);

  const [localUserName, setLocalUserName] = useState("");
  const [validationError, setValidationError] = useState("");

  const router = useRouter();

  const handleChange = (e: InputChangeType) => {
    const value = e.target.value;

    if (value.trim()) {
      setValidationError("");
    }

    setLocalUserName(value);
  };

  const handleClick = () => {
    if (!localUserName.trim()) {
      setValidationError("Enter your name");
      return;
    }

    setUserName(localUserName);
    router.push("/quiz/question/1");
  };

  return (
    <div className={styles.container}>
      <FormGroup label="Enter your name" isLabelHidden error={validationError}>
        <Input
          large
          onChange={handleChange}
          placeholder="Enter your name"
          variant="input"
        />
      </FormGroup>
      <Button
        buttonClassName={styles.startButton}
        large
        onClick={handleClick}
        type="button"
      >
        Start
      </Button>
    </div>
  );
}
