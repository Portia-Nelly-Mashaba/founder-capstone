import type { Item } from "../../data/types.ts";
import { ItemCard } from "./ItemCard.tsx";
import styles from "./ItemGrid.module.css";

interface ItemGridProps {
  items: Item[];
  emptyMessage: string;
}

export function ItemGrid({ items, emptyMessage }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <h2 className={styles.emptyTitle}>No tools found</h2>
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid} aria-label="Available tools">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
