import { NextRequest, NextResponse } from "next/server";
import { eventsStore } from "../route";

interface Booking {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  bookedAt: string;
  status: "confirmed" | "cancelled";
}

const bookings: Booking[] = [];

function generateId() {
  return `bkg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// POST /api/events/book — book a spot at an event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, name, email, phone, message } = body;

    if (!eventId || !name || !email) {
      return NextResponse.json(
        { error: "eventId, name, and email are required." },
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

    const event = eventsStore.find((e) => e.id === eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const spotsAvailable = event.spots - event.spotsBooked;
    if (event.spots > 0 && spotsAvailable <= 0) {
      return NextResponse.json(
        { error: "Sorry, this event is fully booked." },
        { status: 409 }
      );
    }

    // Prevent double-booking the same email for the same event
    const alreadyBooked = bookings.find(
      (b) =>
        b.eventId === eventId &&
        b.email === email.trim().toLowerCase() &&
        b.status === "confirmed"
    );
    if (alreadyBooked) {
      return NextResponse.json(
        { error: "You already have a confirmed booking for this event." },
        { status: 409 }
      );
    }

    // Increment booked count
    event.spotsBooked += 1;

    const booking: Booking = {
      id: generateId(),
      eventId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      message: message?.trim(),
      bookedAt: new Date().toISOString(),
      status: "confirmed",
    };

    bookings.push(booking);

    console.log(
      `[Booking] ${booking.email} booked "${event.title}" — booking id: ${booking.id}`
    );

    return NextResponse.json(
      {
        success: true,
        message: `You're booked for "${event.title}"! See you there.`,
        booking: {
          id: booking.id,
          event: {
            id: event.id,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
          },
          name: booking.name,
          email: booking.email,
          bookedAt: booking.bookedAt,
        },
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

// GET /api/events/book — list all bookings (admin)
export async function GET() {
  return NextResponse.json({ count: bookings.length, bookings });
}
