import styles from "./PagePlaceholder.module.scss";

interface PagePlaceholderProps {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export function PagePlaceholder({
  index,
  title,
  description,
}: PagePlaceholderProps): React.ReactElement {
  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <p className={styles.index}>{index}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
