import styles from "./Events.module.scss";
import { Button } from "../Buttons/Button";
import { Link } from "../Link/Link";
import Image from "next/image";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { Event } from "./Event";
import api from "../../../utils/api";
import ReactPaginate from "react-paginate";
import { EmptyStateContainer } from "../EmptyStateContainer/EmptyStateContainer";
import { Loader } from "../Loader/Loader";

interface EventsProps {
  className?: string;
  projectId?: string;
  environmentId?: string;
  networkType?: string;
  limit?: number;
}

export const Events = (props: EventsProps) => {
  const limit = props.limit || 10;
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMatches, setTotalMatches] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const fetchEvents = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const query: any = { limit, page: page + 1 };

      if (props.projectId) {
        query.projectId = props.projectId;
      }

      if (props.environmentId) {
        query.environmentId = props.environmentId;
      }

      if (props.networkType) {
        query.networkType = props.networkType;
      }

      const response = await api.getProjectEvents(query);
      setEvents(response.data.records);
      setTotalMatches(response.data.count);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [props.networkType, page]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {events.length ? (
        <div className={`${styles.events} ${props.className}`}>
          {events.map((event, i) => (
            <Event
              key={`event-${i}`}
              name={event.payload.eventName}
              networkType={event.networkType}
              createdAt={event.createdAt}
              payload={event.payload}
            />
          ))}

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => setPage(e.selected)}
            pageRangeDisplayed={4}
            pageCount={totalMatches / limit}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className={styles.pagination}
            containerClassName={styles.paginationContainer}
            pageLinkClassName={styles.paginationPage}
            nextLinkClassName={styles.paginationNextButton}
            previousLinkClassName={styles.paginationPreviousButton}
            activeLinkClassName={styles.paginationActivePage}
          />
        </div>
      ) : (
        <EmptyStateContainer message="No events to show" />
      )}
    </div>
  );
};
