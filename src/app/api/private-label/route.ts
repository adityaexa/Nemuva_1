import { NextResponse } from "next/server";

// ============================================================================
// INTEGRATION POINT: Private-label / contract manufacturing inquiries
// ----------------------------------------------------------------------------
// Same pattern as /api/bulk-inquiry — see that file for integration ideas
// (database, CRM, email, WhatsApp/Slack notification).
// ============================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["name", "businessName", "email", "phone", "requirement"];
    const missing = required.filter((key) => !body?.[key]);

    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // TODO: persist/forward `body` (private-label inquiry payload) here.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
