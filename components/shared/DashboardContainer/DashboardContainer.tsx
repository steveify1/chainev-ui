import { Container } from "../Container/Container";
import styles from "./DashboardContainer.module.scss";
import { PageWapper } from "../PageWrapper/PageWapper";
import { SideBar } from "../SideBar/SideBar";

interface DashboardContainerProps {
  children: any;
  title?: string;
}

export const DashboardContainer = (props: DashboardContainerProps) => {
  return (
    <PageWapper>
      <div className={styles.dashboardContainer}>
        <SideBar />

        <div className={styles.dashboardContainerInner}>
          <Container>
            {props.title ? (
              <h1 className={styles.pageTitle}>Dashboard</h1>
            ) : null}
            {props.children}
          </Container>
        </div>
      </div>
    </PageWapper>
  );
};
