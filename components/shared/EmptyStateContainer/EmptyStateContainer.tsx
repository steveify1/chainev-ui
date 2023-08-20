import styles from "./EmptyStateContainer.module.scss";

export interface EmptyStateContainerProps {
  message?: string;
}

export const EmptyStateContainer = (props: EmptyStateContainerProps) => {
  return (
    <div className={styles.emptyStateContainer}>
      <p>{props.message || "No data to show"}</p>
    </div>
  );
};
