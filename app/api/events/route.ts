import { NextRequest, NextResponse } from "next/server";

export interface Event {
  id: string;
  date: { day: string; month: string };
  title: string;
  description: string;
  time: string;
  location: string;
  spots: number;
  spotsBooked: number;
  category: "Art Therapy" | "Music Therapy" | "Group Healing" | "Sound Bath";
  categoryColor: string;
  featured: boolean;
  createdAt: string;
}

// Seeded with the events already shown on the frontend
export const eventsStore: Event[] = [
  {
    id: "evt_001",
    date: { day: "24", month: "Oct" },
    title: "Acrylic Soul Expression",
    description:
      "Connect with your inner child through fluid acrylic techniques and guided meditation.",
    time: "10:00 AM - 12:30 PM",
    location: "Main Studio",
    spots: 12,
    spotsBooked: 0,
    category: "Art Therapy",
    categoryColor: "bg-coral/10 text-coral",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt_002",
    date: { day: "26", month: "Oct" },
    title: "Cello & Mindfulness",
    description:
      "Experience deep relaxation with live cello performances integrated into breathwork.",
    time: "2:00 PM - 3:30 PM",
    location: "Zen Garden",
    spots: 5,
    spotsBooked: 0,
    category: "Music Therapy",
    categoryColor: "bg-teal/10 text-teal",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt_003",
    date: { day: "29", month: "Oct" },
    title: "Communal Rhythm Circle",
    description:
      "Join our signature drum circle focused on synchronization and collective healing.",
    time: "4:00 PM - 5:30 PM",
    location: "Outdoor Patio",
    spots: 20,
    spotsBooked: 0,
    category: "Group Healing",
    categoryColor: "bg-lavender/20 text-foreground",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt_004",
    date: { day: "02", month: "Nov" },
    title: "Vibrational Sound Bath",
    description:
      "Quartz crystal bowls create a harmonic frequency designed to reduce anxiety.",
    time: "6:00 PM - 7:30 PM",
    location: "Sanctuary Room",
    spots: 0,
    spotsBooked: 0,
    category: "Sound Bath",
    categoryColor: "bg-sunflower/20 text-foreground",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt_005",
    date: { day: "05", month: "Nov" },
    title: "Pottery & Presence",
    description:
      "Focus on the tactile sensation of clay as a grounding exercise for daily stress.",
    time: "11:00 AM - 1:00 PM",
    location: "Main Studio",
    spots: 8,
    spotsBooked: 0,
    category: "Art Therapy",
    categoryColor: "bg-coral/10 text-coral",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "evt_006",
    date: { day: "08", month: "Nov" },
    title: "Morning Melodic Flow",
    description:
      "Gentle piano compositions paired with morning stretching and positive affirmations.",
    time: "8:30 AM - 10:00 AM",
    location: "Zen Garden",
    spots: 15,
    spotsBooked: 0,
    category: "Music Therapy",
    categoryColor: "bg-teal/10 text-teal",
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

// GET /api/events — list all events, optional ?category= filter
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featuredOnly = searchParams.get("featured") === "true";

  let result = eventsStore;

  if (category) {
    result = result.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featuredOnly) {
    result = result.filter((e) => e.featured);
  }

  const enriched = result.map((e) => ({
    ...e,
    spotsAvailable: Math.max(0, e.spots - e.spotsBooked),
    isSoldOut: e.spots > 0 && e.spotsBooked >= e.spots,
  }));

  return NextResponse.json({ count: enriched.length, events: enriched });
}

// POST /api/events — create a new event (admin)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, date, time, location, spots, category } = body;

    if (!title || !description || !date || !time || !location || !category) {
      return NextResponse.json(
        { error: "title, description, date, time, location, and category are required." },
        { status: 400 }
      );
    }

    const validCategories = ["Art Therapy", "Music Therapy", "Group Healing", "Sound Bath"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: `category must be one of: ${validCategories.join(", ")}` },
        { status: 400 }
      );
    }

    const categoryColors: Record<string, string> = {
      "Art Therapy": "bg-coral/10 text-coral",
      "Music Therapy": "bg-teal/10 text-teal",
      "Group Healing": "bg-lavender/20 text-foreground",
      "Sound Bath": "bg-sunflower/20 text-foreground",
    };

    const newEvent: Event = {
      id: `evt_${Date.now()}`,
      title,
      description,
      date,
      time,
      location,
      spots: spots ?? 0,
      spotsBooked: 0,
      category,
      categoryColor: categoryColors[category],
      featured: body.featured ?? false,
      createdAt: new Date().toISOString(),
    };

    eventsStore.push(newEvent);

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
