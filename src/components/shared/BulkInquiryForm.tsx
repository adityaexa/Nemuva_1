"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { FormField, FormSelect, FormTextarea } from "@/components/shared/FormField";

interface FormState {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  buyerType: string;
  quantity: string;
  productType: string;
  packaging: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  city: "",
  country: "India",
  buyerType: "",
  quantity: "",
  productType: "",
  packaging: "",
  message: "",
};

const buyerTypes = ["Wholesaler", "Retailer", "Distributor", "Restaurant/Hotel", "Snack Brand", "Corporate Buyer", "Other"];
const productTypes = ["Raw Makhana", "Premium Makhana", "Roasted Makhana", "Flavoured Makhana", "Mixed / Not Sure Yet"];
const packagingOptions = ["Standard Bulk Bags", "Custom Branded Packaging", "Not Sure Yet"];

export function BulkInquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.businessName.trim()) next.businessName = "Please enter your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    if (!form.buyerType) next.buyerType = "Please select a buyer type.";
    if (!form.quantity.trim()) next.quantity = "Please enter the quantity you need.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/bulk-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      track("bulk_inquiry", { buyerType: form.buyerType, quantity: form.quantity });
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card-surface p-6 text-[var(--color-green-700)]">
        <p className="font-semibold">Thank you — your bulk enquiry has been received.</p>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          Our business team will reach out with pricing and availability shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface grid gap-4 p-6 sm:p-8" id="bulk-inquiry-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} required />
        <FormField label="Business Name" name="businessName" value={form.businessName} onChange={(v) => setForm({ ...form, businessName: v })} error={errors.businessName} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} required />
        <FormField label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} error={errors.phone} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="City" name="city" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        <FormField label="Country" name="country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect label="Buyer Type" name="buyerType" value={form.buyerType} onChange={(v) => setForm({ ...form, buyerType: v })} options={buyerTypes} error={errors.buyerType} required />
        <FormField label="Required Quantity" name="quantity" placeholder="e.g. 50 kg / month" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} error={errors.quantity} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect label="Product Type" name="productType" value={form.productType} onChange={(v) => setForm({ ...form, productType: v })} options={productTypes} />
        <FormSelect label="Packaging Requirement" name="packaging" value={form.packaging} onChange={(v) => setForm({ ...form, packaging: v })} options={packagingOptions} />
      </div>
      <FormTextarea label="Message (optional)" name="message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again in a moment.
        </p>
      )}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60 sm:w-fit">
        {status === "loading" ? "Submitting…" : "Get Bulk Pricing"}
      </button>
    </form>
  );
}
