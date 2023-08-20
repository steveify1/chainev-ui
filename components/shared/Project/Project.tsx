import styles from "./Project.module.scss";
import { Button } from "../Buttons/Button";
import { Link } from "../Link/Link";
import Image from "next/image";
import { Card } from "../Card/Card";

interface ProjectData {
  uuid?: string;
  name?: string;
  numEvents?: number;
  numEnvironments?: number;
  environments?: any[];
  eventNames?: string[];
}

interface ProjectProps {
  className?: string;
  project: ProjectData;
}

export const Project = (props: ProjectProps) => {
  return (
    <Link href={`/projects/${props.project?.uuid}`}>
      <Card className={`${styles.project} ${props.className}`}>
        <h4 className={styles.name}>{props.project?.name}</h4>

        <p className={styles.numEnvironments}>
          {props.project?.environments?.length} Environments
        </p>

        <Button className={styles.button}>
          <span>{props.project?.eventNames?.length} Event Listeners</span>
          <img src={"/bell.png"} alt="bell icon" className={styles.bellIcon} />
        </Button>
      </Card>
    </Link>
  );
};
