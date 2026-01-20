import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * -----------------------
 * Config (ENV REQUIRED)
 * -----------------------
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const WAITLIST_TO_EMAIL = process.env.WAITLIST_TO_EMAIL!; // hello@odysseyops.app
const FROM_EMAIL = "Odyssey Ops <noreply@odysseycoffee.co>"; // MUST be a verified Resend domain

if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
if (!WAITLIST_TO_EMAIL) throw new Error("WAITLIST_TO_EMAIL not set");

/**
 * -----------------------
 * Rate limiting (simple)
 * -----------------------
 */
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  record.count++;
  return true;
}

/**
 * -----------------------
 * POST /api/waitlist
 * -----------------------
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { name, email, role, sites, country, notes } = body;

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: WAITLIST_TO_EMAIL,
      replyTo: email,
      subject: "New Odyssey Ops waitlist signup",
      text: `
New waitlist signup:

Name: ${name || "-"}
Email: ${email}
Role: ${role || "-"}
Sites: ${sites || "-"}
Country: ${country || "-"}
Notes: ${notes || "-"}
      `,
    });

    // 🔥 FAIL LOUD if Resend reports an error
    if (result.error) {
      console.error("RESEND ERROR:", result.error);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 500 }
      );
    }

    console.log("EMAIL SENT:", result.data);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("UNHANDLED EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 500 }
    );
  }
}
