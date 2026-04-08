"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
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
} from "lucide-react";
import { Music2, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";

export const SITE = {
  name: "The Sensations",
  taglineSwahili: "Akili Yangu",
  taglineSwahiliLine2: "Raha Yangu",
  taglineEnglish: "My Mind, My Joy.",
  heroSubtitle:
    "A youth-led art and music therapy initiative in Nairobi, transforming mental health through creative expression.",
  heroStat: "1,000+ Youth Reached",
  heroStatLabel: "Trusted by young people across Nairobi",
  email: "youthalliancenbokenya@gmail.com",
  location: "Kariobangi North, Nairobi, Kenya",
  social: "@sensation9291",
  footerTagline: "Akili Yangu, Raha Yangu.\nMy Mind, My Joy.",
  copyright: "© 2026 The Sensations. All rights reserved.",
};

const ABOUT = {
  heading: "About Sensations",
  body1:
    "The Sensations is a youth-driven art group that emerged from Youth Alliance Network in 2023. Based in Kariobangi North, Nairobi, we target young people in disadvantaged communities through music therapy, mental health advocacy and the provision of safe spaces for harmonious communities.",
  body2:
    "Inspired by the 'Akili Yangu Raha Yangu' project, we believe every young person deserves access to tools for healing and self-expression. Through art therapy sessions, mental health concerts and free music classes every weekend, we are transforming lives one community at a time.",
};

const VALUES = [
  {
    label: "Integrity",
    desc: "We uphold honesty and transparency in everything we do.",
    color: "from-violet-500 to-purple-500",
  },
  {
    label: "Humility",
    desc: "We serve with a heart that is open, grounded and community-first.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    label: "Courage",
    desc: "We boldly create safe spaces for healing and authentic self-expression.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    label: "Confidence",
    desc: "We empower young people to believe in their own voice and worth.",
    color: "from-orange-500 to-amber-500",
  },
];

const PROGRAMS = [
  {
    title: "Art Therapy",
    desc: "Acrylic painting, watercolour, pottery, drawing — guided by licensed therapists to unlock emotion through colour and form.",
    sessions: [
      "Individual sessions",
      "Group workshops",
      "Clay & pottery",
      "Mixed media",
    ],
    gradient: "from-violet-500 to-purple-500",
    bg: "from-violet-50/80 to-purple-50/80 dark:from-violet-950/40 dark:to-purple-950/40",
  },
  {
    title: "Music Therapy",
    desc: "Live band performances that use melody and beat to process what words cannot reach.",
    sessions: ["Vocal expression", "Instrumental play"],
    gradient: "from-teal-500 to-cyan-500",
    bg: "from-teal-50/80 to-cyan-50/80 dark:from-teal-950/40 dark:to-cyan-950/40",
  },
  {
    title: "Group Healing",
    desc: "Facilitated community circles that harness the power of collective presence — because healing is rarely a solo journey.",
    sessions: [
      "Healing circles",
      "Peer support",
      "Live therapy sessions",
      "Exchange programs",
    ],
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-50/80 to-pink-50/80 dark:from-fuchsia-950/40 dark:to-pink-950/40",
  },
];

const TEAM = [
  {
    initials: "AO",
    name: "Anton Ombara",
    role: "Founder & CEO",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    initials: "BO",
    name: "Bonface Odianga",
    role: "Financial Manager",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    initials: "DA",
    name: "Diana Atieno",
    role: "Director of Communications",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    initials: "BO",
    name: "Belvine Otieno",
    role: "Head of Operations",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    initials: "KN",
    name: "Keren Nyambura",
    role: "Web Designer",
    gradient: "from-teal-500 to-violet-500",
  },
  {
    initials: "CP",
    name: "Celestine Pollack",
    role: "Social Media Manager",
    gradient: "from-pink-500 to-fuchsia-500",
  },
  {
    initials: "CO",
    name: "Clinton Otieno",
    role: "Head of Talent Department",
    gradient: "from-violet-500 to-teal-500",
  },
];

const TESTIMONIALS = [
  {
    name: "Tonny, 26",
    role: "Young Professional",
    initial: "T",
    content:
      "Sensations gave me a voice when I felt lost. Through art therapy, I discovered I could heal and help others heal too. It changed my entire perspective on mental health.",
  },
  {
    name: "Beatrice, 22",
    role: "Young Professional",
    initial: "B",
    content:
      "The music therapy sessions helped me process trauma I didn't know how to talk about. This community is real, it's safe, and it's transforming lives in my city.",
  },
  {
    name: "Rachel, 20",
    role: "University Student",
    initial: "R",
    content:
      "I came for stress relief and found a whole family. Sensations isn't just therapy, it's a movement empowering young people like us to reclaim our mental health.",
  },
];

const IMPACT_STATS = [
  {
    value: 1000,
    label: "Youth Reached",
    suffix: "+",
    color: "from-violet-500 to-purple-500",
  },
  {
    value: 850,
    label: "Healing Sessions",
    suffix: "+",
    color: "from-teal-500 to-cyan-500",
  },
  {
    value: 4500,
    label: "Artworks Created",
    suffix: "+",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    value: 98,
    label: "Would Recommend",
    suffix: "%",
    color: "from-orange-500 to-amber-500",
  },
];

const IMPACT_BODY =
  "Every young person deserves access to tools for healing and self-expression. Our community-centred approach creates space for authentic transformation.";

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
    title: "Online Engagement – Valentine",
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
  {
    month: "May",
    date: "1–3 May",
    title: "Sensation Anniversary – Butula",
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
  {
    month: "October",
    date: "31 Oct",
    title: "Sensation Concert",
    category: "Special",
  },
  {
    month: "December",
    date: "19 Dec",
    title: "Sensation Gala",
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
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const Image = NextImage;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [calMonth, setCalMonth] = useState(0);
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
    "Art therapy sessions help unlock emotion through creative expression",
    "Music therapy uses melody and beat to process what words cannot reach",
    "Community healing circles harness the power of collective presence",
    "Together we create safe spaces for authentic transformation",
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
    { src: "/gallery36.jpeg", cat: "Performance" },
    { src: "/gallery41.jpeg", cat: "Team" },
    { src: "/gallery43.jpeg", cat: "Team" },
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
    { src: "/gallery40.jpg", cat: "Performance" },
    { src: "/gallery42.jpeg", cat: "Performance" },
    { src: "/gallery44.jpeg", cat: "Team" },
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
            ? "Welcome! We'll be in touch within 48 hours to get you started."
            : "Thank you for your interest in sponsoring! Our team will reach out shortly.",
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
      {/* ── NAV ───────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/sensations_logo.png"
                alt="Sensations Logo"
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

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
                Youth-Led Healing Initiative
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
                className="border-teal-500 text-teal-600 dark:text-teal-400 dark:border-teal-500 hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              >
                <a href="#about">Learn More</a>
              </Button>
            </div>
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {SITE.heroStatLabel}
              </p>
              <p className="text-4xl font-heading font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {SITE.heroStat}
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

      {/* ── ABOUT ─────────────────────────────────────────── */}
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
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic">
                {ABOUT.body2}
              </p>
              <div className="grid grid-cols-2 gap-5">
                {VALUES.map(({ label, desc, color }, i) => {
                  const icons = [Shield, Eye, Users, Flame];
                  const IconComponent = icons[i];
                  return (
                    <div
                      key={label}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
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

      {/* ── MISSION & VISION ────────────────────────────────────── */}
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
              Committed to fostering mental wellness and building resilient
              communities.
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
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To foster mental wellness, build resilient communities, and
                    ensure that no one faces their challenges alone through
                    creative expression and peer support.
                  </p>
                </div>
                <div className="p-8 lg:p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-gray-900 dark:text-white">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    A Nairobi where every young person has access to mental
                    health support through art and music therapy, free from
                    stigma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              How We Do It
            </p>
            <h3 className="font-heading font-bold text-3xl lg:text-4xl text-balance text-gray-900 dark:text-white">
              Our Core Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Support & Community
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Creating safe spaces for sharing, understanding, and building
                meaningful connections.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mb-4 shadow-md">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Education & Awareness
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Raising awareness, reducing stigma, and empowering through
                education.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center mb-4 shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Advocacy & Policy
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Championing better mental health policies and improved access to
                services.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-heading font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Peer Mentorship
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Connecting individuals with trained mentors based on lived
                experience.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="font-heading font-bold text-2xl lg:text-3xl text-balance text-gray-900 dark:text-white">
                Looking Ahead
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Our commitment to expanding impact
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  value: 10000,
                  label: "Youth Reached",
                  suffix: "+",
                  icon: Users,
                  color: "from-violet-500 to-fuchsia-500",
                },
                {
                  value: 5,
                  label: "Therapy Centers",
                  suffix: "+",
                  icon: Music2,
                  color: "from-teal-500 to-cyan-500",
                },
                {
                  value: 100,
                  label: "Community Facilitators",
                  suffix: "+",
                  icon: Heart,
                  color: "from-fuchsia-500 to-pink-500",
                },
                {
                  value: 1,
                  label: "Annual Festivals",
                  suffix: "",
                  icon: Calendar,
                  color: "from-orange-500 to-amber-500",
                  text: "Annual",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-heading font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    {item.text ? (
                      item.text
                    ) : (
                      <AnimatedCounter
                        end={item.value}
                        suffix={item.suffix}
                        duration={2000}
                      />
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section
        id="what-we-do"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Our Services
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              How We Support Your Healing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Through evidence-based art and music therapy, we create safe
              spaces for self-expression and mental wellness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map(({ title, desc, sessions, gradient, bg }, i) => {
              const icons = [Palette, Music2, Users];
              const PIcon = icons[i];
              return (
                <div
                  key={title}
                  className={`p-8 rounded-3xl bg-gradient-to-br ${bg} border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
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
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shrink-0" />
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

      {/* ── EVENTS ────────────────────────────────────────── */}
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
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay connected with everything happening across The Sensations
              community in 2026.
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
              <p className="text-xs text-gray-500 dark:text-gray-400">2026</p>
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
              return (
                <button
                  key={m}
                  onClick={() => setCalMonth(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    i === calMonth
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md"
                      : has
                        ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 text-gray-700 dark:text-gray-300 shadow-sm"
                        : "bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {m.slice(0, 3)}
                  {has && i !== calMonth && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-violet-500 align-middle" />
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
            </div>
          ) : (
            <div className="space-y-4">
              {monthEvents.map((ev, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-violet-200 dark:hover:border-violet-800 transition-all"
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
                      {ev.month} 2026
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
          <div className="mt-12 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 shadow-md">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total events in 2026
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

      {/* ── IMPACT ────────────────────────────────────────── */}
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
                alt="Community healing"
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
              Transforming Lives Through Creative Expression
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-12">
              {IMPACT_STATS.map(({ value, label, suffix, color }, i) => (
                <div
                  key={label}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all"
                >
                  <p
                    className={`text-4xl font-heading font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                  >
                    <AnimatedCounter
                      end={value}
                      suffix={suffix}
                      duration={2000}
                    />
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

      {/* ── GALLERY TEASER (marquee rows) ─────────────────── */}
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
            Explore the transformative power of creative expression from our
            community sessions.
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

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-32 bg-gradient-to-br from-fuchsia-50/30 via-white to-violet-50/30 dark:from-fuchsia-950/20 dark:via-gray-900 dark:to-violet-950/20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
              Voices of Transformation
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6 text-gray-900 dark:text-white">
              Hear From Our Community
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

      {/* ── TEAM ──────────────────────────────────────────── */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A passionate group of therapists, artists, musicians, and
              community builders dedicated to youth healing.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {TEAM.slice(0, 4).map(({ initials, name, role, gradient }, i) => (
              <div key={name} className="text-center group">
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform group-hover:shadow-xl`}
                >
                  <span className="text-3xl font-heading font-bold text-white">
                    {initials}
                  </span>
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
            {TEAM.slice(4, 7).map(({ initials, name, role, gradient }, i) => (
              <div key={name} className="text-center group">
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform group-hover:shadow-xl`}
                >
                  <span className="text-3xl font-heading font-bold text-white">
                    {initials}
                  </span>
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
          <div className="bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50 rounded-3xl p-8 text-center border border-gray-100 dark:border-gray-700 shadow-lg mt-16">
            <h3 className="font-heading font-bold text-xl mb-2 text-gray-900 dark:text-white">
              Want to Volunteer or Collaborate?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto text-sm">
              We're always looking for therapists, artists, musicians, and
              community champions to join the Sensations family.
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

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-violet-100 via-fuchsia-100 to-teal-100 dark:from-violet-950/50 dark:via-fuchsia-950/50 dark:to-teal-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
            Stay Connected
          </p>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
            {/* Image at the top center */}
            <div className="relative w-full h-64 md:h-80">
              <NextImage
                src="/community-healing.jpg"
                alt="Join our community"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Content padding */}
            <div className="p-10 md:p-12">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4 text-gray-900 dark:text-white">
                Join the Sensations Community
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Get updates on sessions, events and healing resources. No spam,
                ever.
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
                  Subscribe
                </Button>
              </form>

              {/* Extra trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-violet-500" />
                  <span>1,000+ subscribers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-teal-500" />
                  <span>Weekly updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
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
              Connect With Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have questions? Ready to join? We'd love to hear from you.
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
                  placeholder="your.email@example.com"
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
                placeholder="How can we help?"
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
                placeholder="Tell us about your interest in joining or any questions you have..."
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
                title: "Location",
                detail: SITE.location,
                gradient: "from-violet-500 to-fuchsia-500",
              },
              {
                Icon: Music2,
                title: "Email",
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

      {/* ── GET INVOLVED CTA ──────────────────────────────── */}
      <section
        id="get-involved"
        className="py-32 px-6 lg:px-8 max-w-4xl mx-auto text-center"
      >
        <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mb-4 tracking-wide uppercase">
          Ready to Begin?
        </p>
        <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-8 text-balance text-gray-900 dark:text-white">
          Your Journey to Healing Starts Now
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Whether you're looking for art therapy, music healing, or simply a
          supportive community, we're here for you.
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
            className="border-teal-500 text-teal-600 dark:text-teal-400 dark:border-teal-500 hover:text-white hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
          >
            <a href="#events">View 2026 Events</a>
          </Button>
        </div>
      </section>

      {/* ── JOIN MODAL ────────────────────────────────────── */}
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
                  How would you like to be part of the community?
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setJoinType("member")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition text-left cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1 text-gray-900 dark:text-white">
                        Join as a Member
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Participate in sessions, events, and the healing
                        community as a youth member or therapist.
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setJoinType("sponsor")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition text-left cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-md">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1 text-gray-900 dark:text-white">
                        Support as a Sponsor
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Partner with us financially or in-kind to fund sessions,
                        events, and outreach across Nairobi.
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
                    ? "Fill in your details and we'll reach out within 48 hours."
                    : "Tell us about yourself or your organisation and we'll be in touch."}
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
                          ? "Tell us a bit about yourself and your interest…"
                          : "Tell us about your sponsorship interest, capacity, or ideas…"
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
                    className={`w-full text-white rounded-full py-3 font-medium shadow-md transition-all cursor-pointer ${
                      joinType === "member"
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl"
                        : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-xl"
                    }`}
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

      {/* ── FOOTER ────────────────────────────────────────── */}
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
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Navigate
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer"
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
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                {[
                  "Art Therapy",
                  "Music Therapy",
                  "Group Healing Circles",
                  "Mental Health Workshops",
                  "Community Events",
                  "Youth Counseling",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#what-we-do"
                      className="hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer"
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
              <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://www.instagram.com/sensation9291"
                    className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer group"
                  >
                    <Instagram
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@the.sensation0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                    </svg>
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer"
                  >
                    <Mail size={18} />
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4 text-gray-700 dark:text-gray-300">
                Based in
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {SITE.location}
              </p>
              <button
                onClick={openJoin}
                className="px-5 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all shadow-md cursor-pointer"
              >
                Join Us →
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
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
