import type { Category, Item, Owner, Price } from "../data/types.ts";

const CATEGORY_LABELS: Record<Category, string> = {
  "power-tools": "Power tools",
  "hand-tools": "Hand tools",
  garden: "Garden",
  kitchen: "Kitchen",
  outdoor: "Outdoor",
  party: "Party",
  other: "Other",
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABELS[category];
}

export const ALL_CATEGORIES: Category[] = [
  "power-tools",
  "hand-tools",
  "garden",
  "kitchen",
  "outdoor",
  "party",
  "other",
];

export function isItemFree(price: Price | null): boolean {
  return price === null || price.amountCents === 0;
}

export function formatPrice(price: Price | null): string {
  if (price === null || price.amountCents === 0) {
    return "Free";
  }
  const rands = price.amountCents / 100;
  const formatted = Number.isInteger(rands) ? rands.toString() : rands.toFixed(2);
  return `R${formatted}/${price.period}`;
}

export function formatDistance(distanceKm: number | null): string {
  if (distanceKm === null) {
    return "Distance unknown";
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }
  return `${distanceKm.toFixed(1)} km away`;
}

const RECENT_DAYS = 14;

export function isRecentlyListed(postedISO: string, now: Date = new Date()): boolean {
  const posted = new Date(postedISO);
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= RECENT_DAYS;
}

export function isBrowsable(item: Item): boolean {
  return item.status !== "removed";
}

export function formatOwnerRating(owner: Owner): string {
  if (owner.rating === null || owner.ratingCount === 0) {
    return "New lender";
  }
  return `${owner.rating.toFixed(1)} (${owner.ratingCount} ${owner.ratingCount === 1 ? "review" : "reviews"})`;
}

export function formatPostedDate(postedISO: string): string {
  return new Date(postedISO).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
