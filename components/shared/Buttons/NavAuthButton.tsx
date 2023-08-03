import { useRouter } from "next/router";
import styles from "./Button.module.scss";
import { NavAuthButtonProps } from "./Button.interface";
import { Button } from "./Button";

export const NavAuthButton = (props: NavAuthButtonProps) => {
  const router = useRouter();

  return (
    <div>
      {router.pathname == "/" ? (
        <Button className={styles.navButton} shape="oval">
          Create Account
        </Button>
      ) : (
        <Button className={styles.navButton} shape="oval">
          login
        </Button>
      )}
    </div>
  );
};
