import styles from "./HomePage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { Card } from "../../shared/Card/Card";
import { Link } from "../../shared/Link/Link";
import { DashboardContainer } from "../../shared/DashboardContainer/DashboardContainer";
import { useEffect, useState } from "react";
import { Project } from "../../shared/Project/Project";
import { Section } from "../../shared/Section/Section";
import { Events } from "../../shared/Events/Events";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import { Scroller } from "../../shared/Scroller/Scroller";
import { Loader } from "../../shared/Loader/Loader";
import { EmptyStateContainer } from "../../shared/EmptyStateContainer/EmptyStateContainer";

export const HomePage = () => {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecentProjects = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await api.getProjects({ limit: 3 });
      const { records } = response.data;
      setRecentProjects(records);
    } catch (error: any) {
      toast(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  return (
    <DashboardContainer title="Dashboard">
      <Section>
        <Card>
          <header className={styles.recentProjectsHeader}>
            <h3 className={styles.sectionTitle}>Latest Projects</h3>
            <Link href={`/projects`}>
              <Button className={styles.button} size="small" type="secondary">
                See all
              </Button>
            </Link>
          </header>

          {isLoading ? (
            <Loader />
          ) : (
            <Scroller>
              {recentProjects.length ? (
                <div className={styles.projects}>
                  {recentProjects.map((project, i) => (
                    <Project
                      key={`recent-project-${i}`}
                      className={styles.project}
                      project={project}
                    />
                  ))}
                </div>
              ) : (
                <EmptyStateContainer message="You don't have a project yet." />
              )}
            </Scroller>
          )}
        </Card>
      </Section>

      <Section>
        <Card>
          <h3 className={styles.sectionTitle}>Recent Events</h3>

          <div className={styles.events}>
            <Events />
          </div>
        </Card>
      </Section>
    </DashboardContainer>
  );
};
