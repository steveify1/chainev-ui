import { Container } from "../../shared/Container/Container";
import styles from "./HomePage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { PageWapper } from "../../shared/PageWrapper/PageWapper";
import {
  FormField,
  Input,
  PasswordInput,
} from "../../shared/FormSet/FormField";
import { Card } from "../../shared/Card/Card";
import { Link } from "../../shared/Link/Link";
import { DashboardContainer } from "../../shared/DashboardContainer/DashboardContainer";
import { useEffect, useState } from "react";
import { Project } from "../../shared/Project/Project";
import { Section } from "../../shared/Section/Section";
import { Events } from "../../shared/Events/Events";

export const HomePage = () => {
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  const fetchRecentProjects = async () => {
    setRecentProjects([
      {
        id: "dfdffd",
        name: "IvoryPay PG",
        numEnvironments: 2,
        numEvents: 8,
      },
      {
        id: "dfdffd",
        name: "IvoryPay PG",
        numEnvironments: 2,
        numEvents: 8,
      },
      {
        id: "dfdffd",
        name: "IvoryPay PG",
        numEnvironments: 2,
        numEvents: 8,
      },
    ]);
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

          <div className={styles.projects}>
            {recentProjects.map((project, i) => (
              <Project
                key={`recent-project-${i}`}
                className={styles.project}
                project={project}
              />
            ))}
          </div>
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
