"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Mail } from "lucide-react";
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
  },
  {
    label: "Humility",
    desc: "We serve with a heart that is open, grounded and community-first.",
  },
  {
    label: "Courage",
    desc: "We boldly create safe spaces for healing and authentic self-expression.",
  },
  {
    label: "Confidence",
    desc: "We empower young people to believe in their own voice and worth.",
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
  },
  {
    title: "Music Therapy",
    desc: "Live band performances that use melody and beat to process what words cannot reach.",
    sessions: ["Vocal expression", "Instrumental play"],
  },
  {
    title: "Group Healing",
    desc: "Facilitated community circles that harness the power of collective presence , because healing is rarely a solo journey.",
    sessions: [
      "Healing circles",
      "Peer support",
      "Live therapy sessions",
      "Exchange programs",
    ],
  },
];

const TEAM = [
  { initials: "AO", name: "Anton Ombara", role: "Founder & CEO" },
  { initials: "BO", name: "Bonface Odianga", role: "Financial Manager" },
  { initials: "DA", name: "Diana Atieno", role: "Director of Communications" },
  { initials: "BO", name: "Belvine Otieno", role: "Head of Operations" },
  { initials: "KN", name: "Keren Nyambura", role: "Web Designer" },
  { initials: "CP", name: "Celestine Pollack", role: "Social Media Manager" },
  { initials: "CO", name: "Clinton Otieno", role: "Head of Talent Department" },
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
  { n: "1000+", label: "Youth Reached" },
  { n: "850+", label: "Healing Sessions" },
  { n: "4,500+", label: "Artworks Created" },
  { n: "98%", label: "Would Recommend" },
];

const IMPACT_BODY =
  "Every young person deserves access to tools for healing and self-expression. Our community-centred approach creates space for authentic transformation.";

/* ─── 2026 Calendar ──────────────────────────────────────────────── */
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

