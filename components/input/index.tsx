import cx from "classnames";
import styles from "./index.module.css";
import { InputElementType, TextareaElementType } from "@/types/form";

interface CommonProps {
  className?: string;
  large?: boolean;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  variant: "input" | "textarea";
}

type InputFieldType =
  | (InputElementType & { variant: "input" })
  | (TextareaElementType & { variant: "textarea" });

type InputProps = CommonProps & InputFieldType;

export default function Input(props: InputProps) {
  const { className, large, ref, variant, ...rest } = props;
  const classes = cx(styles.input, { [styles.large]: large }, className);

  return (
    <>
      {variant === "input" && (
        <input
          className={classes}
          ref={ref as React.Ref<HTMLInputElement>}
          {...(rest as InputElementType)}
        />
      )}
      {variant === "textarea" && (
        <textarea
          className={classes}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          {...(rest as TextareaElementType)}
        />
      )}
    </>
  );
}
