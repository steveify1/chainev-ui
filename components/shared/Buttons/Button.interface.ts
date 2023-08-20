export interface ButtonProps {
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  size?: "small" | "large";
  shape?: "curved" | "oval" | "square";
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}
export interface NavAuthButtonProps
  extends Exclude<React.HTMLProps<ButtonProps>, "type"> {}
