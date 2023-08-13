import { Container } from "../../shared/Container/Container";
import styles from "./SideBar.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { Link } from "../../shared/Link/Link";
import { useRouter } from "next/router";
import Image from "next/image";

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
            <Link href="/logout">
              <Button className={styles.logoutBtn}>
                <span>Logout</span>
                <Image
                  src={"/log-out.png"}
                  width={20}
                  height={20}
                  alt="logout icon"
                />
              </Button>
            </Link>
          </footer>
        </div>
      </Container>
    </div>
  );
};
