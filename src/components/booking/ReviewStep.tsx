import { type FormEvent } from "react";
import type { Item } from "../../data/types.ts";
import {
  calculateBookingTotalCents,
  formatCents,
  formatDateRange,
  rentalDays,
  rentalUnits,
} from "../../utils/booking.ts";
import { formatPrice } from "../../utils/format.ts";
import form from "./bookingForm.module.css";

interface ReviewStepProps {
  item: Item;
  startISO: string;
  endISO: string;
  agreedToTerms: boolean;
  onAgreedChange: (value: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
  submitting: boolean;
}

export function ReviewStep({
  item,
  startISO,
  endISO,
  agreedToTerms,
  onAgreedChange,
  onBack,
  onConfirm,
  submitting,
}: ReviewStepProps) {
  const days = rentalDays(startISO, endISO);
  const totalCents = calculateBookingTotalCents(item.price, startISO, endISO);
  const units =
    item.price && item.price.amountCents > 0
      ? rentalUnits(item.price, startISO, endISO)
      : null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (agreedToTerms) {
      onConfirm();
    }
  }

  return (
    <form className={form.card} onSubmit={handleSubmit}>
      <h2 className={form.title}>Review your booking</h2>

      <dl style={{ margin: 0, display: "grid", gap: "var(--space-sm)" }}>
        <div>
          <dt className={form.label}>Item</dt>
          <dd style={{ margin: 0 }}>{item.title}</dd>
        </div>
        <div>
          <dt className={form.label}>Dates</dt>
          <dd style={{ margin: 0 }}>
            {formatDateRange(startISO, endISO)} ({days} {days === 1 ? "day" : "days"})
          </dd>
        </div>
        <div>
          <dt className={form.label}>Owner</dt>
          <dd style={{ margin: 0 }}>{item.owner.displayName}</dd>
        </div>
        <div>
          <dt className={form.label}>Rate</dt>
          <dd style={{ margin: 0 }}>{formatPrice(item.price)}</dd>
        </div>
        {units !== null && item.price && (
          <div>
            <dt className={form.label}>Rental units</dt>
            <dd style={{ margin: 0 }}>
              {units} {item.price.period}
              {units === 1 ? "" : "s"}
            </dd>
          </div>
        )}
        <div>
          <dt className={form.label}>Total</dt>
          <dd style={{ margin: 0, fontWeight: 700, fontSize: "1.125rem" }}>
            {formatCents(totalCents)}
          </dd>
        </div>
      </dl>

      <label style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => onAgreedChange(e.target.checked)}
          style={{ marginTop: "0.2rem" }}
        />
        <span className={form.hint}>
          I agree to return the item in the same condition and follow the owner&apos;s lending
          terms. BorrowBlock will share my contact details with the owner to arrange pickup.
        </span>
      </label>

      <div className={form.actions}>
        <button type="button" className={form.backButton} onClick={onBack}>
          Change dates
        </button>
        <button
          type="submit"
          className={form.primaryButton}
          disabled={!agreedToTerms || submitting}
        >
          {submitting ? "Confirming…" : "Confirm booking"}
        </button>
      </div>
    </form>
  );
}
