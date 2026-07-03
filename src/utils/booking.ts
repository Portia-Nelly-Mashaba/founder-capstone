import type { Price } from "../data/types.ts";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export interface DateValidationResult {
  valid: boolean;
  message: string | null;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function rentalDays(startISO: string, endISO: string): number {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / MS_PER_DAY) + 1;
}

export function validateBookingDates(startISO: string, endISO: string): DateValidationResult {
  if (!startISO || !endISO) {
    return { valid: false, message: "Please select both a start and end date." };
  }

  const today = todayISO();
  if (startISO < today) {
    return { valid: false, message: "Start date cannot be in the past." };
  }

  if (endISO < startISO) {
    return { valid: false, message: "End date must be on or after the start date." };
  }

  return { valid: true, message: null };
}

export function rentalUnits(price: Price, startISO: string, endISO: string): number {
  const days = rentalDays(startISO, endISO);

  switch (price.period) {
    case "day":
      return days;
    case "week":
      return Math.max(1, Math.ceil(days / 7));
    case "hour":
      return days * 24;
  }
}

export function calculateBookingTotalCents(
  price: Price | null,
  startISO: string,
  endISO: string,
): number {
  if (price === null || price.amountCents === 0) {
    return 0;
  }

  return price.amountCents * rentalUnits(price, startISO, endISO);
}

export function formatCents(cents: number): string {
  if (cents === 0) {
    return "Free";
  }
  const rands = cents / 100;
  const formatted = Number.isInteger(rands) ? rands.toString() : rands.toFixed(2);
  return `R${formatted}`;
}

export function formatDateRange(startISO: string, endISO: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const start = new Date(`${startISO}T00:00:00`).toLocaleDateString("en-ZA", options);
  const end = new Date(`${endISO}T00:00:00`).toLocaleDateString("en-ZA", options);

  if (startISO === endISO) {
    return start;
  }

  return `${start} – ${end}`;
}

export function createBookingId(): string {
  return `bk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
