import React from "react";
import styles from "./index.module.css";

interface InputProps {
  text: string;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  text,
  handleTextChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleTextChange}
      className={styles.input}
    />
  );
};

export default Input;
