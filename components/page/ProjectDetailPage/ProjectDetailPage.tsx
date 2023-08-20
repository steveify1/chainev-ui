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
import { Loader } from "../../shared/Loader/Loader";
import { EmptyStateContainer } from "../../shared/EmptyStateContainer/EmptyStateContainer";

export const ProjectDetailPage = () => {
  const router = useRouter();
  const [project, setProject] = useState<any>();
  const [eventCount, setEventCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [eventFilter, setEventFilter] = useState<any>({});
  const [showProjectEnvForm, setShowProjectEnvForm] = useState<boolean>(false);
  const [lockModal, setLockModal] = useState<boolean>(false);

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
      // toast(error.message, { type: "error" });
    }

    setIsLoading(false);
  };

  const fetchProjectEventCount = async () => {
    try {
      const response = await api.getProjectEventCount(
        router.query?.id as string
      );
      setEventCount(response.data.count);
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };

  const handleProjectEnvCreationSuccess = (data: any) => {
    setShowProjectEnvForm(false);

    setProject((prev: any) => ({
      ...prev,
      environments: [...prev.environments, data],
    }));
  };

  useEffect(() => {
    if (project) {
      fetchProjectEventCount();
    }
  }, [project]);

  useEffect(() => {
    if (router.query.id) {
      fetchProject();
    }
  }, [router.query.id]);

  return (
    <DashboardContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Section>
            <header className={styles.projectHeader}>
              <h3 className={styles.sectionTitle}>{project?.name}</h3>

              <div>
                <Button
                  className={styles.button}
                  size="small"
                  onClick={() => setShowProjectEnvForm(true)}
                  disabled={project?.environments?.length == 2}
                >
                  Add Environment
                </Button>
                <Modal
                  title="Create Project"
                  show={showProjectEnvForm}
                  lock={lockModal}
                  onCloseTriggerClick={() => setShowProjectEnvForm(false)}
                >
                  {showProjectEnvForm ? (
                    <AddProjectEnvironmentForm
                      projectId={project?.uuid}
                      existingEnvironmentNetworkTypes={project?.environments.map(
                        (env: any) => env.networkType
                      )}
                      onSuccess={handleProjectEnvCreationSuccess}
                      onProcessingStateChange={setLockModal}
                    />
                  ) : null}
                </Modal>
              </div>
            </header>
          </Section>
          {!project && (
            <EmptyStateContainer message="We couldn't find this project." />
          )}
          <Section>
            <Card className={styles.projectStatsCard}>
              <ul className={styles.projectStats}>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Date Created</h5>
                  {project && (
                    <p className={styles.projectStatValue}>
                      {new Date(project?.createdAt).toDateString()}
                    </p>
                  )}
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Environments</h5>
                  <p className={styles.projectStatValue}>
                    {project?.environments?.length}
                  </p>
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Events Listeners</h5>
                  <p className={styles.projectStatValue}>
                    {project?.eventNames?.length}
                  </p>
                </li>
                <li className={styles.projectStat}>
                  <h5 className={styles.projectStatName}>Total Events</h5>
                  {project && (
                    <p className={styles.projectStatValue}>
                      {eventCount === null ? (
                        <small>
                          <i>Loading...</i>
                        </small>
                      ) : (
                        eventCount
                      )}
                    </p>
                  )}
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
              {project ? (
                <Events {...eventFilter} projectId={router.query.id} />
              ) : (
                <EmptyStateContainer />
              )}
            </div>
          </Section>
        </div>
      )}
    </DashboardContainer>
  );
};
