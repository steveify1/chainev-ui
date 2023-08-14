import { Container } from "../Container/Container";
import styles from "./DashboardContainer.module.scss";
import { PageWapper } from "../PageWrapper/PageWapper";
import { SideBar } from "../SideBar/SideBar";
import { Scroller } from "../Scroller/Scroller";
import { useEffect, useState } from "react";
import { AuthContext } from "../../../utils/context";
import { useRouter } from "next/router";
import { navigator } from "../../../utils/navigator.utils";

interface DashboardContainerProps {
  children: any;
  title?: string;
}

export const DashboardContainer = (props: DashboardContainerProps) => {
  const [authState, setAuthState] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const auth = navigator.localStorage.get("auth");

    if (!auth) {
      router.push("/login");
    } else {
      setAuthState(JSON.parse(auth));
    }
  }, []);

  return authState ? (
    <AuthContext.Provider value={authState}>
      <PageWapper>
        <div className={styles.dashboardContainer}>
          <SideBar />

          <Scroller
            maxHeight={"100vh"}
            className={styles.dashboardContainerScroller}
          >
            <div className={styles.dashboardContainerInner}>
              <Container>
                {props.title ? (
                  <h1 className={styles.pageTitle}>{props.title}</h1>
                ) : null}
                {props.children}
              </Container>
            </div>
          </Scroller>
        </div>
      </PageWapper>
    </AuthContext.Provider>
  ) : null;
};
