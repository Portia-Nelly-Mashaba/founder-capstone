import { Link, useParams } from "react-router-dom";
import { BookingPanel } from "../components/item/BookingPanel.tsx";
import { OwnerCard } from "../components/item/OwnerCard.tsx";
import { PhotoGallery } from "../components/item/PhotoGallery.tsx";
import layout from "../components/layout/AppLayout.module.css";
import { useItem } from "../hooks/useItem.ts";
import { categoryLabel } from "../utils/format.ts";
import styles from "./ItemDetailPage.module.css";

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { item, loading, error, notFound } = useItem(id);

  if (loading) {
    return (
      <div className={layout.page}>
        <p className={layout.status} role="status">
          Loading item…
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

  if (notFound || !item) {
    return (
      <div className={layout.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Item not found</h1>
          <p className={styles.notFoundText}>
            This tool may have been removed or the link is incorrect.
          </p>
          <Link to="/" className={styles.notFoundLink}>
            Back to browse
          </Link>
        </div>
      </div>
    );
  }

  const isPaused = item.status === "paused";

  return (
    <article className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to browse
      </Link>

      <div className={styles.layout}>
        <div className={styles.main}>
          <PhotoGallery photoUrls={item.photoUrls} title={item.title} />

          <header className={styles.header}>
            <h1 className={styles.title}>{item.title}</h1>
            <div className={styles.meta}>
              <span className={styles.category}>{categoryLabel(item.category)}</span>
              {isPaused && <span className={styles.badgePaused}>Paused</span>}
            </div>
          </header>

          <div className={styles.mobileBook}>
            <BookingPanel item={item} />
          </div>

          <section aria-labelledby="description-heading">
            <h2 id="description-heading" className={styles.descriptionHeading}>
              About this tool
            </h2>
            <p className={styles.description}>{item.description}</p>
          </section>

          <OwnerCard owner={item.owner} />
        </div>

        <div className={`${styles.sidebar} ${styles.desktopBook}`}>
          <BookingPanel item={item} />
        </div>
      </div>
    </article>
  );
}
