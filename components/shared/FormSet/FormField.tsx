import {
  ChangeEvent,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Form.module.scss";
import { Card } from "../Card/Card";

interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
}

interface CheckboxInputOption {
  label: string;
  value: any;
}

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  useToggle?: boolean;
}

interface NetworkTypeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  selected?: ReactEventHandler;
  existingNetworkTypes?: string[];
}

interface CheckboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: CheckboxInputOption[];
}

const networkTypes = [
  {
    name: "Testnet",
    value: "TESTNET",
    containerClassName: styles.networkTypeInputContainerTestnet,
  },
  {
    name: "Mainnet",
    value: "MAINNET",
    containerClassName: styles.networkTypeInputContainerMainnet,
  },
];

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

export const FileInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const [event, setEvent] = useState<any>(null);
  const [selected, setSelected] = useState<number>(0);

  const handleChange = (e: any) => {
    if (typeof props.onChange === "function") {
      props.onChange(e);
    }

    setEvent(e);

    if (e.target.files?.length) {
      setSelected(e.target.files?.length); // e.target.files is a FileList object.
    }
  };

  const handleReset = (_e: any) => {
    event.target.value = null;
    event.target.files = null;

    if (typeof props.onReset === "function") {
      props.onReset(event);
    }

    setSelected(0);
    setEvent(event);
  };

  return (
    <div className={styles.fileInputContainer}>
      <div className={styles.fileInputContainerInner}>
        <Input
          {...props}
          className={`${styles.input} ${props.className}`}
          type="file"
          onChange={handleChange}
        />

        <div className={styles.fileInputPlaceholder}>
          <span>{props.placeholder ? props.placeholder : "Upload file"}</span>
          <img
            src="/upload-cloud.png"
            alt="upload-cloud-icon"
            className={styles.uploadIcon}
          />
        </div>
      </div>
      {selected ? (
        <Card className={styles.fileSelectionIndicatorContainer}>
          <p>
            <img
              src="/file.png"
              alt="file-selection-removal-icon"
              className={styles.inputIcon}
            />
            <span>File loaded successfully</span>
          </p>
          <img
            src="/x.png"
            alt="file-selection-removal-icon"
            className={`${styles.inputIcon}, ${styles.fileInputResetIcon}`}
            onClick={handleReset}
          />
        </Card>
      ) : null}
    </div>
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
  props: React.InputHTMLAttributes<HTMLSelectElement>
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
  props: React.InputHTMLAttributes<HTMLOptionElement>
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

export const CheckboxInput = (props: CheckboxInputProps) => {
  const options = props.options || [];
  const [selected, setSelected] = useState<{ [T: string]: boolean }>({});

  const handleChange = (e: any) => {
    const target = e.target;

    const selectedClone = { ...selected };

    if (target.checked) {
      selectedClone[target.value] = true;
    } else {
      delete selectedClone[target.value];
    }

    setSelected(selectedClone);
    e.target.selected = Object.keys(selectedClone);

    if (typeof props.onChange === "function") {
      props.onChange(e);
    }
  };

  return (
    <div className={styles.checkboxesInputContainer}>
      <fieldset className={styles.checkboxesInputContainerInner}>
        {options.map((option, i) => (
          <label className={styles.checkboxInputContainer}>
            <Input
              key={`${props.name}-checkbox-input-option-${i}`}
              {...props}
              className={`${styles.input} ${props.className}`}
              value={option.value}
              checked={selected[option.value]}
              type="checkbox"
              onChange={handleChange}
            />
            <span className={styles.checkboxInputGeekmark}></span>
            <span className={styles.checkboxLabel}>{option.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export const NetworkTypeRadioInput = (props: NetworkTypeInputProps) => {
  const existingNetworkTypes = props.existingNetworkTypes || [];
  const [selected, setSelected] = useState<string>("");

  const handleSelection = (e: any) => {
    if (e.target.disabled) return;
    setSelected(e.target.value);

    if (typeof props.onChange === "function") {
      props.onChange(e);
    }
  };

  const isSelected = (networkType: string) => {
    return selected === networkType ? styles.neworkTypeInputActive : null;
  };

  return (
    <ul className={styles.networkTypesInputContainer}>
      {networkTypes.map((networkType, i) => {
        const isDisabled = existingNetworkTypes.includes(networkType.value);

        return (
          <li
            key={`network-type-input-container-${i}`}
            className={`${styles.networkTypeInputContainer} ${
              networkType.containerClassName
            } ${isSelected(networkType.value)}
            ${isDisabled ? styles.networkTypeInputDisabled : null}
            `}
          >
            <span>{networkType.name}</span>
            <Input
              {...props}
              className={`${styles.input} ${styles.networkTypeInput}  ${props.className}`}
              value={networkType.value}
              onClick={handleSelection}
              disabled={isDisabled}
            />
            <div className={styles.networkTypeInputIndicator}></div>
          </li>
        );
      })}
    </ul>
  );
};
