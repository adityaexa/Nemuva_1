import { NextResponse } from "next/server";

// ============================================================================
// INTEGRATION POINT: General contact form submissions
// ----------------------------------------------------------------------------
// Validates required fields and returns success so the UI flow works end to
// end today. To make this live, add one or more of:
//   - An email send (Resend/SendGrid/Postmark) to notify siteConfig.contact.email
//   - A write to your CRM/database (HubSpot, Zoho, Airtable, custom DB)
//   - A forward to a WhatsApp Business API / Slack webhook for fast triage
// Keep all provider secrets in server-only environment variables.
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // TODO: send email / write to CRM / notify team using `body` here.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
