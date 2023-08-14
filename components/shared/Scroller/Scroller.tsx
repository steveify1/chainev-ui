import styles from "./Scroller.module.scss";

export interface ScrollerProps {
  children?: React.ReactNode;
  maxHeight?: number | string;
  className?: string;
}

export const Scroller = (props: ScrollerProps) => {
  return (
    <div
      className={`${styles.scroller} ${props.className}`}
      style={{ maxHeight: props.maxHeight || "100%" }}
    >
      {props.children}
    </div>
  );
};
