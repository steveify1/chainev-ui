import styles from "./Events.module.scss";
import { Button } from "../Buttons/Button";
import { Card } from "../Card/Card";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { navigator } from "../../../utils/navigator.utils";
import dynamic from "next/dynamic";
import { Scroller } from "../Scroller/Scroller";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

interface EventProps {
  className?: string;
  name: string;
  networkType: string;
  createdAt: string;
  payload: any;
}

const NetworkTypeMap: { [T: string]: string } = {
  TESTNET: "Testnet",
  MAINNET: "Mainnet",
};

export const Event = (props: EventProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [showPayload, setShowPayload] = useState<boolean>(false);

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

        <p className={styles.createdAt}>
          {new Date(props.createdAt).toLocaleString()}
        </p>

        <Button
          shape="oval"
          className={`${styles.networkType} ${
            props.networkType === "MAINNET" ? styles.mainnet : null
          }`}
        >
          {NetworkTypeMap[props.networkType]}
        </Button>

        <div className={styles.eventPayloadViewContainer}>
          <Button
            onClick={() => setShowPayload(true)}
            className={styles.payloadButton}
            type="secondary"
            shape="oval"
          >
            View Payload
          </Button>

          <Modal
            title={props.name}
            show={showPayload}
            onCloseTriggerClick={() => setShowPayload(false)}
          >
            <div className={styles.copyButtonContainer}>
              <Button
                size="small"
                className={styles.copyButton}
                onClick={copy}
                shape="oval"
              >
                <img
                  src="/copy.png"
                  className={styles.copyIcon}
                  alt="copy-icon"
                />
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            <Scroller maxHeight={"70vh"}>
              <DynamicReactJson
                src={props.payload.data}
                iconStyle="square"
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </Scroller>
          </Modal>
        </div>
      </Card>
    </div>
  );
};
