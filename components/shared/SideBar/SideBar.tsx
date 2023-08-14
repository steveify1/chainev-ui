import { Container } from "../../shared/Container/Container";
import styles from "./SideBar.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { Link } from "../../shared/Link/Link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../../../utils/context";
import { navigator } from "../../../utils/navigator.utils";
import useLocalStorage from "use-local-storage";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Projects",
    href: "/projects",
  },
];

export const SideBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    navigator.localStorage.remove("auth");
    navigator.localStorage.remove("token");
    router.push("/login");
  };

  const checkIsActiveMenuItem = (menuItemHref: string) => {
    const { route } = router;

    if (menuItemHref !== "/") {
      return route.startsWith(menuItemHref);
    } else {
      return menuItemHref === route;
    }
  };

  return (
    <div className={styles.sidebar}>
      <Container>
        <div className={styles.sidebarInner}>
          <ul className={styles.menu}>
            {menuItems.map((item, i: number) => {
              return (
                <li
                  className={`${styles.menuItem}`}
                  key={`sidebar-menu-item-${i}`}
                >
                  <Link
                    href={item.href}
                    className={`${styles.menuItemLink} ${
                      checkIsActiveMenuItem(item.href)
                        ? null
                        : styles.inactiveLink
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <footer>
            <Button className={styles.logoutBtn} onClick={handleLogout}>
              <span>Logout</span>
              <Image
                src={"/log-out.png"}
                width={20}
                height={20}
                alt="logout icon"
              />
            </Button>
          </footer>
        </div>
      </Container>
    </div>
  );
};
