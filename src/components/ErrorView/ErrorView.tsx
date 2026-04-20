import Link from "next/link";
import styles from "./ErrorView.module.scss";

interface ErrorViewAction {
  readonly label: string;
  readonly onClick?: () => void;
  readonly href?: string;
}

export interface ErrorViewProps {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly digest?: string;
  readonly actions: readonly ErrorViewAction[];
}

export function ErrorView({
  label,
  title,
  description,
  digest,
  actions,
}: ErrorViewProps): React.ReactElement {
  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <p className={styles.label}>{label}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        {digest ? (
          <p className={styles.digest}>
            <span aria-hidden="true">ref:</span> {digest}
          </p>
        ) : null}
        <div className={styles.actions}>
          {actions.map((action) => {
            if (action.href) {
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={styles.action}
                >
                  {action.label}
                </Link>
              );
            }
            return (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={styles.action}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
