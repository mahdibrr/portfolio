"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Send, Loader2 } from "lucide-react"

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

const copy = {
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project or opportunity…",
    submit: "Send message",
    sending: "Sending…",
    success: "Message sent — I'll get back to you soon.",
    error: "Something went wrong. Please email me directly.",
    nameError: "Please enter your name.",
    emailError: "Please enter a valid email.",
    messageError: "Message should be at least 10 characters.",
    missingKey: "Contact form is not configured yet. Please email me directly.",
  },
  fr: {
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@exemple.com",
    message: "Message",
    messagePlaceholder: "Parlez-moi de votre projet ou opportunité…",
    submit: "Envoyer le message",
    sending: "Envoi…",
    success: "Message envoyé — je vous réponds très vite.",
    error: "Une erreur est survenue. Écrivez-moi directement par email.",
    nameError: "Veuillez saisir votre nom.",
    emailError: "Veuillez saisir un email valide.",
    messageError: "Le message doit faire au moins 10 caractères.",
    missingKey: "Le formulaire n'est pas encore configuré. Écrivez-moi par email.",
  },
} as const

export function ContactForm({ language = "en" }: { language?: "en" | "fr" }) {
  const t = copy[language]
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = z.object({
    name: z.string().min(2, { message: t.nameError }),
    email: z.string().email({ message: t.emailError }),
    message: z.string().min(10, { message: t.messageError }),
    // Honeypot — must stay empty (hidden from real users)
    botcheck: z.string().optional(),
  })

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

  const onSubmit = async (data: FormValues) => {
    if (data.botcheck) return // bot caught
    if (!accessKey) {
      toast.error(t.missingKey)
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `Portfolio contact from ${data.name}`,
          from_name: "mahdibr.online",
        }),
      })
      const json = await res.json()
      if (json.success) {
        toast.success(t.success)
        reset()
      } else {
        toast.error(t.error)
      }
    } catch {
      toast.error(t.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass =
    "w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-[#EDEDF2] placeholder:text-white/45 transition-colors focus:border-indigo-500/60 focus:bg-white/[0.05] outline-none"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left" noValidate>
      {/* Honeypot (hidden) */}
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("botcheck")}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
            {t.name}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t.namePlaceholder}
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register("name")}
          />
          {errors.name && <p className="mt-1.5 text-sm text-rose-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t.emailPlaceholder}
            aria-invalid={!!errors.email}
            className={fieldClass}
            {...register("email")}
          />
          {errors.email && <p className="mt-1.5 text-sm text-rose-400">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t.messagePlaceholder}
          aria-invalid={!!errors.message}
          className={`${fieldClass} resize-none`}
          {...register("message")}
        />
        {errors.message && <p className="mt-1.5 text-sm text-rose-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> {t.sending}
          </>
        ) : (
          <>
            {t.submit}
            <Send size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  )
}
