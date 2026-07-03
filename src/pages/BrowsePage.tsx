import { useItems } from "../hooks/useItems.ts";
import layout from "../components/layout/AppLayout.module.css";

export function BrowsePage() {
  const { items, loading, error } = useItems();

  const availableCount = items.filter(
    (item) => item.status === "available" || item.status === "paused",
  ).length;

  return (
    <div className={layout.page}>
      <div>
        <h1 className={layout.pageTitle}>Tools near you</h1>
        <p className={layout.pageLead}>
          Borrow drills, ladders, and more from neighbours — no need to buy what you only need
          once.
        </p>
      </div>

      {loading && <p className={layout.status} role="status">Loading nearby items…</p>}

      {error && (
        <p className={layout.statusError} role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <p className={layout.itemCount} role="status">
          {availableCount} {availableCount === 1 ? "tool" : "tools"} available near you
        </p>
      )}

      <div className={layout.placeholder}>
        Item grid, search, and filters coming next.
      </div>
    </div>
  );
}
