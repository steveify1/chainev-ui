import styles from "./ProjectDetailPage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { Card } from "../../shared/Card/Card";
import { DashboardContainer } from "../../shared/DashboardContainer/DashboardContainer";
import { useEffect, useState } from "react";
import { Section } from "../../shared/Section/Section";
import { Events } from "../../shared/Events/Events";
import { useRouter } from "next/router";
import { Tabs } from "../../shared/Tabs/Tabs";

export const ProjectDetailPage = () => {
  const router = useRouter();
  const [project, setProject] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventFilter, setEventFilter] = useState<any>({});

  const updateEventFilter = (key: string, value: any) => {
    const filter = { ...eventFilter };

    if (!value) {
      delete filter[key];
    } else {
      filter[key] = value;
    }

    setEventFilter((prevValue: any) => {
      return { ...filter };
    });
  };

  const fetchProject = async () => {
    try {
      setProject({
        id: "dfdffd",
        name: "IvoryPay PG",
        numEnvironments: 2,
        numEvents: 8,
        numTestnetEvents: 6,
        numMainnetEvents: 2,
        createdAt: new Date().toDateString(),
        environments: [
          {
            id: "env-1",
            name: "TESTNET",
          },
          {
            id: "env-2",
            name: "MAINNET",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <DashboardContainer>
      <Section>
        <header className={styles.projectHeader}>
          <h3 className={styles.sectionTitle}>{project.name}</h3>
          <Button className={styles.button} size="small">
            Add Environment
          </Button>
        </header>
      </Section>

      <Section>
        <Card className={styles.projectStatsCard}>
          <ul className={styles.projectStats}>
            <li className={styles.projectStat}>
              <h5 className={styles.projectStatName}>Date Created</h5>
              <p className={styles.projectStatValue}>{project.createdAt}</p>
            </li>
            <li className={styles.projectStat}>
              <h5 className={styles.projectStatName}>Total Events</h5>
              <p className={styles.projectStatValue}>{project.numEvents}</p>
            </li>
            <li className={styles.projectStat}>
              <h5 className={styles.projectStatName}>Total Testnet Events</h5>
              <p className={styles.projectStatValue}>
                {project.numTestnetEvents}
              </p>
            </li>
            <li className={styles.projectStat}>
              <h5 className={styles.projectStatName}>Total Mainnet Events</h5>
              <p className={styles.projectStatValue}>
                {project.numMainnetEvents}
              </p>
            </li>
          </ul>
        </Card>
      </Section>

      <Section>
        <div className={styles.tabContainer}>
          <Tabs
            tabs={[
              {
                name: "All",
              },
              {
                name: "Testnet",
                value: "TESTNET",
              },
              {
                name: "Mainnet",
                value: "MAINNET",
              },
            ]}
            onChange={({ data }) =>
              updateEventFilter("networkType", data.value)
            }
          />
        </div>
      </Section>

      <Section>
        <div className={styles.events}>
          <Events {...eventFilter} projectId={router.query.id} />
        </div>
      </Section>
    </DashboardContainer>
  );
};
