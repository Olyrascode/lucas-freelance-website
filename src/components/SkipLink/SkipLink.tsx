import styles from "./SkipLink.module.scss";

export function SkipLink(): React.ReactElement {
  return (
    <a href="#main" className={styles.root}>
      Aller au contenu principal
    </a>
  );
}
