import { Nav } from "../Nav/Nav";
import styles from "./PageWapper.module.scss";

interface PageWapperProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export const PageWapper = ({ children, hideNav }: PageWapperProps) => {
  return (
    <div>
      <>{hideNav ? null : <Nav />}</>
      <>{children}</>
    </div>
  );
};
