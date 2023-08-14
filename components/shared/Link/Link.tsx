import styles from "./Link.module.scss";
import NextLink from "next/link";

export interface LinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
}

export const Link = (props: LinkProps) => {
  return (
    <NextLink
      href={props.href}
      target={props.target}
      className={`${styles.link} ${props.className}`}
    >
      {props.children}
    </NextLink>
  );
};
