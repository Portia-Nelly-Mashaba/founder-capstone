import { useState } from "react";
import styles from "./PhotoGallery.module.css";

interface PhotoGalleryProps {
  photoUrls: string[];
  title: string;
}

export function PhotoGallery({ photoUrls, title }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasPhotos = photoUrls.length > 0;
  const activePhoto = hasPhotos ? photoUrls[activeIndex] : null;

  if (!hasPhotos) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon} aria-hidden="true">
              📷
            </span>
            <span>No photos yet</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          src={activePhoto ?? photoUrls[0]}
          alt={photoUrls.length === 1 ? title : `${title} — photo ${activeIndex + 1}`}
          className={styles.image}
        />
      </div>

      {photoUrls.length > 1 && (
        <div className={styles.thumbnails} role="tablist" aria-label="Item photos">
          {photoUrls.map((url, index) => (
            <button
              key={url}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Photo ${index + 1} of ${photoUrls.length}`}
              className={index === activeIndex ? styles.thumbActive : styles.thumb}
              onClick={() => setActiveIndex(index)}
            >
              <img src={url} alt="" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
