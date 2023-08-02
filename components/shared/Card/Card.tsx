import styles from "./Card.module.scss";

export interface CardProps {
  children?: React.ReactNode;
}

export const Card = (props: CardProps) => {
  return <div className={styles.card}>{props.children}</div>;
};
