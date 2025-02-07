import classNames from "classnames";
import styles from "./modal.module.scss";
import { ButtonCTA, ButtonCTAHierarchy } from "@features/ui";

interface ModalProps {
  modalIsOpened: boolean;
  toggleContactModal: () => void;
}

export const Modal = ({ modalIsOpened, toggleContactModal }: ModalProps) => {
  function openEmailClient() {
    window.location.href = "mailto:prolog@profy.dev";
  }

  return (
    <div
      className={classNames(
        styles.modal,
        modalIsOpened ? styles.modalOpened : "",
      )}
    >
      <div className={styles.modalContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.modalIcon}
          src={"/icons/mail-icon.svg"}
          alt="mail icon"
        />
        <h1 className={styles.modalTitle}>Contact Us Via Email</h1>
        <p className={styles.modalText}>
          Any questions? Send us an email at prolog@profy.dev. We usually answer
          within 24 hours.
        </p>
        <div className={styles.modalButtons}>
          <ButtonCTA
            className={styles.modalButton}
            hierarchy={ButtonCTAHierarchy.Gray}
            onClick={toggleContactModal}
          >
            Cancel
          </ButtonCTA>
          <ButtonCTA className={styles.modalButton} onClick={openEmailClient}>
            Open Email App
          </ButtonCTA>
        </div>
      </div>
    </div>
  );
};