/* ─── Helpers ────────────────────────────────────────────────────── */
const CAT_COLORS: Record<string, string> = {
  Meeting: "bg-blue-100 text-blue-700",
  Spiritual: "bg-purple-100 text-purple-700",
  Online: "bg-sky-100 text-sky-700",
  Music: "bg-pink-100 text-pink-700",
  Therapy: "bg-teal-100 text-teal-700",
  Community: "bg-indigo-100 text-indigo-700",
  Planning: "bg-yellow-100 text-yellow-700",
  Workshop: "bg-green-100 text-green-700",
  Special: "bg-fuchsia-100 text-fuchsia-700",
  Rehearsal: "bg-violet-100 text-violet-700",
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

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
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
              ? "oklch(57.699% 0.26802 311.19)"
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

export default function Home() {
  const Image = NextImage;

  /* nav */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* testimonials */
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCurrentTestimonial((p: number) => (p + 1) % TESTIMONIALS.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  /* calendar */
  const [calMonth, setCalMonth] = useState(0);
  const monthEvents = CALENDAR_EVENTS.filter(
    (e: { month: string }) => e.month === MONTHS[calMonth],
  );

  /* contact form */
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

  /* join modal */
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

  /* hero floating icons — includes drama mask image */
  const floatingItems: Array<{
    type: "icon" | "image";
    Icon?: React.ComponentType<{ className?: string; size?: number }>;
    src?: string;
    top: string;
    left: string;
    size: number;
    delay: string;
    color: string;
    bg: string;
    label?: string;
  }> = [
    {
      type: "icon",
      Icon: Palette,
      top: "10%",
      left: "7%",
      size: 34,
      delay: "0s",
      color: "text-violet-500",
      bg: "bg-violet-100",
    },
    {
      type: "icon",
      Icon: Music2,
      top: "5%",
      left: "58%",
      size: 38,
      delay: "0.4s",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      type: "icon",
      Icon: Heart,
      top: "60%",
      left: "4%",
      size: 28,
      delay: "0.8s",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-100",
    },
    {
      type: "icon",
      Icon: Brush,
      top: "77%",
      left: "42%",
      size: 30,
      delay: "0.2s",
      color: "text-violet-500",
      bg: "bg-violet-100",
    },
    {
      type: "icon",
      Icon: Headphones,
      top: "16%",
      left: "80%",
      size: 34,
      delay: "1s",
      color: "text-teal-500",
      bg: "bg-teal-100",
    },
    {
      type: "icon",
      Icon: Smile,
      top: "60%",
      left: "72%",
      size: 26,
      delay: "0.6s",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-100",
    },
    {
      type: "icon",
      Icon: Wind,
      top: "83%",
      left: "79%",
      size: 24,
      delay: "1.2s",
      color: "text-violet-400",
      bg: "bg-violet-50",
    },
    {
      type: "icon",
      Icon: Sun,
      top: "39%",
      left: "85%",
      size: 28,
      delay: "0.3s",
      color: "text-teal-400",
      bg: "bg-teal-50",
    },
    {
      type: "icon",
      Icon: Music2,
      top: "95%",
      left: "13%",
      size: 24,
      delay: "0.9s",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-50",
    },
    {
      type: "icon",
      Icon: Star,
      top: "15%",
      left: "30%",
      size: 20,
      delay: "1.4s",
      color: "text-violet-400",
      bg: "bg-violet-50",
    },
    {
      type: "icon",
      Icon: Sparkles,
      top: "55%",
      left: "55%",
      size: 22,
      delay: "1.6s",
      color: "text-teal-400",
      bg: "bg-teal-50",
    },
    /* Drama masks icon */
    {
      type: "icon",
      Icon: Drama,
      top: "43%",
      left: "25%",
      size: 34,
      delay: "0.5s",
      color: "text-violet-500",
      bg: "bg-violet-100",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-cream text-dark-slate">
      <nav className="fixed top-0 w-full bg-warm-cream/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/sensations_logo.png"
                alt="Sensations Logo"
                width={60}
                height={24}
                className="object-contain"
              />
              <span className="font-heading font-bold text-lg tracking-tight">
                Sensations
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm font-medium hover:text-soft-lavender transition cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button
                onClick={openJoin}
                className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full cursor-pointer"
              >
                Join Us
              </Button>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 cursor-pointer"
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
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium hover:text-soft-lavender transition py-2 cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openJoin();
                  }}
                  className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full w-full mt-2 cursor-pointer"
                >
                  Join Us
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/*  HERO */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
                Youth-Led Healing Initiative
              </p>
              <h1 className="font-heading font-bold text-5xl lg:text-6xl leading-tight text-balance">
                {SITE.taglineSwahili}
                <br />
                <span className="text-soft-lavender">
                  {SITE.taglineSwahiliLine2}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed max-w-lg">
                {SITE.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={openJoin}
                className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full px-8 py-6 text-base font-medium group inline-flex items-center justify-center cursor-pointer"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-muted-teal text-muted-teal hover:text-white hover:bg-muted-teal dark:bg-gray-800 dark:hover:text-white dark:border-soft-lavender dark:soft-lavender/90  dark:hover:bg-gray-700 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              >
                <a href="#about">Learn More</a>
              </Button>
            </div>
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                {SITE.heroStatLabel}
              </p>
              <p className="text-4xl font-heading font-bold text-soft-lavender">
                {SITE.heroStat}
              </p>
            </div>
          </div>

          {/* Floating icons — NO background frame, fully transparent */}
          <div className="relative h-96 lg:h-[520px]">
            {/* Central pulse — no box, just the heart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute w-52 h-52 rounded-full border-2 border-dashed border-soft-lavender/30 animate-spin"
                  style={{ animationDuration: "20s" }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full border-2 border-dashed border-muted-teal/30 animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-soft-lavender to-muted-teal flex items-center justify-center shadow-xl z-10">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {floatingItems.map((item, i) =>
              item.type === "image" ? (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: item.top,
                    left: item.left,
                    width: item.size + 32,
                    height: item.size + 32,
                    animation: "float 5s ease-in-out infinite",
                    animationDelay: item.delay,
                  }}
                >
                  <Image
                    src={item.src!}
                    alt="drama masks"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className={`absolute flex items-center justify-center rounded-2xl shadow-md ${item.bg} border border-white/60`}
                  style={{
                    top: item.top,
                    left: item.left,
                    width: item.size + 24,
                    height: item.size + 24,
                    animation: "float 4s ease-in-out infinite",
                    animationDelay: item.delay,
                  }}
                >
                  {item.Icon && (
                    <item.Icon className={item.color} size={item.size} />
                  )}
                </div>
              ),
            )}

            {/* Labels at bottom — no box behind them */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-semibold text-violet-600 shadow">
                🎨 Art Therapy
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-xs font-semibold text-teal-600 shadow">
                🎵 Music Therapy
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-soft-lavender/10 via-cream to-muted-teal/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
                Who We Are
              </p>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-6 text-balance">
                {ABOUT.heading}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {ABOUT.body1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 italic">
                {ABOUT.body2}
              </p>
              <div className="grid grid-cols-2 gap-5">
                {VALUES.map(
                  (
                    { label, desc }: { label: string; desc: string },
                    i: number,
                  ) => {
                    const icons = [Shield, Eye, Users, Flame];
                    const IconComponent = icons[i];
                    return (
                      <div
                        key={label}
                        className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-soft-lavender/20 hover:shadow-lg hover:border-soft-lavender/40 transition-all duration-300"
                      >
                        <div className="w-12 h-12 rounded-xl bg-soft-lavender/20 flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-soft-lavender" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                          {label}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/art-therapy-session.jpg", alt: "Art therapy" },
                { src: "/music-therapy.jpg", alt: "Music therapy", mt: true },
                { src: "/community-healing.jpg", alt: "Community healing" },
                {
                  src: "/community-circle.jpg",
                  alt: "Community circle",
                  mt: true,
                },
              ].map(({ src, alt, mt }, i) => (
                <div
                  key={i}
                  className={`relative h-52 rounded-2xl overflow-hidden${mt ? " mt-8" : ""}`}
                >
                  <Image src={src} alt={alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="what-we-do"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-muted-teal/10 via-cream to-soft-lavender/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              Our Services
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
              How We Support Your Healing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Through evidence-based art and music therapy, we create safe
              spaces for self-expression and mental wellness.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map(({ title, desc, sessions }, i) => {
              const icons = [Palette, Music2, Users];
              const PIcon = icons[i];
              const bgs = ["bg-violet-50", "bg-teal-50", "bg-fuchsia-50"];
              const iconBgs = [
                "bg-violet-100 text-violet-600",
                "bg-teal-100 text-teal-600",
                "bg-fuchsia-100 text-fuchsia-600",
              ];
              return (
                <div
                  key={title}
                  className={`p-8 rounded-3xl border border-border hover:shadow-lg transition-shadow ${bgs[i]}`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBgs[i].split(" ")[0]}`}
                  >
                    <PIcon className={`h-7 w-7 ${iconBgs[i].split(" ")[1]}`} />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">
                    {title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                    {desc}
                  </p>
                  <ul className="space-y-1.5">
                    {sessions.map((s) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-teal shrink-0" />
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

      <section
        id="events"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-soft-lavender/10 via-cream to-muted-teal/10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              2026 Annual Calendar
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected with everything happening across The Sensations
              community in 2026.
            </p>
          </div>

          <div className="flex items-center justify-between mb-6 bg-white rounded-2xl px-6 py-4 border border-border shadow-sm">
            <button
              onClick={() => setCalMonth((m) => Math.max(0, m - 1))}
              disabled={calMonth === 0}
              className="p-2 rounded-full hover:bg-violet-50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <p className="font-heading font-bold text-xl">
                {MONTHS[calMonth]}
              </p>
              <p className="text-xs text-muted-foreground">2026</p>
            </div>
            <button
              onClick={() => setCalMonth((m) => Math.min(11, m + 1))}
              disabled={calMonth === 11}
              className="p-2 rounded-full hover:bg-violet-50 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
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
                      ? "bg-soft-lavender text-white"
                      : has
                        ? "bg-white dark:bg-gray-800 border border-border hover:border-soft-lavender text-dark-slate dark:text-white"
                        : "bg-muted/50 dark:bg-gray-800 text-muted-foreground dark:text-white"
                  }`}
                >
                  {m.slice(0, 3)}
                  {has && i !== calMonth && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-muted-teal align-middle" />
                  )}
                </button>
              );
            })}
          </div>

          {monthEvents.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
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
                  className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-border hover:shadow-md hover:border-soft-lavender/40 transition-all"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-violet-50 rounded-xl flex flex-col items-center justify-center">
                    <Calendar className="w-4 h-4 text-soft-lavender mb-1" />
                    <span className="text-xs font-bold text-soft-lavender leading-tight text-center">
                      {ev.date}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-base mb-0.5">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {ev.month} 2026
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${CAT_COLORS[ev.category]}`}
                  >
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-violet-50 to-teal-50 rounded-2xl p-6 text-center border border-border">
            <p className="text-sm text-muted-foreground mb-1">
              Total events in 2026
            </p>
            <p className="font-heading font-bold text-3xl text-soft-lavender">
              {CALENDAR_EVENTS.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              across {new Set(CALENDAR_EVENTS.map((e) => e.month)).size} months
            </p>
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-muted-teal/10 via-cream to-soft-lavender/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 lg:h-full min-h-96 rounded-3xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/DSC_0304.jpg"
              alt="Art therapy in progress"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              Our Impact
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-8 text-balance">
              Transforming Lives Through Creative Expression
            </h2>
            <div className="grid grid-cols-2 gap-8 mb-12">
              {IMPACT_STATS.map(({ n, label }, i) => {
                const colors = [
                  "text-soft-lavender",
                  "text-muted-teal",
                  "text-fuchsia-500",
                  "text-soft-lavender",
                ];
                return (
                  <div key={label}>
                    <p
                      className={`text-4xl font-heading font-bold ${colors[i]}`}
                    >
                      {n}
                    </p>
                    <p className="text-muted-foreground mt-2">{label}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {IMPACT_BODY}
            </p>
            <Button
              onClick={openJoin}
              className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full px-8 py-6 text-base font-medium inline-flex items-center gap-2 group cursor-pointer"
            >
              Join the Movement
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-soft-lavender/10 via-cream to-muted-teal/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              Creative Showcase
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
              Stories Told Through Art & Sound
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the transformative power of creative expression from our
              community sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              // { src: '/art-therapy-session.jpg', alt: 'Art therapy',  cat: 'Art',       title: 'Creative Expression' },
              {
                src: "/DSC_0166.jpg",
                alt: "Music",
                cat: "Music",
                title: "Music Sessions",
              },
              {
                src: "/community-circle.jpg",
                alt: "Community",
                cat: "Community",
                title: "Community Healing",
              },
              {
                src: "/DSC_0374.jpg",
                alt: "Healing art",
                cat: "Art",
                title: "Healing Through Art",
              },
              {
                src: "/music-therapy.jpg",
                alt: "Therapy",
                cat: "Music",
                title: "Sound & Rhythm",
              },
              {
                src: "/DSC_0154.jpg",
                alt: "Healing",
                cat: "Community",
                title: "Collective Healing",
              },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-4 bg-muted">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-slate/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="inline-block px-3 py-1 bg-soft-lavender/15 text-soft-lavender text-xs font-medium rounded-full mb-2">
                  {item.cat}
                </span>
                <h3 className="font-heading font-bold text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  TESTIMONIALS  */}
      <section
        id="testimonials"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-muted-teal/10 via-cream to-soft-lavender/10 max-w-7xl mx-auto"
      >
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
            Voices of Transformation
          </p>
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
            Hear From Our Community
          </h2>
        </div>
        <div className="bg-soft-lavender/10 rounded-3xl p-12 mb-8 min-h-[320px] flex items-center justify-center">
          <div className="text-center space-y-6 max-w-3xl">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-soft-lavender to-muted-teal flex items-center justify-center">
                <span className="text-2xl font-heading font-bold text-white">
                  {TESTIMONIALS[currentTestimonial].initial}
                </span>
              </div>
            </div>
            <blockquote className="text-xl lg:text-2xl font-medium text-dark-slate leading-relaxed">
              "{TESTIMONIALS[currentTestimonial].content}"
            </blockquote>
            <div>
              <p className="font-heading font-bold text-lg">
                {TESTIMONIALS[currentTestimonial].name}
              </p>
              <p className="text-muted-foreground text-sm">
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
            className="p-2 rounded-full border border-soft-lavender text-soft-lavender hover:bg-soft-lavender/10 transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`rounded-full transition-all duration-500 cursor-pointer ${i === currentTestimonial ? "bg-soft-lavender w-8 h-2" : "bg-muted w-2 h-2"}`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length)
            }
            className="p-2 rounded-full border border-soft-lavender text-soft-lavender hover:bg-soft-lavender/10 transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* TEAM  */}
      <section
        id="team"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-soft-lavender/10 via-cream to-muted-teal/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              The People Behind It
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A passionate group of therapists, artists, musicians, and
              community builders dedicated to youth healing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {TEAM.map(({ initials, name, role }, i) => {
              const gradients = [
                "from-violet-400 to-fuchsia-400",
                "from-teal-400 to-violet-400",
                "from-fuchsia-400 to-teal-400",
                "from-violet-700 to-teal-400",
                "from-coral-300 to-fuchsia-400",
                "from-fuchsia-400 to-teal-400",
                "from-violet-400 to-teal-800",
              ];
              return (
                <div key={name} className="text-center group">
                  <div
                    className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center mx-auto mb-5 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-3xl font-heading font-bold text-white">
                      {initials}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-1">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-violet-50 to-teal-50 rounded-3xl p-8 text-center border border-border">
            <h3 className="font-heading font-bold text-xl mb-2 dark:text-black">
              Want to Volunteer or Collaborate?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
              We're always looking for therapists, artists, musicians, and
              community champions to join the Sensations family.
            </p>
            <Button
              onClick={openJoin}
              className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full px-8 cursor-pointer"
            >
              Get Involved
            </Button>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-r from-soft-lavender/20 via-cream to-muted-teal/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
            Stay Connected
          </p>
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-4">
            Join the Sensations Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Get updates on sessions, events and healing resources. No spam,
            ever.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.querySelector("input") as HTMLInputElement;
              const email = input.value;
              try {
                const res = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                alert(data.message);
                input.value = "";
              } catch (err: unknown) {
                alert(
                  err instanceof Error ? err.message : "Something went wrong.",
                );
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 w-full px-6 py-3 rounded-full border border-soft-lavender/30 bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-soft-lavender"
            />
            <Button
              type="submit"
              className="bg-soft-lavender hover:bg-soft-lavender/80 text-white rounded-full px-8 py-3 font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* CONTACT  */}
      <section
        id="contact"
        className="py-32 px-6 lg:px-8 bg-gradient-to-br from-muted-teal/10 via-cream to-soft-lavender/10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
              Get In Touch
            </p>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-balance mb-6">
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions? Ready to join? We'd love to hear from you.
            </p>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-6 bg-white p-8 lg:p-12 rounded-3xl border border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
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
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={contactForm.email}
                  disabled={contactLoading}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                value={contactForm.subject}
                disabled={contactLoading}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your interest in joining or any questions you have..."
                required
                value={contactForm.message}
                disabled={contactLoading}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender resize-none disabled:opacity-60"
              />
            </div>
            {contactStatus && (
              <div
                className={`flex items-center gap-2 text-sm font-medium p-4 rounded-xl ${contactStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
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
              className="w-full bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full py-3 font-medium disabled:opacity-60 cursor-pointer"
            >
              {contactLoading ? "Sending…" : "Send Message"}
            </Button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { Icon: Heart, title: "Location", detail: SITE.location },
              {
                Icon: Music2,
                title: "Email",
                detail: SITE.email,
                href: `mailto:${SITE.email}`,
              },
              {
                Icon: Users,
                title: "Follow Us",
                detail: SITE.social,
                href: "https://www.instagram.com/sensation9291",
              },
            ].map(({ Icon, title, detail, href }) => (
              <div key={title} className="text-center">
                <Icon className="h-8 w-8 text-soft-lavender mx-auto mb-4" />
                <h3 className="font-heading font-bold mb-2">{title}</h3>
                {href ? (
                  <a
                    href={href}
                    className="text-muted-foreground text-sm hover:text-soft-lavender transition cursor-pointer"
                  >
                    {detail}
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm">{detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  GET INVOLVED CTA  */}
      <section
        id="get-involved"
        className="py-32 px-6 lg:px-8 max-w-4xl mx-auto text-center"
      >
        <p className="text-sm font-medium text-muted-teal mb-4 tracking-wide uppercase">
          Ready to Begin?
        </p>
        <h2 className="font-heading font-bold text-4xl lg:text-5xl mb-8 text-balance">
          Your Journey to Healing Starts Now
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Whether you're looking for art therapy, music healing, or simply a
          supportive community, we're here for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={openJoin}
            className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full px-8 py-6 text-base font-medium group inline-flex items-center justify-center cursor-pointer"
          >
            Join The Sensations
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-muted-teal text-muted-teal hover:bg-muted-teal hover:text-white dark:bg-gray-800 dark:text-white dark:border-soft-lavender dark:hover:bg-gray-700 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
          >
            <a href="#events">View 2026 Events</a>
          </Button>
        </div>
      </section>

      {/* JOIN MODAL  */}
      {joinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setJoinOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {joinStatus?.type === "success" ? (
              <div className="text-center py-6">
                <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-2">
                  {joinType === "member"
                    ? "Welcome Aboard! 🎉"
                    : "Thank You! 🙏"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {joinStatus.message}
                </p>
                <Button
                  onClick={() => setJoinOpen(false)}
                  className="bg-soft-lavender hover:bg-soft-lavender/90 text-white rounded-full px-8 cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : !joinType ? (
              <>
                <h3 className="font-heading font-bold text-2xl mb-2">
                  Join The Sensations
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  How would you like to be part of the community?
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setJoinType("member")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-border hover:border-soft-lavender hover:bg-violet-50 transition text-left cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 group-hover:bg-violet-200 transition">
                      <Users className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1">
                        Join as a Member
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Participate in sessions, events, and the healing
                        community as a youth member or therapist.
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => setJoinType("sponsor")}
                    className="flex items-start gap-4 p-5 rounded-2xl border-2 border-border hover:border-muted-teal hover:bg-teal-50 transition text-left cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition">
                      <Heart className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-heading font-bold mb-1">
                        Support as a Sponsor
                      </p>
                      <p className="text-sm text-muted-foreground">
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
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-dark-slate mb-5 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h3 className="font-heading font-bold text-2xl mb-1">
                  {joinType === "member"
                    ? "Join as a Member"
                    : "Become a Sponsor"}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {joinType === "member"
                    ? "Fill in your details and we'll reach out within 48 hours."
                    : "Tell us about yourself or your organisation and we'll be in touch."}
                </p>
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                    />
                  </div>
                  {joinType === "sponsor" && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
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
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender disabled:opacity-60"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-soft-lavender resize-none disabled:opacity-60"
                    />
                  </div>
                  {joinStatus?.type === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {joinStatus.message}
                    </div>
                  )}
                  <Button
                    type="submit"
                    disabled={joinLoading}
                    className={`w-full text-white rounded-full py-3 font-medium disabled:opacity-60 cursor-pointer ${
                      joinType === "member"
                        ? "bg-soft-lavender hover:bg-soft-lavender/90"
                        : "bg-muted-teal hover:bg-muted-teal/90"
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

      {/*  FOOTER  */}
      <footer className="border-t border-border bg-gradient-to-br from-soft-lavender/10 via-cream to-muted-teal/10 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="font-heading font-bold text-lg mb-2">{SITE.name}</p>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {SITE.footerTagline}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4">Navigate</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="hover:text-soft-lavender transition cursor-pointer"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4">Connect</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://www.instagram.com/sensation9291"
                    className="flex items-center gap-2 hover:text-soft-lavender transition cursor-pointer group"
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
                    className="flex items-center gap-2 hover:text-soft-lavender transition cursor-pointer group"
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
                    className="flex items-center gap-2 hover:text-soft-lavender transition cursor-pointer"
                  >
                    <Mail
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium font-heading mb-4">Based in</p>
              <p className="text-sm text-muted-foreground mb-4">
                {SITE.location}
              </p>
              <button
                onClick={openJoin}
                className="px-5 py-2 bg-soft-lavender text-white text-sm font-medium rounded-full hover:bg-soft-lavender/90 transition cursor-pointer"
              >
                Join Us →
              </button>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{SITE.copyright}</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
