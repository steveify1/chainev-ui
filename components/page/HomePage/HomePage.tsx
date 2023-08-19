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

export const HomePage = () => {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  const fetchRecentProjects = async () => {
    try {
      const response = await api.getProjects({ limit: 3 });
      const { records } = response.data;
      setRecentProjects(records);
    } catch (error: any) {
      toast(error.message);
    }
  };

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  return (
    <DashboardContainer title="Dashboard">
      <Section>
        <Card>
          <header className={styles.recentProjectsHeader}>
            <h3 className={styles.sectionTitle}>Top Projects</h3>
            <Link href={`/projects`}>
              <Button className={styles.button} size="small" type="secondary">
                See all
              </Button>
            </Link>
          </header>

          <Scroller>
            <div className={styles.projects}>
              {recentProjects.map((project, i) => (
                <Project
                  key={`recent-project-${i}`}
                  className={styles.project}
                  project={project}
                />
              ))}
            </div>
          </Scroller>
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
