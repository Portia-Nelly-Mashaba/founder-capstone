import type { Category, Item } from "../data/types.ts";
import { isBrowsable, isItemFree } from "./format.ts";

export type PriceFilter = "all" | "free" | "paid";

export interface BrowseFilters {
  search: string;
  category: Category | "all";
  price: PriceFilter;
  maxDistanceKm: number | null;
}

export const DEFAULT_BROWSE_FILTERS: BrowseFilters = {
  search: "",
  category: "all",
  price: "all",
  maxDistanceKm: null,
};

function matchesSearch(item: Item, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) {
    return true;
  }
  return (
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );
}

function matchesCategory(item: Item, category: Category | "all"): boolean {
  return category === "all" || item.category === category;
}

function matchesPrice(item: Item, price: PriceFilter): boolean {
  if (price === "all") {
    return true;
  }
  const free = isItemFree(item.price);
  return price === "free" ? free : !free;
}

function matchesDistance(item: Item, maxDistanceKm: number | null): boolean {
  if (maxDistanceKm === null) {
    return true;
  }
  if (item.distanceKm === null) {
    return false;
  }
  return item.distanceKm <= maxDistanceKm;
}

function compareByDistance(a: Item, b: Item): number {
  if (a.distanceKm === null && b.distanceKm === null) {
    return 0;
  }
  if (a.distanceKm === null) {
    return 1;
  }
  if (b.distanceKm === null) {
    return -1;
  }
  return a.distanceKm - b.distanceKm;
}

export function filterItems(items: Item[], filters: BrowseFilters): Item[] {
  return items
    .filter(isBrowsable)
    .filter(
      (item) =>
        matchesSearch(item, filters.search) &&
        matchesCategory(item, filters.category) &&
        matchesPrice(item, filters.price) &&
        matchesDistance(item, filters.maxDistanceKm),
    )
    .sort(compareByDistance);
}

export function hasActiveFilters(filters: BrowseFilters): boolean {
  return (
    filters.search.trim() !== "" ||
    filters.category !== "all" ||
    filters.price !== "all" ||
    filters.maxDistanceKm !== null
  );
}
