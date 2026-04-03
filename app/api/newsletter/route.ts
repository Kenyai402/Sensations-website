import { NextRequest, NextResponse } from "next/server";

// In-memory store — swap with a real DB or Mailchimp/Resend integration in production
const subscribers: Subscriber[] = [];

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

function generateId() {
  return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// POST /api/newsletter — subscribe an email
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // Check for duplicate
    const existing = subscribers.find((s) => s.email === normalised);
    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }
      // Re-activate if previously unsubscribed
      existing.active = true;
      return NextResponse.json(
        { success: true, message: "Welcome back! You've been re-subscribed." },
        { status: 200 }
      );
    }

    const subscriber: Subscriber = {
      id: generateId(),
      email: normalised,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    subscribers.push(subscriber);

    console.log(`[Newsletter] New subscriber: ${subscriber.email} — id: ${subscriber.id}`);

    return NextResponse.json(
      {
        success: true,
        message: "You're in! Welcome to the Sensations community.",
        id: subscriber.id,
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

// DELETE /api/newsletter — unsubscribe
export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const normalised = email.trim().toLowerCase();
    const subscriber = subscribers.find((s) => s.email === normalised);

    if (!subscriber || !subscriber.active) {
      return NextResponse.json(
        { error: "Email not found in subscriber list." },
        { status: 404 }
      );
    }

    subscriber.active = false;

    return NextResponse.json({ success: true, message: "You've been unsubscribed." });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/newsletter — subscriber count (admin use)
export async function GET() {
  const active = subscribers.filter((s) => s.active).length;
  return NextResponse.json({ total: subscribers.length, active });
}
