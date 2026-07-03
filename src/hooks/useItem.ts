import { useEffect, useState } from "react";
import { fetchItems } from "../data/items.ts";
import type { Item, ItemId } from "../data/types.ts";

interface UseItemResult {
  item: Item | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export function useItem(id: ItemId | undefined): UseItemResult {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setItem(null);
      setLoading(false);
      setNotFound(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setNotFound(false);

    fetchItems()
      .then((items) => {
        if (cancelled) {
          return;
        }
        const match = items.find((entry) => entry.id === id) ?? null;
        if (!match || match.status === "removed") {
          setItem(null);
          setNotFound(true);
        } else {
          setItem(match);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not load this item. Please try again.");
          setItem(null);
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
  }, [id]);

  return { item, loading, error, notFound };
}
