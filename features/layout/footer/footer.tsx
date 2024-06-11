import { version } from "../../../package.json";
import { FooterLink } from "./footer-link";
import styles from "./footer.module.scss";

const footerLinks = [
  {
    text: "Docs",
    href: "#",
  },
  {
    text: "API",
    href: "#",
  },
  {
    text: "Help",
    href: "#",
  },
  {
    text: "Community",
    href: "#",
  },
];

export const Footer = () => (
  <footer>
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.version}>Version: {version}</p>
        <div className={styles.links}>
          <ul className={styles.linkList}>
            {footerLinks.map((footerLink, index) => (
              <FooterLink key={index} {...footerLink} />
            ))}
          </ul>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          src="/icons/logo-small.svg"
          alt="Prolog Logo"
        />
      </div>
    </div>
  </footer>
);
