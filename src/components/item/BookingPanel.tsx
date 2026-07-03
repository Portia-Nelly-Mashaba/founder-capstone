import { Link } from "react-router-dom";
import type { Item } from "../../data/types.ts";
import { formatDistance, formatPostedDate, formatPrice, isItemFree } from "../../utils/format.ts";
import styles from "./BookingPanel.module.css";

interface BookingPanelProps {
  item: Item;
}

export function BookingPanel({ item }: BookingPanelProps) {
  const isPaused = item.status === "paused";
  const free = isItemFree(item.price);

  return (
    <aside className={styles.panel} aria-label="Booking">
      <p className={free ? styles.priceFree : styles.price}>{formatPrice(item.price)}</p>
      <p className={styles.distance}>{formatDistance(item.distanceKm)}</p>

      {isPaused ? (
        <>
          <button type="button" className={styles.bookButtonDisabled} disabled>
            Book now
          </button>
          <p className={styles.pausedNote}>
            The owner has paused this listing. Check back later or browse similar tools.
          </p>
        </>
      ) : (
        <Link to={`/book/${item.id}`} className={styles.bookButton}>
          Book now
        </Link>
      )}

      <p className={styles.posted}>Listed {formatPostedDate(item.postedISO)}</p>
    </aside>
  );
}
