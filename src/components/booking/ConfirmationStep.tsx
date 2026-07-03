import { Link } from "react-router-dom";
import type { BookingConfirmation } from "../../data/types.ts";
import { formatCents, formatDateRange } from "../../utils/booking.ts";
import styles from "./ConfirmationStep.module.css";

interface ConfirmationStepProps {
  confirmation: BookingConfirmation;
}

export function ConfirmationStep({ confirmation }: ConfirmationStepProps) {
  return (
    <section className={styles.confirmation} aria-live="polite">
      <div className={styles.icon} aria-hidden="true">
        ✓
      </div>
      <h2 className={styles.title}>Booking confirmed!</h2>
      <p className={styles.reference}>Reference: {confirmation.id}</p>
      <p className={styles.summary}>
        You&apos;ve booked <strong>{confirmation.itemTitle}</strong> for{" "}
        {formatDateRange(confirmation.range.startISO, confirmation.range.endISO)}. Total:{" "}
        <strong>{formatCents(confirmation.totalCents)}</strong>. The owner will be in touch to
        arrange pickup.
      </p>
      <div className={styles.actions}>
        <Link to="/" className={styles.primaryLink}>
          Browse more tools
        </Link>
        <Link to={`/items/${confirmation.itemId}`} className={styles.secondaryLink}>
          View item
        </Link>
      </div>
    </section>
  );
}
