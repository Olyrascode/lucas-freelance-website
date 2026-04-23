"use client";

import { useState, type FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./page.module.scss";

interface FormState {
  readonly nom: string;
  readonly prenom: string;
  readonly email: string;
  readonly telephone: string;
  readonly message: string;
}

const initialForm: FormState = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  message: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function HeroBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });
  return (
    <header className={styles.hero} ref={ref}>
      <div className={styles.inner}>
        <p className={styles.heroEyebrow} data-lines>
          04 / Contact
        </p>
        <h1 className={styles.heroTitle} data-lines>
          Contact
        </h1>
        <p className={styles.heroLead} data-lines>
          Parlons de votre projet. Décrivez ce que vous voulez construire —
          je reviens vers vous sous 48h ouvrées avec une première lecture
          du périmètre et des prochaines étapes.
        </p>
      </div>
    </header>
  );
}

function InfoBlock(): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section className={styles.info} ref={ref} aria-labelledby="contact-info">
      <p className={styles.sectionIndex} data-lines>
        C.01
      </p>
      <h2 id="contact-info" className={styles.sectionTitle} data-lines>
        Coordonnées
      </h2>
      <ul className={styles.infoList}>
        <li className={styles.infoItem}>
          <span className={styles.infoLabel} data-lines>
            Email
          </span>
          <a
            href="mailto:lucas@fyconic.fr"
            className={styles.infoValue}
            data-lines
          >
            lucas@fyconic.fr
          </a>
        </li>
        <li className={styles.infoItem}>
          <span className={styles.infoLabel} data-lines>
            Localisation
          </span>
          <span className={styles.infoValue} data-lines>
            Clermont-Ferrand · Distanciel
          </span>
        </li>
        <li className={styles.infoItem}>
          <span className={styles.infoLabel} data-lines>
            Disponibilité
          </span>
          <span className={styles.infoValue} data-lines>
            Réponse sous 48h ouvrées
          </span>
        </li>
      </ul>
    </section>
  );
}

interface FormBlockProps {
  readonly form: FormState;
  readonly status: SubmitStatus;
  readonly errorMessage: string | null;
  readonly onChange: (key: keyof FormState, value: string) => void;
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function FormBlock({
  form,
  status,
  errorMessage,
  onChange,
  onSubmit,
}: FormBlockProps): React.ReactElement {
  const ref = useScrollReveal<HTMLElement>();
  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <section className={styles.formSection} ref={ref}>
      <p className={styles.sectionIndex} data-lines>
        C.02
      </p>
      <h2 className={styles.sectionTitle} data-lines>
        Formulaire
      </h2>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="contact-prenom" className={styles.label}>
              Prénom
            </label>
            <input
              id="contact-prenom"
              name="prenom"
              type="text"
              autoComplete="given-name"
              required
              className={styles.input}
              value={form.prenom}
              onChange={(e) => {
                onChange("prenom", e.target.value);
              }}
              disabled={isSubmitting || isSuccess}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-nom" className={styles.label}>
              Nom
            </label>
            <input
              id="contact-nom"
              name="nom"
              type="text"
              autoComplete="family-name"
              required
              className={styles.input}
              value={form.nom}
              onChange={(e) => {
                onChange("nom", e.target.value);
              }}
              disabled={isSubmitting || isSuccess}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="contact-email" className={styles.label}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              value={form.email}
              onChange={(e) => {
                onChange("email", e.target.value);
              }}
              disabled={isSubmitting || isSuccess}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-telephone" className={styles.label}>
              Téléphone
              <span className={styles.optional}> (facultatif)</span>
            </label>
            <input
              id="contact-telephone"
              name="telephone"
              type="tel"
              autoComplete="tel"
              className={styles.input}
              value={form.telephone}
              onChange={(e) => {
                onChange("telephone", e.target.value);
              }}
              disabled={isSubmitting || isSuccess}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message" className={styles.label}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            className={styles.textarea}
            value={form.message}
            onChange={(e) => {
              onChange("message", e.target.value);
            }}
            disabled={isSubmitting || isSuccess}
            placeholder="Quelques lignes sur le projet, le contexte, les délais…"
          />
        </div>

        <div className={styles.formFooter}>
          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting || isSuccess}
          >
            <span>
              {isSubmitting
                ? "Envoi en cours…"
                : isSuccess
                  ? "Message envoyé"
                  : "Envoyer le message"}
            </span>
            {!isSubmitting && !isSuccess ? (
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            ) : null}
          </button>

          <p className={styles.legal}>
            En envoyant ce formulaire, vous acceptez d’être recontacté par
            email au sujet de votre demande.
          </p>
        </div>

        {status === "success" ? (
          <p className={styles.feedbackSuccess} role="status" aria-live="polite">
            Merci, votre message est bien parti. Je reviens vers vous sous
            48h ouvrées.
          </p>
        ) : null}
        {status === "error" && errorMessage ? (
          <p className={styles.feedbackError} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </section>
  );
}

export function ContactContent(): React.ReactElement {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (key: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;

    setErrorMessage(null);

    if (
      !form.prenom.trim() ||
      !form.nom.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setStatus("error");
      setErrorMessage("Merci de remplir les champs obligatoires.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus("error");
      setErrorMessage("Adresse email invalide.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: form.prenom.trim(),
          nom: form.nom.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim(),
          message: form.message.trim(),
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setErrorMessage(
          data?.error ??
            "Impossible d'envoyer le message pour le moment. Réessayez dans un instant.",
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Erreur réseau — vérifiez votre connexion et réessayez.",
      );
    }
  };

  return (
    <article className={styles.root}>
      <HeroBlock />
      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.bodyGrid}>
            <InfoBlock />
            <FormBlock
              form={form}
              status={status}
              errorMessage={errorMessage}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
