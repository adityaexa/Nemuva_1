import { NextResponse } from "next/server";

// ============================================================================
// INTEGRATION POINT: Newsletter signups
// ----------------------------------------------------------------------------
// Currently just validates and echoes success so the frontend flow is fully
// testable end to end. To go live, connect this to a real provider, e.g.:
//   - Mailchimp / Klaviyo / Brevo API (add API key to .env.local, call their
//     "add subscriber" endpoint here)
//   - Your own database + email service (Resend, SendGrid, Postmark, etc.)
// Never expose provider API keys to the client — keep them server-side only.
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 400 });
    }

    // TODO: forward `email` to your email marketing provider / database here.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
