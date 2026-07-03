import { Link } from "react-router-dom";
import type { Item } from "../../data/types.ts";
import {
  categoryLabel,
  formatDistance,
  formatPrice,
  isItemFree,
  isRecentlyListed,
} from "../../utils/format.ts";
import styles from "./ItemCard.module.css";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const isPaused = item.status === "paused";
  const photo = item.photoUrls[0];
  const free = isItemFree(item.price);

  return (
    <Link
      to={`/items/${item.id}`}
      className={isPaused ? styles.cardPaused : styles.card}
      aria-label={`${item.title}, ${formatPrice(item.price)}, ${formatDistance(item.distanceKm)}`}
    >
      <div className={styles.imageWrap}>
        {photo ? (
          <img src={photo} alt="" className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            No photo yet
          </div>
        )}
        <div className={styles.badges}>
          {isRecentlyListed(item.postedISO) && (
            <span className={styles.badgeRecent}>Recently listed</span>
          )}
          {isPaused && <span className={styles.badgePaused}>Paused</span>}
        </div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>{item.title}</h2>

        <div className={styles.meta}>
          <span className={styles.category}>{categoryLabel(item.category)}</span>
          <span className={free ? styles.priceFree : styles.price}>{formatPrice(item.price)}</span>
          <span>{formatDistance(item.distanceKm)}</span>
        </div>

        <p className={styles.owner}>Listed by {item.owner.displayName}</p>
      </div>
    </Link>
  );
}
