import { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { Card } from "../Card/Card";

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  show: boolean;
  title?: string;
  lock?: boolean;
  onClose?: Function;
  onCloseTriggerClick?: Function;
}

export const Modal = (props: ModalProps) => {
  const handleCloseTriggerClick = () => {
    if (props.lock) return;

    if (typeof props.onCloseTriggerClick === "function") {
      props.onCloseTriggerClick();
    }
  };

  useEffect(() => {
    if (!props.show && typeof props.onClose === "function") {
      props.onClose();
    }
  }, [props.show]);

  return (
    <div className={`${styles.modal} ${props.className}`}>
      <div
        className={`${styles.modalContent} ${props.show ? styles.show : null}`}
      >
        <div
          className={styles.modalDropShadow}
          onClick={handleCloseTriggerClick}
        ></div>
        <Card className={styles.modalContentInner}>
          <div className={styles.modalContentHeader}>
            <h3 className={styles.modalContentTitle}>{props.title}</h3>
            <img
              onClick={handleCloseTriggerClick}
              src="/x.png"
              className={styles.modalCloseIcon}
            />
          </div>

          <div>{props.children}</div>
        </Card>
      </div>
    </div>
  );
};
