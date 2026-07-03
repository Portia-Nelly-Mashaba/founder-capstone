import { useEffect, useState } from "react";
import { fetchItems } from "../data/items.ts";
import type { Item } from "../data/types.ts";

interface UseItemsResult {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export function useItems(): UseItemsResult {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchItems()
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load items. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading, error };
}
