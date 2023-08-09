import { Container } from "../Container/Container";
import styles from "./Dashboard.module.scss";
import { PageWapper } from "../PageWrapper/PageWapper";
import { SideBar } from "../SideBar/SideBar";

interface DashboardProps {
  children: any;
}

export const Dashboard = (props: DashboardProps) => {
  return (
    <PageWapper>
      <div className={styles.dashboard}>
        <SideBar />

        <div className={styles.dashboardInner}>
          <Container>{props.children}</Container>
        </div>
      </div>
    </PageWapper>
  );
};
