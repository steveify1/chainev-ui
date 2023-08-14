import styles from './Container.module.scss';

export interface ContainerProps {
  children?: React.ReactNode;
}

export const Container = (props: ContainerProps) => {

  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}