import { useRouter } from "next/router";
import styles from "./Button.module.scss";
import { NavAuthButtonProps } from "./Button.interface";
import { Button } from "./Button";
import { Link } from "../Link/Link";

export const NavAuthButton = (props: NavAuthButtonProps) => {
  const router = useRouter();

  return (
    <div>
      {router.pathname == "/login" ? (
        <Link href="/register" className={styles.navButtonLink}>
          <Button className={styles.navButton} shape="oval">
            Create account
          </Button>
        </Link>
      ) : (
        <Link href="/login" className={styles.navButtonLink}>
          <Button className={styles.navButton} shape="oval">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};
