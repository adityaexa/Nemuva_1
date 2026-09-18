"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";

export function Newsletter({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      track("newsletter_signup", { email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <p className={isDark ? "text-sm font-medium text-white" : "text-sm font-medium text-[var(--color-green-700)]"}>
        Thank you for subscribing — welcome to Nemuva.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-invalid={status === "error"}
        className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none ${
          isDark
            ? "border-white/25 bg-white/10 text-white placeholder:text-white/50"
            : "border-[var(--color-beige-dark)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]"
        }`}
      />
      <button type="submit" disabled={status === "loading"} className="btn-gold shrink-0 disabled:opacity-60">
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-xs text-red-300 sm:absolute sm:mt-10">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
