import { Container } from "../../shared/Container/Container";
import styles from "./ProjectsPage.module.scss";
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
import { toast } from "react-toastify";
import api from "../../../utils/api";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await api.getProjects({ limit: 10 });
      const { records } = response.data;
      setProjects(records);
    } catch (error: any) {
      toast(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <DashboardContainer title="Projects">
      <Section>
        <div className={styles.projects}>
          {projects.map((project, i) => (
            <Project key={`project-${i}`} project={project} />
          ))}
        </div>
      </Section>
    </DashboardContainer>
  );
};
