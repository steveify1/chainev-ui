import { ClipLoader, PropagateLoader, PulseLoader } from "react-spinners";
import styles from "./Loader.module.scss";

export interface LoaderProps {
  message?: string;
  className?: string;
  size?: number;
}

export const Loader = (props: LoaderProps) => {
  return (
    <div className={`${styles.loaderContainer} ${props.className}`}>
      <PulseLoader
        color="#007DFC"
        loading={true}
        className={`${styles.loader}`}
        size={props.size || 10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {props.message && <p>{props.message}</p>}
    </div>
  );
};
