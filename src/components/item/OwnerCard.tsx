import type { Owner } from "../../data/types.ts";
import { formatOwnerRating } from "../../utils/format.ts";
import styles from "./OwnerCard.module.css";

interface OwnerCardProps {
  owner: Owner;
}

function ownerInitials(displayName: string): string {
  return displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function OwnerCard({ owner }: OwnerCardProps) {
  const joined = new Date(owner.joinedISO).toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.card} aria-labelledby="owner-heading">
      <h2 id="owner-heading" className={styles.heading}>
        Listed by
      </h2>
      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
          {ownerInitials(owner.displayName)}
        </div>
        <div>
          <p className={styles.name}>{owner.displayName}</p>
          <p className={styles.rating}>{formatOwnerRating(owner)}</p>
          <p className={styles.joined}>Member since {joined}</p>
        </div>
      </div>
    </section>
  );
}
