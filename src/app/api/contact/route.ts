import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact form submission endpoint.
// Expects JSON { prenom, nom, email, telephone?, message }.
// Delivers to CONTACT_TO_EMAIL (default lucas@fyconic.fr) via Resend.
//
// Env:
//   RESEND_API_KEY      required — obtain from https://resend.com/api-keys
//   CONTACT_FROM_EMAIL  optional — must be on a domain verified in Resend
//                        (default: onboarding@resend.dev for sandbox use)
//   CONTACT_TO_EMAIL    optional — override the destination inbox

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "lucas@fyconic.fr";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

interface ContactPayload {
  readonly prenom?: unknown;
  readonly nom?: unknown;
  readonly email?: unknown;
  readonly telephone?: unknown;
  readonly message?: unknown;
}

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Le service email n'est pas configuré." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return badRequest("Corps de requête invalide.");
  }

  const prenom = asTrimmedString(payload.prenom, 120);
  const nom = asTrimmedString(payload.nom, 120);
  const email = asTrimmedString(payload.email, 200);
  const telephone = asTrimmedString(payload.telephone, 40);
  const message = asTrimmedString(payload.message, 5000);

  if (!prenom || !nom || !email || !message) {
    return badRequest("Merci de remplir les champs obligatoires.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return badRequest("Adresse email invalide.");
  }

  const subject = `Nouveau message de ${prenom} ${nom}`;
  const textLines = [
    `De : ${prenom} ${nom} <${email}>`,
    telephone ? `Téléphone : ${telephone}` : null,
    "",
    message,
  ].filter((line): line is string => line !== null);
  const text = textLines.join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; line-height: 1.5;">
      <p><strong>De :</strong> ${escapeHtml(prenom)} ${escapeHtml(nom)} &lt;${escapeHtml(email)}&gt;</p>
      ${telephone ? `<p><strong>Téléphone :</strong> ${escapeHtml(telephone)}</p>` : ""}
      <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `.trim();

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (result.error) {
    return NextResponse.json(
      { error: "Impossible d'envoyer le message pour le moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
