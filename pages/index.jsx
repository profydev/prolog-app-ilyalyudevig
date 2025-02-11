import { useState } from "react";
import { Routes } from "@config/routes";
import styles from "./index.module.scss";
import { ButtonCTA, ButtonCTASize } from "@features/ui";
import { Modal } from "@features/ui";
import { Hero } from "@features/landing-page";

const IssuesPage = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const toggleContactModal = () => {
    setModalIsOpened(!modalIsOpened);
  };

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <nav className={styles.navLinks}>
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
        </nav>
        <ButtonCTA
          size={ButtonCTASize.Medium}
          onClick={() => {
            window.open(Routes.projects, "_self");
          }}
        >
          Open Dashboard
        </ButtonCTA>
      </header>
      <Hero />
      <button className={styles.contactButton} onClick={toggleContactModal}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
      <Modal
        modalIsOpened={modalIsOpened}
        toggleContactModal={toggleContactModal}
      />
    </div>
  );
};

export default IssuesPage;
