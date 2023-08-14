import Image from "next/image";
import { Container } from "../Container/Container";
import styles from "./Nav.module.scss";
import { Button } from "../Buttons/Button";
import { NavAuthButton } from "../Buttons";
import { Modal } from "../Modal/Modal";
import { CreateProjectForm } from "../FormSet/CreateProjectForm";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../../utils/context";

export const Nav = () => {
  const authState = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      <Container>
        <div className={styles.navInner}>
          <Link href={"/"} className={styles.navLogo}>
            <Image src="/logo.svg" alt="logo" width={60} height={60} />
          </Link>

          <div className={styles.navRight}>
            {authState ? (
              <Modal
                title="Create Project"
                trigger={<Button shape="oval">Create Project</Button>}
              >
                <CreateProjectForm />
              </Modal>
            ) : (
              <NavAuthButton className={styles.menu} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
