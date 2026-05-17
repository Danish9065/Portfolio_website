import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitContact } from "../api/contact";
import { trackEvent } from "../lib/events";
import { ContactPayload } from "../types/api";
import { useToast } from "./ToastProvider";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  purpose: z.enum(["job", "freelance", "general"]),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, "Please share at least 20 characters"),
  website: z.string().optional()
});

export function ContactForm() {
  const { notify } = useToast();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactPayload>({ resolver: zodResolver(schema), defaultValues: { purpose: "job" } });

  async function onSubmit(values: ContactPayload) {
    setSubmitState("idle");
    setStatusMessage("");
    try {
      const response = await submitContact(values);
      trackEvent("contact_submitted", { purpose: values.purpose, status: response.status });
      notify(response.message, response.status === "error" ? "error" : "success");
      setStatusMessage(response.message);
      if (response.status === "error") {
        setSubmitState("error");
        return;
      }
      setSubmitState("success");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Contact request failed";
      setSubmitState("error");
      setStatusMessage(message);
      notify(message, "error");
    }
  }

  const input = "w-full rounded-md border border-white/12 bg-ink/70 px-3 py-3 text-sm text-white placeholder:text-muted outline-none transition focus:border-accent/70";
  const error = "mt-1 text-xs text-red-200";
  const buttonCopy = isSubmitting ? "Sending..." : submitState === "success" ? "Message sent" : submitState === "error" ? "Try again" : "Send message";
  const ButtonIcon = isSubmitting ? Loader2 : submitState === "success" ? CheckCircle2 : submitState === "error" ? TriangleAlert : Send;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card grid gap-4 rounded-lg p-6">
      <input className={input} placeholder="Name" {...register("name")} />
      {errors.name ? <p className={error}>{errors.name.message}</p> : null}
      <input className={input} placeholder="Email" {...register("email")} />
      {errors.email ? <p className={error}>{errors.email.message}</p> : null}
      <select className={input} {...register("purpose")}>
        <option value="job">Job / hiring</option>
        <option value="freelance">Freelance project</option>
        <option value="general">General</option>
      </select>
      <div className="grid gap-4 md:grid-cols-2">
        <input className={input} placeholder="Company optional" {...register("company")} />
        <input className={input} placeholder="Budget optional" {...register("budget")} />
      </div>
      <textarea className={`${input} min-h-36`} placeholder="What should we discuss?" {...register("message")} />
      {errors.message ? <p className={error}>{errors.message.message}</p> : null}
      <input className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      {statusMessage ? (
        <p className={`rounded-md border px-3 py-2 text-sm ${submitState === "error" ? "border-red-300/25 bg-red-400/10 text-red-100" : "border-accent/25 bg-accent/10 text-mist"}`} aria-live="polite">
          {statusMessage}
        </p>
      ) : null}
      <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-ink transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
        <ButtonIcon className={`h-4 w-4 ${isSubmitting ? "animate-spin" : ""}`} />
        {buttonCopy}
      </button>
    </form>
  );
}
