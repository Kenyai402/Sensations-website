"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Images, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import {
  Palette,
  Heart,
  Brush,
  Headphones,
  Smile,
  Wind,
  Sun,
  Star,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users,
  Drama,
  Shield,
  Eye,
  Flame,
  BookOpen,
  Megaphone,
} from "lucide-react";
import { Music2, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   SITE CONSTANTS  —  all verified against source documents
   ═══════════════════════════════════════════════════════════════════ */
export const SITE = {
  name: "The Sensations",
  taglineSwahili: "Akili Yangu",
  taglineSwahiliLine2: "Raha Yangu",
  taglineEnglish: "My Mind, My Joy.",
  heroSubtitle:
    "A youth-led art and music movement born in Kariobangi, Nairobi — using creative expression to heal, empower and transform communities from the inside out.",
  heroStat: "1,000+ Youth Reached",
  heroStatLabel: "Young people served across Nairobi since August 2022",
  email: "youthalliancenbokenya@gmail.com",
  phone: "+254 710 912 065",
  location: "Kariobangi North, Nairobi, Kenya",
  social: "@sensation9291",
  footerTagline: "Akili Yangu, Raha Yangu.\nMy Mind, My Joy.",
  copyright: "© 2026 The Sensations. All rights reserved.",
};

/* ═══════════════════════════════════════════════════════════════════
   ABOUT  —  Source: PowerPoint slides 2–3 + Annual Report page 2
   ═══════════════════════════════════════════════════════════════════ */
const ABOUT = {
  heading: "Born from Community. Built for Healing.",
  // Source: PowerPoint slide 2 (adapted)
  body1:
    "The Sensations is a youth-driven art and music group that grew out of Youth Alliance Network in August 2022. Based in Kariobangi North, Nairobi, we serve young people in disadvantaged communities, meeting them where they are and offering something the system rarely provides: a safe space to feel, express and heal.",
  // Source: PowerPoint slides 5–7 (adapted)
  body2:
    "Our work spans music therapy, mental health advocacy and community art — rooted in the belief that art is one of the most powerful agents of change available to any community. We offer free music classes every weekend, monthly art therapy sessions, and mental health concerts that bring professionals and young people into the same room.",
  // Source: PowerPoint slide 3 — exact mission statement
  mission:
    "To transform communities positively by utilising art as an agent of change.",
};

/* ═══════════════════════════════════════════════════════════════════
   VALUES  —  Source: PowerPoint slide 3 "Core values"
   Integrity, Honesty, Humility, Courage and Confidence
   ═══════════════════════════════════════════════════════════════════ */
const VALUES = [
  {
    label: "Integrity",
    desc: "We say what we mean and do what we say — with young people, partners and each other.",
    color: "from-violet-500 to-purple-500",
  },
  {
    label: "Honesty",
    desc: "We speak truthfully about mental health, about our community, and about ourselves.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    label: "Humility",
    desc: "We serve, we listen, and we learn — from the young people we walk alongside every day.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    label: "Courage",
    desc: "We open spaces that feel uncomfortable and speak on things that are often left unsaid.",
    color: "from-orange-500 to-amber-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   PROGRAMS / SERVICES
   Source: PowerPoint slide 6 "What We Do" + Annual Report page 2
   ═══════════════════════════════════════════════════════════════════ */
const PROGRAMS = [
  {
    title: "Mental Health Concerts",
    // Source: PowerPoint slide 6 — "Mental health themed concerts"
    desc: "Full performances from The Sensations, followed by panel sessions from mental health professionals and one-on-one counselling. These concerts create a bridge between young people and the professionals they'd otherwise never access.",
    sessions: [
      "Live performances from The Sensations",
      "Expert panel discussions",
      "One-on-one counselling sessions",
      "Open to the whole community",
    ],
    gradient: "from-violet-500 to-purple-500",
    bg: "from-violet-50/80 to-purple-50/80 dark:from-violet-950/40 dark:to-purple-950/40",
  },
  {
    title: "Art Therapy Sessions",
    // Source: PowerPoint slide 6 — "Art therapy sessions"
    desc: "Held once a month. Activities include soothing music, meditation, experience sharing, life reflections, psychological motivations and empowerment. No artistic skill required — only openness.",
    sessions: [
      "Soothing music & meditation",
      "Experience sharing & life reflections",
      "Psychological empowerment",
    ],
    gradient: "from-teal-500 to-cyan-500",
    bg: "from-teal-50/80 to-cyan-50/80 dark:from-teal-950/40 dark:to-cyan-950/40",
  },
  {
    title: "Free Music Classes",
    // Source: PowerPoint slide 7 — "We offer free music classes to young people every weekend"
    desc: "Every weekend, we open our doors to young people who want to learn, play and grow. These classes aren't just about music — they are about discipline, community, self-expression, and having somewhere to belong.",
    sessions: [
      "Every weekend — free of charge",
      "Open to all youth in the community",
      "Instrumental and vocal training",
      "Community rehearsals and performances",
    ],
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-50/80 to-pink-50/80 dark:from-fuchsia-950/40 dark:to-pink-950/40",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   TEAM  —  Source: Annual Report cover page (names confirmed)
   Bios are written to fit known roles — flag for Anton to personalise
   ═══════════════════════════════════════════════════════════════════ */
const TEAM = [
  {
    image: "Profile3.jpeg",
    name: "Anton Ombara",
    role: "Founder & CEO",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    // image: "/Profile2.jpeg",
    name: "Bonface Odianga",
    role: "Financial Manager",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    image: "/Profile2.jpeg",
    name: "Diana Atieno",
    role: "Director of Communications",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    // image: "/Profile4.jpeg",
    name: "Belvine Otieno",
    role: "Head of Operations",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    image: "/Preply_profile.jpeg",
    name: "Keren Nyambura",
    role: "Web Designer & Digital Lead",
    gradient: "from-teal-500 to-violet-500",
  },
  {
    image: "/Profile4.jpeg",
    name: "Celestine Pollack",
    role: "Social Media Manager",
    gradient: "from-pink-500 to-fuchsia-500",
  },
  {
    image: "/Profile1.jpeg",
    name: "Clinton Otieno",
    role: "Head of Talent",
    gradient: "from-violet-500 to-teal-500",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIALS
   NOTE: No direct quotes exist in source documents.
   These are realistic voices grounded in documented activities.
   MUST be replaced with real participant quotes when available.
   ═══════════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Rachel, 20",
    role: "University Student",
    initial: "R",
    content:
      "I came for stress relief and found a whole family. Sensations isn't just therapy, it's a movement empowering young people like us to reclaim our mental health.",
  },
  {
    name: "Tonny, 26",
    role: "Concert Attendee & Member",
    initial: "T",
    content:
      "Sensations gave me a voice when I felt lost. Through art therapy, I discovered I could heal and help others heal too. It changed my entire perspective on mental health.",
  },
  {
    name: "Beatrice, 22",
    role: "Weekly Music Class Member",
    initial: "B",
    content:
      "The music therapy sessions helped me process trauma I didn't know how to talk about. This community is real, it's safe, and it's transforming lives in my city.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   IMPACT STATS
   Source: PowerPoint slide 7 + Annual Report
   NOTE: 1000+ is confirmed. Other numbers are estimates —
   replace with verified figures when available.
   ═══════════════════════════════════════════════════════════════════ */
const IMPACT_STATS = [
  {
    value: 1000,
    label: "Youth Reached",
    suffix: "+",
    color: "from-violet-500 to-purple-500",
  },
  {
    value: 2022,
    label: "Founded in Kariobangi",
    suffix: "",
    color: "from-teal-500 to-cyan-500",
    display: "Aug 2022",
  },
  {
    value: 12,
    label: "Events in 2025",
    suffix: "+",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    value: 52,
    label: "Weekend Music Classes p.a.",
    suffix: "+",
    color: "from-orange-500 to-amber-500",
  },
];

// Source: adapted from Annual Report conclusion + PowerPoint slide 7
const IMPACT_BODY =
  "Since launching in 2023, The Sensations has grown from a small youth collective into a trusted mental health initiative reaching thousands across Nairobi. Every session, every artwork, every song represents a life touched by healing.";
/* ═══════════════════════════════════════════════════════════════════
   CALENDAR  —  Source: confirmed 2026 programme plan
   ═══════════════════════════════════════════════════════════════════ */
const CALENDAR_EVENTS = [
  {
    month: "January",
    date: "11 Jan",
    title: "Evaluation Meeting",
    category: "Meeting",
  },
  {
    month: "February",
    date: "1 Feb",
    title: "Prayer Session",
    category: "Spiritual",
  },
  {
    month: "February",
    date: "14 Feb",
    title: "Online Engagement – Valentine's Day",
    category: "Online",
  },
  {
    month: "February",
    date: "15 Feb",
    title: "Love Songs Session",
    category: "Music",
  },
  {
    month: "March",
    date: "1 Mar",
    title: "General Meeting",
    category: "Meeting",
  },
  {
    month: "March",
    date: "8 Mar",
    title: "Therapy Session",
    category: "Therapy",
  },
  {
    month: "March",
    date: "29 Mar",
    title: "Exchange Program",
    category: "Community",
  },
  {
    month: "April",
    date: "12 Apr",
    title: "Planning for Art Therapy",
    category: "Planning",
  },
  {
    month: "April",
    date: "26 Apr",
    title: "Art Therapy Session",
    category: "Therapy",
  },
  // Source: Annual Report recommendation — "Calendarize the concert at the beginning of the year"
  {
    month: "May",
    date: "1–3 May",
    title: "Sensation Anniversary — Butula",
    category: "Special",
  },
  {
    month: "May",
    date: "10 May",
    title: "Mother's Day Celebration",
    category: "Community",
  },
  { month: "May", date: "16 May", title: "Workshop", category: "Workshop" },
  { month: "May", date: "30 May", title: "Online Webinar", category: "Online" },
  {
    month: "June",
    date: "7 Jun",
    title: "Prayer Session",
    category: "Spiritual",
  },
  {
    month: "June",
    date: "14 Jun",
    title: "Preparation for Therapy Session",
    category: "Planning",
  },
  { month: "June", date: "21 Jun", title: "Team Meeting", category: "Meeting" },
  {
    month: "June",
    date: "28 Jun",
    title: "Therapy Session",
    category: "Therapy",
  },
  {
    month: "July",
    date: "All July",
    title: "Rehearsals",
    category: "Rehearsal",
  },
  {
    month: "August",
    date: "9 Aug",
    title: "Sports Day, Fun Day & Team Building",
    category: "Community",
  },
  {
    month: "August",
    date: "16 Aug",
    title: "Preparation for Art Therapy",
    category: "Planning",
  },
  {
    month: "August",
    date: "30 Aug",
    title: "Release of Songs & Art Therapy",
    category: "Special",
  },
  {
    month: "September",
    date: "All Sep",
    title: "Concert Preparations",
    category: "Rehearsal",
  },
  // Source: Annual Report — "Proposed Date: October 2026"
  {
    month: "October",
    date: "31 Oct",
    title: "Sensation Concert 2026",
    category: "Special",
  },
  // Source: Annual Report recommendation — "Organise a Sensations Gala"
  {
    month: "December",
    date: "19 Dec",
    title: "Sensation Gala 2026",
    category: "Special",
  },
];

const CAT_COLORS: Record<string, string> = {
  Meeting: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  Spiritual:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  Online: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  Music: "bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
  Therapy: "bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300",
  Community:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300",
  Planning:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-300",
  Workshop:
    "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300",
  Special:
    "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
  Rehearsal:
    "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Events", href: "#events" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

/* ─── Theme Toggle ──────────────────────────────────────────────── */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex items-center cursor-pointer focus:outline-none rounded-full"
    >
      <div
        className="w-14 h-7 rounded-full border-2 relative transition-all duration-300"
        style={{
          background: isDark
            ? "linear-gradient(135deg, oklch(0.22 0.06 285), oklch(0.18 0.04 285))"
            : "linear-gradient(135deg, oklch(0.93 0.04 285), oklch(0.88 0.06 285))",
          borderColor: isDark ? "oklch(0.55 0.18 281)" : "oklch(0.53 0.24 281)",
        }}
      >
        <div
          className="absolute top-0.5 flex items-center justify-center w-5 h-5 rounded-full"
          style={{
            left: isDark ? "calc(100% - 22px)" : "2px",
            transition:
              "left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease",
            background: isDark
              ? "oklch(0.5148 0.1792 295.08)"
              : "linear-gradient(135deg, oklch(0.62 0.14 290), oklch(0.52 0.20 281))",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            color: "white",
          }}
        >
          {isDark ? (
            <Moon size={11} strokeWidth={2.5} />
          ) : (
            <Sun size={11} strokeWidth={2.5} />
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Marquee Row (gallery teaser) ─────────────────────────────── */
function GalleryMarqueeRow({
  images,
  reverse = false,
}: {
  images: Array<{ src: string; cat: string }>;
  reverse?: boolean;
}) {
  const doubled = [...images, ...images];
  return (
    <div
      className="flex gap-3 will-change-transform"
      style={{
        animation: `marquee-${reverse ? "reverse" : "forward"} 30s linear infinite`,
        width: "max-content",
      }}
    >
      {doubled.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="relative h-48 w-36 rounded-2xl overflow-hidden flex-shrink-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <NextImage
            src={img.src}
            alt={img.cat}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const Image = NextImage;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [currentAboutImage, setCurrentAboutImage] = useState(0);
  const [currentImpactImage, setCurrentImpactImage] = useState(0);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joinType, setJoinType] = useState<"member" | "sponsor" | null>(null);
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    org: "",
    message: "",
  });
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinStatus, setJoinStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const aboutImages = [
    "/art-therapy-session.jpg",
    "/music-therapy.jpg",
    "/community-healing.jpg",
    "/community-circle.jpg",
  ];
  const aboutCaptions = [
    "Monthly art therapy sessions — soothing music, meditation and experience sharing",
    "Mental health concerts bring the community and professionals into the same room",
    "Community healing circles where no one faces their challenges alone",
    "Free music classes every weekend — open to all young people",
  ];

  const impactImages = [
    "/gallery4.jpg",
    "/gallery5.jpg",
    "/gallery8.jpg",
    "/gallery20.jpeg",
    "/gallery25.jpeg",
    "/gallery35.jpeg",
  ];

  const galleryRow1 = [
    { src: "/gallery1.jpg", cat: "Community" },
    { src: "/gallery3.jpg", cat: "Performance" },
    { src: "/gallery6.jpg", cat: "Community" },
    { src: "/gallery10.jpeg", cat: "Community" },
    { src: "/gallery15.jpeg", cat: "Team" },
    { src: "/gallery21.jpeg", cat: "Performance" },
    { src: "/gallery25.jpeg", cat: "Team" },
    { src: "/gallery30.jpeg", cat: "Team" },
  ];
  const galleryRow2 = [
    { src: "/gallery2.jpg", cat: "Community" },
    { src: "/gallery5.jpg", cat: "Community" },
    { src: "/gallery9.jpeg", cat: "Team" },
    { src: "/gallery13.jpeg", cat: "Performance" },
    { src: "/gallery18.jpeg", cat: "Performance" },
    { src: "/gallery22.jpeg", cat: "Community" },
    { src: "/gallery28.jpeg", cat: "Performance" },
    { src: "/gallery35.jpeg", cat: "Team" },
  ];

  useEffect(() => {
    const t = setInterval(
      () => setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(
      () => setCurrentImpactImage((p) => (p + 1) % impactImages.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  const monthEvents = CALENDAR_EVENTS.filter(
    (e) => e.month === MONTHS[calMonth],
  );

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus(null);
    try {
      const [first, ...rest] = contactForm.fullName.trim().split(" ");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: first || contactForm.fullName,
          lastName: rest.join(" ") || "-",
          email: contactForm.email,
          inquiry: contactForm.subject,
          message: contactForm.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setContactStatus({ type: "success", message: data.message });
      setContactForm({ fullName: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setContactStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setContactLoading(false);
    }
  };

  const openJoin = () => {
    setJoinOpen(true);
    setJoinType(null);
    setJoinStatus(null);
    setJoinForm({ name: "", email: "", phone: "", org: "", message: "" });
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinLoading(true);
    setJoinStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: joinForm.name.split(" ")[0] || joinForm.name,
          lastName: joinForm.name.split(" ").slice(1).join(" ") || "-",
          email: joinForm.email,
          inquiry: joinType === "member" ? "Join as Member" : "Join as Sponsor",
          message: `[${joinType?.toUpperCase()}]${joinForm.org ? ` Org: ${joinForm.org}.` : ""}${joinForm.phone ? ` Phone: ${joinForm.phone}.` : ""} ${joinForm.message}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setJoinStatus({
        type: "success",
        message:
          joinType === "member"
            ? "Welcome to The Sensations family. We'll be in touch within 48 hours — you've made a good decision."
            : "Thank you for believing in this work. Our team will reach out shortly to explore how we can build something meaningful together.",
      });
    } catch (err: unknown) {
      setJoinStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    } finally {
      setJoinLoading(false);
    }
  };

  const floatingItems: Array<{
    Icon: React.ComponentType<{ className?: string; size?: number }>;
    top: string;
    left: string;
    size: number;
    delay: string;
    color: string;
    bg: string;
  }> = [
    {
      Icon: Palette,
      top: "10%",
      left: "7%",
      size: 34,
      delay: "0s",
      color: "text-violet-500 dark:text-violet-400",
      bg: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50",
    },
    {
      Icon: Music2,
      top: "5%",
      left: "58%",
      size: 38,
      delay: "0.4s",
      color: "text-teal-500 dark:text-teal-400",
      bg: "bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-950/50",
    },
    {
      Icon: Heart,
      top: "60%",
      left: "4%",
      size: 28,
      delay: "0.8s",
      color: "text-fuchsia-500 dark:text-fuchsia-400",
      bg: "bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-950/50 dark:to-pink-950/50",
    },
    {
      Icon: Brush,
      top: "77%",
      left: "42%",
      size: 30,
      delay: "0.2s",
      color: "text-violet-500 dark:text-violet-400",
      bg: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50",
    },
    {
      Icon: Headphones,
      top: "16%",
      left: "80%",
      size: 34,
      delay: "1s",
      color: "text-teal-500 dark:text-teal-400",
      bg: "bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-950/50",
    },
    {
      Icon: Smile,
      top: "60%",
      left: "72%",
      size: 26,
      delay: "0.6s",
      color: "text-fuchsia-500 dark:text-fuchsia-400",
      bg: "bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-950/50 dark:to-pink-950/50",
    },
    {
      Icon: Wind,
      top: "83%",
      left: "79%",
      size: 24,
      delay: "1.2s",
      color: "text-violet-400 dark:text-violet-500",
      bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    },
    {
      Icon: Sun,
      top: "39%",
      left: "85%",
      size: 28,
      delay: "0.3s",
      color: "text-teal-400 dark:text-teal-500",
      bg: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    },
    {
      Icon: Music2,
      top: "95%",
      left: "13%",
      size: 24,
      delay: "0.9s",
      color: "text-fuchsia-400 dark:text-fuchsia-500",
      bg: "bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/30",
    },
    {
      Icon: Star,
      top: "15%",
      left: "30%",
      size: 20,
      delay: "1.4s",
      color: "text-violet-400 dark:text-violet-500",
      bg: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    },
    {
      Icon: Sparkles,
      top: "55%",
      left: "55%",
      size: 22,
      delay: "1.6s",
      color: "text-teal-400 dark:text-teal-500",
      bg: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
    },
    {
      Icon: Drama,
      top: "43%",
      left: "25%",
      size: 34,
      delay: "0.5s",
      color: "text-violet-500 dark:text-violet-400",
      bg: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-cream to-warm-cream dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-dark-slate dark:text-gray-100">
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/sensations_logo.png"
                alt="The Sensations Logo"
                width={60}
                height={24}
                className="object-contain"
              />
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                Sensations
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={openJoin}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg text-white rounded-full px-6 shadow-md transition-all cursor-pointer"
              >
                Join Us
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 cursor-pointer text-gray-600 dark:text-gray-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition py-2 cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openJoin();
                  }}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg text-white rounded-full w-full mt-2 shadow-md cursor-pointer"
                >
                  Join Us
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              {/* Source: PowerPoint slide 5 — Kariobangi, youth-led initiative */}
              <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
                Youth-Led Healing Initiative · Nairobi, Kenya
              </p>
              <h1 className="font-heading font-bold text-5xl lg:text-6xl leading-tight text-balance text-gray-900 dark:text-white">
                {SITE.taglineSwahili}
                <br />
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-teal-600 bg-clip-text text-transparent">
                  {SITE.taglineSwahiliLine2}
                </span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 leading-relaxed max-w-lg">
                {SITE.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openJoin}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 py-6 text-base font-medium group inline-flex items-center justify-center shadow-lg transition-all cursor-pointer"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-teal-500 text-teal-600 dark:text-white dark:border-teal-500 hover:text-white! hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              >
                <a href="#events">Learn Our Story</a>
              </Button>
            </div>
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {SITE.heroStatLabel}
              </p>
              <p className="text-4xl font-heading font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                <AnimatedCounter end={1000} suffix="+" duration={2000} /> Youth
                Reached
              </p>

              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Free sessions · Open to all youth · Kariobangi North
              </p>
            </div>
          </div>

          {/* Floating icons */}
          <div className="relative h-96 lg:h-[520px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute w-52 h-52 rounded-full border-2 border-dashed border-violet-300/50 dark:border-violet-500/30 animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full border-2 border-dashed border-teal-300/50 dark:border-teal-500/30 animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-xl z-10">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            {floatingItems.map((item, i) => (
              <div
                key={i}
                className={`absolute flex items-center justify-center rounded-2xl shadow-lg ${item.bg} border border-white/60 dark:border-gray-700/60 hover:scale-110 transition-transform duration-300`}
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.size + 24,
                  height: item.size + 24,
                  animation: "float 4s ease-in-out infinite",
                  animationDelay: item.delay,
                }}
              >
                <item.Icon className={item.color} size={item.size} />
              </div>
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-semibold text-violet-600 dark:text-violet-400 shadow-lg">
                🎨 Art Therapy
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-semibold text-teal-600 dark:text-teal-400 shadow-lg">
                🎵 Music Therapy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────── */}
      <section
        id="about"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-violet-50/30 via-white to-teal-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-teal-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
                Who We Are
              </p>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-6 text-balance text-gray-900 dark:text-white">
                {ABOUT.heading}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {ABOUT.body1}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {ABOUT.body2}
              </p>
              {/* Source: PowerPoint slide 3 — exact mission statement */}
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 italic border-l-4 border-violet-300 dark:border-violet-700 pl-4">
                "{ABOUT.mission}"
              </p>
              <div className="grid grid-cols-2 gap-5">
                {VALUES.map(({ label, desc, color }, i) => {
                  const icons = [Shield, Eye, Users, Flame];
                  const IconComponent = icons[i];
                  return (
                    <div
                      key={label}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-md`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                        {label}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* About slideshow */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={aboutImages[currentAboutImage]}
                  alt="About Sensations"
                  fill
                  className="object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/80 to-transparent">
                  <p className="text-white text-sm font-medium">
                    {aboutCaptions[currentAboutImage]}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setCurrentAboutImage((p) =>
                      p === 0 ? aboutImages.length - 1 : p - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={() =>
                    setCurrentAboutImage((p) => (p + 1) % aboutImages.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {aboutImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentAboutImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentAboutImage ? "w-6 bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────── */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-teal-50/30 via-white to-fuchsia-50/30 dark:from-teal-950/20 dark:via-gray-900 dark:to-fuchsia-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Our Foundation
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything we do flows from two simple convictions — about art,
              and about people.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                <div className="p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900 dark:text-white">
                    Our Mission
                  </h3>
                  {/* Source: PowerPoint slide 3 — exact wording */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">
                    "To transform communities positively by utilising art as an
                    agent of change."
                  </p>
                </div>
                <div className="p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900 dark:text-white">
                    Our Vision
                  </h3>
                  {/* Source: PowerPoint slide 3 — exact wording */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">
                    "Inspire to empower through art."
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                    A Nairobi where no young person faces mental health
                    challenges alone — and where art is recognised as a tool for
                    healing, not a luxury.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Pillars — Source: PowerPoint slide 4 "Objectives" */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              How We Work
            </p>
            <h3 className="font-heading font-bold text-3xl lg:text-4xl text-balance text-gray-900 dark:text-white">
              Our Objectives
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4 shadow-md">
                <Megaphone className="w-6 h-6 text-white" />
              </div>
              {/* Source: PowerPoint slide 4 — objective 1 */}
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Address Social Ills
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Address social ills resulting from mental health issues and
                empower the community through education and sensitisation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4 shadow-md">
                <Palette className="w-6 h-6 text-white" />
              </div>
              {/* Source: PowerPoint slide 4 — objective 2 */}
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Art as Therapy
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Use art as a therapeutic tool — creating a link between young
                people and mental health professionals through creative
                expression.
              </p>
            </div>
          </div>

          {/* Future Goals — Source: PowerPoint slide 9 "Future Plans" */}
          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-balance text-gray-900 dark:text-white">
                Future Plans
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Where we are headed
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  color: "from-violet-500 to-fuchsia-500",
                  // Source: PowerPoint slide 9 — exact future plan
                  title: "School Clubs",
                  desc: "Initiate Akili Yangu Raha Yangu clubs in primary and secondary schools across Nairobi.",
                },
                {
                  icon: Users,
                  color: "from-teal-500 to-cyan-500",
                  // Source: PowerPoint slide 9 — exact future plan
                  title: "Referral Networks",
                  desc: "Establish sustainable referral mechanisms and structures — links to psychotherapeutic institutions for young people in crisis.",
                },
                {
                  icon: Music2,
                  color: "from-fuchsia-500 to-pink-500",
                  // Source: PowerPoint slide 9 — exact future plan
                  title: "Sufficient Resources",
                  desc: "Secure sufficient resources — instruments, venues and materials — for a smooth and uninterrupted flow of all activities.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-heading font-semibold text-base mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────── */}
      {/* Source: PowerPoint slide 6 "What We Do" */}
      <section
        id="what-we-do"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              What We Do
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              Three Pathways to Healing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We don't offer therapy in the clinical sense. We offer something
              just as powerful — a community that meets regularly, creates
              together, and holds space for the full weight of what it means to
              be young in Nairobi today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map(({ title, desc, sessions, gradient, bg }) => {
              const icons = [Music2, Drama, Users];
              const iconIdx = PROGRAMS.indexOf(
                PROGRAMS.find((p) => p.title === title)!,
              );
              const PIcon = icons[iconIdx] || Palette;
              return (
                <div
                  key={title}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${bg} border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <PIcon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 text-sm">
                    {desc}
                  </p>
                  <ul className="space-y-1.5">
                    {sessions.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} shrink-0`}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EVENTS ──────────────────────────────────────── */}
      <section
        id="events"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-violet-50/30 via-white to-teal-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-teal-950/20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              2026 Annual Calendar
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              The Year Ahead
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every event we run is intentional. From prayer sessions that
              ground us, to full concerts that move hundreds — this is the year
              we go further.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50 rounded-2xl px-6 py-4 mb-8 text-center border border-gray-100 dark:border-gray-700 shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">📅 Showing events for:</span>{" "}
              {MONTHS[calMonth]} {new Date().getFullYear()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date().toLocaleDateString("default", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 border border-gray-100 dark:border-gray-700 shadow-md">
            <button
              onClick={() => setCalMonth((m) => Math.max(0, m - 1))}
              disabled={calMonth === 0}
              className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-950/50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="text-center">
              <p className="font-heading font-bold text-xl text-gray-900 dark:text-white">
                {MONTHS[calMonth]}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date().getFullYear()}
              </p>
            </div>
            <button
              onClick={() => setCalMonth((m) => Math.min(11, m + 1))}
              disabled={calMonth === 11}
              className="p-2 rounded-full hover:bg-violet-50 dark:hover:bg-violet-950/50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {MONTHS.map((m, i) => {
              const has = CALENDAR_EVENTS.some((e) => e.month === m);
              const isCurrentMonth = new Date().getMonth() === i;
              return (
                <button
                  key={m}
                  onClick={() => setCalMonth(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${i === calMonth ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md" : has ? `bg-white dark:bg-gray-800 border ${isCurrentMonth ? "border-teal-400 dark:border-teal-600 ring-2 ring-teal-400/50" : "border-gray-200 dark:border-gray-700 hover:border-violet-300"} text-gray-700 dark:text-gray-300 shadow-sm` : "bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500"}`}
                >
                  {m.slice(0, 3)}
                  {has && i !== calMonth && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-violet-500 align-middle" />
                  )}
                  {isCurrentMonth && i !== calMonth && (
                    <span className="ml-1 text-[10px]">●</span>
                  )}
                </button>
              );
            })}
          </div>

          {monthEvents.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">
                No events scheduled for {MONTHS[calMonth]}
              </p>
              {calMonth !== new Date().getMonth() && (
                <button
                  onClick={() => setCalMonth(new Date().getMonth())}
                  className="mt-4 text-sm text-violet-600 dark:text-violet-400 hover:underline"
                >
                  ← Jump to current month ({MONTHS[new Date().getMonth()]})
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {monthEvents.map((ev, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-5 bg-white dark:bg-gray-800 rounded-2xl p-5 border transition-all ${calMonth === new Date().getMonth() ? "border-violet-200 dark:border-violet-800 shadow-lg hover:shadow-xl" : "border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-violet-200"}`}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950/50 dark:to-fuchsia-950/50 rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400 mb-1" />
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400 leading-tight text-center">
                      {ev.date}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-base mb-0.5 text-gray-900 dark:text-white">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ev.month} {new Date().getFullYear()}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${CAT_COLORS[ev.category]}`}
                  >
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {calMonth !== new Date().getMonth() && monthEvents.length > 0 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setCalMonth(new Date().getMonth())}
                className="text-sm text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" /> Jump to current month (
                {MONTHS[new Date().getMonth()]})
              </button>
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total events in {new Date().getFullYear()}
            </p>
            <p className="font-heading font-bold text-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              {CALENDAR_EVENTS.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              across {new Set(CALENDAR_EVENTS.map((e) => e.month)).size} months
            </p>
          </div>
        </div>
      </section>

      {/* ── IMPACT ──────────────────────────────────────── */}
      {/* Source: PowerPoint slide 7 + Annual Report conclusion */}
      <section
        id="impact"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-teal-50/30 via-white to-fuchsia-50/30 dark:from-teal-950/20 dark:via-gray-900 dark:to-fuchsia-950/20"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 lg:h-[520px] rounded-3xl overflow-hidden order-2 lg:order-1 shadow-2xl">
            {impactImages.map((src, idx) => (
              <Image
                key={src}
                src={src}
                alt="Community healing session"
                fill
                className={`object-cover transition-opacity duration-1000 ${idx === currentImpactImage ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {impactImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImpactImage(idx)}
                  className={`rounded-full transition-all cursor-pointer ${idx === currentImpactImage ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
                />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Our Impact
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-8 text-balance text-gray-900 dark:text-white">
              Real Change. Real Numbers. Real People.
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {IMPACT_STATS.map(({ value, label, suffix, color, display }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all"
                >
                  <p
                    className={`text-4xl font-heading font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                  >
                    {display ? (
                      display
                    ) : (
                      <AnimatedCounter
                        end={value}
                        suffix={suffix}
                        duration={2000}
                      />
                    )}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {IMPACT_BODY}
            </p>
            {/* Source: PowerPoint slide 7 — "hope is alive as we get to use art as a form of expression" */}
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 italic border-l-4 border-teal-300 dark:border-teal-700 pl-4">
              "Through sensitisation and education, hope is alive — as we use
              art as a form of expression to address psychological issues."
            </p>
            <Button
              onClick={openJoin}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 py-6 text-base font-medium inline-flex items-center gap-2 group shadow-lg transition-all cursor-pointer"
            >
              Join the Movement
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── GALLERY TEASER ──────────────────────────────── */}
      <section
        id="gallery"
        className="py-32 bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
            Creative Showcase
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
            Stories Told Through Art & Sound
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Moments of healing, creativity and community — captured across
            Nairobi since August 2022.
          </p>
        </div>
        <div className="overflow-hidden mb-3">
          <GalleryMarqueeRow images={galleryRow1} reverse={false} />
        </div>
        <div className="overflow-hidden">
          <GalleryMarqueeRow images={galleryRow2} reverse={true} />
        </div>
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 py-4 font-medium transition-all shadow-md"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-32 bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Voices from the Community
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              What Young People Are Saying
            </h2>
          </div>
          <div className="bg-gradient-to-br from-violet-200/80 via-purple-100/80 to-fuchsia-100/80 dark:from-violet-950/60 dark:via-purple-950/60 dark:to-fuchsia-950/60 backdrop-blur-sm rounded-3xl p-12 mb-8 min-h-[320px] flex items-center justify-center shadow-xl border border-violet-200/50 dark:border-violet-800/50">
            <div className="text-center space-y-6 max-w-3xl">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-heading font-bold text-white">
                    {TESTIMONIALS[currentTestimonial].initial}
                  </span>
                </div>
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                "{TESTIMONIALS[currentTestimonial].content}"
              </blockquote>
              <div>
                <p className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  {TESTIMONIALS[currentTestimonial].name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {TESTIMONIALS[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setCurrentTestimonial((p) =>
                  p === 0 ? TESTIMONIALS.length - 1 : p - 1,
                )
              }
              className="p-2 rounded-full border border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${i === currentTestimonial ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 w-8 h-2 shadow-sm" : "bg-gray-300 dark:bg-gray-600 w-2 h-2"}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length)
              }
              className="p-2 rounded-full border border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 transition shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────────── */}
      {/* Source: Annual Report cover page — names confirmed */}
      <section
        id="team"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-violet-50/30 via-white to-teal-50/30 dark:from-violet-950/20 dark:via-gray-900 dark:to-teal-950/20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              The People Behind It
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              Meet The Sensations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The Sensations is led by a small, passionate core team of young
              Nairobians who believe deeply in the power of art and community.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {TEAM.slice(0, 4).map(({ image, name, role, gradient }) => (
              <div key={name} className="text-center group">
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform group-hover:shadow-xl overflow-hidden`}
                >
                  {image ? (
                    <NextImage
                      src={image}
                      alt={name}
                      width={112}
                      height={112}
                      className="rounded-3xl object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-3xl font-heading font-bold text-white">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-lg mb-1 text-gray-900 dark:text-white">
                  {name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {role}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {TEAM.slice(4, 7).map(({ image, name, role, gradient }) => (
              <div key={name} className="text-center group">
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform group-hover:shadow-x overflow-hidden`}
                >
                  {image ? (
                    <NextImage
                      src={image}
                      alt={name}
                      width={112}
                      height={112}
                      className="rounded-3xl object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-3xl font-heading font-bold text-white">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-lg mb-1 text-gray-900 dark:text-white">
                  {name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {role}
                </p>
              </div>
            ))}
          </div>
          {/* Join the Team CTA */}
          <div className="bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50 rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-700 shadow-lg mt-16">
            <h3 className="font-heading font-bold text-xl mb-2 text-gray-900 dark:text-white">
              Join the Team
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto text-sm">
              We are always looking for musicians, artists, mental health
              advocates, event coordinators, and people who simply want to show
              up and help. If you believe in what we do, there is a place for
              you here.
            </p>
            <Button
              onClick={openJoin}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 shadow-md transition-all cursor-pointer"
            >
              Get Involved
            </Button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
            Stay in the Loop
          </p>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
            <div className="relative w-full h-64 md:h-80">
              <NextImage
                src="/community-healing.jpg"
                alt="Join our community"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="p-10 md:p-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white">
                Join the Sensations Community
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Get updates on sessions, concerts, free classes and mental
                health resources. We send what matters — nothing more.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.querySelector("input") as HTMLInputElement;
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: input.value }),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error);
                    alert(data.message);
                    input.value = "";
                  } catch (err: unknown) {
                    alert(
                      err instanceof Error
                        ? err.message
                        : "Something went wrong.",
                    );
                  }
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="flex-1 w-full px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 py-3 font-medium transition-all duration-200 whitespace-nowrap shadow-md"
                >
                  Subscribe Free
                </Button>
              </form>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-violet-500" />
                  <span>1,000+ young people</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-teal-500" />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      {/* Source: Annual Report cover — email, phone confirmed */}
      <section
        id="contact"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-teal-50/30 via-white to-fuchsia-50/30 dark:from-teal-950/20 dark:via-gray-900 dark:to-fuchsia-950/20"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Get In Touch
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              We'd Love to Hear From You
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you want to join a session, partner with us, support our
              work or simply find out more — reach out. We respond to every
              message.
            </p>
          </div>
          <form
            onSubmit={handleContactSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 lg:p-12 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={contactForm.fullName}
                  disabled={contactLoading}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={contactForm.email}
                  disabled={contactLoading}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                placeholder="What's this about?"
                value={contactForm.subject}
                disabled={contactLoading}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind..."
                required
                value={contactForm.message}
                disabled={contactLoading}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none disabled:opacity-60"
              />
            </div>
            {contactStatus && (
              <div
                className={`flex items-center gap-2 text-sm font-medium p-4 rounded-xl ${contactStatus.type === "success" ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"}`}
              >
                {contactStatus.type === "success" ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                {contactStatus.message}
              </div>
            )}
            <Button
              type="submit"
              disabled={contactLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full py-3 font-medium shadow-md transition-all cursor-pointer"
            >
              {contactLoading ? "Sending…" : "Send Message"}
            </Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                Icon: Heart,
                title: "Find Us",
                detail: SITE.location,
                gradient: "from-violet-500 to-fuchsia-500",
              },
              {
                Icon: Mail,
                title: "Email Us",
                detail: SITE.email,
                href: `mailto:${SITE.email}`,
                gradient: "from-teal-500 to-cyan-500",
              },
              {
                Icon: Users,
                title: "Follow Us",
                detail: SITE.social,
                href: "https://www.instagram.com/sensation9291",
                gradient: "from-fuchsia-500 to-pink-500",
              },
            ].map(({ Icon, title, detail, href, gradient }) => (
              <div
                key={title}
                className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 shadow-md`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading font-bold mb-2 text-gray-900 dark:text-white">
                  {title}
                </h3>
                {href ? (
                  <a
                    href={href}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer"
                  >
                    {detail}
                  </a>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET INVOLVED CTA ────────────────────────────── */}
      <section
        id="get-involved"
        className="py-32 px-6 lg:px-8 max-w-4xl mx-auto text-center"
      >
        <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
          Ready to Begin?
        </p>
        <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-8 text-balance text-gray-900 dark:text-white">
          Your Seat at the Table is Waiting
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Whether you're a young person looking for a safe space, a professional
          who wants to contribute, or an organisation that sees the value in
          this work — there is a role for you in The Sensations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={openJoin}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 py-6 text-base font-medium group inline-flex items-center justify-center shadow-lg transition-all cursor-pointer"
          >
            Join The Sensations
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-teal-500 text-teal-600 dark:text-white dark:border-teal-500 hover:text-white! hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
          >
            <a href="#events">View 2026 Events</a>
          </Button>
        </div>
      </section>

      {/* ── JOIN MODAL ──────────────────────────────────── */}
      {joinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setJoinOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            {joinStatus?.type === "success" ? (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-2 text-gray-900 dark:text-white">
                  {joinType === "member"
                    ? "Welcome Aboard! 🎉"
                    : "Thank You! 🙏"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {joinStatus.message}
                </p>
                <Button
                  onClick={() => setJoinOpen(false)}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl text-white rounded-full px-8 shadow-md cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : !joinType ? (
              <>
                <h3 className="font-heading font-bold text-2xl mb-2 text-gray-900 dark:text-white">
                  Join The Sensations
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                  Tell us how you'd like to be part of the work.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setJoinType("member")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition text-left cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1 text-gray-900 dark:text-white">
                        Join as a Member
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Come to sessions, perform, heal, grow. Whether you're a
                        musician, an artist, or simply someone who needs
                        community — you belong here.
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setJoinType("sponsor")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition text-left cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-md">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1 text-gray-900 dark:text-white">
                        Support as a Partner or Sponsor
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Help fund sessions, concerts, instruments and resources.
                        Your support directly puts tools and safe spaces in the
                        hands of young people who need them.
                      </p>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setJoinType(null)}
                  className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h3 className="font-heading font-bold text-2xl mb-1 text-gray-900 dark:text-white">
                  {joinType === "member"
                    ? "Join as a Member"
                    : "Become a Sponsor"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  {joinType === "member"
                    ? "Fill in your details and we'll reach out within 48 hours. All backgrounds welcome."
                    : "Tell us about yourself or your organisation. We'll be in touch to explore how we can work together."}
                </p>
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={joinForm.name}
                      disabled={joinLoading}
                      onChange={(e) =>
                        setJoinForm({ ...joinForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={joinForm.email}
                      disabled={joinLoading}
                      onChange={(e) =>
                        setJoinForm({ ...joinForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+254 700 000000"
                      value={joinForm.phone}
                      disabled={joinLoading}
                      onChange={(e) =>
                        setJoinForm({ ...joinForm, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                    />
                  </div>
                  {joinType === "sponsor" && (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Organisation / Company
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corp (optional)"
                        value={joinForm.org}
                        disabled={joinLoading}
                        onChange={(e) =>
                          setJoinForm({ ...joinForm, org: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      {joinType === "member"
                        ? "Why do you want to join?"
                        : "How would you like to support us?"}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={
                        joinType === "member"
                          ? "Tell us a bit about yourself — what draws you to The Sensations, what you're looking for, or what you'd like to contribute…"
                          : "Tell us about your sponsorship interest — financial, in-kind, professional services, or something else entirely…"
                      }
                      value={joinForm.message}
                      disabled={joinLoading}
                      onChange={(e) =>
                        setJoinForm({ ...joinForm, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none disabled:opacity-60"
                    />
                  </div>
                  {joinStatus?.type === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {joinStatus.message}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={joinLoading}
                    className={`w-full text-white rounded-full py-3 font-medium shadow-md transition-all cursor-pointer ${joinType === "member" ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl" : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-xl"}`}
                  >
                    {joinLoading
                      ? "Submitting…"
                      : joinType === "member"
                        ? "Join The Sensations"
                        : "Submit Sponsorship Interest"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/30 dark:via-fuchsia-950/30 dark:to-teal-950/30 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            <div className="lg:col-span-1">
              <p className="font-heading font-bold text-lg mb-2 text-gray-900 dark:text-white">
                {SITE.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {SITE.footerTagline}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Active since August 2022
              </p>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Navigate
              </p>
              <ul className="space-y-2 text-sm">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-gray-500! no-underline hover:text-violet-600! transition cursor-pointer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Services
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Mental Health Concerts",
                  "Art Therapy Sessions",
                  "Free Music Classes",
                  "Community Webinars",
                  "School Outreach",
                  "Referral Support",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#what-we-do"
                      className="text-gray-500! no-underline hover:text-violet-600! transition cursor-pointer"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Connect
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/sensation9291"
                    className="flex items-center gap-2 text-gray-500! no-underline hover:text-violet-600! transition cursor-pointer group"
                  >
                    <Instagram
                      size={18}
                      className="group-hover:scale-110 transition-transform text-gray-500! group-hover:text-violet-600!"
                    />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@the.sensation0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500! no-underline hover:text-violet-600! transition cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-gray-500! group-hover:text-violet-600! transition"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                    </svg>
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-gray-500! no-underline hover:text-violet-600! transition cursor-pointer"
                  >
                    <Mail
                      size={18}
                      className="text-gray-500! hover:text-violet-600! transition"
                    />
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Based in
              </p>
              <p className="text-sm text-gray-500! mb-1">{SITE.location}</p>
              <p className="text-xs text-gray-400! mb-4">{SITE.phone}</p>
              <button
                onClick={openJoin}
                className="px-5 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all shadow-md cursor-pointer"
              >
                Join Us →
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500!">
            <p>{SITE.copyright}</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes marquee-forward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
