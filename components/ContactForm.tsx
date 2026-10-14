"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { identity, type Locale } from "@/lib/portfolio";

const labels = {
  en: {
    title: "A good place to start.",
    name: "Your name",
    email: "Email address",
    message: "A little about your project",
    nameHint: "What should I call you?",
    emailHint: "you@company.com",
    messageHint: "What are you building, and where could I help?",
    submit: "Send enquiry",
    draft: "Open email draft",
    sending: "Sending…",
    sent: "Thank you. Your message has been sent.",
    opened: "Continue in your email app to send your enquiry.",
    error: "The message could not be sent. Please use the direct email link.",
    note: "This opens your email app with your message ready to send.",
  },
  fr: {
    title: "Un bon point de départ.",
    name: "Votre nom",
    email: "Adresse email",
    message: "Quelques mots sur votre projet",
    nameHint: "Comment vous appelez-vous ?",
    emailHint: "vous@entreprise.fr",
    messageHint:
      "Que souhaitez-vous construire et comment puis-je vous aider ?",
    submit: "Envoyer la demande",
    draft: "Ouvrir un brouillon email",
    sending: "Envoi…",
    sent: "Merci. Votre message a bien été envoyé.",
    opened:
      "Continuez dans votre application email pour envoyer votre demande.",
    error: "Le message n’a pas pu être envoyé. Utilisez le lien email direct.",
    note: "Votre application email s’ouvre avec votre message prêt à envoyer.",
  },
};

export function ContactForm({ language = "en" }: { language?: Locale }) {
  const t = labels[language];
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject =
      language === "fr"
        ? `Demande de projet — ${name}`
        : `Project enquiry — ${name}`;
    if (!key) {
      window.location.assign(
        `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${name}\n${email}\n\n${message}`)}`,
      );
      setFeedback(t.opened);
      return;
    }
    setBusy(true);
    setFeedback("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: key,
          name,
          email,
          message,
          subject,
          from_name: identity.name,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      setFeedback(t.sent);
      form.reset();
    } catch {
      setFeedback(t.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit}>
      <h3>{t.title}</h3>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        <label>
          {t.name}
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.nameHint}
            required
            minLength={2}
            maxLength={120}
          />
        </label>
        <label>
          {t.email}
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailHint}
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        {t.message}
        <textarea
          name="message"
          rows={4}
          placeholder={t.messageHint}
          required
          minLength={10}
          maxLength={5000}
        />
      </label>
      <button className="button button-forest" type="submit" disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="spinner" size={18} aria-hidden="true" />
            {t.sending}
          </>
        ) : (
          <>
            {key ? t.submit : t.draft}
            <ArrowUpRight size={19} aria-hidden="true" />
          </>
        )}
      </button>
      {!key && <p className="form-note">{t.note}</p>}
      <p className="form-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </form>
  );
}
