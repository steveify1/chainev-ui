import { ButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";

export const Button = (props: ButtonProps) => {
  const resolveTypeStyle = () => {
    switch (props.type) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;

      default:
        return styles.primary;
    }
  };

  const resolveShapeStyle = () => {
    switch (props.shape) {
      case "curved":
        return styles.curved;
      case "oval":
        return styles.oval;
      case "square":
        return styles.square;

      default:
        return styles.oval;
    }
  };

  const resolveSizeStyle = () => {
    switch (props.size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;

      default:
        return styles.small;
    }
  };

  const handleClick = (e: any) => {
    if (!props.disabled && typeof props.onClick === "function") {
      props.onClick(e);
    }
  };

  return (
    <button
      className={`
        ${styles.button} ${resolveTypeStyle()} 
        ${resolveShapeStyle()} ${resolveSizeStyle()} ${props.className}`}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
