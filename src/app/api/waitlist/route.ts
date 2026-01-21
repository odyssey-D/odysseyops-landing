import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Simple in-memory rate limit (OK for MVP; resets on cold starts)
 */
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 60s
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
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

function jsonError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error: message, ...(extra ?? {}) }, { status });
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  // ---- Env vars (required) ----
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const WAITLIST_TO_EMAIL = process.env.WAITLIST_TO_EMAIL; // <-- set to hello@odysseyops.app
  // Option A: use a VERIFIED SENDING address/domain in Resend:
  // e.g. "Odyssey Ops <noreply@odysseycoffee.cy>" or Resend sandbox domain if that’s what you have verified.
  const WAITLIST_FROM_EMAIL =
    process.env.WAITLIST_FROM_EMAIL || "Odyssey Ops <noreply@odysseycoffee.cy>";

  if (!RESEND_API_KEY) return jsonError("Server misconfigured: RESEND_API_KEY missing", 500);
  if (!WAITLIST_TO_EMAIL) return jsonError("Server misconfigured: WAITLIST_TO_EMAIL missing", 500);

  const resend = new Resend(RESEND_API_KEY);

  // ---- Parse body ----
  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const sites = String(body?.sites ?? "").trim();
  const country = String(body?.country ?? "").trim();
  const notes = String(body?.notes ?? "").trim();

  if (!name || !email) {
    return jsonError("Name and email are required", 400);
  }
  // basic email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError("Please enter a valid email address", 400);
  }

  const subject = `Odyssey Ops Waitlist: ${name} (${email})`;

  const textLines = [
    `New waitlist signup`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    sites ? `Sites: ${sites}` : null,
    country ? `Country: ${country}` : null,
    notes ? `Notes: ${notes}` : null,
    ``,
    `IP: ${ip}`,
    `Timestamp: ${new Date().toISOString()}`,
  ].filter(Boolean);

  const text = textLines.join("\n");

  try {
    const result = await resend.emails.send({
      from: WAITLIST_FROM_EMAIL,
      to: WAITLIST_TO_EMAIL,
      replyTo: email, // so you can hit reply and respond to the person
      subject,
      text,
    });

    // FAIL LOUD + LOG
    console.log("[waitlist] resend result:", JSON.stringify(result));

    // Resend returns either { data } or { error } depending on SDK/version
    const anyResult: any = result as any;
    if (anyResult?.error) {
      return jsonError("Email delivery failed", 502, { providerError: anyResult.error });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    // FAIL LOUD + LOG
    console.error("[waitlist] resend exception:", err);
    return jsonError("Email delivery failed", 502, {
      detail: err?.message || "Unknown error",
    });
  }
}
