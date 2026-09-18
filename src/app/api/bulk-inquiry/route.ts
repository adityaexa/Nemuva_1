import { NextResponse } from "next/server";

// ============================================================================
// INTEGRATION POINT: Bulk / wholesale inquiries
// ----------------------------------------------------------------------------
// This route is the single place to wire up real lead handling for B2B
// enquiries. Suggested next steps when you're ready to go live:
//   - Persist the lead to a database (Postgres/MySQL/Airtable/Google Sheets)
//   - Email the sales team (Resend/SendGrid) with the enquiry details
//   - Push to a CRM (HubSpot/Zoho) as a new lead/deal
//   - Optionally notify a WhatsApp Business number or Slack channel
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["name", "businessName", "email", "phone", "buyerType", "quantity"];
    const missing = required.filter((key) => !body?.[key]);

    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // TODO: persist/forward `body` (bulk inquiry payload) here.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
