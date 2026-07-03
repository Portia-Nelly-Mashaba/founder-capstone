import { type FormEvent } from "react";
import { Link } from "react-router-dom";
import { todayISO, validateBookingDates } from "../../utils/booking.ts";
import form from "./bookingForm.module.css";

interface DateStepProps {
  itemTitle: string;
  startISO: string;
  endISO: string;
  itemId: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onContinue: () => void;
}

export function DateStep({
  itemTitle,
  startISO,
  endISO,
  itemId,
  onStartChange,
  onEndChange,
  onContinue,
}: DateStepProps) {
  const validation = validateBookingDates(startISO, endISO);
  const minDate = todayISO();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validation.valid) {
      onContinue();
    }
  }

  return (
    <form className={form.card} onSubmit={handleSubmit} noValidate>
      <h2 className={form.title}>When do you need it?</h2>
      <p className={form.hint}>Booking: {itemTitle}</p>

      <div className={form.field}>
        <label className={form.label} htmlFor="booking-start">
          Start date
        </label>
        <input
          id="booking-start"
          type="date"
          className={form.input}
          value={startISO}
          min={minDate}
          onChange={(e) => onStartChange(e.target.value)}
          required
        />
      </div>

      <div className={form.field}>
        <label className={form.label} htmlFor="booking-end">
          End date
        </label>
        <input
          id="booking-end"
          type="date"
          className={form.input}
          value={endISO}
          min={startISO || minDate}
          onChange={(e) => onEndChange(e.target.value)}
          required
        />
      </div>

      {!validation.valid && startISO && endISO && (
        <p className={form.error} role="alert">
          {validation.message}
        </p>
      )}

      <div className={form.actions}>
        <Link to={`/items/${itemId}`} className={form.backButton}>
          Back to item
        </Link>
        <button type="submit" className={form.primaryButton} disabled={!validation.valid}>
          Continue to review
        </button>
      </div>
    </form>
  );
}
