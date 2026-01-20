import { NextRequest, NextResponse } from "next/server";
import { getResendClient } from "@/lib/resend";

const rateLimit = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, businessName, siteCount, timezone, message } = body;

    if (!name || !email || !businessName || !siteCount || !timezone) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { client, fromEmail } = await getResendClient();
    const toEmail = process.env.WAITLIST_TO_EMAIL || "hello@odysseyops.app";

    await client.emails.send({
      from: fromEmail || "Odyssey Ops <noreply@odysseyops.app>",
      to: [toEmail],
      subject: `New Waitlist Signup: ${businessName}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Name</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Business</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Sites</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${siteCount}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Timezone</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${timezone}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: 600;">Message</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${message}</td>
          </tr>
          ` : ""}
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
