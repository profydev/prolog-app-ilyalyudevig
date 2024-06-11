import Link from "next/link";
import React from "react";
import styles from "./footer-link.module.scss";

type FooterLinkProps = {
  text: string;
  href: string;
};

export function FooterLink({ text, href }: FooterLinkProps) {
  return (
    <li className={styles.listItem}>
      <Link className={styles.anchor} href={href}>
        {text}
      </Link>
    </li>
  );
}
