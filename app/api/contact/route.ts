import { NextRequest, NextResponse } from "next/server";

/* In-memory store (still useful as a backup log) */
interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  inquiry: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "responded";
}
const contactSubmissions: ContactSubmission[] = [];

function generateId() {
  return `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* Resend email sender
   Set RESEND_API_KEY in your .env.local file.
   Set CONTACT_EMAIL to the address that receives the messages */
async function sendEmailViaResend(submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || "hello@sensations.ke";

  if (!apiKey) {
    // No key set — skip silently (still saves to in-memory store)
    console.warn("[Resend] RESEND_API_KEY not set. Email not sent.");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "The Sensations Website <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: submission.email,
      subject: `New message from ${submission.firstName} ${submission.lastName}${submission.inquiry ? ` — ${submission.inquiry}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f8ff;border-radius:16px;">
          <h2 style="color:#6d4fc9;margin-bottom:4px;">New Contact Message</h2>
          <p style="color:#888;font-size:13px;margin-top:0;">${new Date(submission.createdAt).toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })} EAT</p>
          <hr style="border:none;border-top:1px solid #e8e0f7;margin:24px 0;" />
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${submission.firstName} ${submission.lastName}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${submission.email}" style="color:#6d4fc9;">${submission.email}</a></td></tr>
            ${submission.inquiry ? `<tr><td style="padding:8px 0;color:#888;">Inquiry</td><td style="padding:8px 0;">${submission.inquiry}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#888;">Reference</td><td style="padding:8px 0;font-size:12px;color:#aaa;">${submission.id}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e8e0f7;margin:24px 0;" />
          <p style="font-size:14px;color:#444;white-space:pre-wrap;">${submission.message}</p>
          <hr style="border:none;border-top:1px solid #e8e0f7;margin:24px 0;" />
          <p style="font-size:12px;color:#aaa;text-align:center;">The Sensations — Akili Yangu Raha Yangu · Nairobi, Kenya</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Resend] Failed to send email:", err);
  } else {
    console.log(`[Resend] Email sent for submission ${submission.id}`);
  }
}

/* Also send a confirmation email back to the user*/
async function sendConfirmationEmail(submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "The Sensations <onboarding@resend.dev>",
      to: [submission.email],
      subject: "We received your message — The Sensations",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9f8ff;border-radius:16px;">
          <h2 style="color:#6d4fc9;">Thank you, ${submission.firstName}! 🎨🎵</h2>
          <p style="color:#555;line-height:1.7;">We've received your message and our team will get back to you within <strong>2–4 hours</strong> during working hours (Mon–Sat, 9am–6pm EAT).</p>
          <p style="color:#555;line-height:1.7;">In the meantime, follow us on social media to stay connected with the Sensations community.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="https://sensations.ke" style="background:#6d4fc9;color:white;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">Visit Our Website</a>
          </div>
          <hr style="border:none;border-top:1px solid #e8e0f7;margin:24px 0;" />
          <p style="font-size:12px;color:#aaa;text-align:center;">The Sensations — Akili Yangu Raha Yangu<br/>Nairobi, Kenya · hello@sensations.ke</p>
        </div>
      `,
    }),
  });
}

/* Route handlers*/

// POST /api/contact — submit a contact message
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, inquiry, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message is too short." },
        { status: 400 }
      );
    }

    const submission: ContactSubmission = {
      id: generateId(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      inquiry: inquiry?.trim() || "",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "new",
    };

    contactSubmissions.push(submission);

    // Fire both emails in parallel (non-blocking — errors are logged, not thrown)
    Promise.all([
      sendEmailViaResend(submission).catch(e => console.error("[Resend] Notification error:", e)),
      sendConfirmationEmail(submission).catch(e => console.error("[Resend] Confirmation error:", e)),
    ]);

    console.log(`[Contact] New submission #${submission.id} from ${submission.email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll get back to you within 2–4 hours.",
        id: submission.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/contact — admin: list all submissions
export async function GET() {
  return NextResponse.json({
    count: contactSubmissions.length,
    submissions: contactSubmissions,
  });
}
