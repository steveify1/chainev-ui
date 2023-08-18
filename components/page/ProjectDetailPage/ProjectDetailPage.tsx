import styles from "./ProjectDetailPage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { Card } from "../../shared/Card/Card";
import { DashboardContainer } from "../../shared/DashboardContainer/DashboardContainer";
import { useEffect, useState } from "react";
import { Section } from "../../shared/Section/Section";
import { Events } from "../../shared/Events/Events";
import { useRouter } from "next/router";
import { Tabs } from "../../shared/Tabs/Tabs";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import { Modal } from "../../shared/Modal/Modal";
import { AddProjectEnvironmentForm } from "../../shared/AddProjectEnvironmentForm/AddProjectEnvironmentForm";

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

    setEventFilter(filter);
  };

  const fetchProject = async () => {
    try {
      const response = await api.getProject(router.query?.id as string);
      setProject(response.data);
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (router.query.id) {
      fetchProject();
    }
  }, [router.query.id]);

  return (
    <DashboardContainer>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div>
          <Section>
            <header className={styles.projectHeader}>
              <h3 className={styles.sectionTitle}>{project?.name}</h3>
              {project.environments.length == 2 ? (
                <Modal
                  title="Create Project"
                  trigger={
                    <Button className={styles.button} size="small">
                      Add Environment
                    </Button>
                  }
                >
                  <AddProjectEnvironmentForm
                    projectId={project.uuid}
                    existingEnvironmentNetworkTypes={project.environments.map(
                      (env: any) => env.networkType
                    )}
                  />
                </Modal>
              ) : null}
            </header>
          </Section>

          <Section>
            <Card className={styles.projectStatsCard}>
              <ul className={styles.projectStats}>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Date Created</h5>
                  <p className={styles.projectStatValue}>
                    {new Date(project.createdAt).toDateString()}
                  </p>
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Environments</h5>
                  <p className={styles.projectStatValue}>
                    {project.environments.length}
                  </p>
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Events Listeners</h5>
                  <p className={styles.projectStatValue}>
                    {project.eventNames.length}
                  </p>
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Total Events</h5>
                  <p className={styles.projectStatValue}>
                    {project.numMainnetEvents || 0}
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
        </div>
      )}
    </DashboardContainer>
  );
};
