import { Nav } from "../Nav/Nav";
import styles from "./PageWapper.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PageWapperProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const PageWapper = ({ children, hideNav }: PageWapperProps) => {
  return (
    <div>
      <>{hideNav ? null : <Nav />}</>
      <>{children}</>
      <ToastContainer progressClassName={styles.toastContainerProgress} />
    </div>
  );
};
