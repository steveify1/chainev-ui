import Image from "next/image";
import { Container } from "../Container/Container";
import styles from "./Nav.module.scss";
import { Button } from "../Buttons/Button";
import { NavAuthButton } from "../Buttons";

export const Nav = () => {
  const isLogged = false;

  return (
    <div className={styles.nav}>
      <Container>
        <div className={styles.navInner}>
          <div className={styles.navLogo}>
            {/* <Image src="/logo.svg" alt="logo" width={100} height={100} /> */}
            <h1>Logo</h1>
          </div>

          <div className={styles.navRight}>
            {isLogged ? (
              <Button shape="oval">Create Project</Button>
            ) : (
              <NavAuthButton className={styles.menu} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
