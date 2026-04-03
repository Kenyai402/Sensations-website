import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // Check for existing subscriber in Supabase
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", normalised)
      .single();

    if (existing) {
      if (existing.active) {
        return NextResponse.json(
          { error: "This email is already subscribed." },
          { status: 409 }
        );
      }

      // Re-activate if previously unsubscribed
      await supabase
        .from("newsletter_subscribers")
        .update({ active: true })
        .eq("email", normalised);

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

    // Save to Supabase
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        id: subscriber.id,
        email: subscriber.email,
        subscribed_at: subscriber.subscribedAt,
        active: subscriber.active,
      });

    if (error) {
      console.error("[Supabase] Newsletter insert error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

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
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // Check if subscriber exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", normalised)
      .single();

    if (!existing || !existing.active) {
      return NextResponse.json(
        { error: "Email not found in subscriber list." },
        { status: 404 }
      );
    }

    // Set active to false
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ active: false })
      .eq("email", normalised);

    if (error) {
      console.error("[Supabase] Unsubscribe error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You've been unsubscribed.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/newsletter — subscriber count
export async function GET() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const active = data.filter((s) => s.active).length;

  return NextResponse.json({
    total: data.length,
    active,
  });
}