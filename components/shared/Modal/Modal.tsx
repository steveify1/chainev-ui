import { useState } from "react";
import styles from "./Modal.module.scss";
import { Card } from "../Card/Card";

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
  trigger: any;
}

export const Modal = (props: ModalProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={`${styles.modal} ${props.className}`}>
      <div className={`${styles.modalContent} ${show ? styles.show : null}`}>
        <div
          className={styles.modalDropShadow}
          onClick={() => setShow(false)}
        ></div>
        <Card className={styles.modalContentInner}>
          <div className={styles.modalContentHeader}>
            <h3 className={styles.modalContentTitle}>{props.title}</h3>
            <img
              onClick={() => setShow(false)}
              src="/x.png"
              className={styles.modalCloseIcon}
            />
          </div>

          <div>{props.children}</div>
        </Card>
      </div>

      {props.trigger ? (
        <div onClick={() => setShow(true)}>{props.trigger}</div>
      ) : null}
    </div>
  );
};
