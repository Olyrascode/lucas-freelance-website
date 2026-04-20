"use client";

import { ErrorView } from "@/components/ErrorView/ErrorView";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly unstable_retry?: () => void;
  readonly reset?: () => void;
}

export default function GlobalError({
  error,
  unstable_retry,
  reset,
}: ErrorProps): React.ReactElement {
  const retry = unstable_retry ?? reset;
  const showDigest =
    process.env.NODE_ENV !== "production" ? error.digest : undefined;

  return (
    <ErrorView
      label="Erreur"
      title="Une erreur est survenue."
      description="Nous n'avons pas pu charger cette page. Réessayez ou revenez à l'accueil."
      digest={showDigest}
      actions={[
        ...(retry ? [{ label: "Réessayer", onClick: retry }] : []),
        { label: "Retour à l'accueil", href: "/" },
      ]}
    />
  );
}
