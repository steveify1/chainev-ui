import styles from "./Events.module.scss";
import { Button } from "../Buttons/Button";
import { Link } from "../Link/Link";
import Image from "next/image";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { Event } from "./Event";

interface EventsProps {
  className?: string;
  projectId?: string;
  networkType?: string;
  limit?: number;
}

export const Events = (props: EventsProps) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ props });

  const fetchEvents = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      setEvents([
        {
          name: "Transfer",
          createdAt: new Date().toDateString(),
          networkType: "TESTNET",
          payload: {
            transactionHash: "00xxxxxxxxxxxxxxxx",
          },
        },
        {
          name: "Mint",
          createdAt: new Date().toDateString(),
          networkType: "TESTNET",
          payload: {
            transactionHash: "01xxxxxxxxxxxxxxxx",
          },
        },
        {
          name: "Transfer",
          createdAt: new Date().toDateString(),
          networkType: "MAINNET",
          payload: {
            transactionHash: "02xxxxxxxxxxxxxxxx",
            blocks: [
              {
                hash: "020xxxxxxxxxxxxxxxx",
                height: 20000,
                completed: false,
              },
              {
                hash: "021xxxxxxxxxxxxxxxx",
                height: 20000,
                completed: true,
              },
            ],
          },
        },
        {
          name: "Swap",
          createdAt: new Date().toDateString(),
          networkType: "MAINNET",
          payload: {
            transactionHash: "03xxxxxxxxxxxxxxxx",
          },
        },
        {
          name: "Transfer",
          createdAt: new Date().toDateString(),
          networkType: "TESTNET",
          payload: {
            transactionHash: "04xxxxxxxxxxxxxxxx",
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`${styles.events} ${props.className}`}>
      {events.map((event, i) => (
        <Event
          key={`event-${i}`}
          name={event.name}
          networkType={event.networkType}
          createdAt={event.createdAt}
          payload={event.payload}
        />
      ))}
    </div>
  );
};
