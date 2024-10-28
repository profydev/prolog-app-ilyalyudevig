import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { ButtonCTA, ButtonCTASize } from "@features/ui";

const IssuesPage = () => {
  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <div className={styles.navLinks}>
          <a href={Routes.home} className={styles.navLink}>
            Home
          </a>
          <a href={Routes.products} className={styles.navLink}>
            Products
          </a>
          <a href={Routes.documentation} className={styles.navLink}>
            Documentation
          </a>
          <a href={Routes.pricing} className={styles.navLink}>
            Pricing
          </a>
        </div>
        <ButtonCTA
          size={ButtonCTASize.Medium}
          onClick={() => {
            window.open(Routes.projects, "_self");
          }}
        >
          Open Dashboard
        </ButtonCTA>
      </header>
      <button
        className={styles.contactButton}
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
