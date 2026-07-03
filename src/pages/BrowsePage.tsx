import { useMemo, useState } from "react";
import { FilterBar } from "../components/browse/FilterBar.tsx";
import { ItemGrid } from "../components/browse/ItemGrid.tsx";
import layout from "../components/layout/AppLayout.module.css";
import { useItems } from "../hooks/useItems.ts";
import {
  DEFAULT_BROWSE_FILTERS,
  filterItems,
  hasActiveFilters,
} from "../utils/filterItems.ts";
import { isBrowsable } from "../utils/format.ts";

export function BrowsePage() {
  const { items, loading, error } = useItems();
  const [filters, setFilters] = useState(DEFAULT_BROWSE_FILTERS);

  const filteredItems = useMemo(() => filterItems(items, filters), [items, filters]);

  const browsableCount = items.filter(isBrowsable).length;
  const filtersActive = hasActiveFilters(filters);

  const emptyMessage = filtersActive
    ? "Nothing matches your search or filters. Try clearing them or broadening your distance."
    : "No tools are listed in your area yet. Check back soon.";

  return (
    <div className={layout.page}>
      <div>
        <h1 className={layout.pageTitle}>Tools near you</h1>
        <p className={layout.pageLead}>
          Borrow drills, ladders, and more from neighbours — no need to buy what you only need
          once.
        </p>
      </div>

      {loading && (
        <p className={layout.status} role="status">
          Loading nearby items…
        </p>
      )}

      {error && (
        <p className={layout.statusError} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className={layout.itemCount} role="status" aria-live="polite">
            {filtersActive
              ? `${filteredItems.length} of ${browsableCount} tools match`
              : `${browsableCount} ${browsableCount === 1 ? "tool" : "tools"} available near you`}
          </p>

          <FilterBar
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters(DEFAULT_BROWSE_FILTERS)}
            canClear={filtersActive}
          />

          <ItemGrid items={filteredItems} emptyMessage={emptyMessage} />
        </>
      )}
    </div>
  );
}
