import { useEffect, useState } from "react";
import styles from "./Form.module.scss";

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
}

interface InputProps {}

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  useToggle?: boolean;
}

export const FormField = (props: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      {props.children}
    </div>
  );
};

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={`${styles.input} ${props.className}`} />;
};

export const UploadInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <Input
      {...props}
      className={`${styles.input} ${props.className}`}
      type="file"
    />
  );
};

export const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.passwordInputContainer}>
      <Input
        {...props}
        className={`${styles.input} ${props.className}`}
        type={showPassword ? "text" : "password"}
      />

      {props.useToggle && (
        <div
          className={styles.passwordInputToggler}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </div>
      )}
    </div>
  );
};

export const SelectInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <select
      {...props}
      className={`${styles.input} ${styles.select} ${props.className}`}
    >
      {props.children}
    </select>
  );
};

export const SelectOptionInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <option
      {...props}
      className={`${styles.input} ${styles.selectOption} ${props.className}`}
    >
      {props.children}
    </option>
  );
};
