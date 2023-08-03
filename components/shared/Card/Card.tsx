import styles from "./Card.module.scss";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = (props: CardProps) => {
  return (
    <div className={`${styles.card} ${props.className}`}>{props.children}</div>
  );
};
