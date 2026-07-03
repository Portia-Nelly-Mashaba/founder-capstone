import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BookingSteps, type BookingStep } from "../components/booking/BookingSteps.tsx";
import { ConfirmationStep } from "../components/booking/ConfirmationStep.tsx";
import { DateStep } from "../components/booking/DateStep.tsx";
import { ReviewStep } from "../components/booking/ReviewStep.tsx";
import layout from "../components/layout/AppLayout.module.css";
import { useAuth } from "../context/AuthContext.tsx";
import type { BookingConfirmation } from "../data/types.ts";
import { useItem } from "../hooks/useItem.ts";
import {
  calculateBookingTotalCents,
  createBookingId,
  todayISO,
} from "../utils/booking.ts";
import styles from "./BookingPage.module.css";

export function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { item, loading, error, notFound } = useItem(id);

  const [step, setStep] = useState<BookingStep>("dates");
  const [startISO, setStartISO] = useState(todayISO());
  const [endISO, setEndISO] = useState(todayISO());
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  if (!user && id) {
    const redirect = encodeURIComponent(`/book/${id}`);
    return <Navigate to={`/auth?redirect=${redirect}`} replace />;
  }

  if (loading) {
    return (
      <div className={layout.page}>
        <p className={layout.status} role="status">
          Loading booking…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={layout.page}>
        <p className={layout.statusError} role="alert">
          {error}
        </p>
      </div>
    );
  }

  if (notFound || !item || !id) {
    return (
      <div className={layout.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Cannot book this item</h1>
          <p className={styles.notFoundText}>
            This tool may have been removed or is no longer available.
          </p>
          <Link to="/" className={styles.notFoundLink}>
            Back to browse
          </Link>
        </div>
      </div>
    );
  }

  if (item.status === "paused") {
    return (
      <div className={layout.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Listing paused</h1>
          <p className={styles.notFoundText}>
            {item.owner.displayName} has paused this listing. It cannot be booked right now.
          </p>
          <Link to={`/items/${item.id}`} className={styles.notFoundLink}>
            Back to item
          </Link>
        </div>
      </div>
    );
  }

  function handleConfirm() {
    if (!item) {
      return;
    }

    setSubmitting(true);

    const bookingConfirmation: BookingConfirmation = {
      id: createBookingId(),
      itemId: item.id,
      itemTitle: item.title,
      range: { startISO, endISO },
      totalCents: calculateBookingTotalCents(item.price, startISO, endISO),
      createdISO: new Date().toISOString(),
    };

    setConfirmation(bookingConfirmation);
    setStep("confirmation");
    setSubmitting(false);
  }

  return (
    <div className={layout.page}>
      <div>
        <h1 className={layout.pageTitle}>Book item</h1>
        <p className={layout.pageLead}>{item.title}</p>
      </div>

      <BookingSteps current={step} />

      {step === "dates" && (
        <DateStep
          itemTitle={item.title}
          itemId={item.id}
          startISO={startISO}
          endISO={endISO}
          onStartChange={setStartISO}
          onEndChange={setEndISO}
          onContinue={() => setStep("review")}
        />
      )}

      {step === "review" && (
        <ReviewStep
          item={item}
          startISO={startISO}
          endISO={endISO}
          agreedToTerms={agreedToTerms}
          onAgreedChange={setAgreedToTerms}
          onBack={() => setStep("dates")}
          onConfirm={handleConfirm}
          submitting={submitting}
        />
      )}

      {step === "confirmation" && confirmation && <ConfirmationStep confirmation={confirmation} />}
    </div>
  );
}
