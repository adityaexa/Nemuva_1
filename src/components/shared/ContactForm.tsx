"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { FormField, FormTextarea } from "@/components/shared/FormField";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      track("contact_form", { subject: form.subject });
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card-surface p-6 text-[var(--color-green-700)]">
        <p className="font-semibold">Thank you for reaching out.</p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Our team will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface grid gap-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} required />
        <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <FormField label="Subject" name="subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
      </div>
      <FormTextarea label="Message" name="message" rows={5} value={form.message} onChange={(v) => setForm({ ...form, message: v })} error={errors.message} required />
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again in a moment.
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60 sm:w-fit">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
