"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const events = [
  {
    date: { day: "24", month: "Oct" },
    title: "Acrylic Soul Expression",
    description: "Connect with your inner child through fluid acrylic techniques and guided meditation.",
    time: "10:00 AM - 12:30 PM",
    location: "Main Studio",
    spots: 12,
    category: "Art Therapy",
    categoryColor: "bg-coral/10 text-coral",
  },
  {
    date: { day: "26", month: "Oct" },
    title: "Cello & Mindfulness",
    description: "Experience deep relaxation with live cello performances integrated into breathwork.",
    time: "2:00 PM - 3:30 PM",
    location: "Zen Garden",
    spots: 5,
    category: "Music Therapy",
    categoryColor: "bg-teal/10 text-teal",
  },
  {
    date: { day: "29", month: "Oct" },
    title: "Communal Rhythm Circle",
    description: "Join our signature drum circle focused on synchronization and collective healing.",
    time: "4:00 PM - 5:30 PM",
    location: "Outdoor Patio",
    spots: 20,
    category: "Group Healing",
    categoryColor: "bg-lavender/20 text-foreground",
  },
  {
    date: { day: "02", month: "Nov" },
    title: "Vibrational Sound Bath",
    description: "Quartz crystal bowls create a harmonic frequency designed to reduce anxiety.",
    time: "6:00 PM - 7:30 PM",
    location: "Sanctuary Room",
    spots: 0,
    category: "Sound Bath",
    categoryColor: "bg-sunflower/20 text-foreground",
  },
  {
    date: { day: "05", month: "Nov" },
    title: "Pottery & Presence",
    description: "Focus on the tactile sensation of clay as a grounding exercise for daily stress.",
    time: "11:00 AM - 1:00 PM",
    location: "Main Studio",
    spots: 8,
    category: "Art Therapy",
    categoryColor: "bg-coral/10 text-coral",
  },
  {
    date: { day: "08", month: "Nov" },
    title: "Morning Melodic Flow",
    description: "Gentle piano compositions paired with morning stretching and positive affirmations.",
    time: "8:30 AM - 10:00 AM",
    location: "Zen Garden",
    spots: 15,
    category: "Music Therapy",
    categoryColor: "bg-teal/10 text-teal",
  },
];

const eventIds: Record<string, string> = {
  "Acrylic Soul Expression": "evt_001",
  "Cello & Mindfulness": "evt_002",
  "Communal Rhythm Circle": "evt_003",
  "Vibrational Sound Bath": "evt_004",
  "Pottery & Presence": "evt_005",
  "Morning Melodic Flow": "evt_006",
};

type BookingStatus = { type: "success" | "error"; message: string } | null;

export default function Events() {
  const [bookingEvent, setBookingEvent] = useState<(typeof events)[0] | null>(null);
  const [bookForm, setBookForm] = useState({ name: "", email: "", phone: "" });
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const openBooking = (event: (typeof events)[0]) => {
    if (event.spots === 0) return; // sold out
    setBookingEvent(event);
    setBookForm({ name: "", email: "", phone: "" });
    setBookingStatus(null);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingEvent) return;
    setBookingLoading(true);
    setBookingStatus(null);
    try {
      const res = await fetch("/api/events/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: eventIds[bookingEvent.title],
          name: bookForm.name,
          email: bookForm.email,
          phone: bookForm.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed.");
      setBookingStatus({ type: "success", message: data.message });
    } catch (err: unknown) {
      setBookingStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section id="events" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-coral/10 text-coral rounded-full text-sm font-medium mb-4">
            FIND A SESSION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Upcoming Sessions
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover our upcoming art and music therapy sessions, workshops, and 
            community healing circles designed specifically for young people seeking 
            mental wellness and creative expression.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-cream rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-border hover:border-coral/30"
            >
              <div className="flex gap-4">
                {/* Date Block */}
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center border border-border">
                  <span className="text-2xl font-serif font-bold text-coral">
                    {event.date.day}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {event.date.month}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="flex-1">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${event.categoryColor}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mt-4 mb-2 group-hover:text-coral transition-colors">
                {event.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span
                  className={`text-sm font-medium ${
                    event.spots === 0 ? "text-coral" : "text-teal"
                  }`}
                >
                  {event.spots === 0
                    ? "Waitlist Only"
                    : `${event.spots} Spots Left`}
                </span>
                <button
                  onClick={() => openBooking(event)}
                  disabled={event.spots === 0}
                  className="text-coral font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Calendar CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 text-lg font-medium border-teal text-teal hover:bg-teal hover:text-white"
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setBookingEvent(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${bookingEvent.categoryColor} mb-3`}>
                {bookingEvent.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                {bookingEvent.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{bookingEvent.time}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{bookingEvent.location}</span>
              </div>
            </div>

            {bookingStatus?.type === "success" ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-teal mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">You&apos;re registered!</p>
                <p className="text-sm text-muted-foreground">{bookingStatus.message}</p>
                <Button
                  onClick={() => setBookingEvent(null)}
                  className="mt-6 bg-teal hover:bg-teal/90 text-white rounded-full px-8"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Jane Doe"
                    value={bookForm.name}
                    onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    className="rounded-xl bg-cream border-border"
                    required
                    disabled={bookingLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    value={bookForm.email}
                    onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                    className="rounded-xl bg-cream border-border"
                    required
                    disabled={bookingLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Phone (optional)</label>
                  <Input
                    type="tel"
                    placeholder="+254 700 000000"
                    value={bookForm.phone}
                    onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                    className="rounded-xl bg-cream border-border"
                    disabled={bookingLoading}
                  />
                </div>

                {bookingStatus?.type === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {bookingStatus.message}
                  </div>
                )}

                <Button
                  className="w-full bg-coral hover:bg-coral/90 text-white rounded-full py-5 font-medium"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking…" : "Confirm Registration"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
