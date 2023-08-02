export interface ButtonProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  size?: "small" | "large";
  shape?: "curved" | "oval" | "square";
  className?: string;
}
export interface NavAuthButtonProps
  extends Exclude<React.HTMLProps<ButtonProps>, "type"> {}
