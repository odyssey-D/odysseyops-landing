import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    console.error("WAITLIST ERROR: Invalid JSON body");
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body?.email;

  if (!email) {
    console.error("WAITLIST ERROR: Missing email");
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const result = await resend.emails.send({
      from: "Odyssey Ops <hello@odysseyops.app>",
      to: process.env.WAITLIST_TO_EMAIL!,
      subject: "New Odyssey Ops waitlist signup",
      text: `New waitlist signup: ${email}`,
    });

    // 🔴 THIS IS THE CRITICAL PART
    console.log("RESEND RESPONSE:", result);

    if ((result as any).error) {
      console.error("RESEND FAILED:", (result as any).error);
      return Response.json(
        { error: "Email delivery failed" },
        { status: 500 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("WAITLIST UNHANDLED ERROR:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
