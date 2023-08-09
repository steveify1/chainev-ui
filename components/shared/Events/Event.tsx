import styles from "./Events.module.scss";
import { Button } from "../Buttons/Button";
import { Link } from "../Link/Link";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { navigator } from "../../../utils/navigator.utils";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

interface EventProps {
  className?: string;
  name: string;
  networkType: string;
  createdAt: string;
  payload: any;
}

export const Event = (props: EventProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    if (copied) return;
    navigator.copy(JSON.stringify(props.payload));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className={`${styles.event} ${props.className}`}>
      <Card className={styles.eventInner}>
        <h4 className={styles.name}>{props.name}</h4>

        <p className={styles.createdAt}>{props.createdAt}</p>

        <Button className={styles.networkType}>
          <span>{props.networkType}</span>
        </Button>

        <div className={styles.eventPayloadViewContainer}>
          <Modal
            title={props.name}
            trigger={
              <Button className={styles.payloadButton} type="secondary">
                View Payload
              </Button>
            }
          >
            <div className={styles.copyButtonContainer}>
              <Button size="small" className={styles.copyButton} onClick={copy}>
                <img
                  src="/copy.png"
                  className={styles.copyIcon}
                  alt="copy-icon"
                />
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            <DynamicReactJson
              src={props.payload}
              iconStyle="square"
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
            />
          </Modal>
        </div>
      </Card>
    </div>
  );
};