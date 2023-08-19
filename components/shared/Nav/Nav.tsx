import Image from "next/image";
import { Container } from "../Container/Container";
import styles from "./Nav.module.scss";
import { Button } from "../Buttons/Button";
import { NavAuthButton } from "../Buttons";
import { Modal } from "../Modal/Modal";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../../utils/context";
import { CreateProjectForm } from "../CreateProjectForm/CreateProjectForm";

export const Nav = () => {
  const authState = useContext(AuthContext);
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [lockModal, setLockModal] = useState<boolean>(false);

  return (
    <div className={styles.nav}>
      <Container>
        <div className={styles.navInner}>
          <Link href={"/"} className={styles.navLogo}>
            <Image src="/logo.svg" alt="logo" width={60} height={60} />
          </Link>
          <div className={styles.navRight}>
            {authState?.token ? (
              <div>
                <Button onClick={() => setShowProjectForm(true)} shape="oval">
                  Create Project
                </Button>
                <Modal
                  title="Create Project"
                  show={showProjectForm}
                  lock={lockModal}
                  onCloseTriggerClick={() => setShowProjectForm(false)}
                >
                  {showProjectForm ? (
                    <CreateProjectForm
                      onSuccess={() => setShowProjectForm(false)}
                      onProcessingStateChange={setLockModal}
                    />
                  ) : null}
                </Modal>
              </div>
            ) : (
              <NavAuthButton className={styles.menu} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
