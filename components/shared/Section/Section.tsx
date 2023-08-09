import styles from "./Section.module.scss";

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = (props: SectionProps) => {
  return (
    <div className={`${styles.section} ${props.className}`}>
      {props.children}
    </div>
  );
};
