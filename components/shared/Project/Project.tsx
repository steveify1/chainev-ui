import styles from "./Project.module.scss";
import { Button } from "../Buttons/Button";
import { Link } from "../Link/Link";
import Image from "next/image";
import { Card } from "../Card/Card";

interface ProjectData {
  id?: string;
  name?: string;
  numEvents?: number;
  numEnvironments?: number;
}

interface ProjectProps {
  className?: string;
  project: ProjectData;
}

export const Project = (props: ProjectProps) => {
  return (
    <Link href={`/projects/${props.project?.id}`}>
      <Card className={`${styles.project} ${props.className}`}>
        <h4 className={styles.name}>{props.project?.name}</h4>

        <p className={styles.numEnvironments}>
          {props.project?.numEnvironments} Environments
        </p>

        <Button className={styles.button}>
          <span>{props.project?.numEvents} Total Events</span>
          <img src={"/bell.png"} alt="bell icon" className={styles.bellIcon} />
        </Button>
      </Card>
    </Link>
  );
};
