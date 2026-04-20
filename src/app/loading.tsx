import styles from "./loading.module.scss";

export default function Loading(): React.ReactElement {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <p className={styles.label}>
        Chargement
        <span className={styles.cursor} aria-hidden="true" />
      </p>
    </div>
  );
}
