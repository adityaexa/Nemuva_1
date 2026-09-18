"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { FormField, FormSelect, FormTextarea } from "@/components/shared/FormField";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  requirement: string;
  estimatedVolume: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  requirement: "",
  estimatedVolume: "",
  message: "",
};

const requirementOptions = [
  "New Private-Label Brand",
  "Add Makhana to Existing Product Line",
  "Custom Flavour Development",
  "Packaging & Labelling Only",
  "Not Sure Yet — Need Guidance",
];

export function PrivateLabelForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.businessName.trim()) next.businessName = "Please enter your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    if (!form.requirement) next.requirement = "Please select what you're looking for.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/private-label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      track("private_label_inquiry", { requirement: form.requirement });
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card-surface p-6 text-[var(--color-green-700)]">
        <p className="font-semibold">Thank you — your private-label enquiry has been received.</p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Our team will get in touch to understand your requirements in more detail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface grid gap-4 p-6 sm:p-8" id="private-label-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" name="pl-name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} required />
        <FormField label="Business Name" name="pl-businessName" value={form.businessName} onChange={(v) => setForm({ ...form, businessName: v })} error={errors.businessName} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email" name="pl-email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} required />
        <FormField label="Phone" name="pl-phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} required />
      </div>
      <FormSelect label="What are you looking for?" name="pl-requirement" value={form.requirement} onChange={(v) => setForm({ ...form, requirement: v })} options={requirementOptions} error={errors.requirement} required />
      <FormField label="Estimated Volume (optional)" name="pl-volume" placeholder="e.g. 200 kg / month" value={form.estimatedVolume} onChange={(v) => setForm({ ...form, estimatedVolume: v })} />
      <FormTextarea label="Tell us more (optional)" name="pl-message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again in a moment.
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60 sm:w-fit">
        {status === "loading" ? "Submitting…" : "Discuss Private Label"}
      </button>
    </form>
  );
}
