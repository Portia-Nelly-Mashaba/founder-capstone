import type { BrowseFilters, PriceFilter } from "../../utils/filterItems.ts";
import { ALL_CATEGORIES, categoryLabel } from "../../utils/format.ts";
import type { Category } from "../../data/types.ts";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  filters: BrowseFilters;
  onChange: (filters: BrowseFilters) => void;
  onClear: () => void;
  canClear: boolean;
}

const DISTANCE_OPTIONS: { label: string; value: number | null }[] = [
  { label: "Any distance", value: null },
  { label: "Within 2 km", value: 2 },
  { label: "Within 5 km", value: 5 },
  { label: "Within 10 km", value: 10 },
];

export function FilterBar({ filters, onChange, onClear, canClear }: FilterBarProps) {
  function update<K extends keyof BrowseFilters>(key: K, value: BrowseFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section className={styles.bar} aria-label="Search and filters">
      <div className={styles.searchRow}>
        <label className={styles.label} htmlFor="item-search">
          Search
        </label>
        <input
          id="item-search"
          type="search"
          className={styles.searchInput}
          placeholder="Search tools by name or description…"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-category">
            Category
          </label>
          <select
            id="filter-category"
            className={styles.select}
            value={filters.category}
            onChange={(e) => update("category", e.target.value as Category | "all")}
          >
            <option value="all">All categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-price">
            Price
          </label>
          <select
            id="filter-price"
            className={styles.select}
            value={filters.price}
            onChange={(e) => update("price", e.target.value as PriceFilter)}
          >
            <option value="all">Free and paid</option>
            <option value="free">Free only</option>
            <option value="paid">Paid only</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="filter-distance">
            Distance
          </label>
          <select
            id="filter-distance"
            className={styles.select}
            value={filters.maxDistanceKm ?? ""}
            onChange={(e) => {
              const raw = e.target.value;
              update("maxDistanceKm", raw === "" ? null : Number(raw));
            }}
          >
            {DISTANCE_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.value ?? ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className={styles.clearButton}
        onClick={onClear}
        disabled={!canClear}
      >
        Clear filters
      </button>
    </section>
  );
}
